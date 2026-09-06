# BuyerNepal

BuyerNepal is a Nepal-focused shopping discovery platform built with React, Vite, Cloudflare Workers and D1. It helps shoppers discover curated products, browse categories, inspect product details and continue to the seller through affiliate/store links.

## Product surface

- Responsive storefront with mobile navigation
- Product search and category filtering
- Curated product cards with NPR pricing
- Product detail pages with seller links and approved reviews
- Category landing pages
- Admin authentication and management panel
- Product, category, review, coupon, user, script, settings and analytics management
- D1-backed API on the same Worker origin
- Sanitized custom homepage content
- Loading, empty, error and not-found states
- Cloudflare Workers Static Assets + D1 deployment

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Cloudflare Workers
- Cloudflare D1
- DOMPurify

## Local development

```bash
npm install
npm run build
npm run dev
```

The Worker uses the `DB` D1 binding defined in `wrangler.json`. Database migrations live in `migrations/`.

## Cloudflare Workers Builds

Connect the repository to the `buyernepal` Worker and use:

- **Production branch:** `main`
- **Build command:** leave blank when using the package deploy script
- **Deploy command:** `npm run deploy`
- **Root directory:** `/`

`npm run deploy` builds the Vite frontend and then runs `wrangler deploy`; its `predeploy` lifecycle also applies remote D1 migrations. Workers Builds does not use the `build` section in `wrangler.json`, so dashboard Build/Deploy settings are authoritative.

If you prefer separate dashboard stages, use **Build command** `npm run build` and **Deploy command** `npx wrangler deploy`; apply D1 migrations separately before the first production deployment.

## D1

The Worker expects:

- Binding: `DB`
- Database: `buyernepal`
- Database ID: `8e38f998-1dc6-4949-b630-deca3e23d9a8`

Never put database credentials or Cloudflare API tokens in source control.

## Production checklist

1. Confirm the Worker name matches `buyernepal`.
2. Confirm the `DB` binding points to the production D1 database.
3. Confirm Workers Builds has a valid API token and the token has not hit the account token quota.
4. Deploy from `main`.
5. Confirm the deployment contains Vite-generated `/assets/*.js` files rather than serving `/src/main.tsx` directly.
6. Open `/`, a category page, a product page and `/admin/login` after deployment.
7. Apply/verify D1 migrations before expecting catalog or admin data.
