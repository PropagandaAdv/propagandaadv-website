import json, itertools
_c=itertools.count(1)
def nid(): return 'sv%05x'%next(_c)
def ap(s): return s.replace("'","&#39;")
def pad(t,r,b,l): return {"top":str(t),"right":str(r),"bottom":str(b),"left":str(l),"unit":"px","isLinked":False}
def gcol(k): return {"__globals__":{"background_color":"globals/colors?id=%s"%k}}
def cont(ch,css='',eid=None,boxed=False,direction='column',extra=None,inner=True):
    s={"content_width":"boxed" if boxed else "full","flex_direction":direction,"css_classes":css}
    if boxed: s["boxed_width"]={"size":1272,"sizes":[],"unit":"px"}
    if eid: s["_element_id"]=eid
    if extra: s.update(extra)
    return {"id":nid(),"elType":"container","settings":s,"elements":ch,"isInner":inner}
def head(t,tag,css): return {"id":nid(),"elType":"widget","settings":{"title":ap(t),"header_size":tag,"_css_classes":css},"elements":[],"widgetType":"heading"}
def text(h,css): return {"id":nid(),"elType":"widget","settings":{"editor":ap(h),"_css_classes":css},"elements":[],"widgetType":"text-editor"}
def button(l,u,css,al="left"): return {"id":nid(),"elType":"widget","settings":{"text":l,"link":{"url":u,"is_external":"","nofollow":""},"_css_classes":css,"align":al},"elements":[],"widgetType":"button"}
def image(iid,url,alt,css): return {"id":nid(),"elType":"widget","settings":{"_css_classes":css,"image":{"url":url,"id":iid,"alt":alt,"source":"library"},"image_size":"full"},"elements":[],"widgetType":"image"}
def html(h,css=''): return {"id":nid(),"elType":"widget","settings":{"html":h,"_css_classes":css},"elements":[],"widgetType":"html"}
SEC=lambda bg,k,v:{"background_background":"classic","background_color":bg,**gcol(k),"padding":pad(v[0],24,v[0],24),"padding_tablet":pad(v[1],24,v[1],24),"padding_mobile":pad(v[1],24,v[1],24)}
B="https://staging.propagandaadv.com"
CT=B+"/#contatti"
DV="<span class=\"pa-dv\">[DA VALIDARE]</span>"
def svg(p): return '<span class="pa-svc-ico"><svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden="true" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">%s</svg></span>'%p
IC={
"web":'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12H20.5M12 3.5C14.2 6 15.3 9 15.3 12C15.3 15 14.2 18 12 20.5C9.8 18 8.7 15 8.7 12C8.7 9 9.8 6 12 3.5Z"/>',
"ecom":'<path d="M3.5 4.5H6L8 15H18.5L20.5 7.5H7"/><circle cx="9.5" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/>',
"ads":'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
"seo":'<circle cx="11" cy="11" r="6.5"/><path d="M16 16L20.5 20.5"/>',
"out":'<path d="M4 12L20 4L14 20L11.5 13.5L4 12Z"/>',
"auto":'<path d="M20 12A8 8 0 1 1 17.6 6.3M20 4V8.5H15.5"/>',
"crm":'<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19C4.1 15.6 6.4 14 9 14C11.6 14 13.9 15.6 14.5 19"/><circle cx="17" cy="9.5" r="2.4"/><path d="M16 14.3C18.6 14.4 20.3 15.9 20.8 18.5"/>',
"data":'<path d="M5 20V11M12 20V5M19 20V14"/>',
"soc":'<circle cx="6" cy="12" r="2.3"/><circle cx="17.5" cy="6" r="2.3"/><circle cx="17.5" cy="18" r="2.3"/><path d="M8.1 11L15.4 7.1M8.1 13L15.4 16.9"/>',
"cat":'<path d="M5.5 4.5H14.5L18.5 8.5V19.5H5.5Z"/><path d="M14.5 4.5V8.5H18.5M8.5 13H15.5M8.5 16.5H13.5"/>'}
# slug, icon, titolo indice, beneficio, titolo H2, per chi, [cosa facciamo], cosa ottieni, strumenti
S=[
("svc-siti-vetrina","web","Siti web vetrina","Un sito professionale, veloce e ottimizzato per Google e mobile.","Siti web vetrina",
 "Per chi vuole presentare la propria azienda online in modo professionale, chiaro e curato.",
 ["Sviluppiamo il progetto interamente su WordPress, personalizzato sulle tue esigenze","Progettiamo un design UX/UI responsive, pensato per i dati","Ottimizziamo il sito per Google e per la visualizzazione da mobile","Colleghiamo il sito a CRM, ERP e piattaforme di advertising"],
 "Un sito professionale e veloce, che dà risalto alla tua immagine e lavora insieme alle altre attività digitali. Il percorso standard porta al go-live in 30 giorni.","WordPress"),
("svc-ecommerce","ecom","Siti e-commerce","Un negozio online su misura, pensato per vendere.","Siti e-commerce",
 "Per chi vuole vendere direttamente i propri prodotti online.",
 ["Sviluppiamo il negozio con WordPress e WooCommerce","Curiamo un design moderno, orientato alle vendite","Personalizziamo il progetto sulla tua immagine e sulle tue esigenze","Permettiamo ai tuoi clienti di acquistare direttamente dal sito"],
 "Un e-commerce su misura in cui i clienti acquistano i tuoi prodotti senza passaggi superflui.","WordPress, WooCommerce"),
("svc-advertising","ads","Advertising e campagne marketing","Campagne su Meta e Google per trovare più clienti.","Advertising e campagne marketing",
 "Per chi vuole più visibilità e più contatti di potenziali clienti interessati ai propri prodotti o servizi.",
 ["Partiamo dall&#39;analisi di mercato e dalla Buyer Persona","Costruiamo la strategia con il miglior rapporto tra contatti generati e investimento","Creiamo e gestiamo le campagne su Meta e Google, anche per l&#39;e-commerce","Lanciamo le campagne validandole insieme a te e le ottimizziamo sui dati reali"],
 "Contatti coerenti con il tuo cliente ideale e campagne che puoi seguire e validare passo dopo passo.","Google Ads, Meta Ads. TikTok: "+DV+" (citato solo nel Company Profile)"),
("svc-seo","seo","SEO","Posizionamento organico per una crescita duratura.","SEO",
 "Per chi vuole farsi trovare su Google da chi cerca i suoi prodotti o servizi.",
 ["Lavoriamo sull&#39;architettura del sito","Curiamo i contenuti","Interveniamo sugli aspetti tecnici","Monitoriamo i risultati nel tempo"],
 "Un posizionamento organico che cresce e dura nel tempo.","Semrush"),
("svc-email-outreach","out","Email outreach","Contatti aziendali qualificati e appuntamenti in agenda.","Email outreach",
 "Per chi vende ad altre aziende e vuole nuovi appuntamenti commerciali.",
 ["Raccogliamo i contatti aziendali dei tuoi potenziali clienti","Li contattiamo a tuo nome con email a freddo","Organizziamo gli appuntamenti con automazioni, direttamente sul tuo calendario"],
 "Appuntamenti con aziende potenzialmente interessate, già nel tuo calendario.",None),
("svc-email-automation","auto","Email marketing e marketing automation","Contatti seguiti nel tempo, meno attività ripetitive.","Email marketing e marketing automation",
 "Per chi vuole seguire i contatti generati dal sito e liberarsi dalle azioni ripetitive.",
 ["Colleghiamo al sito automazioni che nutrono i contatti, dalla prima interazione alla fidelizzazione","Creiamo automazioni di marketing supportate dall&#39;intelligenza artificiale","Automatizziamo azioni come l&#39;organizzazione della casella di posta, l&#39;invio di preventivi e la raccolta dati"],
 "Più tempo per le attività che portano ricavi e contatti che diventano clienti.",None),
("svc-crm","crm","Gestione CRM","Contatti e potenziali clienti sotto controllo.","Gestione CRM",
 "Per chi vuole gestire al meglio i contatti e i potenziali clienti che entrano nel flusso aziendale.",
 ["Configuriamo il CRM in base alle tue esigenze, anche quello che hai già scelto","Migriamo la gestione dei contatti nel nuovo sistema","Integriamo il CRM con il sito"],
 "Una gestione ordinata dei contatti, dal primo interesse alla trattativa.","HubSpot "+DV+" (la partnership compare solo nel Company Profile)"),
("svc-analisi-dati","data","Analisi dei dati","Ogni scelta nasce dai numeri, non dalle opinioni.","Analisi dei dati",
 "Per chi vuole capire cosa funziona davvero e dove migliorare.",
 ["Monitoriamo i KPI del progetto","Analizziamo il comportamento degli utenti sul sito","Usiamo i dati per orientare le scelte successive"],
 "Decisioni basate sui numeri, non sulle opinioni.","Google Analytics, Clarity"),
("svc-social","soc","Gestione social","Contenuti e calendario editoriale per i tuoi canali.","Gestione social",
 "Per chi vuole presentare la propria azienda sui social in modo più professionale.",
 ["Creiamo il piano e il calendario editoriale per le tue pagine social","Gestiamo i canali social","Creiamo i contenuti"],
 "Un&#39;immagine più professionale sul web e una presenza social con un piano chiaro.",None),
("svc-cataloghi","cat","Cataloghi e brochure","Materiali che raccontano l&#39;azienda, anche in stampa.","Cataloghi e brochure",
 "Per chi ha bisogno di strumenti di comunicazione aziendale coordinati.",
 ["Realizziamo cataloghi, brochure, biglietti da visita e flyer","Creiamo grafiche, infografiche e presentazioni","Con una rete di partner possiamo anche mandare in stampa quanto produciamo"],
 "Materiali coordinati che migliorano l&#39;immagine dell&#39;azienda e supportano la parte commerciale.",None),
]
AREAS=[
("Siti web",[0,1],(261,3,"Composizione astratta blu e nera con pannelli traslucidi che simboleggiano la progettazione di siti web")),
("Advertising e lead generation",[2,3,4],(259,1,"Composizione astratta blu e nera con un fascio di luce che simboleggia le campagne e la generazione di contatti")),
("Automazione e CRM",[5,6,7],(260,2,"Composizione astratta blu e nera con linee a griglia che simboleggiano dati, automazioni e CRM")),
("Contenuti e comunicazione",[8,9],(262,4,"Composizione astratta blu e nera con forme in movimento che simboleggiano contenuti e comunicazione")),
]
U=B+"/wp-content/uploads/2026/11/metodo-fase-0%d.jpg"
# 1 intro
intro=cont([cont([head("Servizi","span","pa-kick"),head("Un processo integrato, non una lista di servizi scollegati.","h1","pa-h1"),
 text("<p>Siti web, campagne, email, automazioni, CRM e dati lavorano dentro lo stesso percorso: ogni attività alimenta le altre con gli stessi obiettivi, per portare più clienti alla tua azienda.</p>","pa-lead"),
 cont([button("Scopri i servizi","#indice-servizi","pa-sbtn")],css="pa-introbtn",direction="row")],css="pa-introin")],
 css="pa-sec pa-intro",eid="intro-servizi",boxed=True,inner=False,extra={**SEC("#FAFAF8","warm",(168,128)),"padding":pad(168,24,96,24),"padding_tablet":pad(136,24,80,24),"padding_mobile":pad(136,24,64,24)})
