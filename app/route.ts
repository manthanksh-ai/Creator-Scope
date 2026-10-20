import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const page=readFileSync(join(process.cwd(),'src/page.html'),'utf8');
export const dynamic='force-dynamic';
export function GET(){return new Response(page,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})}
