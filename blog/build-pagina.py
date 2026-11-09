import json,sys
sys.path.insert(0,'.')
exec(open('b.py').read().split('# card')[0])
U=S+'/wp-content/uploads/2026/11/'
FB={'meta-ads':'metodo-fase-01.jpg','google-ads':'metodo-fase-02.jpg','lead-email':'metodo-fase-03.jpg','web-design':'metodo-fase-04.jpg','seo-analytics':'chisiamo-abstract.jpg','brand-strategia':'metodo-abstract.jpg','casi-studio':'metodo-fase-02.jpg','ai-social':'metodo-fase-04.jpg'}
fb=''.join('.e-loop-item.category-%s .pa-bc-media,.e-loop-item.category-%s .pa-bf-media{background-image:url(%s%s)}\n'%(k,k,U,v) for k,v in FB.items())
OLD='a[href$="/category/blog/"],a[href$="/category/uncategorized/"],a[href$="/category/senza-categoria/"]'
CSS='''.pa-bl{--pa-ink:var(--e-global-color-ink,#000);--pa-muted:var(--e-global-color-muted,#57575C);--pa-brand:var(--e-global-color-brand,#233DFF);font-family:Poppins,system-ui,sans-serif}
.pa-bc{position:relative;width:100%;display:flex;flex-direction:column;gap:0;padding:0!important}
.pa-bc-media{aspect-ratio:16/10;border-radius:16px;overflow:hidden;background-size:cover;background-position:center;background-color:#0A0A0A;transition:box-shadow .3s,transform .3s;width:100%}
.pa-bc:hover .pa-bc-media{box-shadow:0 20px 50px -25px rgba(35,61,255,.45);transform:translateY(-2px)}
.pa-bc-meta{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;gap:10px;margin-top:20px}
.pa-bc-chip .elementor-heading-title{display:inline-flex;gap:6px;font:600 12px/16px Poppins,sans-serif}
.pa-bc-chip a{display:inline-flex;border-radius:9999px;background:rgba(35,61,255,.1);color:var(--pa-brand,#233DFF);padding:4px 12px;font:600 12px/16px Poppins,sans-serif;text-decoration:none;position:relative;z-index:4}
.pa-bc-chip a[href$="/category/blog/"],.pa-bc-chip a[href$="/category/uncategorized/"],.pa-bc-chip a[href$="/category/senza-categoria/"]{display:none!important}
.pa-bc-date .elementor-heading-title{font:500 13px/20px Poppins,sans-serif;color:#57575C}
.pa-bc-title{margin-top:10px}
.pa-bc-title .elementor-heading-title{margin:0;font:600 20px/28px Poppins,sans-serif;color:#000;letter-spacing:-.01em;transition:color .2s}
.pa-bc-title a{color:inherit;text-decoration:none}
.pa-bc-title a:after{content:"";position:absolute;inset:0;z-index:3}
.pa-bc:hover .pa-bc-title .elementor-heading-title{color:#233DFF}
.pa-bc-title a:focus-visible:after{outline:3px solid #233DFF;outline-offset:4px;border-radius:16px}
.pa-bf{position:relative;display:grid!important;grid-template-columns:minmax(0,1fr);gap:28px;align-items:center;width:100%}
@media(min-width:1024px){.pa-bf{grid-template-columns:repeat(12,minmax(0,1fr));gap:48px}.pa-bf-media{grid-column:1 / span 7}.pa-bf-body{grid-column:8 / span 5}}
.pa-bf-media{aspect-ratio:16/10;border-radius:24px;overflow:hidden;background-size:cover;background-position:center;background-color:#0A0A0A}
.pa-bf .pa-bc-meta{margin-top:0}
.pa-bf-title{margin-top:16px}
.pa-bf-title .elementor-heading-title{margin:0;font:700 clamp(1.75rem,3vw,2.5rem)/1.12 Poppins,sans-serif;letter-spacing:-.025em;color:#000;text-wrap:balance}
.pa-bf-title a{color:inherit;text-decoration:none}
.pa-bf-title a:after{content:"";position:absolute;inset:0;z-index:3}
.pa-bf-ex{margin-top:16px}
.pa-bf-ex p{margin:0;font:400 16px/26px Poppins,sans-serif;color:#57575C;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.pa-bf-cta{margin-top:28px}
.pa-bf-cta .elementor-button{display:inline-flex;align-items:center;gap:8px;border-radius:9999px;background:#233DFF;color:#fff;padding:14px 26px;font:600 15px/24px Poppins,sans-serif;transition:background-color .2s}
.pa-bf:hover .pa-bf-cta .elementor-button{background:#1A2ECC}
.pa-cf{display:flex;flex-wrap:wrap;gap:10px}
.pa-cf a{display:inline-flex;align-items:center;border-radius:9999px;border:1px solid rgba(0,0,0,.15);padding:10px 20px;font:600 14px/20px Poppins,sans-serif;color:#000;text-decoration:none;white-space:nowrap;transition:border-color .2s,background-color .2s,color .2s}
.pa-cf a:hover{border-color:#000}
.blog:not(.paged) .pa-cf a[data-c=all],.category-meta-ads .pa-cf a[data-c=meta-ads],.category-google-ads .pa-cf a[data-c=google-ads],.category-lead-email .pa-cf a[data-c=lead-email],.category-web-design .pa-cf a[data-c=web-design],.category-seo-analytics .pa-cf a[data-c=seo-analytics],.category-brand-strategia .pa-cf a[data-c=brand-strategia],.category-ai-social .pa-cf a[data-c=ai-social],.category-casi-studio .pa-cf a[data-c=casi-studio]{background:#233DFF;border-color:#233DFF;color:#fff}
@media(max-width:767px){.pa-cf{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;margin:0 -24px;padding:0 24px}.pa-cf::-webkit-scrollbar{display:none}}
body.category .pa-feat,body.paged .pa-feat,body.category .pa-sub-static,body.archive:not(.category) .pa-feat{display:none}
body:not(.category) .pa-sub-desc{display:none}
body.blog:not(.paged) .pa-gsec .e-loop-item:first-child{display:none}
.pa-gsec .e-pagination,.pa-gsec .elementor-pagination{margin-top:56px}
.pa-gsec .page-numbers{display:inline-flex;min-width:40px;height:40px;align-items:center;justify-content:center;border-radius:9999px;border:1px solid rgba(0,0,0,.15);font:600 14px/20px Poppins,sans-serif;color:#000;text-decoration:none;margin:0 3px;padding:0 12px}
.pa-gsec .page-numbers.current{background:#233DFF;border-color:#233DFF;color:#fff}
.pa-gsec .page-numbers:hover:not(.current){border-color:#000}
'''.replace('OLD',OLD)+fb
open('bl.css','w').write(CSS)
def W(wt,s):return {"id":nid(),"elType":"widget","widgetType":wt,"settings":s,"elements":[]}
def C(ch,css,s=None,inner=True):
    return cont(ch,css,s,inner)