# 2 indice
cards=[]
for i,(sl,ic,ti,be,h2,pc,fa,co,st) in enumerate(S):
    cards.append(cont([head("%02d"%(i+1),"span","pa-svc-n"),head(ti,"h3","pa-svc-t"),text("<p>%s</p>"%be,"pa-svc-p"),button("Scopri di più","#"+sl,"pa-lnk pa-arw")],css="pa-svc ic-%s pa-rv pa-d%d"%(ic,1+i%3)))
indice=cont([cont([head("Cosa facciamo","span","pa-kick pa-rv"),head("Dieci servizi, un unico obiettivo: più clienti per la tua azienda.","h2","pa-h2 pa-rv pa-d1"),
 text("<p>Ogni servizio ha la sua scheda di dettaglio: scegli da dove partire, oppure raccontaci il tuo obiettivo e costruiamo insieme il percorso.</p>","pa-lead pa-rv pa-d2")],css="pa-shead"),
 cont(cards,css="pa-g3")],css="pa-sec pa-indice",eid="indice-servizi",boxed=True,inner=False,extra=SEC("#FFFFFF","paper",(128,96)))
# 3 dettaglio
areas=[]
for ai,(an,idx,(iid,n,alt)) in enumerate(AREAS):
    blocks=[]
    for k in idx:
        sl,ic,ti,be,h2,pc,fa,co,st=S[k]
        ch=[head("%02d"%(k+1),"span","pa-sv-num"),head(h2,"h2","pa-sv-h2"),
            head("Per chi è","span","pa-sv-label"),text("<p>%s</p>"%pc,"pa-sv-p"),
            head("Cosa facciamo","span","pa-sv-label"),text("<ul>%s</ul>"%"".join("<li>%s</li>"%x for x in fa),"pa-sv-p pa-sv-list"),
            head("Cosa ottieni","span","pa-sv-label"),text("<p>%s</p>"%co,"pa-sv-p")]
        if st: ch+= [head("Strumenti","span","pa-sv-label"),text("<p>%s</p>"%st,"pa-sv-p")]
        ch.append(button("Parliamone",CT,"pa-lnk pa-arw pa-sv-cta"))
        blocks.append(cont(ch,css="pa-sv pa-rv",eid=sl))
    media=cont([image(iid,U%n,alt,"pa-area-img")],css="pa-area-media pa-rv")
    body=cont([head("Area %02d · %s"%(ai+1,an),"span","pa-kick pa-area-kick")]+blocks,css="pa-area-body")
    areas.append(cont([media,body],css="pa-area"+(" pa-area-rev" if ai%2 else ""),eid="area-"+str(ai+1)))
