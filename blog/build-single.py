import json
exec(open('b.py').read().split('# card')[0])
exec(open('page.py').read().split('def W(')[0].split("exec(open('b.py')")[0]) if False else None
def W(wt,s):return {"id":nid(),"elType":"widget","widgetType":wt,"settings":s,"elements":[]}
def C(ch,css,s=None,inner=True): return cont(ch,css,s,inner)
def sec(eid,css,bg,pad,els,w=1272):
    p=lambda t,b:{"top":str(t),"bottom":str(b),"left":"24","right":"24","unit":"px","isLinked":False}
    s={"_element_id":eid,"css_classes":"pa-sec pa-bl "+css,"background_background":"classic","background_color":bg,"content_width":"boxed","boxed_width":{"size":w,"unit":"px"},"padding":p(*pad[0]),"padding_tablet":p(*pad[1]),"padding_mobile":p(*pad[2])}
    return {"id":nid(),"elType":"container","settings":s,"elements":els,"isInner":False}
crumb='<nav class="pa-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/aggiornamenti/">Aggiornamenti</a></nav>'
rt=W('heading',{"_css_classes":"pa-rt","header_size":"span","title":"Titolo","__dynamic__":{"title":tag('post-custom-field',{"key":"_yoast_wpseo_estimated-reading-time-minutes"})}})
hero=sec('testata-articolo','pa-sp-hero','#FFFFFF',[(152,40),(128,32),(120,28)],[C([
  W('html',{"html":crumb}),
  C([head("pa-bc-chip","post-terms",{"taxonomy":"category","separator":" "}),head("pa-bc-date","post-date",DATE if False else {"date_format":"custom","custom_format":"j F Y"}),rt],"pa-bc-meta pa-sp-meta",{"flex_direction":"row"}),
  head("pa-sp-h1","post-title",{},tt="h1"),
  W('image',{"_css_classes":"pa-sp-cover","image":{"url":"","id":""},"__dynamic__":{"image":tag('post-featured-image',{})},"image_size":"full"})
],"pa-sp-head")],)
body=sec('contenuto-articolo','pa-sp-body','#FFFFFF',[(24,96),(16,80),(8,64)],[C([
  W('theme-post-content',{"_css_classes":"pa-sp-content"}),
  C([W('heading',{"_css_classes":"pa-sp-sharet","header_size":"span","title":"Condividi"}),W('share-buttons',{"_css_classes":"pa-sp-share","share_buttons":[{"button":"facebook"},{"button":"linkedin"},{"button":"twitter"},{"button":"whatsapp"},{"button":"email"}],"view":"icon","skin":"flat","columns":"0","alignment":"start"})],"pa-sp-sharebox",{"flex_direction":"column"})
],"pa-sp-col",{"flex_direction":"column"})],720)
rel=sec('articoli-correlati','pa-sp-rel','#F7F7F8',[(96,96),(80,80),(64,64)],[
  C([head_ := W('heading',{"_css_classes":"pa-kick","header_size":"span","title":"Continua a leggere"}),W('heading',{"_css_classes":"pa-h2","header_size":"h2","title":"Articoli correlati"})],"pa-rel-head"),
  W('loop-grid',{"_skin":"post","template_id":"21406","columns":"3","columns_tablet":"2","columns_mobile":"1","posts_per_page":"3","post_query_post_type":"related","post_query_related_taxonomies":["category"],"post_query_related_fallback":"fallback_recent","_css_classes":"pa-grid pa-gsec"})])
