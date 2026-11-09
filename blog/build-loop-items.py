import json,urllib.parse
S='https://staging.propagandaadv.com'
n=[0]
def nid():
    n[0]+=1;return 'bl%05x'%n[0]
def tag(name,st=None):
    return '[elementor-tag id="%s" name="%s" settings="%s"]'%(nid()[2:9],name,urllib.parse.quote(json.dumps(st or {},separators=(',',':'))))
def cont(ch,css,extra=None,inner=False):
    s={"content_width":"full","css_classes":css}
    if extra:s.update(extra)
    return {"id":nid(),"elType":"container","settings":s,"elements":ch,"isInner":inner}
def head(css,tagname,dyn,tt='span',link=False,title='Titolo'):
    s={"_css_classes":css,"header_size":tt,"title":title}
    d={"title":tag(tagname,dyn)}
    if link: d["link"]=tag('post-url'); s["link"]={"url":"","is_external":"","nofollow":""}
    s["__dynamic__"]=d
    return {"id":nid(),"elType":"widget","settings":s,"elements":[],"widgetType":"heading"}
def text(css,tagname,dyn=None):
    return {"id":nid(),"elType":"widget","settings":{"_css_classes":css,"editor":"Testo","__dynamic__":{"editor":tag(tagname,dyn)}},"elements":[],"widgetType":"text-editor"}
DATE={"date_format":"custom","custom_format":"j F Y"}
media=lambda c:cont([],c,{"background_background":"classic","background_position":"center center","background_size":"cover","background_color":"#0A0A0A","__dynamic__":{"background_image":tag('post-featured-image',{})}},True)
# card
card=cont([media("pa-bc-media"),
  cont([head("pa-bc-chip","post-terms",{"taxonomy":"category","separator":" "}),head("pa-bc-date","post-date",DATE)],"pa-bc-meta",{"flex_direction":"row"},True),
  head("pa-bc-title","post-title",{},tt="h3",link=True)],"pa-bc",{"flex_direction":"column"})
# featured
btn={"id":nid(),"elType":"widget","widgetType":"button","settings":{"_css_classes":"pa-bf-cta","text":"Leggi l'articolo","link":{"url":"","is_external":"","nofollow":""},"__dynamic__":{"link":tag('post-url')}},"elements":[]}
feat=cont([media("pa-bf-media"),
  cont([cont([head("pa-bc-chip","post-terms",{"taxonomy":"category","separator":" "}),head("pa-bc-date","post-date",DATE)],"pa-bc-meta",{"flex_direction":"row"},True),
        head("pa-bf-title","post-title",{},tt="h2",link=True),
        text("pa-bf-ex","post-excerpt"),btn],"pa-bf-body",{"flex_direction":"column"},True)],"pa-bf",{"flex_direction":"column"})
for nm,el in (('card',card),('feat',feat)):
    open(nm+'.json','w').write(json.dumps([el],ensure_ascii=False,separators=(',',':')))
    print(nm,len(json.dumps(el)))
