import { Context } from 'hono';
import { AppEnv } from '../index';

const DEFAULT_CACHE_TTL_SECONDS = 60 * 5; // 5 minutes

/**
 * Basic Cache Get Helper (using KV)
 * @param c Hono Context
 * @param key Cache key
 * @returns Cached data or null
 */
export async function getFromCache<T>(c: Context<AppEnv>, key: string): Promise<T | null> {
    if (!c.env.CACHE_KV) {
        console.warn("CACHE_KV binding not configured. Skipping cache get.");
        return null;
    }
    try {
        const cached = await c.env.CACHE_KV.get<T>(key, 'json');
        console.log(`Cache ${cached ? 'HIT' : 'MISS'} for key: ${key}`);
        return cached;
    } catch (e) {
        console.error(`Error getting from cache key ${key}:`, e);
        return null;
    }
}

/**
 * Basic Cache Put Helper (using KV)
 * @param c Hono Context
 * @param key Cache key
 * @param data Data to cache (must be JSON serializable)
 * @param ttlSeconds Time-to-live in seconds
 */
export async function putInCache<T>(c: Context<AppEnv>, key: string, data: T, ttlSeconds: number = DEFAULT_CACHE_TTL_SECONDS): Promise<void> {
     if (!c.env.CACHE_KV) {
        console.warn("CACHE_KV binding not configured. Skipping cache put.");
        return;
    }
    try {
        // Use waitUntil to not block the response
        c.executionCtx.waitUntil(
            c.env.CACHE_KV.put(key, JSON.stringify(data), { expirationTtl: ttlSeconds })
        );
        console.log(`Cache PUT for key: ${key} with TTL: ${ttlSeconds}s`);
    } catch (e) {
        console.error(`Error putting into cache key ${key}:`, e);
    }
}

/**
 * Cache Middleware Example (Apply to specific routes)
 * Fetches from cache first, otherwise calls the handler and caches the result.
 */
export const cacheMiddleware = (keyPrefix: string, ttlSeconds: number = DEFAULT_CACHE_TTL_SECONDS) => {
    return async (c: Context<AppEnv>, next: Function) => {
        if (!c.env.CACHE_KV) {
            console.warn("CACHE_KV binding not configured. Skipping cache middleware.");
            await next();
            return;
        }

        // Generate a cache key based on the URL or specific params
        // WARNING: Be careful with query params, hash them or select specific ones if needed
        const cacheKey = `${keyPrefix}:${c.req.url}`; // Simple example, might need refinement

        const cachedResponse = await getFromCache<any>(c, cacheKey);
        if (cachedResponse) {
             // Reconstruct response - assumes JSON was cached
             // NOTE: This simple version doesn't cache headers, status codes etc.
            return c.json(cachedResponse);
        }

        // Cache miss, proceed to the handler
        await next();

        // After handler runs, cache the response if it was successful (e.g., 2xx status)
        // Check if response body exists and is valid before caching
        if (c.res && c.res.ok && c.res.body) {
             try {
                // Clone response to read body for caching without consuming it for the client
                const responseData = await c.res.clone().json();
                await putInCache(c, cacheKey, responseData, ttlSeconds);
             } catch(e) {
                 console.error(`Failed to cache response for key ${cacheKey}:`, e);
             }
        }
    };
};
