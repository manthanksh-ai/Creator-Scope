import {env} from 'cloudflare:workers';
import handler from '../../../server/ai-endpoint.mjs';
export const dynamic='force-dynamic';
export const GET=(request:Request)=>handler.fetch(request,env);