def sec(eid,css,bg,pad,els):
    p=lambda t,b:{"top":str(t),"bottom":str(b),"left":"24","right":"24","unit":"px","isLinked":False}
    s={"_element_id":eid,"css_classes":"pa-sec pa-bl "+css,"background_background":"classic","background_color":bg,"content_width":"boxed","boxed_width":{"size":1272,"unit":"px"},"padding":p(*pad[0]),"padding_tablet":p(*pad[1]),"padding_mobile":p(*pad[2])}
    return {"id":nid(),"elType":"container","settings":s,"elements":els,"isInner":False}
def build(mode):
    arch=(mode=='archive')
    if arch:
        h1=W('heading',{"_css_classes":"pa-h1","header_size":"h1","title":"Aggiornamenti","__dynamic__":{"title":tag('archive-title',{})}})
    else:
        h1=W('heading',{"_css_classes":"pa-h1","header_size":"h1","title":"Aggiornamenti"})
    sub=[W('text-editor',{"_css_classes":"pa-lead pa-sub-static","editor":"<p>Guide pratiche, novità e riflessioni su siti web, advertising, lead generation e intelligenza artificiale, dal team di Propaganda Adv.</p>"})]
    if arch: sub.append(W('text-editor',{"_css_classes":"pa-lead pa-sub-desc","editor":"Descrizione","__dynamic__":{"editor":tag('archive-description',{})}}))
    hero=sec('intro-aggiornamenti','pa-intro','#FFFFFF',[(168,72),(136,56),(136,48)],[C([W('heading',{"_css_classes":"pa-kick","header_size":"span","title":"Blog"}),h1]+sub,"pa-introin")])
    fl={"_skin":"post","template_id":"21407","columns":"1","posts_per_page":"1","post_query_post_type":"post","post_query_orderby":"post_date","post_query_order":"desc","post_query_ignore_sticky_posts":"yes","_css_classes":"pa-featgrid"}
    feat=sec('articolo-in-evidenza','pa-feat','#FFFFFF',[(0,56),(0,48),(0,40)],[W('loop-grid',fl)])
    links=[('all','Tutti',S+'/aggiornamenti/')]+[(k,v,S+'/category/'+k+'/') for k,v in (('meta-ads','Meta Ads'),('google-ads','Google Ads'),('lead-email','Lead ed Email'),('web-design','Web Design'),('seo-analytics','SEO e Analytics'),('brand-strategia','Brand e Strategia'),('ai-social','AI e Social'),('casi-studio','Casi Studio'))]
    bar='<nav class="pa-cf" aria-label="Filtra per macroarea">'+''.join('<a href="%s" data-c="%s">%s</a>'%(u,k,t) for k,t,u in links)+'</nav>'
    flt=sec('filtri-aggiornamenti','pa-fsec','#FFFFFF',[(0,40),(0,32),(0,32)],[W('html',{"html":bar})])
    gq={"_skin":"post","template_id":"21406","columns":"3","columns_tablet":"2","columns_mobile":"1","posts_per_page":"9","pagination_type":"numbers","pagination_load_type":"page_reload","pagination_align":"center","_css_classes":"pa-grid"}
    if arch: gq["post_query_post_type"]="current_query"
    else: gq.update({"post_query_post_type":"post","post_query_orderby":"post_date","post_query_order":"desc","post_query_avoid_duplicates":"yes","post_query_ignore_sticky_posts":"yes"})
    grid=sec('griglia-aggiornamenti','pa-gsec','#FFFFFF',[(0,128),(0,96),(0,80)],[W('loop-grid',gq)])
    nl=sec('newsletter-aggiornamenti','pa-cta pa-dots','#000000',[(112,112),(96,96),(88,88)],[C([W('heading',{"_css_classes":"pa-kick pa-kick-w","header_size":"span","title":"Resta aggiornato"}),W('heading',{"_css_classes":"pa-ctah2","header_size":"h2","title":"Vuoi un confronto sui tuoi obiettivi di crescita?"}),W('text-editor',{"_css_classes":"pa-ctap","editor":"<p>Raccontaci di cosa ha bisogno la tua azienda: ti rispondiamo entro un giorno lavorativo.</p>"}),C([W('button',{"_css_classes":"pa-cbtn","link":{"url":S+"/#contatti"},"text":"Richiedi una consulenza"})],"pa-ctabtns",{"flex_direction":"row"})],"pa-ctain")])
    style=W('html',{"_css_classes":"pa-cs-code","hide_desktop":"hidden-desktop","hide_mobile":"hidden-mobile","hide_tablet":"hidden-tablet","html":"<style id=\"pa-bl-css\">"+CSS+"</style>"})
    nl["elements"][0]["elements"].append(style)
    return [hero,feat,flt,grid,nl]
for m in('archive','page'):
    json.dump(build(m),open('%s.json'%m,'w'),ensure_ascii=False,separators=(',',':'))
    print(m,len(open('%s.json'%m).read()))
