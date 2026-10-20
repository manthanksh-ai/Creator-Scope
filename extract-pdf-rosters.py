from pathlib import Path
import json,re,pdfplumber
from urllib.parse import urlparse
out=[];layout=Path('tmp/pdfs/oml-layout.txt').read_text().split('\f');links=json.loads(Path('tmp/pdfs/oml.json').read_text())
def number(s):
 s=re.sub(r'\s+','',s or '').replace(',','').upper();m=re.fullmatch(r'(\d+(?:\.\d+)?)([KML]?)',s);return float(m[1])*{'K':1000,'M':1000000,'L':100000,'':1}[m[2]] if m else None
def igurl(u):
 a=urlparse(u);parts=a.path.strip('/').split('/');return 'https://www.instagram.com/'+parts[0].lower()+'/' if a.hostname and a.hostname.endswith('instagram.com') and parts[0] not in ['p','reel','stories'] else ''
with pdfplumber.open(Path('/Users/manthan/Downloads')/"OML Artist Roster October'26.pdf") as pdf:
 for page in links:
  igs=list({igurl(l['uri']):l for l in page['links'] if igurl(l['uri'])}.values());yts=list({l['uri'].split('?')[0]:l for l in page['links'] if 'youtube.com/' in l['uri'] and '/watch' not in l['uri']}.values())
  if not igs and not yts:continue
  lines=[x.strip() for x in layout[page['page']-1].splitlines() if x.strip()];idx=next((i for i,x in enumerate(lines[:8]) if '|' in x or re.search(r'\sI\s',x) or re.fullmatch(r'(?:Food|Acting|Music|Singer|Comedy|Technology|Storytelling|Knowledge|Lifestyle|Infotainment|Writing|Singer/ Songwriter|Musical band/ Songwriters)',x)),None)
  if idx is None:continue
  name=' '.join(lines[:idx]);genres=[v.strip() for v in re.split(r'\s*[|]\s*|\s+I\s+',lines[idx]) if v.strip()];p=pdf.pages[page['page']-1];words=p.extract_words()
  def metric(link):
   top=p.height-float(link['rect'][3]);candidate=[w for w in words if number(w['text']) is not None and number(w['text'])>=1000 and abs(w['top']-top)<16 and w['x0']>250]
   return number(min(candidate,key=lambda w:abs(w['top']-top))['text']) if candidate else None
  out.append({'name':name,'ig':igurl(igs[0]['uri']) if igs else '','yt':yts[0]['uri'].split('?')[0] if len(yts)==1 else '', 'followers':metric(igs[0]) if igs else None,'subscribers':metric(yts[0]) if len(yts)==1 else None,'city':None,'genres':genres,'agency':'OML','page':page['page'],'sourceDate':'October 2026','quotes':[]})
with pdfplumber.open('/Users/manthan/Downloads/BRAND QUOTE SHEET - FEB 2026.pdf') as pdf:
 for i,p in enumerate(pdf.pages):
  for tab in p.find_tables():
   table=tab.extract()
   for ridx,row in enumerate(table):
    if len(row)!=7:continue
    clean=lambda x:' '.join(v.strip() for v in (x or '').split('\n') if not re.fullmatch(r'[FEBRUAY]',v.strip()))
    row=list(map(clean,row))
    if number(row[1]) is None:continue
    name=row[0];top,bottom=tab.rows[ridx].bbox[1],tab.rows[ridx].bbox[3];ls=[l for l in json.loads(Path('tmp/pdfs/lvc.json').read_text())[i]['links'] if igurl(l['uri']) and top<=p.height-(float(l['rect'][1])+float(l['rect'][3]))/2<=bottom];urls=list(dict.fromkeys(igurl(l['uri']) for l in ls));quotes=[{'type':typ,'value':number(row[col])} for typ,col in [('Story',2),('Static post',3),('Reel',4)]]
    out.append({'name':name,'ig':urls[0] if len(urls)==1 else '', 'yt':'','followers':number(row[1]),'city':row[6],'genres':['Comedy'],'agency':'LVC Media','page':i+1,'sourceDate':'February 2026','quotes':[q for q in quotes if q['value'] is not None]})
Path('pdf-roster-records.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print(json.dumps({'records':len(out),'oml':sum(r['agency']=='OML' for r in out),'lvc':sum(r['agency']=='LVC Media' for r in out),'omlUnknownFollowers':sum(r['agency']=='OML' and r['followers'] is None for r in out),'missingIG':[r['name'] for r in out if not r['ig']]}))
