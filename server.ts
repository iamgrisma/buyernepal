import { serve } from '@hono/node-server';
import app from './src/index';

const port = 3000;
const hostname = '0.0.0.0';

serve(
  {
    fetch: app.fetch,
    port,
    hostname
  },
  (info) => {
    console.log(`BuyerNepal server running on http://${hostname}:${info.port}`);
  }
);