cta=sec('cta-articolo','pa-cta pa-dots','#000000',[(112,112),(96,96),(88,88)],[C([W('heading',{"_css_classes":"pa-ctah2","header_size":"h2","title":"Idee veloci. Decisioni chiare. Risultati misurabili."}),C([W('button',{"_css_classes":"pa-cbtn","link":{"url":S+"/#contatti"},"text":"Richiedi una consulenza"})],"pa-ctabtns",{"flex_direction":"row"})],"pa-ctain")])
data=[hero,body,rel,cta]
json.dump(data,open('single.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(open('single.json').read()))
base=open('/tmp/lp/base274.css').read()
ex='''.elementor-N .pa-crumb{display:flex;gap:8px;align-items:center;font:500 14px/20px Poppins,sans-serif;color:#57575C}
.elementor-N .pa-crumb a{color:#57575C;text-decoration:none}.elementor-N .pa-crumb a:hover{color:#233DFF}
.elementor-N .pa-sp-head{max-width:860px}
.elementor-N .pa-sp-meta{margin-top:28px}
.elementor-N .pa-rt .elementor-heading-title{font:500 13px/20px Poppins,sans-serif;color:#57575C}
.elementor-N .pa-rt .elementor-heading-title:empty{display:none}
.elementor-N .pa-rt .elementor-heading-title:not(:empty):after{content:" min di lettura"}
.elementor-N .pa-sp-h1{margin-top:16px}
.elementor-N .pa-sp-h1 .elementor-heading-title{font:700 clamp(2rem,4.6vw,3.25rem)/1.1 Poppins,sans-serif;letter-spacing:-.025em;color:#000;text-wrap:balance}
.elementor-N .pa-sp-cover{margin-top:40px}
.elementor-N .pa-sp-cover img{display:block;width:100%;border-radius:20px;aspect-ratio:16/9;object-fit:cover}
.elementor-N .pa-sp-content{max-width:720px;margin:0 auto}
.elementor-N .pa-sp-content,.elementor-N .pa-sp-content p,.elementor-N .pa-sp-content li{font:400 18px/30px Poppins,sans-serif;color:#2B2B2E}
.elementor-N .pa-sp-content p{margin:0 0 20px}
.elementor-N .pa-sp-content h2{margin:48px 0 16px;font:700 clamp(1.5rem,2.6vw,2rem)/1.2 Poppins,sans-serif;letter-spacing:-.02em;color:#000}
.elementor-N .pa-sp-content h3{margin:32px 0 12px;font:600 22px/30px Poppins,sans-serif;color:#000}
.elementor-N .pa-sp-content a{color:#233DFF;text-decoration:underline;text-underline-offset:3px}
.elementor-N .pa-sp-content ul,.elementor-N .pa-sp-content ol{margin:0 0 24px;padding-left:24px}
.elementor-N .pa-sp-content li{margin-bottom:8px}
.elementor-N .pa-sp-content img{max-width:100%;height:auto;border-radius:12px;display:block;margin:24px 0}
.elementor-N .pa-sp-content table{width:100%;border-collapse:collapse;margin:24px 0;font:400 15px/22px Poppins,sans-serif}
.elementor-N .pa-sp-content td,.elementor-N .pa-sp-content th{border:1px solid rgba(0,0,0,.12);padding:10px 12px;text-align:left;vertical-align:top}
.elementor-N .pa-sp-col{max-width:720px;margin:0 auto}
.elementor-N .pa-sp-sharebox{margin-top:56px;padding-top:28px;border-top:1px solid rgba(0,0,0,.1);gap:12px}
.elementor-N .pa-sp-sharet .elementor-heading-title{font:600 12px/16px Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(0,0,0,.45)}
.elementor-N .pa-rel-head{max-width:42rem;margin-bottom:48px}
.elementor-N .pa-sp-rel .elementor-loop-container{gap:48px 20px}
.elementor-N .pa-ctap{margin-top:16px}
'''
css=(base+ex).replace('274','N').replace('.elementor-N','.elementor-21409').replace('/* Progetti: limitato a .elementor-N (contenuto pagina). */','/* Articolo blog */').replace('body.page-id-N{','body.single-post{')
json.dump({"custom_css":css,"hide_title":"yes"},open('single_ps.json','w'),ensure_ascii=False)
print(len(css))
