import {countryFromCity,reelPerformance} from '../src/core.mjs';
const known=v=>v!=null&&v!==''&&!(typeof v==='string'&&/^Unknown\b/i.test(v))&&(!Array.isArray(v)||v.length);
const field=(value,sources=[],note='',status='Source reported')=>({value,sources:sources.filter(u=>/^https?:\/\//.test(u||'')),note,status});
export function creatorIntelligence(c){
 const f=c.briefing?.facts||{},fact=(key,confirmed=false)=>{
  const v=f[key];if(!known(v?.value)||(!v.sources?.length&&!v.importedSource)||confirmed&&(!v.creatorConfirmed||!v.confirmedAt))return null;
  return field(v.value,v.sources,v.note||'',v.creatorConfirmed?'Creator confirmed':'Source reported');
 };
 const imported=(v,note='')=>known(v)?field(v,[],note,'Reported source snapshot'):null;
 const performance=c.performance||reelPerformance(c),content={
  'Content description':fact('description')||imported(c.descriptions),
  'Topics & niches':fact('topics')||imported(c.genres),
  'Formats':fact('formats'),'Style & tone':fact('tone'),
  'Series / IPs':imported(c.series),'Posting frequency':fact('postingFrequency')
 };
 const collaborations={'Past partnerships':fact('partnerships')||imported(c.pastCampaigns,'A source mention does not establish an active or paid partnership.'),'Family content examples':fact('familyExamples'),'Open to family collaborations':fact('familyCollab',true),'Interviews':fact('interviews',true),'Event appearances':fact('events',true)};
 const sections=[{title:'Content & work',fields:content,examples:c.briefing?.examples||[]},{title:'Collaborations',fields:collaborations}].map(s=>({...s,fields:Object.fromEntries(Object.entries(s.fields).filter(([k,v])=>v))})).filter(s=>Object.keys(s.fields).length||s.examples?.length);
 return {schemaVersion:2,reviewedAt:c.briefing?.reviewedAt||null,sections,country:countryFromCity(c.city),ageBand:fact('ageBand',true)?.value||null,gender:fact('gender')?.value||c.gender||null,languages:fact('languages')?.value||c.languages||null,performance};
}
