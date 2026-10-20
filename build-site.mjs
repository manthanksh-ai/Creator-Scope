import fs from 'node:fs';
const root=new URL('.',import.meta.url),out=new URL('public/',root);
fs.mkdirSync(out,{recursive:true});
fs.rmSync(new URL('database.json',out),{force:true});
for(const name of ['app.js','styles.css','core.mjs'])fs.copyFileSync(new URL('src/'+name,root),new URL(name,out));
fs.writeFileSync(new URL('connection.json',out),JSON.stringify({endpoint:'/api',mode:'ai'}));
console.log('Prepared CreatorScope browser assets.');
