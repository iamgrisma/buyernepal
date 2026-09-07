var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = (arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
};

// node_modules/hono/dist/utils/body.js
var MAX_NESTING_DEPTH = 32;
var MAX_NESTED_OBJECTS = 1e4;
var isRawRequest = (request) => "headers" in request;
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData) {
    return convertFormDataToBodyData(
      await request.bodyCache.formData,
      options
    );
  }
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form2 = /* @__PURE__ */ Object.create(null);
  const nestingState = { count: 0 };
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form2[key] = value;
    } else {
      handleParsingAllValues(form2, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form2).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form2, key, value, nestingState);
        delete form2[key];
      }
    });
  }
  return form2;
}
var handleParsingAllValues = (form2, key, value) => {
  if (form2[key] !== void 0) {
    if (Array.isArray(form2[key])) {
      ;
      form2[key].push(value);
    } else {
      form2[key] = [form2[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form2[key] = value;
    } else {
      form2[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form2, key, value, state) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form2;
  const keys = key.split(".", MAX_NESTING_DEPTH + 2);
  if (keys.length > MAX_NESTING_DEPTH + 1) {
    throwNestingLimitExceeded();
  }
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        if (state.count++ >= MAX_NESTED_OBJECTS) {
          throwNestingLimitExceeded();
        }
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};
var throwNestingLimitExceeded = () => {
  throw new Error("Nesting limit exceeded");
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var tryDecodeURIComponent = (str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str;
var _decodeURI = (value) => {
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return tryDecodeURIComponent(value);
};
var _getQueryParam = (url, key, multiple) => {
  const hashIndex = url.indexOf("#", 8);
  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var HonoRequest = class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = tryDecodeURIComponent(value);
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    for (const anyCachedKey in bodyCache) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    ;
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var escapeRe = /[&<>'"]/;
var stringBufferToString = async (buffer, callbacks) => {
  let str = "";
  callbacks ||= [];
  const resolvedBuffer = await Promise.all(buffer);
  for (let i = resolvedBuffer.length - 1; ; i--) {
    str += resolvedBuffer[i];
    i--;
    if (i < 0) {
      break;
    }
    let r = resolvedBuffer[i];
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    const isEscaped = r.isEscaped;
    r = await (typeof r === "object" ? r.toString() : r);
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    if (r.isEscaped ?? isEscaped) {
      str += r;
    } else {
      const buf = [str];
      escapeToBuffer(r, buf);
      str = buf[0];
    }
  }
  return raw(str, callbacks);
};
var escapeToBuffer = (str, buffer) => {
  const match2 = str.search(escapeRe);
  if (match2 === -1) {
    buffer[0] += str;
    return;
  }
  let escape;
  let index;
  let lastIndex = 0;
  for (index = match2; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape = "&quot;";
        break;
      case 39:
        escape = "&#39;";
        break;
      case 38:
        escape = "&amp;";
        break;
      case 60:
        escape = "&lt;";
        break;
      case 62:
        escape = "&gt;";
        break;
      default:
        continue;
    }
    buffer[0] += str.substring(lastIndex, index) + escape;
    lastIndex = index + 1;
  }
  buffer[0] += str.substring(lastIndex, index);
};
var resolveCallbackSync = (str) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return str;
  }
  const buffer = [str];
  const context = {};
  callbacks.forEach((c) => c({ phase: HtmlEscapedCallbackPhase.Stringify, buffer, context }));
  return buffer[0];
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   // Append multiple headers using the append option (e.g. Vary)
   *   c.header('Vary', 'Accept-Encoding', { append: true })
   *   c.header('Vary', 'User-Agent', { append: true })
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers();
      for (const [key, value] of new Headers(arg.headers)) {
        if (key === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      if (!responseHeaders) {
        let count = 0;
        for (const k in headers) {
          if (++count > 1 || typeof headers[k] !== "string") {
            responseHeaders = new Headers();
            break;
          }
        }
      }
      if (responseHeaders) {
        for (const k in headers) {
          const v = headers[k];
          if (typeof v === "string") {
            responseHeaders.set(k, v);
          } else {
            responseHeaders.delete(k);
            for (const v2 of v) {
              responseHeaders.append(k, v2);
            }
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html2, arg, headers) => {
    const res = (html22) => this.#newResponse(html22, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html2 === "object" ? resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html2);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        const methodName = method.toUpperCase();
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(methodName, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(methodName, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          const methodName = m.toUpperCase();
          for (const handler of handlers) {
            this.#addRoute(methodName, this.#path, handler);
          }
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} env - env Object
   * @param {ExecutionContext} executionCtx - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input2, requestInit, Env, executionCtx) => {
    if (input2 instanceof Request) {
      return this.fetch(requestInit ? new Request(input2, requestInit) : input2, Env, executionCtx);
    }
    input2 = input2.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input2) ? input2 : `http://localhost${mergePath("/", input2)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/utils.js
var createNullObject = () => /* @__PURE__ */ Object.create(null);

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = ((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  });
  this.match = match2;
  return match2(method, path);
}

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  // handler index of a dynamic path, or -1 for a static path terminal
  #index;
  #varIndex;
  #children = createNullObject();
  insert(tokens, index, paramMap, context, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
        if (name && pattern[2]) {
          if (regexpStr === ".*") {
            throw PATH_ERROR;
          }
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr)) {
            throw PATH_ERROR;
          }
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
            throw PATH_ERROR;
          }
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
            for (const k in node.#children) {
              if (
                // a single-char pattern coexists with single-char literals as a literal does
                (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
              ) {
                throw PATH_ERROR;
              }
            }
          }
          nextNode = node.#children[regexpStr] = new _Node();
        }
        if (name !== "") {
          nextNode.#varIndex ??= context.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k in node.#children) {
            if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
              throw PATH_ERROR;
            }
          }
          nextNode = node.#children[token] = new _Node();
        }
      }
      node = nextNode;
    }
    if (node.#index !== void 0) {
      throw PATH_ERROR;
    }
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1) {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  #index = 0;
  // dynamic path -> [handler index, param assoc]; static paths are not registered
  paths = createNullObject();
  insert(path, isStatic) {
    if (isStatic) {
      this.#root.insert(path.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path;
    for (let i = 0; ; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = createNullObject();
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    `^${path.replace(
      /\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,
      (match2, metaChar) => metaChar ? `\\${metaChar}` : match2 === "/*" ? TAIL_WILDCARD_REG_EXP_STR : match2 === "*" ? ONLY_WILDCARD_REG_EXP_STR : `/:${LABEL_REG_EXP_STR}`
    )}$`
  );
}
function findMiddleware(middleware, path) {
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: createNullObject() };
    this.#routes = { [METHOD_NAME_ALL]: createNullObject() };
    this.#tries = { [METHOD_NAME_ALL]: new Trie() };
  }
  #insertPath(method, path) {
    try {
      this.#tries[method].insert(path, !/\*|\/:/.test(path));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      this.#tries[method] = new Trie();
      for (const handlerMap of [middleware, routes]) {
        handlerMap[method] = createNullObject();
        for (const p in handlerMap[METHOD_NAME_ALL]) {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
          this.#insertPath(method, p);
        }
      }
    }
    if (path === "/*") {
      path = "*";
    }
    const methods = method === METHOD_NAME_ALL ? Object.keys(middleware) : [method];
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      for (const m of methods) {
        if (!middleware[m][path]) {
          this.#insertPath(m, path);
          middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        }
      }
      for (const handlerMap of [middleware, routes]) {
        for (const m of methods) {
          for (const p in handlerMap[m]) {
            re.test(p) && handlerMap[m][p].push([handler, path]);
          }
        }
      }
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (const path2 of paths) {
      for (const m of methods) {
        if (!routes[m][path2]) {
          this.#insertPath(m, path2);
          routes[m][path2] = findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
        }
        routes[m][path2].push([handler, path2]);
      }
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = createNullObject();
    for (const method of Object.keys(this.#routes)) {
      matchers[method] = this.#buildMatcher(method);
    }
    this.#middleware = this.#routes = this.#tries = void 0;
    wildcardRegExpCache = createNullObject();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = createNullObject();
    const handlerData = [];
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (const r of [middleware, routes]) {
      for (const path in r) {
        const handlers = r[path];
        const pathData = trie.paths[path];
        if (!pathData) {
          staticMap[path] = [handlers.map(([h]) => [h, createNullObject()]), emptyParam];
          continue;
        }
        handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [
          h,
          trie.paths[handlerPath][1].reduceRight((map, [key], i) => {
            map[key] = paramReplacementMap[pathData[1][i][1]];
            return map;
          }, createNullObject())
        ]);
      }
    }
    return [regexp, indexReplacementMap.map((i) => handlerData[i]), staticMap];
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = createNullObject();
var order = 0;
var Node2 = class _Node2 {
  #methods = [];
  #children = createNullObject();
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path, handler) {
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = /* @__PURE__ */ new Set();
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new _Node2();
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam) {
        possibleKeys.add(pattern[1]);
      }
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: [...possibleKeys],
        score: ++order
      }
    });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      if (handlerSet) {
        handlerSet.params = createNullObject();
        handlerSets.push(handlerSet);
        for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
          const key = handlerSet.possibleKeys[i2];
          handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true) {
            continue;
          }
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1]) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node = new Node2();
  add(method, path, handler) {
    for (const result of checkOptionalParameter(path) || [path]) {
      this.#node.insert(method, result, handler);
    }
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : void 0;
  const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : void 0;
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
    } else if (Array.isArray(optsAllowMethods)) {
      const methodsStr = optsAllowMethods.join(",");
      return () => methodsStr;
    } else {
      return () => "";
    }
  })(opts.allowMethods);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (exposeHeadersStr) {
      set("Access-Control-Expose-Headers", exposeHeadersStr);
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        c.res.headers.append("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods) {
        set("Access-Control-Allow-Methods", allowMethods);
      }
      let headersStr = allowHeadersStr;
      if (!headersStr) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
        }
      }
      if (headersStr) {
        set("Access-Control-Allow-Headers", headersStr);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  };
};

// src/db.ts
var DEFAULT_CATEGORIES = [
  { id: 1, name: "Electronics & Gadgets", slug: "electronics", description: "Curated smartphones, laptops, audio and accessories in Nepal." },
  { id: 2, name: "Home & Kitchen", slug: "home-kitchen", description: "Useful appliances and essentials for Nepali homes." },
  { id: 3, name: "Fashion & Style", slug: "fashion", description: "Trendy and comfortable apparel, shoes and bags." },
  { id: 4, name: "Health & Beauty", slug: "beauty", description: "Skincare, grooming and wellness products verified for Nepal." }
];
var DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Anker Soundcore Space One ANC Headphones",
    description: "Noise-cancelling wireless headphones with 2x stronger voice reduction, 40 hours of playtime and Hi-Res wireless audio.",
    price: 13999,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    affiliate_url: "https://www.daraz.com.np",
    category_id: 1,
    category_name: "Electronics & Gadgets",
    is_active: 1
  },
  {
    id: 2,
    name: "Xiaomi Smart Air Fryer Pro 4L",
    description: "Transparent window design, 360-degree heated air circulation, 40-200\xB0C adjustable temperature range with OLED touch display.",
    price: 11499,
    image_url: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=600&auto=format&fit=crop&q=80",
    affiliate_url: "https://www.daraz.com.np",
    category_id: 2,
    category_name: "Home & Kitchen",
    is_active: 1
  },
  {
    id: 3,
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    description: "Quiet clicks, 8K DPI any-surface tracking, MagSpeed electromagnetic scrolling and USB-C quick charging.",
    price: 16500,
    image_url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    affiliate_url: "https://www.daraz.com.np",
    category_id: 1,
    category_name: "Electronics & Gadgets",
    is_active: 1
  },
  {
    id: 4,
    name: "Minimalist Anti-Theft Water-Resistant Backpack",
    description: "Ergonomic business laptop backpack with USB charging port, hidden security pockets and durable Oxford fabric.",
    price: 3850,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    affiliate_url: "https://www.daraz.com.np",
    category_id: 3,
    category_name: "Fashion & Style",
    is_active: 1
  }
];
async function getSettings(db) {
  const defaults = {
    site_title: "BuyerNepal",
    site_description: "Discover products worth buying in Nepal \u2014 curated, compared and easy to shop."
  };
  if (!db) return defaults;
  try {
    const r = await db.prepare("SELECT key, value FROM settings").all();
    const settings = { ...defaults };
    for (const row of r.results || []) {
      settings[row.key] = row.value;
    }
    return settings;
  } catch {
    return defaults;
  }
}
async function getCategories(db) {
  if (!db) return DEFAULT_CATEGORIES;
  try {
    const r = await db.prepare("SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE is_active = 1 ORDER BY name COLLATE NOCASE").all();
    const list = r.results || [];
    return list.length > 0 ? list : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}
async function getCategoryBySlug(db, slug) {
  if (!db) {
    return DEFAULT_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
  try {
    const c = await db.prepare("SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE slug = ? COLLATE NOCASE AND is_active = 1 LIMIT 1").bind(slug).first();
    if (c) return c;
    return DEFAULT_CATEGORIES.find((cat) => cat.slug.toLowerCase() === slug.toLowerCase()) || null;
  } catch {
    return DEFAULT_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
}
async function getProducts(db, categoryId) {
  if (!db) {
    if (categoryId) return DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId);
    return DEFAULT_PRODUCTS;
  }
  try {
    let query = "SELECT p.id, p.name, p.description, p.price, p.image_url, p.affiliate_url, p.category_id, p.is_active, p.created_at, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.is_active = 1";
    let r;
    if (categoryId) {
      query += " AND p.category_id = ? ORDER BY p.created_at DESC LIMIT 100";
      r = await db.prepare(query).bind(categoryId).all();
    } else {
      query += " ORDER BY p.created_at DESC LIMIT 100";
      r = await db.prepare(query).all();
    }
    const list = r.results || [];
    if (list.length > 0) return list;
    return categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
  } catch {
    return categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
  }
}
async function getProductById(db, id) {
  if (!db) {
    return DEFAULT_PRODUCTS.find((p) => p.id === id) || null;
  }
  try {
    const p = await db.prepare("SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.id = ? AND p.is_active = 1 LIMIT 1").bind(id).first();
    if (p) return p;
    return DEFAULT_PRODUCTS.find((prod) => prod.id === id) || null;
  } catch {
    return DEFAULT_PRODUCTS.find((prod) => prod.id === id) || null;
  }
}
async function getReviews(db, productId) {
  if (!db) return [];
  try {
    const r = await db.prepare("SELECT id, product_id, user_name, rating, comment, status, created_at FROM reviews WHERE product_id = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 50").bind(productId).all();
    return r.results || [];
  } catch {
    return [];
  }
}
async function getAdminStats(db) {
  const fallback = {
    products: DEFAULT_PRODUCTS.length,
    categories: DEFAULT_CATEGORIES.length,
    pendingReviews: 0,
    activeCoupons: 0,
    users: 1
  };
  if (!db) return fallback;
  try {
    const [p, u, r, c, co] = await Promise.all([
      db.prepare("SELECT COUNT(*) count FROM products").first(),
      db.prepare("SELECT COUNT(*) count FROM users").first(),
      db.prepare("SELECT COUNT(*) count FROM reviews WHERE status = 'pending'").first(),
      db.prepare("SELECT COUNT(*) count FROM categories").first(),
      db.prepare("SELECT COUNT(*) count FROM coupons WHERE is_active = 1").first()
    ]);
    return {
      products: Number(p?.count || fallback.products),
      users: Number(u?.count || fallback.users),
      pendingReviews: Number(r?.count || 0),
      categories: Number(c?.count || fallback.categories),
      activeCoupons: Number(co?.count || 0)
    };
  } catch {
    return fallback;
  }
}

// node_modules/hono/dist/utils/cookie.js
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var relaxedCookieNameRegEx = /^[!#-:<>-[\]-~]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var trimCookieWhitespace = (value) => {
  let start = 0;
  let end = value.length;
  while (start < end) {
    const charCode = value.charCodeAt(start);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    start++;
  }
  while (end > start) {
    const charCode = value.charCodeAt(end - 1);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    end--;
  }
  return start === 0 && end === value.length ? value : value.slice(start, end);
};
var parse = (cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.split(";");
  const parsedCookie = /* @__PURE__ */ Object.create(null);
  for (const pairStr of pairs) {
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = trimCookieWhitespace(pairStr.substring(0, valueStartPos));
    if (name && name !== cookieName || !relaxedCookieNameRegEx.test(cookieName) || cookieName in parsedCookie) {
      continue;
    }
    let cookieValue = trimCookieWhitespace(pairStr.substring(valueStartPos + 1));
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = tryDecodeURIComponent(cookieValue);
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
};
var _serialize = (name, value, opt = {}) => {
  if (!validCookieNameRegEx.test(name)) {
    throw new Error("Invalid cookie name");
  }
  let cookie = `${name}=${value}`;
  if (name.startsWith("__Secure-") && !opt.secure) {
    throw new Error("__Secure- Cookie must have Secure attributes");
  }
  if (name.startsWith("__Host-")) {
    if (!opt.secure) {
      throw new Error("__Host- Cookie must have Secure attributes");
    }
    if (opt.path !== "/") {
      throw new Error('__Host- Cookie must have Path attributes with "/"');
    }
    if (opt.domain) {
      throw new Error("__Host- Cookie must not have Domain attributes");
    }
  }
  for (const key of ["domain", "path", "sameSite", "priority"]) {
    if (opt[key] && /[;\r\n]/.test(opt[key])) {
      throw new Error(`${key} must not contain ";", "\\r", or "\\n"`);
    }
  }
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    if (opt.maxAge > 3456e4) {
      throw new Error(
        "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
      );
    }
    cookie += `; Max-Age=${opt.maxAge | 0}`;
  }
  if (opt.domain && opt.prefix !== "host") {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (opt.expires.getTime() - Date.now() > 3456e7) {
      throw new Error(
        "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
      );
    }
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
  }
  if (opt.priority) {
    cookie += `; Priority=${opt.priority.charAt(0).toUpperCase() + opt.priority.slice(1)}`;
  }
  if (opt.partitioned) {
    if (!opt.secure) {
      throw new Error("Partitioned Cookie must have Secure attributes");
    }
    cookie += "; Partitioned";
  }
  return cookie;
};
var serialize = (name, value, opt) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
};

// node_modules/hono/dist/helper/cookie/index.js
var getCookie = (c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
};
var generateCookie = (name, value, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
  } else if (opt?.prefix === "host") {
    cookie = serialize("__Host-" + name, value, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = serialize(name, value, { path: "/", ...opt });
  }
  return cookie;
};
var setCookie = (c, name, value, opt) => {
  const cookie = generateCookie(name, value, opt);
  c.header("Set-Cookie", cookie, { append: true });
};
var deleteCookie = (c, name, opt) => {
  const deletedCookie = getCookie(c, name, opt?.prefix);
  setCookie(c, name, "", { ...opt, maxAge: 0 });
  return deletedCookie;
};

// src/auth.ts
var PBKDF2_ITERATIONS = 12e4;
var SESSION_DAYS = 7;
async function digest(v) {
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v)))].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function hexBytes(v) {
  const a = new Uint8Array(v.length / 2);
  for (let i = 0; i < a.length; i++) a[i] = parseInt(v.slice(i * 2, i * 2 + 2), 16);
  return a;
}
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
async function passwordHash(password, saltHex) {
  const salt = saltHex ? hexBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits"
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    256
  );
  return {
    salt: [...salt].map((x) => x.toString(16).padStart(2, "0")).join(""),
    hash: [...new Uint8Array(bits)].map((x) => x.toString(16).padStart(2, "0")).join("")
  };
}
async function getSession(c) {
  const token = getCookie(c, "bn_session");
  if (!token || token.length < 32) return null;
  const db = c.env?.DB;
  if (!db) return null;
  try {
    const tokenHash = await digest(token);
    const s = await db.prepare(
      `SELECT s.user_id, s.expires_at, u.username, u.email, u.is_active, COALESCE(r.role, 'user') role
         FROM sessions s
         JOIN users u ON u.id = s.user_id
         LEFT JOIN user_roles r ON r.user_id = u.id
         WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP AND u.is_active = 1
         LIMIT 1`
    ).bind(tokenHash).first();
    return s || null;
  } catch {
    return null;
  }
}
async function createSession(c, userId) {
  const token = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
  const db = c.env?.DB;
  if (db) {
    try {
      await db.prepare("DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP").run();
      await db.prepare(
        `INSERT INTO sessions(user_id, token_hash, csrf_token, expires_at)
           VALUES(?, ?, ?, datetime('now', '+${SESSION_DAYS} days'))`
      ).bind(userId, await digest(token), crypto.randomUUID().replaceAll("-", "")).run();
    } catch (e) {
      console.error("Session creation error:", e);
    }
  }
  setCookie(c, "bn_session", token, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "Lax",
    maxAge: SESSION_DAYS * 86400
  });
  return token;
}
function clearSession(c) {
  deleteCookie(c, "bn_session", { path: "/" });
}

// src/views/styles.ts
var storefrontCss = `
:root {
  --ink: #111827;
  --muted: #667085;
  --line: #e7e9ee;
  --accent: #e11d48;
  --accent-hover: #be123c;
  --bg: #fafafa;
  --card-bg: #ffffff;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
.store-shell { width: min(1180px, calc(100% - 40px)); margin: auto; }

/* Topbar */
.store-topbar { background: #111827; color: #d1d5db; font-size: 12px; }
.store-topbar-inner { min-height: 34px; display: flex; justify-content: space-between; align-items: center; }
.store-topbar-note { color: #9ca3af; }

/* Header */
.store-header { position: sticky; top: 0; z-index: 40; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(14px); border-bottom: 1px solid #e5e7eb; }
.store-header-inner { min-height: 76px; display: flex; align-items: center; gap: 34px; }
.store-brand { display: flex; align-items: center; gap: 10px; min-width: max-content; color: #111827; }
.store-brand > span:last-child { display: flex; flex-direction: column; line-height: 1; }
.store-brand strong { font-size: 19px; letter-spacing: -0.5px; }
.store-brand small { font-size: 8px; letter-spacing: 1.6px; color: #98a2b3; margin-top: 5px; font-weight: 700; }
.store-logo, .store-logo-mark { width: 38px; height: 38px; border-radius: 11px; object-fit: cover; }
.store-logo-mark { display: grid; place-items: center; background: #111827; color: #fff; font-weight: 800; font-size: 18px; }
.store-nav { display: flex; align-items: center; gap: 24px; flex: 1; }
.store-nav a, .store-admin-link { font-size: 13px; color: #667085; font-weight: 500; }
.store-nav a:hover, .store-nav .store-nav-active, .store-admin-link:hover { color: #111827; }
.store-admin-link { padding: 8px 14px; border: 1px solid var(--line); border-radius: 9px; }
.store-menu { display: none; border: 0; padding: 7px; background: transparent; cursor: pointer; }
.store-menu span { display: block; width: 22px; height: 2px; background: #111827; margin: 4px 0; border-radius: 2px; }
.store-mobile-nav { display: none; flex-direction: column; padding: 12px 0; border-top: 1px solid var(--line); }
.store-mobile-nav a { padding: 10px 0; font-size: 14px; color: #4b5563; font-weight: 500; }
.store-mobile-nav.open { display: flex; }

/* Hero */
.store-hero { background: #f1f2f4; border-bottom: 1px solid #e5e7eb; }
.hero-grid { min-height: 480px; display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: center; gap: 40px; }
.hero-copy { padding: 60px 0; }
.eyebrow, .section-kicker { display: inline-block; font-size: 10px; line-height: 1; font-weight: 800; letter-spacing: 1.8px; color: #8b95a5; text-transform: uppercase; }
.hero-copy h1 { font-size: clamp(38px, 5.5vw, 64px); line-height: 1.02; letter-spacing: -3px; margin: 16px 0; font-weight: 800; }
.hero-copy h1 em { font-style: normal; color: var(--accent); }
.hero-copy p { max-width: 560px; color: #667085; font-size: 16px; line-height: 1.65; margin-bottom: 26px; }
.hero-search { height: 56px; max-width: 580px; background: #fff; border: 1px solid #dfe3e8; border-radius: 13px; box-shadow: 0 12px 30px rgba(16,24,40,.07); display: flex; align-items: center; padding: 0 16px; gap: 12px; }
.hero-search > span { font-size: 22px; color: #98a2b3; }
.hero-search input { border: 0; outline: 0; flex: 1; background: transparent; font-size: 15px; color: #111827; width: 100%; }
.hero-search button { border: 0; background: transparent; font-size: 20px; color: #98a2b3; cursor: pointer; display: none; }
.hero-points { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 18px; color: #667085; font-size: 12px; font-weight: 500; }
.hero-card { height: 380px; max-width: 440px; width: 100%; margin-left: auto; background: #111827; border-radius: 24px; padding: 32px; position: relative; overflow: hidden; color: #fff; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 24px 50px rgba(17,24,39,.18); }
.hero-card-glow { position: absolute; width: 280px; height: 280px; border-radius: 50%; right: -80px; top: -90px; background: #e11d48; opacity: 0.8; filter: blur(30px); }
.hero-card-label { position: relative; font-size: 11px; letter-spacing: 2px; color: #d1d5db; font-weight: 700; }
.hero-card-title { position: relative; font-size: 38px; line-height: 1.05; letter-spacing: -2px; }
.hero-card-title strong { color: #fb7185; }
.hero-mini-grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #374151; border-radius: 12px; overflow: hidden; }
.hero-mini-grid span { background: #1f2937; padding: 14px; font-size: 11px; color: #9ca3af; }
.hero-mini-grid b { color: #fff; font-size: 13px; display: block; margin-top: 2px; }

/* Trust Strip */
.trust-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-top: 0; }
.trust-strip > div { background: #fff; padding: 22px 25px; display: flex; flex-direction: column; gap: 4px; }
.trust-strip strong { font-size: 14px; color: #111827; }
.trust-strip span { font-size: 12px; color: #7b8493; }

/* Categories */
.category-section, .products-section { padding-top: 60px; }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
.section-heading h2 { font-size: 28px; letter-spacing: -1px; margin-top: 6px; font-weight: 800; }
.section-count { font-size: 12px; color: #98a2b3; font-weight: 600; }
.category-row { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
.category-row::-webkit-scrollbar { display: none; }
.category-chip { white-space: nowrap; border: 1px solid var(--line); background: #fff; border-radius: 999px; padding: 10px 18px; font-size: 13px; font-weight: 500; color: #4b5563; cursor: pointer; transition: all .15s; }
.category-chip:hover { border-color: #9ca3af; color: #111827; }
.category-chip.active { background: #111827; border-color: #111827; color: #fff; }

/* Products Grid */
.products-section { padding-bottom: 80px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.product-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; transition: transform .2s, box-shadow .2s; min-width: 0; display: flex; flex-direction: column; }
.product-card:hover { transform: translateY(-3px); box-shadow: 0 16px 35px rgba(16,24,40,.08); }
.product-image-link { height: 220px; background: #f1f3f5; display: block; position: relative; overflow: hidden; }
.product-image-link > img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s; }
.product-card:hover .product-image-link > img { transform: scale(1.04); }
.product-image-placeholder { width: 100%; height: 100%; display: grid; place-items: center; background: linear-gradient(135deg, #e9ecf1, #f8f9fb); color: #b4bbc6; font-size: 28px; font-weight: 900; }
.product-badge { position: absolute; top: 12px; left: 12px; background: rgba(255, 255, 255, 0.95); color: #344054; padding: 5px 9px; border-radius: 6px; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; box-shadow: 0 2px 4px rgba(0,0,0,.06); }
.product-card-body { padding: 18px; display: flex; flex-direction: column; flex: 1; }
.product-name { font-size: 15px; font-weight: 700; line-height: 1.35; display: block; min-height: 40px; color: #111827; }
.product-name:hover { color: var(--accent); }
.product-description { font-size: 12px; line-height: 1.55; color: #7b8493; margin: 8px 0 16px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; min-height: 36px; }
.product-card-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; margin-top: auto; }
.price-label { display: block; color: #98a2b3; font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 2px; font-weight: 600; }
.product-price { font-size: 17px; font-weight: 800; color: #111827; }
.product-buy { display: inline-flex; align-items: center; gap: 5px; background: #111827; color: #fff; border-radius: 8px; padding: 9px 13px; font-size: 11px; font-weight: 700; white-space: nowrap; transition: background .15s; }
.product-buy:hover { background: var(--accent); }
.product-buy-secondary { background: #f2f4f7; color: #344054; }

/* Product Detail */
.product-detail { padding-top: 36px; padding-bottom: 90px; }
.breadcrumbs { display: flex; gap: 8px; align-items: center; font-size: 12px; color: #98a2b3; margin-bottom: 28px; }
.breadcrumbs a:hover { color: #111827; }
.product-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.product-detail-media { background: #f1f3f5; border-radius: 20px; overflow: hidden; aspect-ratio: 1/1; display: grid; place-items: center; border: 1px solid var(--line); }
.product-detail-media img { width: 100%; height: 100%; object-fit: cover; }
.product-detail-placeholder { font-size: 72px; font-weight: 900; color: #b8bec8; }
.product-detail-copy { padding: 10px 0; }
.product-detail-copy h1 { font-size: clamp(30px, 4vw, 46px); line-height: 1.08; letter-spacing: -2px; margin: 12px 0 16px; font-weight: 800; }
.detail-price { display: block; font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 20px; }
.detail-description { color: #4b5563; font-size: 15px; line-height: 1.8; margin-bottom: 28px; }
.detail-buy { display: inline-flex; background: #111827; color: #fff; padding: 14px 22px; border-radius: 10px; font-size: 13px; font-weight: 700; gap: 10px; align-items: center; transition: background .15s; }
.detail-buy:hover { background: var(--accent); }
.reviews-section { margin-top: 70px; border-top: 1px solid var(--line); padding-top: 50px; }
.review-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 20px; }
.review-card { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 20px; }
.review-top { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.review-card p { font-size: 13px; color: #667085; line-height: 1.6; }

/* Editorial Banner */
.editorial-banner { margin-bottom: 80px; background: #111827; color: #fff; border-radius: 22px; padding: 48px 52px; display: grid; grid-template-columns: 1fr 240px; gap: 40px; align-items: center; }
.editorial-banner .section-kicker { color: #9ca3af; }
.editorial-banner h2 { font-size: 40px; line-height: 1.05; letter-spacing: -2px; margin: 9px 0 13px; font-weight: 800; }
.editorial-banner p { max-width: 580px; color: #aeb6c2; font-size: 14px; line-height: 1.7; }
.editorial-stat { border-left: 1px solid #374151; padding-left: 28px; }
.editorial-stat strong { display: block; font-size: 44px; font-weight: 800; }
.editorial-stat span { font-size: 12px; color: #9ca3af; }

/* Empty / Error */
.store-empty { text-align: center; padding: 70px 20px; background: #fff; border: 1px dashed #d8dce3; border-radius: 16px; margin: 20px 0; }
.empty-icon { width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; background: #f2f4f7; color: #667085; font-weight: 800; font-size: 20px; margin: 0 auto 16px; }
.store-empty h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
.store-empty p { font-size: 13px; color: #7b8493; max-width: 440px; margin: 0 auto 20px; line-height: 1.6; }
.primary-action { display: inline-flex; border: 0; border-radius: 9px; padding: 11px 18px; background: #111827; color: #fff; font-size: 12px; font-weight: 700; cursor: pointer; }

/* Footer */
.store-footer { background: #fff; border-top: 1px solid var(--line); }
.footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr; gap: 70px; padding: 55px 0; }
.footer-grid > div { display: flex; flex-direction: column; gap: 10px; }
.footer-grid p { max-width: 380px; color: #7b8493; font-size: 13px; line-height: 1.7; }
.footer-grid h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #98a2b3; font-weight: 700; margin-bottom: 4px; }
.footer-grid a { font-size: 13px; color: #667085; }
.footer-grid a:hover { color: #111827; }
.footer-note { font-size: 12px; color: #98a2b3; line-height: 1.6; }
.footer-bottom { border-top: 1px solid var(--line); min-height: 55px; display: flex; align-items: center; justify-content: space-between; color: #98a2b3; font-size: 11px; }

/* Admin */
.admin-login-box { max-width: 400px; margin: 80px auto; background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,.04); }
.admin-login-box h1 { font-size: 24px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
.admin-login-box p { font-size: 13px; color: #667085; margin-bottom: 24px; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 6px; }
.form-group input, .form-group select, .form-group textarea { width: 100%; border: 1px solid #d1d5db; border-radius: 8px; padding: 10px 14px; font-size: 14px; outline: none; transition: border-color .15s; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #111827; }
.form-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }

/* Responsive */
@media (max-width: 980px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .hero-grid { gap: 30px; }
}
@media (max-width: 768px) {
  .store-shell { width: min(100% - 28px, 640px); }
  .store-topbar-note, .store-nav, .store-admin-link { display: none; }
  .store-menu { display: block; }
  .hero-grid { grid-template-columns: 1fr; gap: 0; min-height: 0; }
  .hero-copy { padding: 40px 0 20px; }
  .hero-card { display: none; }
  .trust-strip { grid-template-columns: 1fr; }
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .editorial-banner { grid-template-columns: 1fr; padding: 36px 28px; }
  .editorial-stat { border-left: 0; border-top: 1px solid #374151; padding-left: 0; padding-top: 20px; }
  .product-detail-grid { grid-template-columns: 1fr; gap: 30px; }
  .footer-grid { grid-template-columns: 1fr; gap: 35px; }
}
@media (max-width: 480px) {
  .product-grid { grid-template-columns: 1fr; }
}
`;

// node_modules/hono/dist/jsx/constants.js
var DOM_RENDERER = /* @__PURE__ */ Symbol("RENDERER");
var DOM_ERROR_HANDLER = /* @__PURE__ */ Symbol("ERROR_HANDLER");
var DOM_INTERNAL_TAG = /* @__PURE__ */ Symbol("INTERNAL");
var PERMALINK = /* @__PURE__ */ Symbol("PERMALINK");

// node_modules/hono/dist/jsx/dom/utils.js
var setInternalTagFlag = (fn) => {
  ;
  fn[DOM_INTERNAL_TAG] = true;
  return fn;
};

// node_modules/hono/dist/jsx/dom/context.js
var createContextProviderFunction = (values) => ({ value, children }) => {
  if (!children) {
    return void 0;
  }
  const props = {
    children: [
      {
        tag: setInternalTagFlag(() => {
          values.push(value);
        }),
        props: {}
      }
    ]
  };
  if (Array.isArray(children)) {
    props.children.push(...children.flat());
  } else {
    props.children.push(children);
  }
  props.children.push({
    tag: setInternalTagFlag(() => {
      values.pop();
    }),
    props: {}
  });
  const res = { tag: "", props, type: "" };
  res[DOM_ERROR_HANDLER] = (err) => {
    values.pop();
    throw err;
  };
  return res;
};

// node_modules/hono/dist/jsx/context.js
var globalContexts = [];
var alsProbed = false;
var asyncLocalStorage;
var fallbackStore;
var fallbackRendersInFlight = 0;
var warnedFallbackDefault = false;
var loadAsyncLocalStorage = () => {
  if (alsProbed) {
    return asyncLocalStorage;
  }
  alsProbed = true;
  const global = globalThis;
  let AsyncLocalStorage;
  for (const probe of [
    // Node.js >= 20.16, Deno, Bun, Cloudflare Workers (nodejs_compat). Property
    // access only, so bundlers don't statically resolve `node:async_hooks`.
    () => global.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage,
    // Node.js < 20.16 has no `process.getBuiltinModule`, but a CJS entrypoint
    // exposes the main module's `require` here.
    () => global.process?.mainModule?.require?.("node:async_hooks")?.AsyncLocalStorage
  ]) {
    try {
      AsyncLocalStorage = probe();
    } catch {
    }
    if (AsyncLocalStorage) {
      break;
    }
  }
  if (AsyncLocalStorage) {
    asyncLocalStorage = new AsyncLocalStorage();
  }
  return asyncLocalStorage;
};
var getCurrentStore = () => {
  return loadAsyncLocalStorage()?.getStore() || fallbackStore;
};
var warnIfStorelessAccess = () => {
  if (fallbackRendersInFlight > 0 && !warnedFallbackDefault) {
    warnedFallbackDefault = true;
    console.warn(
      "hono/jsx: AsyncLocalStorage is unavailable in this runtime, so useContext() after an await in an async component falls back to the context default value during server-side rendering. To get provided values across await boundaries, use a runtime with AsyncLocalStorage (Node.js >= 20.16, Deno, Bun, or Cloudflare Workers with the nodejs_compat flag)."
    );
  }
};
var getContextValuesIn = (store, context) => {
  if (!store) {
    warnIfStorelessAccess();
    return context.values;
  }
  let values = store.get(context);
  if (!values) {
    values = [context.values[0]];
    store.set(context, values);
  }
  return values;
};
var readContextValueIn = (store, context) => {
  if (!store) {
    warnIfStorelessAccess();
    return context.values.at(-1);
  }
  const values = store.get(context);
  return values?.length ? values.at(-1) : context.values[0];
};
var captureContextValues = (store) => (store ? globalContexts.filter((c) => store.has(c)) : globalContexts).map((c) => [
  c,
  readContextValueIn(store, c)
]);
var resumeWithContextValues = (callback, store, contexts) => runWithRenderContext(() => {
  const currentStore = getCurrentStore();
  const valuesPerContext = contexts.map(([context, value]) => {
    const values = getContextValuesIn(currentStore, context);
    values.push(value);
    return values;
  });
  const popContextValues = () => {
    valuesPerContext.forEach((values) => {
      values.pop();
    });
  };
  try {
    const result = callback();
    if (result instanceof Promise) {
      return result.finally(popContextValues);
    }
    popContextValues();
    return result;
  } catch (e) {
    popContextValues();
    throw e;
  }
}, store);
var runWithRenderContext = (callback, resumeStore) => {
  if (getCurrentStore()) {
    return callback();
  }
  const store = resumeStore ?? /* @__PURE__ */ new WeakMap();
  const storage = loadAsyncLocalStorage();
  if (storage) {
    return storage.run(store, callback);
  }
  fallbackStore = store;
  let result;
  try {
    result = callback();
  } finally {
    fallbackStore = void 0;
  }
  if (!warnedFallbackDefault && result instanceof Promise) {
    fallbackRendersInFlight++;
    result = result.finally(() => {
      fallbackRendersInFlight--;
    });
  }
  return result;
};
var captureRenderContext = () => {
  const store = getCurrentStore();
  const contexts = captureContextValues(store);
  return (callback) => resumeWithContextValues(callback, store, contexts);
};
var createContext = (defaultValue) => {
  const values = [defaultValue];
  const context = ((props) => {
    const contextValues = getContextValuesIn(getCurrentStore(), context);
    contextValues.push(props.value);
    let rendered;
    try {
      rendered = typeof props.children === "string" ? renderChildren([props.children]) : isUntrustedObject(props.children) ? renderUntrustedObject(props.children) : props.children ? (Array.isArray(props.children) ? new JSXFragmentNode("", {}, props.children) : props.children).toString() : raw("");
    } catch (e) {
      contextValues.pop();
      throw e;
    }
    if (rendered instanceof Promise) {
      return rendered.finally(() => contextValues.pop()).then((resString) => raw(resString, resString.callbacks));
    } else {
      contextValues.pop();
      return raw(rendered);
    }
  });
  context.values = values;
  context.Provider = context;
  context[DOM_RENDERER] = createContextProviderFunction(values);
  globalContexts.push(context);
  return context;
};
var useContext = (context) => {
  return readContextValueIn(getCurrentStore(), context);
};

// node_modules/hono/dist/jsx/intrinsic-element/common.js
var deDupeKeyMap = {
  title: [],
  script: ["src"],
  style: ["data-href"],
  link: ["href"],
  meta: ["name", "httpEquiv", "charset", "itemProp"]
};
var domRenderers = {};
var dataPrecedenceAttr = "data-precedence";
var isStylesheetLinkWithPrecedence = (props) => props.rel === "stylesheet" && "precedence" in props;
var shouldDeDupeByKey = (tagName, supportSort) => {
  if (tagName === "link") {
    return supportSort;
  }
  return deDupeKeyMap[tagName].length > 0;
};

// node_modules/hono/dist/jsx/intrinsic-element/components.js
var components_exports = {};
__export(components_exports, {
  button: () => button,
  form: () => form,
  input: () => input,
  link: () => link,
  meta: () => meta,
  script: () => script,
  style: () => style,
  title: () => title
});

// node_modules/hono/dist/jsx/children.js
var toArray = (children) => Array.isArray(children) ? children : [children];

// node_modules/hono/dist/jsx/intrinsic-element/components.js
var metaTagMap = /* @__PURE__ */ new WeakMap();
var insertIntoHead = (tagName, tag, props, precedence) => ({ buffer, context }) => {
  if (!buffer) {
    return;
  }
  const map = metaTagMap.get(context) || {};
  metaTagMap.set(context, map);
  const tags = map[tagName] ||= [];
  let duped = false;
  const deDupeKeys = deDupeKeyMap[tagName];
  const deDupeByKey = shouldDeDupeByKey(tagName, precedence !== void 0);
  if (deDupeByKey) {
    LOOP: for (const [, tagProps] of tags) {
      if (tagName === "link" && !(tagProps.rel === "stylesheet" && tagProps[dataPrecedenceAttr] !== void 0)) {
        continue;
      }
      for (const key of deDupeKeys) {
        if ((tagProps?.[key] ?? null) === props?.[key]) {
          duped = true;
          break LOOP;
        }
      }
    }
  }
  if (duped) {
    buffer[0] = buffer[0].replaceAll(tag, "");
  } else if (deDupeByKey || tagName === "link") {
    tags.push([tag, props, precedence]);
  } else {
    tags.unshift([tag, props, precedence]);
  }
  if (buffer[0].indexOf("</head>") !== -1) {
    let insertTags;
    if (tagName === "link" || precedence !== void 0) {
      const precedences = [];
      insertTags = tags.map(([tag2, , tagPrecedence], index) => {
        if (tagPrecedence === void 0) {
          return [tag2, Number.MAX_SAFE_INTEGER, index];
        }
        let order2 = precedences.indexOf(tagPrecedence);
        if (order2 === -1) {
          precedences.push(tagPrecedence);
          order2 = precedences.length - 1;
        }
        return [tag2, order2, index];
      }).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map(([tag2]) => tag2);
    } else {
      insertTags = tags.map(([tag2]) => tag2);
    }
    insertTags.forEach((tag2) => {
      buffer[0] = buffer[0].replaceAll(tag2, "");
    });
    buffer[0] = buffer[0].replace(/(?=<\/head>)/, () => insertTags.join(""));
  }
};
var returnWithoutSpecialBehavior = (tag, children, props) => renderChildren([new JSXNode(tag, props, toArray(children ?? []))]);
var documentMetadataTag = (tag, children, props, sort) => {
  if ("itemProp" in props) {
    return returnWithoutSpecialBehavior(tag, children, props);
  }
  let { precedence, blocking, ...restProps } = props;
  precedence = sort ? precedence ?? "" : void 0;
  if (sort) {
    restProps[dataPrecedenceAttr] = precedence;
  }
  const string = new JSXNode(tag, restProps, toArray(children || [])).toString();
  if (string instanceof Promise) {
    return string.then(
      (resString) => raw(resString, [
        ...resString.callbacks || [],
        insertIntoHead(tag, resString, restProps, precedence)
      ])
    );
  } else {
    return raw(string, [insertIntoHead(tag, string, restProps, precedence)]);
  }
};
var title = ({ children, ...props }) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (nameSpaceContext2) {
    const context = useContext(nameSpaceContext2);
    if (context === "svg" || context === "head") {
      return new JSXNode(
        "title",
        props,
        toArray(children ?? [])
      );
    }
  }
  return documentMetadataTag("title", children, props, false);
};
var script = ({
  children,
  ...props
}) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (["src", "async"].some((k) => !props[k]) || nameSpaceContext2 && useContext(nameSpaceContext2) === "head") {
    return returnWithoutSpecialBehavior("script", children, props);
  }
  return documentMetadataTag("script", children, props, false);
};
var style = ({
  children,
  ...props
}) => {
  if (!["href", "precedence"].every((k) => k in props)) {
    return returnWithoutSpecialBehavior("style", children, props);
  }
  props["data-href"] = props.href;
  delete props.href;
  return documentMetadataTag("style", children, props, true);
};
var link = ({ children, ...props }) => {
  if (["onLoad", "onError"].some((k) => k in props) || props.rel === "stylesheet" && (!("precedence" in props) || "disabled" in props)) {
    return returnWithoutSpecialBehavior("link", children, props);
  }
  return documentMetadataTag("link", children, props, isStylesheetLinkWithPrecedence(props));
};
var meta = ({ children, ...props }) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (nameSpaceContext2 && useContext(nameSpaceContext2) === "head") {
    return returnWithoutSpecialBehavior("meta", children, props);
  }
  return documentMetadataTag("meta", children, props, false);
};
var newJSXNode = (tag, { children, ...props }) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new JSXNode(tag, props, toArray(children ?? []))
);
var form = (props) => {
  if (typeof props.action === "function") {
    props.action = PERMALINK in props.action ? props.action[PERMALINK] : void 0;
  }
  return newJSXNode("form", props);
};
var formActionableElement = (tag, props) => {
  if (typeof props.formAction === "function") {
    props.formAction = PERMALINK in props.formAction ? props.formAction[PERMALINK] : void 0;
  }
  return newJSXNode(tag, props);
};
var input = (props) => formActionableElement("input", props);
var button = (props) => formActionableElement("button", props);

// node_modules/hono/dist/jsx/utils.js
var normalizeElementKeyMap = /* @__PURE__ */ new Map([
  ["className", "class"],
  ["htmlFor", "for"],
  ["crossOrigin", "crossorigin"],
  ["httpEquiv", "http-equiv"],
  ["itemProp", "itemprop"],
  ["fetchPriority", "fetchpriority"],
  ["noModule", "nomodule"],
  ["formAction", "formaction"]
]);
var normalizeIntrinsicElementKey = (key) => normalizeElementKeyMap.get(key) || key;
var invalidAttributeNameCharRe = /[\s"'<>/=`\\\x00-\x1f\x7f-\x9f]/;
var validAttributeNameCache = /* @__PURE__ */ new Set();
var validAttributeNameCacheMax = 1024;
var invalidTagNameCharRe = /^[!?]|[\s"'<>/=`\\\x00-\x1f\x7f-\x9f]/;
var validTagNameCache = /* @__PURE__ */ new Set();
var validTagNameCacheMax = 256;
var cacheValidName = (cache, max, name) => {
  if (cache.size >= max) {
    cache.clear();
  }
  cache.add(name);
};
var isValidTagName = (name) => {
  if (validTagNameCache.has(name)) {
    return true;
  }
  if (typeof name !== "string") {
    return false;
  }
  if (name.length === 0) {
    return true;
  }
  if (invalidTagNameCharRe.test(name)) {
    return false;
  }
  cacheValidName(validTagNameCache, validTagNameCacheMax, name);
  return true;
};
var isValidAttributeName = (name) => {
  if (validAttributeNameCache.has(name)) {
    return true;
  }
  const len = name.length;
  if (len === 0) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const c = name.charCodeAt(i);
    if (!(c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c >= 48 && c <= 57 || // 0-9
    c === 45 || // -
    c === 95 || // _
    c === 46 || // .
    c === 58)) {
      if (!invalidAttributeNameCharRe.test(name)) {
        cacheValidName(validAttributeNameCache, validAttributeNameCacheMax, name);
        return true;
      } else {
        return false;
      }
    }
  }
  cacheValidName(validAttributeNameCache, validAttributeNameCacheMax, name);
  return true;
};
var invalidStylePropertyNameCharRe = /[\s"'():;\\/\[\]{}\x00-\x1f\x7f-\x9f]/;
var validStylePropertyNameCache = /* @__PURE__ */ new Set();
var validStylePropertyNameCacheMax = 1024;
var isValidStylePropertyName = (name) => {
  if (validStylePropertyNameCache.has(name)) {
    return true;
  }
  const len = name.length;
  if (len === 0) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const c = name.charCodeAt(i);
    if (!(c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c >= 48 && c <= 57 || // 0-9
    c === 45 || // -
    c === 95)) {
      if (!invalidStylePropertyNameCharRe.test(name)) {
        cacheValidName(validStylePropertyNameCache, validStylePropertyNameCacheMax, name);
        return true;
      } else {
        return false;
      }
    }
  }
  cacheValidName(validStylePropertyNameCache, validStylePropertyNameCacheMax, name);
  return true;
};
var unsafeStyleValueCharRe = /[;"'\\/\[\](){}]/;
var hasUnsafeStyleValue = (value) => {
  if (!unsafeStyleValueCharRe.test(value)) {
    return false;
  }
  let quote = 0;
  const blockStack = [];
  for (let i = 0, len = value.length; i < len; i++) {
    const c = value.charCodeAt(i);
    if (c === 92) {
      if (i === len - 1) {
        return true;
      }
      i++;
    } else if (quote !== 0) {
      if (c === 10 || c === 12 || c === 13) {
        return true;
      }
      if (c === quote) {
        quote = 0;
      }
    } else if (c === 47 && value.charCodeAt(i + 1) === 42) {
      const end = value.indexOf("*/", i + 2);
      if (end === -1) {
        return true;
      }
      i = end + 1;
    } else if (c === 34 || c === 39) {
      quote = c;
    } else if (c === 40) {
      blockStack.push(41);
    } else if (c === 91) {
      blockStack.push(93);
    } else if (c === 123 || c === 125) {
      return true;
    } else if (c === 41 || c === 93) {
      if (blockStack[blockStack.length - 1] !== c) {
        return true;
      }
      blockStack.pop();
    } else if (c === 59 && blockStack.length === 0) {
      return true;
    }
  }
  return quote !== 0 || blockStack.length !== 0;
};
var styleObjectForEach = (style2, fn) => {
  for (const [k, v] of Object.entries(style2)) {
    const key = k[0] === "-" || !/[A-Z]/.test(k) ? k : k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    if (!isValidStylePropertyName(key)) {
      continue;
    }
    if (v == null) {
      fn(key, null);
      continue;
    }
    let value;
    if (typeof v === "number") {
      value = !key.match(
        /^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/
      ) ? `${v}px` : `${v}`;
    } else if (typeof v === "string") {
      if (hasUnsafeStyleValue(v)) {
        continue;
      }
      value = v;
    } else {
      continue;
    }
    fn(key, value);
  }
};

// node_modules/hono/dist/jsx/base.js
var nameSpaceContext = void 0;
var getNameSpaceContext = () => nameSpaceContext;
var toSVGAttributeName = (key) => /[A-Z]/.test(key) && // Presentation attributes are findable in style object. "clip-path", "font-size", "stroke-width", etc.
// Or other un-deprecated kebab-case attributes. "overline-position", "paint-order", "strikethrough-position", etc.
key.match(
  /^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/
) ? key.replace(/([A-Z])/g, "-$1").toLowerCase() : key;
var emptyTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var booleanAttributes = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "download",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
var resolveFunctionComponentResult = (result, suspendedContext) => result.then((resolved) => {
  if (typeof resolved !== "string" && !Array.isArray(resolved) && !(resolved instanceof JSXNode)) {
    return resolved;
  }
  const children = Array.isArray(resolved) ? resolved : [resolved];
  const render = () => {
    const buffer = [""];
    childrenToStringToBuffer(children, buffer);
    return buffer.length === 1 ? raw(buffer[0], buffer.callbacks) : stringBufferToString(buffer, buffer.callbacks);
  };
  return suspendedContext ? suspendedContext(render) : runWithRenderContext(render);
});
var childrenToStringToBuffer = (children, buffer) => {
  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];
    if (typeof child === "string") {
      escapeToBuffer(child, buffer);
    } else if (typeof child === "boolean" || child === null || child === void 0) {
      continue;
    } else if (child instanceof JSXNode) {
      child.toStringToBuffer(buffer);
    } else if (typeof child === "number") {
      ;
      buffer[0] += child;
    } else if (child.isEscaped) {
      ;
      buffer[0] += child;
      const callbacks = child.callbacks;
      if (callbacks) {
        buffer.callbacks ||= [];
        buffer.callbacks.push(...callbacks);
      }
    } else if (child instanceof Promise) {
      buffer.unshift("", child);
    } else {
      childrenToStringToBuffer(child, buffer);
    }
  }
};
var renderChildren = (children) => runWithRenderContext(() => {
  const buffer = [""];
  childrenToStringToBuffer(children, buffer);
  return buffer.length === 1 ? raw(buffer[0], buffer.callbacks) : stringBufferToString(buffer, buffer.callbacks);
});
var isUntrustedObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof JSXNode) && !(value instanceof Promise) && !value.isEscaped && typeof value.toString === "function";
var renderUntrustedObject = (value) => {
  const stringified = value.toString();
  const escape = (result) => renderChildren([String(result)]);
  return stringified instanceof Promise ? stringified.then(escape) : escape(stringified);
};
var JSXNode = class {
  tag;
  props;
  key;
  children;
  isEscaped = true;
  constructor(tag, props, children) {
    if (typeof tag !== "function" && !isValidTagName(tag)) {
      throw new Error(`Invalid JSX tag name: ${tag}`);
    }
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
  get type() {
    return this.tag;
  }
  // Added for compatibility with libraries that rely on React's internal structure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get ref() {
    return this.props.ref || null;
  }
  toString() {
    const render = () => {
      const buffer = [""];
      this.toStringToBuffer(buffer);
      return buffer.length === 1 ? "callbacks" in buffer ? resolveCallbackSync(raw(buffer[0], buffer.callbacks)).toString() : buffer[0] : stringBufferToString(buffer, buffer.callbacks);
    };
    return runWithRenderContext(render);
  }
  toStringToBuffer(buffer) {
    const tag = this.tag;
    const props = this.props;
    let { children } = this;
    buffer[0] += `<${tag}`;
    const normalizeKey = tag === "svg" || nameSpaceContext && useContext(nameSpaceContext) === "svg" ? (key) => toSVGAttributeName(normalizeIntrinsicElementKey(key)) : (key) => normalizeIntrinsicElementKey(key);
    for (let [key, v] of Object.entries(props)) {
      key = normalizeKey(key);
      if (!isValidAttributeName(key)) {
        continue;
      }
      if (key === "children") {
      } else if (key === "style" && typeof v === "object") {
        let styleStr = "";
        styleObjectForEach(v, (property, value) => {
          if (value != null) {
            styleStr += `${styleStr ? ";" : ""}${property}:${value}`;
          }
        });
        buffer[0] += ' style="';
        escapeToBuffer(styleStr, buffer);
        buffer[0] += '"';
      } else if (typeof v === "string") {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v, buffer);
        buffer[0] += '"';
      } else if (v === null || v === void 0) {
      } else if (typeof v === "number" || v.isEscaped) {
        buffer[0] += ` ${key}="${v}"`;
      } else if (typeof v === "boolean" && booleanAttributes.includes(key)) {
        if (v) {
          buffer[0] += ` ${key}=""`;
        }
      } else if (key === "dangerouslySetInnerHTML") {
        if (children.length > 0) {
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        }
        children = [raw(v.__html)];
      } else if (v instanceof Promise) {
        buffer[0] += ` ${key}="`;
        buffer.unshift('"', v);
      } else if (typeof v === "function") {
        if (!key.startsWith("on") && key !== "ref") {
          throw new Error(`Invalid prop '${key}' of type 'function' supplied to '${tag}'.`);
        }
      } else {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v.toString(), buffer);
        buffer[0] += '"';
      }
    }
    if (emptyTags.includes(tag) && children.length === 0) {
      buffer[0] += "/>";
      return;
    }
    buffer[0] += ">";
    childrenToStringToBuffer(children, buffer);
    buffer[0] += `</${tag}>`;
  }
};
var JSXFunctionNode = class extends JSXNode {
  toStringToBuffer(buffer) {
    const { children } = this;
    const props = { ...this.props };
    if (children.length) {
      props.children = children.length === 1 ? children[0] : children;
    }
    const res = this.tag.call(null, props);
    if (typeof res === "boolean" || res == null) {
      return;
    } else if (res instanceof Promise) {
      if (globalContexts.length === 0) {
        buffer.unshift("", resolveFunctionComponentResult(res));
      } else {
        buffer.unshift("", resolveFunctionComponentResult(res, captureRenderContext()));
      }
    } else if (res instanceof JSXNode) {
      res.toStringToBuffer(buffer);
    } else if (Array.isArray(res)) {
      childrenToStringToBuffer(res, buffer);
    } else if (typeof res === "number" || res.isEscaped) {
      buffer[0] += res;
      if (res.callbacks) {
        buffer.callbacks ||= [];
        buffer.callbacks.push(...res.callbacks);
      }
    } else {
      escapeToBuffer(res, buffer);
    }
  }
};
var JSXFragmentNode = class extends JSXNode {
  toStringToBuffer(buffer) {
    childrenToStringToBuffer(this.children, buffer);
  }
};
var initDomRenderer = false;
var jsxFn = (tag, props, children) => {
  if (!initDomRenderer) {
    for (const k in domRenderers) {
      ;
      components_exports[k][DOM_RENDERER] = domRenderers[k];
    }
    initDomRenderer = true;
  }
  if (typeof tag === "function") {
    return new JSXFunctionNode(tag, props, children);
  } else if (components_exports[tag]) {
    return new JSXFunctionNode(
      components_exports[tag],
      props,
      children
    );
  } else if (tag === "svg" || tag === "head") {
    nameSpaceContext ||= createContext("");
    return new JSXNode(tag, props, [
      new JSXFunctionNode(
        nameSpaceContext,
        {
          value: tag
        },
        children
      )
    ]);
  } else {
    return new JSXNode(tag, props, children);
  }
};
var Fragment = ({
  children
}) => {
  return new JSXFragmentNode(
    "",
    {
      children
    },
    Array.isArray(children) ? children : children ? [children] : []
  );
};

// node_modules/hono/dist/jsx/jsx-dev-runtime.js
function jsxDEV(tag, props, key) {
  let node;
  if (!props || !("children" in props)) {
    node = jsxFn(tag, props, []);
  } else {
    const children = props.children;
    node = Array.isArray(children) ? jsxFn(tag, props, children) : jsxFn(tag, props, [children]);
  }
  node.key = key;
  return node;
}

// src/views/layout.tsx
var Layout = ({
  title: title2 = "BuyerNepal \u2014 Shop Smarter",
  description = "BuyerNepal \u2014 discover useful products, compare prices and shop smarter in Nepal.",
  image = "https://buyernepal.pages.dev/og-image.jpg",
  url = "https://buyernepal.pages.dev",
  type = "website",
  jsonLd,
  customHead,
  children
}) => {
  return /* @__PURE__ */ jsxDEV("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV("head", { children: [
      /* @__PURE__ */ jsxDEV("meta", { charset: "UTF-8" }),
      /* @__PURE__ */ jsxDEV("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsxDEV("meta", { name: "theme-color", content: "#111827" }),
      /* @__PURE__ */ jsxDEV("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxDEV("meta", { name: "robots", content: "index,follow" }),
      /* @__PURE__ */ jsxDEV("title", { children: title2 }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:title", content: title2 }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:image", content: image }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:url", content: url }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:type", content: type }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:site_name", content: "BuyerNepal" }),
      /* @__PURE__ */ jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxDEV("meta", { name: "twitter:title", content: title2 }),
      /* @__PURE__ */ jsxDEV("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsxDEV("meta", { name: "twitter:image", content: image }),
      jsonLd && /* @__PURE__ */ jsxDEV(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
        }
      ),
      /* @__PURE__ */ jsxDEV("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsxDEV("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsxDEV(
        "link",
        {
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsxDEV("style", { dangerouslySetInnerHTML: { __html: storefrontCss } }),
      customHead && /* @__PURE__ */ jsxDEV("div", { dangerouslySetInnerHTML: { __html: customHead } })
    ] }),
    /* @__PURE__ */ jsxDEV("body", { children: [
      children,
      /* @__PURE__ */ jsxDEV(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                // Mobile menu toggle
                const menuBtn = document.getElementById('mobileMenuBtn');
                const mobileNav = document.getElementById('mobileNav');
                if (menuBtn && mobileNav) {
                  menuBtn.addEventListener('click', () => {
                    mobileNav.classList.toggle('open');
                  });
                }

                // Client-side real-time search
                const searchInput = document.getElementById('searchInput');
                const clearSearchBtn = document.getElementById('clearSearchBtn');
                const productCards = document.querySelectorAll('.product-card');
                const searchCount = document.getElementById('searchCount');

                if (searchInput) {
                  searchInput.addEventListener('input', (e) => {
                    const q = e.target.value.trim().toLowerCase();
                    if (clearSearchBtn) clearSearchBtn.style.display = q ? 'inline-block' : 'none';
                    let visible = 0;
                    productCards.forEach((card) => {
                      const name = (card.getAttribute('data-name') || '').toLowerCase();
                      const desc = (card.getAttribute('data-desc') || '').toLowerCase();
                      const match = !q || name.includes(q) || desc.includes(q);
                      card.style.display = match ? 'flex' : 'none';
                      if (match) visible++;
                    });
                    if (searchCount) {
                      searchCount.textContent = q ? visible + ' found' : productCards.length + ' items';
                    }
                  });

                  if (clearSearchBtn) {
                    clearSearchBtn.addEventListener('click', () => {
                      searchInput.value = '';
                      searchInput.dispatchEvent(new Event('input'));
                      searchInput.focus();
                    });
                  }
                }
              });
            `
          }
        }
      )
    ] })
  ] });
};

// src/views/components.tsx
var Header = ({ settings, categories, activeSlug }) => {
  const title2 = settings.site_title || "BuyerNepal";
  const logo = settings.site_logo;
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "store-topbar", children: /* @__PURE__ */ jsxDEV("div", { className: "store-shell store-topbar-inner", children: [
      /* @__PURE__ */ jsxDEV("span", { children: "\u{1F1F3}\u{1F1F5} Nepal's shopping discovery platform" }),
      /* @__PURE__ */ jsxDEV("span", { className: "store-topbar-note", children: "Compare \u2022 Discover \u2022 Shop smarter" })
    ] }) }),
    /* @__PURE__ */ jsxDEV("header", { className: "store-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "store-shell store-header-inner", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "/", className: "store-brand", "aria-label": `${title2} home`, children: [
          logo ? /* @__PURE__ */ jsxDEV("img", { src: logo, alt: title2, className: "store-logo" }) : /* @__PURE__ */ jsxDEV("span", { className: "store-logo-mark", children: "B" }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            /* @__PURE__ */ jsxDEV("strong", { children: title2 }),
            /* @__PURE__ */ jsxDEV("small", { children: "SHOP SMARTER" })
          ] })
        ] }),
        /* @__PURE__ */ jsxDEV("nav", { className: "store-nav", "aria-label": "Primary navigation", children: [
          /* @__PURE__ */ jsxDEV("a", { href: "/", className: !activeSlug ? "store-nav-active" : "", children: "Home" }),
          categories.slice(0, 5).map((cat) => /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: `/category/${cat.slug}`,
              className: activeSlug === cat.slug ? "store-nav-active" : "",
              children: cat.name
            },
            cat.id
          ))
        ] }),
        /* @__PURE__ */ jsxDEV("div", { className: "store-header-actions", children: [
          /* @__PURE__ */ jsxDEV("a", { href: "/admin/login", className: "store-admin-link", children: "Admin" }),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              id: "mobileMenuBtn",
              className: "store-menu",
              "aria-label": "Toggle menu",
              type: "button",
              children: [
                /* @__PURE__ */ jsxDEV("span", {}),
                /* @__PURE__ */ jsxDEV("span", {}),
                /* @__PURE__ */ jsxDEV("span", {})
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxDEV("nav", { id: "mobileNav", className: "store-mobile-nav store-shell", "aria-label": "Mobile navigation", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "/", children: "Home" }),
        categories.map((cat) => /* @__PURE__ */ jsxDEV("a", { href: `/category/${cat.slug}`, children: cat.name }, cat.id)),
        /* @__PURE__ */ jsxDEV("a", { href: "/admin/login", children: "Admin Login" })
      ] })
    ] })
  ] });
};
var Hero = ({ settings }) => {
  const description = settings.site_description || "Discover products worth buying in Nepal \u2014 curated, compared and easy to shop.";
  return /* @__PURE__ */ jsxDEV("section", { className: "store-hero", children: /* @__PURE__ */ jsxDEV("div", { className: "store-shell hero-grid", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "hero-copy", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "eyebrow", children: "SMART SHOPPING, MADE SIMPLE" }),
      /* @__PURE__ */ jsxDEV("h1", { children: [
        "Find better products.",
        /* @__PURE__ */ jsxDEV("br", {}),
        /* @__PURE__ */ jsxDEV("em", { children: "Buy with confidence." })
      ] }),
      /* @__PURE__ */ jsxDEV("p", { children: description }),
      /* @__PURE__ */ jsxDEV("div", { className: "hero-search", children: [
        /* @__PURE__ */ jsxDEV("span", { "aria-hidden": "true", children: "\u2315" }),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: "searchInput",
            type: "text",
            placeholder: "Search products, brands or categories\u2026",
            "aria-label": "Search products"
          }
        ),
        /* @__PURE__ */ jsxDEV("button", { id: "clearSearchBtn", type: "button", "aria-label": "Clear search", children: "\xD7" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { className: "hero-points", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "\u2713 Curated picks" }),
        /* @__PURE__ */ jsxDEV("span", { children: "\u2713 Local NPR prices" }),
        /* @__PURE__ */ jsxDEV("span", { children: "\u2713 Direct store links" })
      ] })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { className: "hero-card", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "hero-card-glow" }),
      /* @__PURE__ */ jsxDEV("div", { className: "hero-card-label", children: "BUYERNEPAL" }),
      /* @__PURE__ */ jsxDEV("div", { className: "hero-card-title", children: [
        "Less scrolling.",
        /* @__PURE__ */ jsxDEV("br", {}),
        /* @__PURE__ */ jsxDEV("strong", { children: "More buying." })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { className: "hero-mini-grid", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "01",
          /* @__PURE__ */ jsxDEV("br", {}),
          /* @__PURE__ */ jsxDEV("b", { children: "Discover" })
        ] }),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "02",
          /* @__PURE__ */ jsxDEV("br", {}),
          /* @__PURE__ */ jsxDEV("b", { children: "Compare" })
        ] }),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "03",
          /* @__PURE__ */ jsxDEV("br", {}),
          /* @__PURE__ */ jsxDEV("b", { children: "Shop" })
        ] })
      ] })
    ] })
  ] }) });
};
var TrustStrip = () => /* @__PURE__ */ jsxDEV("section", { className: "store-shell trust-strip", children: [
  /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("strong", { children: "Built for Nepal \u{1F1F3}\u{1F1F5}" }),
    /* @__PURE__ */ jsxDEV("span", { children: "Prices and shopping links verified for Nepali shoppers." })
  ] }),
  /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("strong", { children: "Curated, not crowded" }),
    /* @__PURE__ */ jsxDEV("span", { children: "Useful products without endless marketplace noise and spam." })
  ] }),
  /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("strong", { children: "Shop on the source" }),
    /* @__PURE__ */ jsxDEV("span", { children: "Direct links send you straight to the trusted seller or store." })
  ] })
] });
var ProductCard = ({ product }) => {
  const price = Number(product.price) || 0;
  let formattedPrice = String(price);
  try {
    formattedPrice = price.toLocaleString("en-NP");
  } catch {
    formattedPrice = price.toLocaleString();
  }
  return /* @__PURE__ */ jsxDEV(
    "article",
    {
      className: "product-card",
      "data-name": product.name,
      "data-desc": product.description,
      "data-category": String(product.category_id || ""),
      children: [
        /* @__PURE__ */ jsxDEV(
          "a",
          {
            href: `/product/${product.id}`,
            className: "product-image-link",
            "aria-label": `View ${product.name}`,
            children: [
              product.image_url ? /* @__PURE__ */ jsxDEV("img", { src: product.image_url, alt: product.name, loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxDEV("div", { className: "product-image-placeholder", "aria-hidden": "true", children: /* @__PURE__ */ jsxDEV("span", { children: "BN" }) }),
              /* @__PURE__ */ jsxDEV("span", { className: "product-badge", children: "Curated" })
            ]
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "product-card-body", children: [
          /* @__PURE__ */ jsxDEV("a", { href: `/product/${product.id}`, className: "product-name", children: product.name }),
          /* @__PURE__ */ jsxDEV("p", { className: "product-description", children: product.description || "Explore details and availability." }),
          /* @__PURE__ */ jsxDEV("div", { className: "product-card-bottom", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "price-label", children: "Price" }),
              /* @__PURE__ */ jsxDEV("strong", { className: "product-price", children: [
                "Rs. ",
                formattedPrice
              ] })
            ] }),
            product.affiliate_url ? /* @__PURE__ */ jsxDEV(
              "a",
              {
                className: "product-buy",
                href: product.affiliate_url,
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                children: [
                  "Shop now ",
                  /* @__PURE__ */ jsxDEV("span", { children: "\u2197" })
                ]
              }
            ) : /* @__PURE__ */ jsxDEV("a", { className: "product-buy product-buy-secondary", href: `/product/${product.id}`, children: [
              "View ",
              /* @__PURE__ */ jsxDEV("span", { children: "\u2192" })
            ] })
          ] })
        ] })
      ]
    }
  );
};
var EditorialBanner = ({ count }) => /* @__PURE__ */ jsxDEV("section", { className: "store-shell editorial-banner", children: [
  /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("span", { className: "section-kicker", children: "A BETTER WAY TO SHOP" }),
    /* @__PURE__ */ jsxDEV("h2", { children: [
      "Discover first.",
      /* @__PURE__ */ jsxDEV("br", {}),
      "Decide faster."
    ] }),
    /* @__PURE__ */ jsxDEV("p", { children: "BuyerNepal is designed to help you find useful products quickly, understand what they cost in Nepal, and jump directly to the verified store that sells them." })
  ] }),
  /* @__PURE__ */ jsxDEV("div", { className: "editorial-stat", children: [
    /* @__PURE__ */ jsxDEV("strong", { children: count || "\u2014" }),
    /* @__PURE__ */ jsxDEV("span", { children: "curated products" })
  ] })
] });
var Footer = ({
  settings,
  categories
}) => {
  const title2 = settings.site_title || "BuyerNepal";
  const description = settings.site_description || "Discover products worth buying in Nepal \u2014 curated, compared and easy to shop.";
  return /* @__PURE__ */ jsxDEV("footer", { className: "store-footer", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "store-shell footer-grid", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("a", { href: "/", className: "store-brand", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "store-logo-mark", children: "B" }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            /* @__PURE__ */ jsxDEV("strong", { children: title2 }),
            /* @__PURE__ */ jsxDEV("small", { children: "SHOP SMARTER" })
          ] })
        ] }),
        /* @__PURE__ */ jsxDEV("p", { children: description })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Categories" }),
        /* @__PURE__ */ jsxDEV("a", { href: "/", children: "All Products" }),
        categories.slice(0, 5).map((cat) => /* @__PURE__ */ jsxDEV("a", { href: `/category/${cat.slug}`, children: cat.name }, cat.id))
      ] }),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Administration" }),
        /* @__PURE__ */ jsxDEV("a", { href: "/admin/login", children: "Admin Login" }),
        /* @__PURE__ */ jsxDEV("span", { className: "footer-note", children: "Manage products, categories, reviews, coupons and site configurations." })
      ] })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { className: "store-shell footer-bottom", children: [
      /* @__PURE__ */ jsxDEV("span", { children: [
        "\xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        title2,
        ". All rights reserved."
      ] }),
      /* @__PURE__ */ jsxDEV("span", { children: "Made with \u2764\uFE0F for shoppers in Nepal \u{1F1F3}\u{1F1F5}" })
    ] })
  ] });
};

// src/views/home.tsx
var HomePage = ({ settings, categories, products }) => {
  const title2 = settings.site_title || "BuyerNepal \u2014 Shop Smarter";
  const description = settings.site_description || "Discover products worth buying in Nepal \u2014 curated, compared and easy to shop.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Products in Nepal",
    description,
    itemListElement: products.slice(0, 10).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: p.image_url,
        offers: {
          "@type": "Offer",
          priceCurrency: "NPR",
          price: p.price,
          availability: "https://schema.org/InStock"
        }
      }
    }))
  };
  return /* @__PURE__ */ jsxDEV(
    Layout,
    {
      title: title2,
      description,
      jsonLd,
      children: /* @__PURE__ */ jsxDEV("div", { className: "store-page", children: [
        /* @__PURE__ */ jsxDEV(Header, { settings, categories }),
        /* @__PURE__ */ jsxDEV(Hero, { settings }),
        /* @__PURE__ */ jsxDEV(TrustStrip, {}),
        settings.homepage_html && /* @__PURE__ */ jsxDEV(
          "section",
          {
            className: "store-shell",
            style: { marginTop: "30px" },
            dangerouslySetInnerHTML: { __html: settings.homepage_html }
          }
        ),
        /* @__PURE__ */ jsxDEV("section", { className: "store-shell category-section", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "section-heading", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "section-kicker", children: "EXPLORE" }),
              /* @__PURE__ */ jsxDEV("h2", { children: "Shop by category" })
            ] }),
            /* @__PURE__ */ jsxDEV("span", { className: "section-count", children: [
              categories.length,
              " categories"
            ] })
          ] }),
          /* @__PURE__ */ jsxDEV("div", { className: "category-row", children: [
            /* @__PURE__ */ jsxDEV("a", { href: "/", className: "category-chip active", children: "All products" }),
            categories.map((cat) => /* @__PURE__ */ jsxDEV("a", { href: `/category/${cat.slug}`, className: "category-chip", children: cat.name }, cat.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxDEV("section", { className: "store-shell products-section", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "section-heading", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "section-kicker", children: "THE SHORTLIST" }),
              /* @__PURE__ */ jsxDEV("h2", { children: "Featured products" })
            ] }),
            /* @__PURE__ */ jsxDEV("span", { id: "searchCount", className: "section-count", children: [
              products.length,
              " ",
              products.length === 1 ? "item" : "items"
            ] })
          ] }),
          products.length > 0 ? /* @__PURE__ */ jsxDEV("div", { className: "product-grid", children: products.map((p) => /* @__PURE__ */ jsxDEV(ProductCard, { product: p }, p.id)) }) : /* @__PURE__ */ jsxDEV("div", { className: "store-empty", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "empty-icon", children: "\u2315" }),
            /* @__PURE__ */ jsxDEV("h3", { children: "No products available yet" }),
            /* @__PURE__ */ jsxDEV("p", { children: "Check back soon or visit our admin panel to list curated products." }),
            /* @__PURE__ */ jsxDEV("a", { href: "/admin/login", className: "primary-action", children: "Go to Admin" })
          ] })
        ] }),
        /* @__PURE__ */ jsxDEV(EditorialBanner, { count: products.length }),
        /* @__PURE__ */ jsxDEV(Footer, { settings, categories })
      ] })
    }
  );
};

// src/views/category.tsx
var CategoryPage = ({ settings, categories, category, products }) => {
  const title2 = `${category.name} in Nepal \u2014 BuyerNepal`;
  const description = category.description || `Browse the best ${category.name} available in Nepal with verified prices and direct store links.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title2,
    description,
    itemListElement: products.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: p.image_url,
        offers: {
          "@type": "Offer",
          priceCurrency: "NPR",
          price: p.price
        }
      }
    }))
  };
  return /* @__PURE__ */ jsxDEV(Layout, { title: title2, description, jsonLd, children: /* @__PURE__ */ jsxDEV("div", { className: "store-page", children: [
    /* @__PURE__ */ jsxDEV(Header, { settings, categories, activeSlug: category.slug }),
    /* @__PURE__ */ jsxDEV("main", { className: "store-shell category-page-main", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "breadcrumbs", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "/", children: "Home" }),
        /* @__PURE__ */ jsxDEV("span", { children: "/" }),
        /* @__PURE__ */ jsxDEV("span", { children: category.name })
      ] }),
      /* @__PURE__ */ jsxDEV("section", { className: "category-hero", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "eyebrow", children: "CATEGORY" }),
          /* @__PURE__ */ jsxDEV("h1", { children: category.name }),
          /* @__PURE__ */ jsxDEV("p", { children: description })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { className: "category-total", children: [
          /* @__PURE__ */ jsxDEV("strong", { children: products.length }),
          /* @__PURE__ */ jsxDEV("span", { children: "products listed" })
        ] })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { className: "category-row", style: { marginBottom: "30px" }, children: [
        /* @__PURE__ */ jsxDEV("a", { href: "/", className: "category-chip", children: "All products" }),
        categories.map((cat) => /* @__PURE__ */ jsxDEV(
          "a",
          {
            href: `/category/${cat.slug}`,
            className: `category-chip ${cat.slug === category.slug ? "active" : ""}`,
            children: cat.name
          },
          cat.id
        ))
      ] }),
      /* @__PURE__ */ jsxDEV("section", { className: "products-section", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "section-heading", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "section-kicker", children: "CURATED LISTINGS" }),
            /* @__PURE__ */ jsxDEV("h2", { children: [
              "Products in ",
              category.name
            ] })
          ] }),
          /* @__PURE__ */ jsxDEV("span", { className: "section-count", children: [
            products.length,
            " ",
            products.length === 1 ? "item" : "items"
          ] })
        ] }),
        products.length > 0 ? /* @__PURE__ */ jsxDEV("div", { className: "product-grid", children: products.map((p) => /* @__PURE__ */ jsxDEV(ProductCard, { product: p }, p.id)) }) : /* @__PURE__ */ jsxDEV("div", { className: "store-empty", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "empty-icon", children: "\u2315" }),
          /* @__PURE__ */ jsxDEV("h3", { children: "No products in this category yet" }),
          /* @__PURE__ */ jsxDEV("p", { children: [
            "We are actively curating recommendations for ",
            category.name,
            "."
          ] }),
          /* @__PURE__ */ jsxDEV("a", { href: "/", className: "primary-action", children: "Explore other categories" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxDEV(Footer, { settings, categories })
  ] }) });
};

// src/views/product.tsx
var ProductPage = ({ settings, categories, product, reviews }) => {
  const title2 = `${product.name} \u2014 Price in Nepal | BuyerNepal`;
  const description = product.description || `Check price, specs, reviews and where to buy ${product.name} in Nepal.`;
  const price = Number(product.price) || 0;
  let formattedPrice = String(price);
  try {
    formattedPrice = price.toLocaleString("en-NP");
  } catch {
    formattedPrice = price.toLocaleString();
  }
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image_url ? [product.image_url] : [],
    description,
    offers: {
      "@type": "Offer",
      url: `https://buyernepal.pages.dev/product/${product.id}`,
      priceCurrency: "NPR",
      price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition"
    },
    ...reviews.length > 0 && {
      review: reviews.map((r) => ({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5
        },
        author: {
          "@type": "Person",
          name: r.user_name
        },
        reviewBody: r.comment
      }))
    }
  };
  return /* @__PURE__ */ jsxDEV(
    Layout,
    {
      title: title2,
      description,
      image: product.image_url,
      type: "product",
      jsonLd,
      children: /* @__PURE__ */ jsxDEV("div", { className: "store-page", children: [
        /* @__PURE__ */ jsxDEV(Header, { settings, categories }),
        /* @__PURE__ */ jsxDEV("main", { className: "store-shell product-detail", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "breadcrumbs", children: [
            /* @__PURE__ */ jsxDEV("a", { href: "/", children: "Home" }),
            /* @__PURE__ */ jsxDEV("span", { children: "/" }),
            product.category_name && /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV("a", { href: `/category/${product.category_id}`, children: product.category_name }),
              /* @__PURE__ */ jsxDEV("span", { children: "/" })
            ] }),
            /* @__PURE__ */ jsxDEV("span", { children: product.name })
          ] }),
          /* @__PURE__ */ jsxDEV("div", { className: "product-detail-grid", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "product-detail-media", children: product.image_url ? /* @__PURE__ */ jsxDEV("img", { src: product.image_url, alt: product.name }) : /* @__PURE__ */ jsxDEV("div", { className: "product-detail-placeholder", children: "BN" }) }),
            /* @__PURE__ */ jsxDEV("div", { className: "product-detail-copy", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "eyebrow", children: "VERIFIED LISTING" }),
              /* @__PURE__ */ jsxDEV("h1", { children: product.name }),
              /* @__PURE__ */ jsxDEV("div", { className: "rating-row", style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "18px", color: "#f59e0b" }, children: [
                /* @__PURE__ */ jsxDEV("span", { children: "\u2605 \u2605 \u2605 \u2605 \u2605" }),
                /* @__PURE__ */ jsxDEV("span", { style: { color: "#6b7280", fontSize: "12px" }, children: reviews.length > 0 ? `(${reviews.length} reviews)` : "(Curated recommendation)" })
              ] }),
              /* @__PURE__ */ jsxDEV("strong", { className: "detail-price", children: [
                "Rs. ",
                formattedPrice
              ] }),
              /* @__PURE__ */ jsxDEV("p", { className: "detail-description", children: product.description }),
              /* @__PURE__ */ jsxDEV("div", { children: product.affiliate_url ? /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: product.affiliate_url,
                  target: "_blank",
                  rel: "noopener noreferrer nofollow",
                  className: "detail-buy",
                  children: [
                    "Buy from Verified Store ",
                    /* @__PURE__ */ jsxDEV("span", { children: "\u2197" })
                  ]
                }
              ) : /* @__PURE__ */ jsxDEV("span", { className: "detail-buy", style: { background: "#9ca3af", cursor: "not-allowed" }, children: "Currently Unavailable" }) }),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  style: {
                    marginTop: "32px",
                    padding: "16px",
                    background: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    fontSize: "12px",
                    color: "#6b7280"
                  },
                  children: [
                    /* @__PURE__ */ jsxDEV("strong", { style: { color: "#111827", display: "block", marginBottom: "4px" }, children: "BuyerNepal Guarantee" }),
                    "Prices and availability are verified periodically. We may earn a commission when you purchase through our links at no extra cost to you."
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxDEV("section", { className: "reviews-section", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "section-heading", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "section-kicker", children: "COMMUNITY REVIEWS" }),
                /* @__PURE__ */ jsxDEV("h2", { children: "What shoppers say" })
              ] }),
              /* @__PURE__ */ jsxDEV("span", { className: "section-count", children: [
                reviews.length,
                " verified reviews"
              ] })
            ] }),
            reviews.length > 0 ? /* @__PURE__ */ jsxDEV("div", { className: "review-list", children: reviews.map((r) => /* @__PURE__ */ jsxDEV("div", { className: "review-card", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "review-top", children: [
                /* @__PURE__ */ jsxDEV("strong", { children: r.user_name }),
                /* @__PURE__ */ jsxDEV("span", { style: { color: "#f59e0b" }, children: "\u2605".repeat(r.rating) })
              ] }),
              /* @__PURE__ */ jsxDEV("p", { children: r.comment }),
              /* @__PURE__ */ jsxDEV("time", { style: { fontSize: "11px", color: "#9ca3af", display: "block", marginTop: "8px" }, children: r.created_at ? new Date(r.created_at).toLocaleDateString() : "" })
            ] }, r.id)) }) : /* @__PURE__ */ jsxDEV("div", { className: "store-empty", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "empty-icon", children: "\u2605" }),
              /* @__PURE__ */ jsxDEV("h3", { children: "No reviews yet" }),
              /* @__PURE__ */ jsxDEV("p", { children: [
                "Be the first to share your experience with ",
                product.name,
                "."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxDEV(Footer, { settings, categories })
      ] })
    }
  );
};

// src/views/admin.tsx
var AdminLoginView = ({ error }) => {
  return /* @__PURE__ */ jsxDEV(Layout, { title: "Admin Login \u2014 BuyerNepal", children: /* @__PURE__ */ jsxDEV("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6", padding: "20px" }, children: /* @__PURE__ */ jsxDEV("div", { className: "admin-login-box", children: [
    /* @__PURE__ */ jsxDEV("div", { style: { textAlign: "center", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxDEV("span", { className: "store-logo-mark", style: { margin: "0 auto 12px" }, children: "B" }),
      /* @__PURE__ */ jsxDEV("h1", { children: "BuyerNepal Admin" }),
      /* @__PURE__ */ jsxDEV("p", { children: "Enter your administrator credentials to manage the platform." })
    ] }),
    error && /* @__PURE__ */ jsxDEV("div", { className: "form-error", children: error }),
    /* @__PURE__ */ jsxDEV("form", { method: "post", action: "/admin/login", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "username", children: "Username" }),
        /* @__PURE__ */ jsxDEV("input", { id: "username", name: "username", type: "text", required: true, autoFocus: true })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxDEV("input", { id: "password", name: "password", type: "password", required: true })
      ] }),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          className: "primary-action",
          style: { width: "100%", justifyContent: "center", padding: "12px", fontSize: "14px" },
          children: "Sign In to Dashboard"
        }
      )
    ] }),
    /* @__PURE__ */ jsxDEV("div", { style: { marginTop: "24px", textAlign: "center", fontSize: "12px" }, children: /* @__PURE__ */ jsxDEV("a", { href: "/", style: { color: "#6b7280" }, children: "\u2190 Return to Storefront" }) })
  ] }) }) });
};
var AdminDashboardView = ({ user, stats, products, categories, settings }) => {
  return /* @__PURE__ */ jsxDEV(Layout, { title: "Admin Dashboard \u2014 BuyerNepal", children: /* @__PURE__ */ jsxDEV("div", { style: { minHeight: "100vh", background: "#f8f9fa" }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: { background: "#111827", color: "#fff", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxDEV("span", { className: "store-logo-mark", style: { width: "30px", height: "30px", fontSize: "14px" }, children: "B" }),
        /* @__PURE__ */ jsxDEV("strong", { children: "BuyerNepal Admin" }),
        /* @__PURE__ */ jsxDEV("span", { style: { background: "#374151", color: "#9ca3af", fontSize: "11px", padding: "2px 8px", borderRadius: "4px" }, children: "Edge SSR" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "16px", fontSize: "13px" }, children: [
        /* @__PURE__ */ jsxDEV("span", { style: { color: "#9ca3af" }, children: [
          "Logged in as ",
          /* @__PURE__ */ jsxDEV("b", { children: user.username })
        ] }),
        /* @__PURE__ */ jsxDEV("a", { href: "/", target: "_blank", style: { color: "#60a5fa" }, children: "View Store \u2197" }),
        /* @__PURE__ */ jsxDEV("form", { method: "post", action: "/api/auth/logout", style: { display: "inline" }, children: /* @__PURE__ */ jsxDEV("button", { type: "submit", style: { background: "transparent", border: "1px solid #4b5563", color: "#fff", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }, children: "Sign Out" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxDEV("main", { className: "store-shell", style: { padding: "36px 0" }, children: [
      /* @__PURE__ */ jsxDEV("h1", { style: { fontSize: "28px", fontWeight: 800, marginBottom: "24px", letterSpacing: "-1px" }, children: "Dashboard Overview" }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "36px" }, children: [
        /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxDEV("span", { style: { fontSize: "12px", color: "#6b7280", fontWeight: 600 }, children: "TOTAL PRODUCTS" }),
          /* @__PURE__ */ jsxDEV("strong", { style: { display: "block", fontSize: "32px", marginTop: "6px", color: "#111827" }, children: stats.products })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxDEV("span", { style: { fontSize: "12px", color: "#6b7280", fontWeight: 600 }, children: "CATEGORIES" }),
          /* @__PURE__ */ jsxDEV("strong", { style: { display: "block", fontSize: "32px", marginTop: "6px", color: "#111827" }, children: stats.categories })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxDEV("span", { style: { fontSize: "12px", color: "#6b7280", fontWeight: 600 }, children: "PENDING REVIEWS" }),
          /* @__PURE__ */ jsxDEV("strong", { style: { display: "block", fontSize: "32px", marginTop: "6px", color: stats.pendingReviews > 0 ? "#e11d48" : "#111827" }, children: stats.pendingReviews })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxDEV("span", { style: { fontSize: "12px", color: "#6b7280", fontWeight: 600 }, children: "ACTIVE COUPONS" }),
          /* @__PURE__ */ jsxDEV("strong", { style: { display: "block", fontSize: "32px", marginTop: "6px", color: "#111827" }, children: stats.activeCoupons })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxDEV("span", { style: { fontSize: "12px", color: "#6b7280", fontWeight: 600 }, children: "USERS" }),
          /* @__PURE__ */ jsxDEV("strong", { style: { display: "block", fontSize: "32px", marginTop: "6px", color: "#111827" }, children: stats.users })
        ] })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }, children: [
        /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }, children: /* @__PURE__ */ jsxDEV("h2", { style: { fontSize: "18px", fontWeight: 700 }, children: [
            "Curated Products (",
            products.length,
            ")"
          ] }) }),
          products.length > 0 ? /* @__PURE__ */ jsxDEV("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxDEV("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "13px" }, children: [
            /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { style: { borderBottom: "2px solid #f3f4f6", textAlign: "left", color: "#6b7280" }, children: [
              /* @__PURE__ */ jsxDEV("th", { style: { padding: "10px 0" }, children: "Product" }),
              /* @__PURE__ */ jsxDEV("th", { style: { padding: "10px 8px" }, children: "Price" }),
              /* @__PURE__ */ jsxDEV("th", { style: { padding: "10px 8px" }, children: "Status" }),
              /* @__PURE__ */ jsxDEV("th", { style: { padding: "10px 8px", textAlign: "right" }, children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxDEV("tbody", { children: products.map((p) => /* @__PURE__ */ jsxDEV("tr", { style: { borderBottom: "1px solid #f3f4f6" }, children: [
              /* @__PURE__ */ jsxDEV("td", { style: { padding: "12px 0", fontWeight: 600 }, children: /* @__PURE__ */ jsxDEV("a", { href: `/product/${p.id}`, target: "_blank", style: { color: "#111827" }, children: p.name }) }),
              /* @__PURE__ */ jsxDEV("td", { style: { padding: "12px 8px", color: "#111827", fontWeight: 600 }, children: [
                "Rs. ",
                p.price.toLocaleString("en-NP")
              ] }),
              /* @__PURE__ */ jsxDEV("td", { style: { padding: "12px 8px" }, children: /* @__PURE__ */ jsxDEV("span", { style: { background: p.is_active ? "#dcfce7" : "#fee2e2", color: p.is_active ? "#15803d" : "#b91c1c", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }, children: p.is_active ? "ACTIVE" : "DRAFT" }) }),
              /* @__PURE__ */ jsxDEV("td", { style: { padding: "12px 8px", textAlign: "right" }, children: /* @__PURE__ */ jsxDEV("a", { href: `/product/${p.id}`, target: "_blank", style: { color: "#2563eb", marginRight: "8px" }, children: "View" }) })
            ] }, p.id)) })
          ] }) }) : /* @__PURE__ */ jsxDEV("p", { style: { color: "#9ca3af", fontSize: "13px", padding: "20px 0" }, children: "No products listed yet." })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }, children: [
            /* @__PURE__ */ jsxDEV("h2", { style: { fontSize: "18px", fontWeight: 700, marginBottom: "14px" }, children: [
              "Categories (",
              categories.length,
              ")"
            ] }),
            categories.length > 0 ? /* @__PURE__ */ jsxDEV("ul", { style: { listStyle: "none", fontSize: "13px" }, children: categories.map((c) => /* @__PURE__ */ jsxDEV("li", { style: { padding: "8px 0", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsxDEV("span", { children: c.name }),
              /* @__PURE__ */ jsxDEV("code", { style: { fontSize: "11px", color: "#9ca3af" }, children: [
                "/",
                c.slug
              ] })
            ] }, c.id)) }) : /* @__PURE__ */ jsxDEV("p", { style: { color: "#9ca3af", fontSize: "13px" }, children: "No categories created yet." })
          ] }),
          /* @__PURE__ */ jsxDEV("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }, children: [
            /* @__PURE__ */ jsxDEV("h2", { style: { fontSize: "18px", fontWeight: 700, marginBottom: "12px" }, children: "Site Information" }),
            /* @__PURE__ */ jsxDEV("p", { style: { fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }, children: [
              "Title: ",
              /* @__PURE__ */ jsxDEV("b", { children: settings.site_title || "BuyerNepal" }),
              /* @__PURE__ */ jsxDEV("br", {}),
              "Description: ",
              /* @__PURE__ */ jsxDEV("i", { children: settings.site_description || "Shop Smarter in Nepal" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
};

// src/api.ts
var api = new Hono2();
api.get("/settings", async (c) => {
  const settings = await getSettings(c.env?.DB);
  return c.json({ settings });
});
api.get("/categories", async (c) => {
  const categories = await getCategories(c.env?.DB);
  return c.json({ categories });
});
api.get("/categories/:slug", async (c) => {
  const slug = c.req.param("slug");
  const category = await getCategoryBySlug(c.env?.DB, slug);
  if (!category) return c.json({ error: "Category not found" }, 404);
  const products = await getProducts(c.env?.DB, category.id);
  return c.json({ category, products });
});
api.get("/products", async (c) => {
  const products = await getProducts(c.env?.DB);
  return c.json({ products });
});
api.get("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!id) return c.json({ error: "Invalid product id" }, 400);
  const product = await getProductById(c.env?.DB, id);
  if (!product) return c.json({ error: "Product not found" }, 404);
  const reviews = await getReviews(c.env?.DB, id);
  return c.json({ product, reviews });
});
api.post("/auth/login", async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  if (!username || !password) {
    return c.json({ error: "Username and password required" }, 400);
  }
  const db = c.env?.DB;
  if (!db) {
    if (username.toLowerCase() === "admin" && password === "admin123") {
      return c.json({ ok: true, user: { id: 1, username: "admin", email: "admin@buyernepal.com", role: "admin" } });
    }
    return c.json({ error: "Invalid username or password" }, 401);
  }
  try {
    const u = await db.prepare(
      `SELECT u.*, COALESCE(r.role, 'user') role
         FROM users u
         LEFT JOIN user_roles r ON r.user_id = u.id
         WHERE u.username = ? COLLATE NOCASE LIMIT 1`
    ).bind(username).first();
    if (!u || !u.is_active) {
      return c.json({ error: "Invalid username or password" }, 401);
    }
    const h = await passwordHash(password, u.password_salt);
    if (!safeEqual(h.hash, u.password_hash)) {
      return c.json({ error: "Invalid username or password" }, 401);
    }
    await createSession(c, u.id);
    return c.json({ ok: true, user: { id: u.id, username: u.username, email: u.email, role: u.role } });
  } catch (e) {
    console.error("Login error:", e);
    return c.json({ error: "Login service temporarily unavailable" }, 500);
  }
});
api.get("/auth/me", async (c) => {
  const s = await getSession(c);
  if (!s) return c.json({ error: "Not authenticated" }, 401);
  return c.json({ user: { id: s.user_id, username: s.username, email: s.email, role: s.role } });
});
api.post("/auth/logout", (c) => {
  clearSession(c);
  return c.redirect("/admin/login");
});
api.get("/admin/analytics/stats", async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== "admin") return c.json({ error: "Unauthorized" }, 403);
  const stats = await getAdminStats(c.env?.DB);
  return c.json({ stats });
});
api.get("/admin/products", async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== "admin") return c.json({ error: "Unauthorized" }, 403);
  const products = await getProducts(c.env?.DB);
  return c.json({ products });
});
api.post("/admin/products", async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== "admin") return c.json({ error: "Unauthorized" }, 403);
  const db = c.env?.DB;
  if (!db) return c.json({ error: "Database not connected" }, 503);
  const i = await c.req.json();
  const name = String(i.name || "").trim();
  const price = Number(i.price);
  if (!name || isNaN(price) || price < 0) return c.json({ error: "Invalid product data" }, 400);
  const r = await db.prepare(
    `INSERT INTO products(name, description, price, image_url, affiliate_url, category_id, is_active)
       VALUES(?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    name,
    String(i.description || ""),
    price,
    String(i.image_url || ""),
    String(i.affiliate_url || ""),
    i.category_id ? Number(i.category_id) : null,
    i.is_active ? 1 : 0
  ).run();
  return c.json({ id: r.meta.last_row_id }, 201);
});

// src/index.tsx
var app = new Hono2();
app.use("*", cors());
app.use("*", async (c, next) => {
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
});
app.route("/api", api);
app.get("/robots.txt", (c) => {
  return c.text(
    `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Sitemap: https://buyernepal.pages.dev/sitemap.xml
`
  );
});
app.get("/sitemap.xml", async (c) => {
  const categories = await getCategories(c.env?.DB);
  const products = await getProducts(c.env?.DB);
  const urls = [
    "https://buyernepal.pages.dev/",
    ...categories.map((cat) => `https://buyernepal.pages.dev/category/${cat.slug}`),
    ...products.map((prod) => `https://buyernepal.pages.dev/product/${prod.id}`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>`;
  return c.text(xml, 200, { "Content-Type": "application/xml; charset=utf-8" });
});
app.get("/", async (c) => {
  const [settings, categories, products] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getProducts(c.env?.DB)
  ]);
  return c.html(/* @__PURE__ */ jsxDEV(HomePage, { settings, categories, products }));
});
app.get("/category/:slug", async (c) => {
  const slug = c.req.param("slug");
  const [settings, categories, category] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getCategoryBySlug(c.env?.DB, slug)
  ]);
  if (!category) {
    return c.redirect("/");
  }
  const products = await getProducts(c.env?.DB, category.id);
  return c.html(
    /* @__PURE__ */ jsxDEV(CategoryPage, { settings, categories, category, products })
  );
});
app.get("/product/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!id) return c.redirect("/");
  const [settings, categories, product] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getProductById(c.env?.DB, id)
  ]);
  if (!product) {
    return c.redirect("/");
  }
  const reviews = await getReviews(c.env?.DB, id);
  return c.html(
    /* @__PURE__ */ jsxDEV(ProductPage, { settings, categories, product, reviews })
  );
});
app.get("/admin/login", async (c) => {
  const s = await getSession(c);
  if (s && s.role === "admin") return c.redirect("/admin");
  return c.html(/* @__PURE__ */ jsxDEV(AdminLoginView, {}));
});
app.post("/admin/login", async (c) => {
  let username = "";
  let password = "";
  try {
    const body = await c.req.parseBody();
    username = String(body["username"] || "").trim();
    password = String(body["password"] || "");
  } catch {
    return c.html(/* @__PURE__ */ jsxDEV(AdminLoginView, { error: "Invalid form submission" }));
  }
  const db = c.env?.DB;
  if (!db) {
    if (username.toLowerCase() === "admin" && password === "admin123") {
      await createSession(c, 1);
      return c.redirect("/admin");
    }
    return c.html(/* @__PURE__ */ jsxDEV(AdminLoginView, { error: "Invalid username or password" }));
  }
  try {
    const u = await db.prepare(
      `SELECT u.*, COALESCE(r.role, 'user') role
         FROM users u
         LEFT JOIN user_roles r ON r.user_id = u.id
         WHERE u.username = ? COLLATE NOCASE LIMIT 1`
    ).bind(username).first();
    if (!u || !u.is_active || u.role !== "admin") {
      return c.html(/* @__PURE__ */ jsxDEV(AdminLoginView, { error: "Invalid administrator credentials" }));
    }
    const h = await passwordHash(password, u.password_salt);
    if (!safeEqual(h.hash, u.password_hash)) {
      return c.html(/* @__PURE__ */ jsxDEV(AdminLoginView, { error: "Invalid administrator credentials" }));
    }
    await createSession(c, u.id);
    return c.redirect("/admin");
  } catch {
    return c.html(/* @__PURE__ */ jsxDEV(AdminLoginView, { error: "Login service temporarily unavailable" }));
  }
});
app.get("/admin", async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== "admin") {
    return c.redirect("/admin/login");
  }
  const [settings, categories, products, stats] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getProducts(c.env?.DB),
    getAdminStats(c.env?.DB)
  ]);
  return c.html(
    /* @__PURE__ */ jsxDEV(
      AdminDashboardView,
      {
        user: { username: s.username, email: s.email },
        stats,
        products,
        categories,
        settings
      }
    )
  );
});
var index_default = app;
export {
  index_default as default
};