dettaglio=cont(areas,css="pa-sec pa-dettaglio",eid="dettaglio-servizi",boxed=True,inner=False,extra=SEC("#FAFAF8","warm",(128,96)))
# 4 integrazione
integ=cont([cont([head("Integrazione","span","pa-kick pa-rv"),head("Ogni servizio alimenta gli altri.","h2","pa-h2 pa-rv pa-d1"),
 text("<p>Il sito raccoglie i contatti, le campagne portano le persone giuste, le email e le automazioni li seguono, il CRM li ordina e l&#39;analisi dei dati indica dove migliorare. Per questo lavoriamo con un unico metodo, in quattro fasi, dal primo incontro al go-live.</p>","pa-lead pa-rv pa-d2"),
 cont([button("Scopri il metodo completo",B+"/metodo/","pa-wbtn")],css="pa-introbtn pa-rv pa-d3",direction="row")],css="pa-integin")],
 css="pa-sec pa-integ pa-dots",eid="integrazione",boxed=True,inner=False,extra=SEC("#000000","ink",(128,96)))
# 5 faq
FAQ=[
("Devo attivare tutti i servizi insieme?","Il nostro metodo è modulare: i servizi lavorano meglio insieme perché condividono dati e obiettivi, ma possiamo partire da ciò che ti serve di più. "+DV+" Conferma che ogni servizio sia attivabile singolarmente."),
("Su quali piattaforme sviluppate siti web ed e-commerce?","Sviluppiamo interamente con WordPress: i siti vetrina con WordPress, gli e-commerce con WordPress e WooCommerce. Il progetto è personalizzato in base alle tue esigenze."),
("Quanto tempo serve per lanciare un nuovo sito web?","Il nostro percorso standard porta al go-live in 30 giorni: kickoff il giorno 0, analisi e strategia nei primi 10 giorni, design e sviluppo tra il giorno 11 e il 25, poi test, pubblicazione e formazione entro il giorno 30. Progetti più complessi vengono pianificati insieme in fase di prima consulenza."),
("Quanto costa lavorare con Propaganda Adv?","Ogni progetto ha un ambito diverso, quindi non usiamo listini standard. Dopo la prima consulenza gratuita, in cui analizziamo settore, concorrenti e obiettivi, ricevi un preventivo dettagliato basato su ciò che serve davvero al tuo business."),
("Come funziona l&#39;email outreach?","Raccogliamo i contatti aziendali dei tuoi potenziali clienti e li contattiamo a tuo nome con email a freddo. L&#39;obiettivo è generare un appuntamento, che organizziamo con delle automazioni direttamente sul tuo calendario. È indicato per chi vende ad altre aziende."),
("Realizzate anche cataloghi e materiali stampati?","Sì: creiamo cataloghi, brochure, biglietti da visita, flyer, grafiche e presentazioni. Attraverso una rete di partner possiamo anche mandare in stampa quanto produciamo."),
]
acc={"id":nid(),"elType":"widget","settings":{"_css_classes":"pa-faq","faq_schema":"yes","selected_active_icon":{"library":"fa-solid","value":"fas fa-chevron-down"},"selected_icon":{"library":"fa-solid","value":"fas fa-chevron-down"},
 "tabs":[{"_id":"sf%05d"%i,"tab_title":ap(q),"tab_content":"<p>%s</p>"%ap(a)} for i,(q,a) in enumerate(FAQ)]},"elements":[],"widgetType":"accordion"}
