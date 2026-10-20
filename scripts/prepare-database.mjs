import fs from 'node:fs/promises';
const target=new URL('../src/database.json',import.meta.url);
let input;
if(process.env.CREATOR_DATABASE_URL){
  const url=new URL(process.env.CREATOR_DATABASE_URL);
  if(url.protocol!=='https:')throw Error('CREATOR_DATABASE_URL must use HTTPS');
  const headers=process.env.CREATOR_DATABASE_TOKEN?{Authorization:'Bearer '+process.env.CREATOR_DATABASE_TOKEN}:{};
  const response=await fetch(url,{headers,signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error('Private creator database download failed: '+response.status);
  input=await response.text();
}else{
  try{input=await fs.readFile(target,'utf8')}catch(error){
    if(error.code!=='ENOENT')throw error;
    input=await fs.readFile(new URL('../src/database.example.json',import.meta.url),'utf8');
    console.warn('No private creator database configured. Building with an empty catalog.');
  }
}
const data=JSON.parse(input);
if(!data||!Array.isArray(data.creators)||!Array.isArray(data.sources)||!data.stats)throw Error('Invalid creator database structure');
await fs.writeFile(target,JSON.stringify(data));
