type Bindings = Env;

type AuthUser = { id: number; username: string; email: string; role: string };

type Session = { user_id: number; csrf_token: string; expires_at: string; username: string; email: string; role: string; is_active: number };

const SESSION_DAYS = 7;
const PBKDF2_ITERATIONS = 120000;
const MAX_BODY_BYTES = 256 * 1024;
const ALLOWED_SETTING_KEYS = new Set([
  'site_title', 'site_description', 'site_logo', 'site_favicon', 'contact_email',
  'social_facebook', 'social_twitter', 'social_instagram', 'homepage_html',
  'footer_html', 'meta_keywords', 'google_analytics_id',
]);

function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  });
}

function error(message: string, status = 400) {
  return json({ error: message }, status);
}

function text(value: unknown, max = 5000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function int(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value)) return value;
  if (typeof value === 'string' && /^-?\d+$/.test(value)) return Number(value);
  return null;
}

function num(value: unknown): number | null {
  const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  return Number.isFinite(n) ? n : null;
}

async function bodyJson(request: Request): Promise<Record<string, any> | null> {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) return null;
  try {
    const body = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

function hex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function bytesFromHex(value: string): Uint8Array {
  const bytes = new Uint8Array(value.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(value.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sha256(value: string): Promise<string> {
  return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

async function hashPassword(password: string, saltHex?: string): Promise<{ salt: string; hash: string }> {
  const salt = saltHex ? bytesFromHex(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    256,
  );
  return { salt: [...salt].map((b) => b.toString(16).padStart(2, '0')).join(''), hash: hex(bits) };
}

function cookie(name: string, value: string, options: { httpOnly?: boolean; maxAge?: number } = {}) {
  return `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Strict; Secure${options.httpOnly ? '; HttpOnly' : ''}${options.maxAge !== undefined ? `; Max-Age=${options.maxAge}` : ''}`;
}

function getCookie(request: Request, name: string): string | null {
  const raw = request.headers.get('Cookie') || '';
  const match = raw.split(';').map((x) => x.trim()).find((x) => x.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  try { return origin === new URL(request.url).origin; } catch { return false; }
}

async function authenticate(request: Request, env: Bindings): Promise<Session | null> {
  const raw = getCookie(request, 'bn_session');
  if (!raw || raw.length < 32) return null;
  const tokenHash = await sha256(raw);
  const row = await env.DB.prepare(`
    SELECT s.user_id, s.csrf_token, s.expires_at, u.username, u.email, u.is_active,
           COALESCE(r.role, 'user') AS role
    FROM sessions s JOIN users u ON u.id = s.user_id
    LEFT JOIN user_roles r ON r.user_id = u.id
    WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP AND u.is_active = 1
    LIMIT 1
  `).bind(tokenHash).first<Session>();
  return row || null;
}

async function requireAdmin(request: Request, env: Bindings): Promise<Session | Response> {
  const session = await authenticate(request, env);
  if (!session) return error('Authentication required', 401);
  if (session.role !== 'admin') return error('Admin access required', 403);
  if (!validateOrigin(request)) return error('Invalid request origin', 403);
  return session;
}

async function createSession(env: Bindings, userId: number): Promise<{ token: string; csrf: string }> {
  const token = `${crypto.randomUUID()}${crypto.randomUUID()}`.replaceAll('-', '');
  const csrf = crypto.randomUUID().replaceAll('-', '');
  const tokenHash = await sha256(token);
  await env.DB.prepare(`DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP`).run();
  await env.DB.prepare(`INSERT INTO sessions(user_id,token_hash,csrf_token,expires_at) VALUES(?,?,?,datetime('now','+${SESSION_DAYS} days'))`)
    .bind(userId, tokenHash, csrf).run();
  return { token, csrf };
}

async function handleAuth(request: Request, env: Bindings, pathname: string): Promise<Response> {
  if (pathname === '/api/auth/register' && request.method === 'POST') {
    if (!validateOrigin(request)) return error('Invalid request origin', 403);
    const input = await bodyJson(request);
    if (!input) return error('Invalid JSON');
    const username = text(input.username, 40);
    const email = text(input.email, 160).toLowerCase();
    const password = typeof input.password === 'string' ? input.password : '';
    if (!/^[a-zA-Z0-9_.-]{3,40}$/.test(username)) return error('Invalid username');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error('Invalid email');
    if (password.length < 8 || password.length > 200) return error('Password must be 8-200 characters');
    const existing = await env.DB.prepare('SELECT COUNT(*) AS count FROM users').first<{ count: number }>();
    const isFirst = Number(existing?.count || 0) === 0;
    const { salt, hash } = await hashPassword(password);
    try {
      const result = await env.DB.prepare('INSERT INTO users(username,email,password_hash,password_salt) VALUES(?,?,?,?)')
        .bind(username, email, hash, salt).run();
      const userId = Number(result.meta.last_row_id);
      await env.DB.prepare('INSERT INTO user_roles(user_id,role) VALUES(?,?)').bind(userId, isFirst ? 'admin' : 'user').run();
      const session = await createSession(env, userId);
      return json({ ok: true, user: { id: userId, username, email, role: isFirst ? 'admin' : 'user' } }, 201, {
        'Set-Cookie': cookie('bn_session', session.token, { httpOnly: true, maxAge: SESSION_DAYS * 86400 }),
        'Set-Cookie-2': cookie('bn_csrf', session.csrf, { maxAge: SESSION_DAYS * 86400 }),
        ...securityHeaders(),
      });
    } catch (e) {
      return error('Username or email already exists', 409);
    }
  }

  if (pathname === '/api/auth/login' && request.method === 'POST') {
    if (!validateOrigin(request)) return error('Invalid request origin', 403);
    const input = await bodyJson(request);
    if (!input) return error('Invalid JSON');
    const username = text(input.username, 40);
    const password = typeof input.password === 'string' ? input.password : '';
    const user = await env.DB.prepare(`SELECT u.*, COALESCE(r.role,'user') AS role FROM users u LEFT JOIN user_roles r ON r.user_id=u.id WHERE u.username = ? COLLATE NOCASE LIMIT 1`).bind(username).first<any>();
    if (!user || !user.is_active) return error('Invalid username or password', 401);
    const { hash } = await hashPassword(password, user.password_salt);
    if (!constantTimeEqual(hash, user.password_hash)) return error('Invalid username or password', 401);
    const session = await createSession(env, user.id);
    return json({ ok: true, user: { id: user.id, username: user.username, email: user.email, role: user.role } }, 200, {
      'Set-Cookie': cookie('bn_session', session.token, { httpOnly: true, maxAge: SESSION_DAYS * 86400 }),
      'Set-Cookie-2': cookie('bn_csrf', session.csrf, { maxAge: SESSION_DAYS * 86400 }),
      ...securityHeaders(),
    });
  }

  if (pathname === '/api/auth/me' && request.method === 'GET') {
    const session = await authenticate(request, env);
    if (!session) return error('Not authenticated', 401);
    return json({ user: { id: session.user_id, username: session.username, email: session.email, role: session.role } }, 200, securityHeaders());
  }

  if (pathname === '/api/auth/logout' && request.method === 'POST') {
    if (!validateOrigin(request)) return error('Invalid request origin', 403);
    const raw = getCookie(request, 'bn_session');
    if (raw) await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(raw)).run();
    return json({ ok: true }, 200, {
      'Set-Cookie': cookie('bn_session', '', { httpOnly: true, maxAge: 0 }),
      'Set-Cookie-2': cookie('bn_csrf', '', { maxAge: 0 }),
      ...securityHeaders(),
    });
  }
  return error('Not found', 404);
}

async function handlePublic(request: Request, env: Bindings, pathname: string): Promise<Response> {
  if (request.method !== 'GET') return error('Method not allowed', 405, { Allow: 'GET' });

  if (pathname === '/api/settings') {
    const rows = await env.DB.prepare('SELECT key,value FROM settings').all<{ key: string; value: string }>();
    const settings: Record<string,string> = {};
    for (const row of rows.results || []) settings[row.key] = row.value;
    return json({ settings }, 200, { ...securityHeaders(), 'Cache-Control': 'public, max-age=60' });
  }

  if (pathname === '/api/categories') {
    const rows = await env.DB.prepare('SELECT id,name,slug,description,parent_id,is_active FROM categories WHERE is_active=1 ORDER BY name COLLATE NOCASE').all();
    return json({ categories: rows.results || [] }, 200, { ...securityHeaders(), 'Cache-Control': 'public, max-age=60' });
  }

  if (pathname.startsWith('/api/categories/')) {
    const slug = decodeURIComponent(pathname.slice('/api/categories/'.length));
    const category = await env.DB.prepare('SELECT id,name,slug,description,parent_id,is_active FROM categories WHERE slug=? COLLATE NOCASE AND is_active=1').bind(slug).first<any>();
    if (!category) return error('Category not found', 404);
    const products = await env.DB.prepare(`SELECT id,name,description,price,image_url,affiliate_url,category_id,is_active,created_at FROM products WHERE category_id=? AND is_active=1 ORDER BY created_at DESC`).bind(category.id).all();
    return json({ category, products: products.results || [] }, 200, { ...securityHeaders(), 'Cache-Control': 'public, max-age=60' });
  }

  if (pathname === '/api/products') {
    const rows = await env.DB.prepare(`SELECT id,name,description,price,image_url,affiliate_url,category_id,is_active,created_at FROM products WHERE is_active=1 ORDER BY created_at DESC LIMIT 100`).all();
    return json({ products: rows.results || [] }, 200, { ...securityHeaders(), 'Cache-Control': 'public, max-age=60' });
  }

  if (pathname.startsWith('/api/products/')) {
    const id = int(pathname.slice('/api/products/'.length));
    if (id === null) return error('Invalid product id', 400);
    const product = await env.DB.prepare(`SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.id=? AND p.is_active=1`).bind(id).first<any>();
    if (!product) return error('Product not found', 404);
    const reviews = await env.DB.prepare(`SELECT id,user_name,rating,comment,created_at FROM reviews WHERE product_id=? AND status='approved' ORDER BY created_at DESC LIMIT 50`).bind(id).all();
    return json({ product, reviews: reviews.results || [] }, 200, { ...securityHeaders(), 'Cache-Control': 'public, max-age=60' });
  }

  return error('Not found', 404);
}

async function handleAdmin(request: Request, env: Bindings, pathname: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  if (pathname === '/api/admin/products' && request.method === 'GET') {
    const rows = await env.DB.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    return json({ products: rows.results || [] }, 200, securityHeaders());
  }
  if (pathname === '/api/admin/products' && request.method === 'POST') {
    const input = await bodyJson(request); if (!input) return error('Invalid JSON');
    const name = text(input.name, 200), description = text(input.description, 10000), image = text(input.image_url, 2000), affiliate = text(input.affiliate_url, 2000);
    const price = num(input.price); const categoryId = input.category_id == null ? null : int(input.category_id);
    if (!name || price === null || price < 0 || categoryId === null && input.category_id) return error('Invalid product data');
    const result = await env.DB.prepare(`INSERT INTO products(name,description,price,image_url,affiliate_url,category_id,is_active) VALUES(?,?,?,?,?,?,?)`).bind(name,description,price,image,affiliate,categoryId,input.is_active ? 1 : 0).run();
    return json({ id: result.meta.last_row_id }, 201, securityHeaders());
  }
  const productMatch = pathname.match(/^\/api\/admin\/products\/(\d+)$/);
  if (productMatch) {
    const id = Number(productMatch[1]);
    if (request.method === 'PUT') {
      const input = await bodyJson(request); if (!input) return error('Invalid JSON');
      const existing = await env.DB.prepare('SELECT * FROM products WHERE id=?').bind(id).first<any>(); if (!existing) return error('Product not found',404);
      const name = input.name === undefined ? existing.name : text(input.name,200);
      const description = input.description === undefined ? existing.description : text(input.description,10000);
      const price = input.price === undefined ? existing.price : num(input.price);
      const image = input.image_url === undefined ? existing.image_url : text(input.image_url,2000);
      const affiliate = input.affiliate_url === undefined ? existing.affiliate_url : text(input.affiliate_url,2000);
      const category = input.category_id === undefined ? existing.category_id : (input.category_id === null || input.category_id === '' ? null : int(input.category_id));
      const active = input.is_active === undefined ? existing.is_active : (input.is_active ? 1 : 0);
      if (!name || price === null || price < 0 || category !== null && int(category) === null) return error('Invalid product data');
      await env.DB.prepare('UPDATE products SET name=?,description=?,price=?,image_url=?,affiliate_url=?,category_id=?,is_active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(name,description,price,image,affiliate,category,active,id).run();
      return json({ ok:true },200,securityHeaders());
    }
    if (request.method === 'DELETE') { await env.DB.prepare('DELETE FROM products WHERE id=?').bind(id).run(); return json({ok:true},200,securityHeaders()); }
  }

  if (pathname === '/api/admin/categories' && request.method === 'GET') {
    const rows = await env.DB.prepare('SELECT * FROM categories ORDER BY name COLLATE NOCASE').all(); return json({categories:rows.results||[]},200,securityHeaders());
  }
  if (pathname === '/api/admin/categories' && request.method === 'POST') {
    const input=await bodyJson(request); if(!input)return error('Invalid JSON');
    const name=text(input.name,160),slug=text(input.slug,160).toLowerCase(),description=text(input.description,5000),parent=input.parent_id?int(input.parent_id):null;
    if(!name||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))return error('Invalid category data');
    try { const r=await env.DB.prepare('INSERT INTO categories(name,slug,description,parent_id,is_active) VALUES(?,?,?,?,?)').bind(name,slug,description,parent,input.is_active?1:0).run(); return json({id:r.meta.last_row_id},201,securityHeaders()); } catch{return error('Category slug already exists',409);}
  }
  const catMatch=pathname.match(/^\/api\/admin\/categories\/(\d+)$/);
  if(catMatch){const id=Number(catMatch[1]); if(request.method==='PUT'){const input=await bodyJson(request);if(!input)return error('Invalid JSON');const e=await env.DB.prepare('SELECT * FROM categories WHERE id=?').bind(id).first<any>();if(!e)return error('Category not found',404);const name=input.name===undefined?e.name:text(input.name,160),slug=input.slug===undefined?e.slug:text(input.slug,160).toLowerCase(),desc=input.description===undefined?e.description:text(input.description,5000),parent=input.parent_id===undefined?e.parent_id:(input.parent_id?int(input.parent_id):null),active=input.is_active===undefined?e.is_active:(input.is_active?1:0);if(!name||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||parent===id)return error('Invalid category data');try{await env.DB.prepare('UPDATE categories SET name=?,slug=?,description=?,parent_id=?,is_active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(name,slug,desc,parent,active,id).run();return json({ok:true},200,securityHeaders());}catch{return error('Category slug already exists',409);}}if(request.method==='DELETE'){await env.DB.prepare('DELETE FROM categories WHERE id=?').bind(id).run();return json({ok:true},200,securityHeaders());}}

  if (pathname === '/api/admin/reviews' && request.method === 'GET') { const r=await env.DB.prepare(`SELECT r.*,p.name AS product_name FROM reviews r LEFT JOIN products p ON p.id=r.product_id ORDER BY r.created_at DESC`).all();return json({reviews:r.results||[]},200,securityHeaders()); }
  const reviewMatch=pathname.match(/^\/api\/admin\/reviews\/(\d+)$/); if(reviewMatch){const id=Number(reviewMatch[1]);if(request.method==='PUT'){const input=await bodyJson(request);if(!input||!['pending','approved','rejected'].includes(input.status))return error('Invalid review status');await env.DB.prepare('UPDATE reviews SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(input.status,id).run();return json({ok:true},200,securityHeaders());}if(request.method==='DELETE'){await env.DB.prepare('DELETE FROM reviews WHERE id=?').bind(id).run();return json({ok:true},200,securityHeaders());}}

  if (pathname === '/api/admin/coupons' && request.method === 'GET') {const r=await env.DB.prepare('SELECT * FROM coupons ORDER BY created_at DESC').all();return json({coupons:r.results||[]},200,securityHeaders());}
  if (pathname === '/api/admin/coupons' && request.method === 'POST') {const i=await bodyJson(request);if(!i)return error('Invalid JSON');const code=text(i.code,40).toUpperCase(),type=i.discount_type==='fixed'?'fixed':'percentage',value=num(i.discount_value),min=num(i.min_purchase)??0,max=i.max_uses?int(i.max_uses):null,expires=i.expires_at?text(i.expires_at,30):null;if(!code||value===null||value<0||min<0||max!==null&&max<=0||(type==='percentage'&&value>100))return error('Invalid coupon data');try{const r=await env.DB.prepare('INSERT INTO coupons(code,description,discount_type,discount_value,min_purchase,max_uses,expires_at,is_active) VALUES(?,?,?,?,?,?,?,?)').bind(code,text(i.description,500),type,value,min,max,expires,i.is_active?1:0).run();return json({id:r.meta.last_row_id},201,securityHeaders());}catch{return error('Coupon code already exists',409);}}
  const couponMatch=pathname.match(/^\/api\/admin\/coupons\/(\d+)$/);if(couponMatch){const id=Number(couponMatch[1]);if(request.method==='PUT'){const i=await bodyJson(request);if(!i)return error('Invalid JSON');const e=await env.DB.prepare('SELECT * FROM coupons WHERE id=?').bind(id).first<any>();if(!e)return error('Coupon not found',404);const code=i.code===undefined?e.code:text(i.code,40).toUpperCase(),type=i.discount_type===undefined?e.discount_type:(i.discount_type==='fixed'?'fixed':'percentage'),value=i.discount_value===undefined?e.discount_value:num(i.discount_value),min=i.min_purchase===undefined?e.min_purchase:(num(i.min_purchase)??0),max=i.max_uses===undefined?e.max_uses:(i.max_uses?int(i.max_uses):null),expires=i.expires_at===undefined?e.expires_at:(i.expires_at?text(i.expires_at,30):null),active=i.is_active===undefined?e.is_active:(i.is_active?1:0);if(!code||value===null||value<0||min<0||max!==null&&max<=0||(type==='percentage'&&value>100))return error('Invalid coupon data');try{await env.DB.prepare('UPDATE coupons SET code=?,description=?,discount_type=?,discount_value=?,min_purchase=?,max_uses=?,expires_at=?,is_active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(code,text(i.description===undefined?e.description:i.description,500),type,value,min,max,expires,active,id).run();return json({ok:true},200,securityHeaders());}catch{return error('Coupon code already exists',409);}}if(request.method==='DELETE'){await env.DB.prepare('DELETE FROM coupons WHERE id=?').bind(id).run();return json({ok:true},200,securityHeaders());}}

  if(pathname==='/api/admin/settings'&&request.method==='GET'){const r=await env.DB.prepare('SELECT key,value FROM settings ORDER BY key').all();return json({settings:r.results||[]},200,securityHeaders());}
  if(pathname==='/api/admin/settings'&&request.method==='PUT'){const i=await bodyJson(request);if(!i||!i.settings||typeof i.settings!=='object')return error('Invalid settings');const entries=Object.entries(i.settings).filter(([k])=>ALLOWED_SETTING_KEYS.has(k));const stmt=env.DB.prepare('INSERT INTO settings(key,value,updated_at) VALUES(?,?,CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=CURRENT_TIMESTAMP');await env.DB.batch(entries.map(([k,v])=>stmt.bind(k,text(v,50000))));return json({ok:true},200,securityHeaders());}

  if(pathname==='/api/admin/scripts'&&request.method==='GET'){const r=await env.DB.prepare('SELECT * FROM custom_scripts ORDER BY created_at DESC').all();return json({scripts:r.results||[]},200,securityHeaders());}
  if(pathname==='/api/admin/scripts'&&request.method==='POST'){const i=await bodyJson(request);if(!i)return error('Invalid JSON');const type=['javascript','css','html'].includes(i.type)?i.type:'javascript',location=['head','body_start','body_end'].includes(i.location)?i.location:'head',name=text(i.name,160),content=text(i.content,50000);if(!name||!content)return error('Invalid script data');const r=await env.DB.prepare('INSERT INTO custom_scripts(name,type,content,location,is_active) VALUES(?,?,?,?,?)').bind(name,type,content,location,i.is_active?1:0).run();return json({id:r.meta.last_row_id},201,securityHeaders());}
  const scriptMatch=pathname.match(/^\/api\/admin\/scripts\/(\d+)$/);if(scriptMatch){const id=Number(scriptMatch[1]);if(request.method==='PUT'){const i=await bodyJson(request);if(!i)return error('Invalid JSON');const e=await env.DB.prepare('SELECT * FROM custom_scripts WHERE id=?').bind(id).first<any>();if(!e)return error('Script not found',404);const type=i.type===undefined?e.type:(['javascript','css','html'].includes(i.type)?i.type:null),loc=i.location===undefined?e.location:(['head','body_start','body_end'].includes(i.location)?i.location:null);if(!type||!loc)return error('Invalid script data');await env.DB.prepare('UPDATE custom_scripts SET name=?,type=?,content=?,location=?,is_active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(text(i.name===undefined?e.name:i.name,160),type,text(i.content===undefined?e.content:i.content,50000),loc,i.is_active===undefined?e.is_active:(i.is_active?1:0),id).run();return json({ok:true},200,securityHeaders());}if(request.method==='DELETE'){await env.DB.prepare('DELETE FROM custom_scripts WHERE id=?').bind(id).run();return json({ok:true},200,securityHeaders());}}

  if(pathname==='/api/admin/users'&&request.method==='GET'){const r=await env.DB.prepare(`SELECT id,username,email,is_active,created_at FROM users ORDER BY created_at DESC`).all();return json({users:r.results||[]},200,securityHeaders());}
  if(pathname==='/api/admin/user-roles'&&request.method==='GET'){const r=await env.DB.prepare('SELECT user_id,role FROM user_roles').all();return json({roles:r.results||[]},200,securityHeaders());}
  if(pathname==='/api/admin/users'&&request.method==='POST'){const i=await bodyJson(request);if(!i)return error('Invalid JSON');const username=text(i.username,40),email=text(i.email,160).toLowerCase(),password=typeof i.password==='string'?i.password:'';if(!/^[a-zA-Z0-9_.-]{3,40}$/.test(username)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<8||password.length>200)return error('Invalid user data');const role=['user','moderator','admin'].includes(i.role)?i.role:'user';const h=await hashPassword(password);try{const r=await env.DB.prepare('INSERT INTO users(username,email,password_hash,password_salt) VALUES(?,?,?,?)').bind(username,email,h.hash,h.salt).run();const id=Number(r.meta.last_row_id);await env.DB.prepare('INSERT INTO user_roles(user_id,role) VALUES(?,?)').bind(id,role).run();return json({id},201,securityHeaders());}catch{return error('Username or email already exists',409);}}
  const userMatch=pathname.match(/^\/api\/admin\/users\/(\d+)$/);if(userMatch){const id=Number(userMatch[1]);if(request.method==='PUT'){const i=await bodyJson(request);if(!i)return error('Invalid JSON');if(id===auth.user_id&&i.is_active===0)return error('You cannot deactivate yourself');await env.DB.prepare('UPDATE users SET is_active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(i.is_active?1:0,id).run();return json({ok:true},200,securityHeaders());}if(request.method==='DELETE'){if(id===auth.user_id)return error('You cannot delete yourself');await env.DB.prepare('DELETE FROM users WHERE id=?').bind(id).run();return json({ok:true},200,securityHeaders());}}
  const roleMatch=pathname.match(/^\/api\/admin\/user-roles\/(\d+)$/);if(roleMatch&&request.method==='PUT'){const id=Number(roleMatch[1]);const i=await bodyJson(request);if(!i||!['user','moderator','admin'].includes(i.role))return error('Invalid role');if(id===auth.user_id&&i.role!=='admin')return error('You cannot remove your own admin role');await env.DB.prepare('INSERT INTO user_roles(user_id,role) VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET role=excluded.role').bind(id,i.role).run();return json({ok:true},200,securityHeaders());}

  if(pathname==='/api/admin/analytics/stats'&&request.method==='GET'){const [products,users,reviews,categories,coupons]=await Promise.all([env.DB.prepare('SELECT COUNT(*) AS count FROM products').first<any>(),env.DB.prepare('SELECT COUNT(*) AS count FROM users').first<any>(),env.DB.prepare("SELECT COUNT(*) AS count FROM reviews WHERE status='pending'").first<any>(),env.DB.prepare('SELECT COUNT(*) AS count FROM categories').first<any>(),env.DB.prepare('SELECT COUNT(*) AS count FROM coupons WHERE is_active=1').first<any>()]);return json({stats:{products:Number(products?.count||0),users:Number(users?.count||0),pendingReviews:Number(reviews?.count||0),categories:Number(categories?.count||0),activeCoupons:Number(coupons?.count||0)}},200,securityHeaders());}
  if(pathname==='/api/admin/analytics'&&request.method==='GET'){const r=await env.DB.prepare(`SELECT substr(created_at,1,10) AS date,COUNT(*) AS events FROM analytics_events GROUP BY substr(created_at,1,10) ORDER BY date DESC LIMIT 30`).all();return json({analytics:r.results||[]},200,securityHeaders());}

  return error('Not found',404);
}

export default {
  async fetch(request: Request, env: Bindings): Promise<Response> {
    const url = new URL(request.url);
    try {
      let response: Response;
      if (url.pathname.startsWith('/api/auth/')) response = await handleAuth(request, env, url.pathname);
      else if (url.pathname.startsWith('/api/admin/')) response = await handleAdmin(request, env, url.pathname);
      else if (url.pathname.startsWith('/api/')) response = await handlePublic(request, env, url.pathname);
      else {
        let asset = await env.ASSETS.fetch(request);
        if (asset.status === 404 && request.method === 'GET') {
          asset = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
        }
        response = new Response(asset.body, asset);
        response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://imagedelivery.net; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests");
      }
      for (const [key, value] of Object.entries(securityHeaders())) response.headers.set(key, value);
      return response;
    } catch (err) {
      console.error('Unhandled request error', err);
      return error('Internal server error', 500);
    }
  },
} satisfies ExportedHandler<Bindings>;
