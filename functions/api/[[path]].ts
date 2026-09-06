import worker from '../../src/index';

interface Context {
  request: Request;
  env: any;
}

export async function onRequest(context: Context): Promise<Response> {
  return worker.fetch(context.request, context.env);
}
