import {countryFromCity,reelPerformance} from '../src/core.mjs';
const publicLink=u=>/^https?:\/\//i.test(u||'')&&!/docs\.google\.com|drive\.google\.com/i.test(u);
export function publicCreator(c){
 const approved=c.publicRateApproved===true,performance=reelPerformance(c);
 const {age,feeTerms,categoryBlocks,rateQuotes,reelMetrics,briefing,sourceRefs,extraSources,fieldEvidence,...rest}=c;
 const facts=Object.fromEntries(Object.entries(briefing?.facts||{}).filter(([k])=>!['sourceDeliverables','sourceProductionNotes','declinedCategories','topicsAvoided','exclusivity','disclosure','accessibility','productionLimits'].includes(k)));
 const safeFacts=Object.fromEntries(Object.entries(facts).map(([k,v])=>[k,{...v,sources:(v.sources||[]).filter(publicLink),importedSource:!!v.sources?.some(u=>!publicLink(u))}]));
 return {...rest,cost:approved?c.cost:null,rateQuotes:approved?rateQuotes:[],feeTerms:undefined,categoryBlocks:[],country:countryFromCity(c.city),performance,avgViews:performance?.averageViews??c.avgViews,viewBasis:performance?.averageViews!=null?'Last 10 reels':'Reported average; sample window unverified',briefing:{...briefing,facts:safeFacts},sourceRefs:(sourceRefs||[]).filter(r=>publicLink(r.url)),extraSources:(extraSources||[]).filter(publicLink),fieldEvidence:Object.fromEntries(Object.entries(fieldEvidence||{}).filter(([k])=>!/cost|rate|fee/i.test(k)).map(([k,rows])=>[k,rows.map(r=>({...r,source:publicLink(r.source)?r.source:''}))]))};
}
