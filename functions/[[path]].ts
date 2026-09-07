import app from '../src/index';

interface Context {
  request: Request;
  env: any;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
}

export async function onRequest(context: Context): Promise<Response> {
  return app.fetch(context.request, context.env, context as any);
}