faq=cont([cont([cont([head("FAQ","span","pa-kick pa-rv"),head("Le domande sui nostri servizi.","h2","pa-h2 pa-rv pa-d1"),
 text("<p>Non hai trovato risposta a una domanda? Scrivici, ti rispondiamo entro un giorno lavorativo.</p>","pa-lead pa-rv pa-d2")],css="pa-faqhead"),
 cont([acc],css="pa-faqbody pa-rv pa-d2")],css="pa-faqgrid")],css="pa-sec pa-faqsec",eid="faq-servizi",boxed=True,inner=False,extra=SEC("#FFFFFF","paper",(128,96)))
# 6 cta
JS="<script>(function(){var d=document.documentElement;d.classList.add('pa-js');function init(){var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;var rv=[].slice.call(document.querySelectorAll('.pa-rv'));if(rm||!('IntersectionObserver' in window)){rv.forEach(function(e){e.classList.add('in')})}else{var o=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target)}})},{rootMargin:'0px 0px -80px 0px',threshold:0});rv.forEach(function(e){o.observe(e)})}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();</script>"
cta=cont([cont([head("Idee veloci. Decisioni chiare. Risultati misurabili.","h2","pa-ctah2 pa-rv"),
 cont([button("Richiedi una consulenza",CT,"pa-cbtn","center")],css="pa-ctabtns pa-rv pa-d2",direction="row")],css="pa-ctain")],
 css="pa-sec pa-cta pa-dots",eid="cta-servizi",boxed=True,inner=False,extra=SEC("#000000","ink",(128,96)))
data=[intro,indice,dettaglio,integ,faq,cta]
open('data.json','w').write(json.dumps(data,ensure_ascii=False,separators=(',',':')))
print(len(open('data.json').read()))
