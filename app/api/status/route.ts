import handler from '../../../server/ai-endpoint.mjs';
export const dynamic='force-dynamic';
export const GET=(request:Request)=>handler.fetch(request,process.env);
