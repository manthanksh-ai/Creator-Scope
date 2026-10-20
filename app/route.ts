import page from '../src/page.html?raw';
export const dynamic='force-dynamic';
export function GET(){return new Response(page,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})}
