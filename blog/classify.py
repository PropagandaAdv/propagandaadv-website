import json,re
rows=json.load(open('rows.json'))
R=[
('casi-studio',[r'caso studio',r'caso-studio']),
('web-design',[r'wordpress',r'elementor',r'sito web',r'sito wordpress',r'preventivo sito',r'landing page',r'rinfresca il tuo sito',r'cloud computing',r'cybersecurity',r'backup',r'presenza online',r'web designer']),
('seo-analytics',[r'\bseo\b',r'analytics',r'ga4',r'search console',r'analisi di dati',r'dati analitici',r'vanity metrics',r'utm',r'ricerca semantica',r'tool di tracciamento llm',r'proprietari dei dati',r'privacy']),
('email-automazioni',[r'email',r'mail',r'newsletter',r'automazion',r'whatsapp',r'hubspot']),
('lead-generation',[r'lead generation',r'lead ',r'leads',r'outreach',r'colli di bottiglia',r'processo di vendita']),
('google-ads',[r'google ads',r'google shopping',r'google marketing mix',r'google annuncia',r'parametri di personalizzazione',r'google']),
('meta-ads',[r'meta',r'facebook',r'daba',r'advantage',r'cpm',r'pixel',r'catalogo',r'frequenza']),
]
OV={ # manual overrides by id
1:None,
20768:'seo-analytics',  # SaaS SEO
20766:'strategia-ai',
8727:'google-ads',
8720:'strategia-ai',   # AI di Meta
8693:'meta-ads',
8585:'strategia-ai',
8517:'google-ads',    # YouTube Ads lead gen (Google)
8316:'google-ads',    # YouTube Ads
8455:'strategia-ai',  # TikTok ads
8084:'strategia-ai',
8883:None,
7222:'strategia-ai',  # prompt chatgpt ecommerce
8599:'strategia-ai',8800:'strategia-ai',8847:'strategia-ai',21289:'web-design',21267:'strategia-ai',21107:'strategia-ai',
21114:'strategia-ai',20981:'strategia-ai',9060:'strategia-ai',9053:'email-automazioni',9027:'email-automazioni',
9066:'strategia-ai',8442:'strategia-ai',8333:'strategia-ai',20585:'strategia-ai',8128:'strategia-ai',
5752:'meta-ads',9040:'lead-generation',8817:'strategia-ai',8808:'strategia-ai',8791:'lead-generation',
3888:'strategia-ai',4146:'strategia-ai',4039:'strategia-ai',8193:'strategia-ai',8638:'strategia-ai',
8474:'strategia-ai',7793:'strategia-ai',8044:'strategia-ai',8246:'strategia-ai',2385:'strategia-ai',8645:'strategia-ai',
8627:'strategia-ai',8662:'strategia-ai',8673:'strategia-ai',8435:'strategia-ai',9014:'strategia-ai',8992:'strategia-ai',9034:'strategia-ai',
8962:'email-automazioni',8944:'email-automazioni',8905:'email-automazioni',8898:'email-automazioni',8733:'email-automazioni',8783:'lead-generation',
4240:'seo-analytics',8272:'seo-analytics',7505:'seo-analytics',
21250:'google-ads',21183:'lead-generation',21098:'seo-analytics',21129:'web-design',21218:'web-design',
8576:'google-ads',8621:'meta-ads',7786:'meta-ads',7772:'meta-ads',7894:'meta-ads',8069:'meta-ads',
8666:'strategia-ai',8651:'web-design',8034:'web-design',7237:'meta-ads',
8853:'lead-generation',8427:'lead-generation',8502:'lead-generation',7035:'google-ads',
}
out=[]
for r in rows:
    t=(r['title']+' '+r['slug']).lower()
    c=OV.get(r['id'],'?')
    why='manuale'
    if r['id'] not in OV:
        c='strategia-ai';why='default'
        for k,pats in R:
            if any(re.search(p,t) for p in pats): c=k;why='parola chiave';break
    r['area']=c;r['why']=why
    out.append(r)
json.dump(out,open('classified.json','w'),ensure_ascii=False)
from collections import Counter
print(Counter(r['area'] for r in out))
for k in ['strategia-ai','web-design','seo-analytics','lead-generation','email-automazioni']:
    print('==',k)
    for r in out:
        if r['area']==k: print(r['id'],r['title'][:80],r['why'])
