# Report Go-Live Propaganda Adv

_Revisione pre-go-live di https://staging.propagandaadv.com/ rispetto a https://www.propagandaadv.com/ — 17 novembre 2026_

## 1. Sintesi

**Verdetto: NO, il sito non è pronto per il go-live**

Lo staging è graficamente solido e tecnicamente stabile (tutte le 240 URL interne linkate rispondono 200, nessun errore JS bloccante, layout senza overflow a 1440/1024/768/390px, un solo header e un solo footer). Mancano però i prerequisiti per sostituire www.propagandaadv.com senza perdere posizionamento, tracciamento e conformità:

1. SEO assente: nessun plugin SEO attivo (il live usa Yoast SEO Premium), zero meta description sulle pagine principali, nessuna sitemap, nessuna immagine Open Graph; tutto è in noindex (blog_public=0).
2. Contenuti non definitivi in pubblico: tag [DA VALIDARE]/[DA VERIFICARE] visibili in 9 pagine (Servizi + 8 schede progetto), immagini segnaposto nelle card della home, card "Aggiornamenti" della home statiche e legate a bozze.
3. Privacy e consenso mancanti: nessun cookie banner (il live usa iubenda), nessuna Privacy/Cookie Policy, nessuna informativa o consenso nel form.
4. Nessun tracciamento: GTM-W2QTW75 e GA4 G-VD3FNCBZXJ (presenti sul live) non sono sullo staging; senza di essi la conversione su /grazie/ non viene misurata.
5. URL e redirect: gli articoli passano da /slug/ (live) a /AAAA/MM/GG/slug/ (staging): 156 URL cambiano; mancano i 301 per le 8 pagine "caso-studio-…", /casi-studio/ e /blog/ e non c'è un plugin di redirect. Inoltre il campo telefono del form rifiuta i numeri scritti con gli spazi.

**Conteggio:** 14 bloccanti, 12 importanti, 7 miglioramenti.

**Note sul metodo**

- Ambito e metodo: analisi di sola lettura; nessuna modifica a contenuti, impostazioni o plugin. Unica azione di scrittura: un invio di prova del form con dati "TEST QA CLAUDE" (più un tentativo respinto dalla validazione).
- Strumenti: crawl con browser reale (70 pagine, 4 larghezze: 1440/1024/768/390px), controllo di 240 link interni e 36 esterni, axe-core, Lighthouse (lab, via proxy: indicativo), connettore WordPress.
- Copertura: gli articoli del blog sono stati campionati (4 articoli sui 163 pubblicati) per i controlli visivi/console; l'elenco URL e gli slug sono stati confrontati su tutti gli articoli.
- Link esterni: LinkedIn e OceanWP rispondono 403/429 ai client automatici (blocco anti-bot, non verificato come errore reale); gli altri rispondono 200.
- Non verificabile da qui: ricezione dell'email, certificato SSL del server, test manuale da tastiera, impostazioni interne dei plugin del live.
- Coerenza: font unico (Poppins) su tutte le pagine; un solo header e un solo footer; telefono (+39 351 397 3029), email (info@propagandaadv.com), indirizzo (Via Giacomo Matteotti 102/e, Reggiolo) e P.IVA 02901570354 coerenti tra le pagine e con il live; REA RE-323285 nel footer. Nessun errore JS bloccante; unico messaggio di console: l'errore del pattern del campo telefono.

## 2. Checklist prioritizzata

| Priorità | Area | Problema | Pagina/URL | Prova | Come risolvere | Stima |
|---|---|---|---|---|---|---|
| 🔴 Bloccante | Indicizzazione | "Scoraggia i motori di ricerca" attivo: tutte le pagine servono noindex,nofollow. | Tutto il sito | wp_get_option blog_public = 0; meta robots "noindex, nofollow" su 70/70 pagine scansionate. | Disattivare in Impostazioni → Lettura solo dopo migrazione e test; /grazie/ resta noindex a mano. Il robots.txt di staging non ha la riga Sitemap. | 5 min (ma da sequenziare) |
| 🔴 Bloccante | SEO | Nessun plugin SEO attivo. Il live usa Yoast SEO Premium 25.9: titoli e description di oltre 160 URL andrebbero persi. | Tutto il sito | wp_get_seo_meta → plugin "none"; wp_get_plugins (5 attivi: ACF, Elementor, Elementor Pro, Royal MCP, WP Importer); sorgente live: "Yoast SEO Premium plugin v25.9". | Installare Yoast (come sul live), migrare i meta _yoast_wpseo_* se presenti nel DB (inferenza: non verificato se sono stati importati) e impostare i meta delle pagine nuove. | 4–8 h |
| 🔴 Bloccante | SEO | Meta description assente su home, Progetti, Chi siamo, Metodo, Servizi, Aggiornamenti, Contattaci, Grazie e su tutte le categorie. Titolo home = "Propaganda Adv" (14 car.); sul live è "Agenzia Marketing per Acquisire Clienti \| Propaganda Adv". | /, /progetti/, /chi-siamo/, /metodo/, /servizi/, /aggiornamenti/, /contattaci/ | Crawl: meta description = null su queste pagine; <title> tipo "Servizi – Propaganda Adv". Description presenti solo su schede progetto (derivate dall'excerpt) e sull'articolo Agent Ready. | Scrivere title (≤60) e description (≤155) per ogni pagina chiave; riusare quelli del live dove validi. | 3–4 h |
| 🔴 Bloccante | SEO | Nessuna sitemap XML (le schede /progetto/ non sono in sitemap); nessuna immagine Open Graph; canonical solo su 24/70 pagine. | /wp-sitemap.xml, /sitemap.xml | /wp-sitemap.xml → 404; /sitemap.xml → 301 → 404; og:image presente su 0/70 pagine; link rel=canonical su 24/70. | Con Yoast: sitemap con post, pagine e CPT "progetto"; escludere /grazie/; impostare og:image di default. | 1 h |
| 🔴 Bloccante | Contenuti | Tag interni [DA VALIDARE] / [DA VERIFICARE] visibili al pubblico. | /servizi/ (3), /progetto/centro-medico-polispecialistico/, /progetto/agripm/, /progetto/mantua-gin-experience/, /progetto/studio-elle/, /progetto/baschieri/, /progetto/come-una-volta/, /progetto/campagne-meta-per-la-medicina-estetica/, /progetto/reggiolo-factory/ | Crawl testo: occorrenze nel body di 9 pagine. Esempi: "TikTok: [DA VALIDARE] (citato solo nel Company Profile)", "HubSpot [DA VALIDARE] (la partnership compare solo nel Company Profile)". | Validare con il cliente e rimuovere i tag, oppure togliere le voci non confermate (TikTok, HubSpot, piattaforma AgriPM). | 3–5 h + validazione |
| 🔴 Bloccante | Contenuti | Cinque schede progetto (Reggiolo Factory, Baschieri, Studio Elle, Mantua Gin Experience, Centro Medico) sono scritte "sulla base del mockup", non su casi reali verificati. | /progetto/… (5 schede) | Testo in pagina: "Descrizione basata solo sul mockup", "Testi dedotti dalla card della home…", "[DA VERIFICARE] Il mockup edilizia del Company Profile (p. 21) riporta Archinet S.r.l…". | DA DECIDERE: pubblicare solo i casi con dati e consenso del cliente; gli altri in bozza. | Decisione + 2–4 h |
| 🔴 Bloccante | Immagini | Immagini segnaposto nelle card progetto della home ("in attesa dello screenshot reale"); 5 schede progetto usano come miniatura le foto del Metodo. | Home (card Progetti); /progetti/; /progetto/baschieri/, /spirulina-g/, /campagne-meta-*/, /google-ads-per-un-vivaio-di-caserta/, /meta-ads-per-un-forno-di-mantova/ | Media ID 49–51: placeholder-grid/arrow/shatter.jpg con alt "Immagine grafica astratta on-brand per il progetto, in attesa dello screenshot reale"; Lighthouse home: placeholder-*.jpg = 916 KB; featured image delle schede = metodo-fase-01/02/03.jpg. | Sostituire con screenshot/mockup reali o creatività dedicate e correggere gli alt. | 3–6 h |
| 🔴 Bloccante | Privacy | Nessun cookie banner né blocco preventivo; nessuna pagina Privacy Policy o Cookie Policy; il footer non ha link legali. Il live usa iubenda (sync 2948134). | Tutto il sito; footer; /contattaci/ | Plugin attivi: nessun CMP; pagine pubblicate: Aggiornamenti, Chi siamo, Contattaci, Grazie, Home, Metodo, Progetti, Servizi; HTML staging senza iubenda/cookiebot/complianz. | Portare iubenda (o altro CMP) con blocco preventivo di GTM, GA4, mappa Google, video; creare le pagine policy e linkarle nel footer. Le URL delle policy sul live non sono risultate verificabili da me (404 sui percorsi tipici): da recuperare dal pannello iubenda. | 3–5 h |
| 🔴 Bloccante | Privacy / Form | Il form di contatto non ha informativa privacy né casella di consenso. | Form footer (tutte le pagine), /contattaci/ | Campi del form: nome, email, telefono, azienda, messaggio; nessun checkbox; testo sotto il form solo "Invio dal sito, la richiesta arriva direttamente a commerciale@…". | Aggiungere link all'informativa e (se richiesto dal DPO/legale) una casella di consenso obbligatoria. | 1 h |
| 🔴 Bloccante | Tracking | GTM-W2QTW75 e GA4 G-VD3FNCBZXJ del live assenti sullo staging; nessun evento di conversione su /grazie/. Il live carica anche iubenda come CMP. | Tutto il sito; /grazie/ | Sorgente live: gtm.js e gtag/js?id=G-VD3FNCBZXJ; sorgente staging: nessun GTM/gtag/fbq. Pixel Meta/LinkedIn/Clarity: non rilevati sul live (controllo sull'HTML delle pagine principali), quindi nulla da portare. | Installare GTM solo al go-live (non attivarlo sullo staging); configurare evento su /grazie/; verificare in Tag Assistant. Nota: sulle pagine Servizi/Chi siamo compare "Semrush" e "Clarity" come testo, non come tag. | 2–3 h |
| 🔴 Bloccante | URL / SEO | Struttura permalink diversa: live /slug/, staging /AAAA/MM/GG/slug/. 156 articoli su 158 cambierebbero indirizzo. | Tutti gli articoli | Impostazioni → Permalink staging: /%year%/%monthnum%/%day%/%postname%/. Live: es. /caso-studio-ecommerce/; staging: /2023/…/caso-studio-ecommerce/. Confronto slug live/staging: 156 uguali. | Consigliato: portare lo staging a /%postname%/ prima del go-live (nessun redirect da gestire per gli articoli). Alternativa: 156 redirect 301. | 1 h (permalink) / 4 h (redirect) |
| 🔴 Bloccante | Redirect | Nessun plugin di redirect e nessun 301 per le URL che cambiano (vedi mappa al §3). | /casi-studio/, /blog/, 8 pagine /caso-studio-…/, /author/admin/ | redirection_list_redirects → "Redirection plugin is not active"; staging /blog/ e /casi-studio/ → 404; /author/admin/ → 404. | Installare un plugin di redirect (o usare Yoast Premium) e caricare la mappa del §3. | 2–3 h |
| 🔴 Bloccante | Form | Il campo telefono rifiuta i numeri con spazi (formato normale in Italia: "+39 351 397 3029"). | Form footer, /contattaci/ | Prova: invio con "+39 000 0000000" → risposta admin-ajax {"success":false,"errors":{"field_d937fe4":"Il campo accetta solo numeri e caratteri telefonici (#, -, *, ecc.)."}}. Console: "Pattern attribute value [0-9()#&+*-=.]+ is not a valid regular expression … /v". | Rimuovere la validazione "solo numeri" dal campo tel o correggere il pattern (permettere spazi). Ritestare. | 30 min |
| 🔴 Bloccante | Email | Non è verificabile l'arrivo dell'email del form: nessun plugin SMTP; mittente/deliverability non testabili da qui. | Form footer | Invio di prova (dati "TEST QA CLAUDE", telefono +390000000000): redirect corretto a /grazie/ e risposta 200 di admin-ajax. Non ho accesso alla casella: ricezione NON verificata. | Configurare SMTP (SPF/DKIM/DMARC), verificare destinatario (il form dichiara commerciale@propagandaadv.com, come sul live) e fare un test reale. | 1–2 h |
| 🟠 Importante | Home | Sezione "Aggiornamenti" della home statica: le 3 card sono titoli non cliccabili e corrispondono a bozze non scritte. | Home | Card "SEO per PMI…", "Come portiamo un progetto dal kickoff al go-live in 30 giorni", "Advertising data-driven…": nessun link; i post ID 32–34 sono in bozza con testo "[DA VALIDARE] Articolo completo da redigere". | DA DECIDERE: scrivere gli articoli, oppure rendere la sezione dinamica (ultimi articoli) o toglierla. L'archivio /aggiornamenti/ è già dinamico. | 1–2 h (dinamica) |
| 🟠 Importante | Contenuti | Dati da confermare: contatori home (450 progetti, 30 gg), "Dal 2020", "21+ Recensioni Google". | Home; /grazie/ | Home: contatore 450 e 30 gg (si animano allo scroll); "21+ Recensioni Google" compare con diverse recensioni solo su /grazie/, non in home. | Confermare i numeri con il cliente e decidere dove mostrare le recensioni. | 30 min + conferma |
| 🟠 Importante | Migrazione | URL dello staging scritti nei contenuti. | Menu, template, PDF in /contattaci/, link interni | Menu: Progetti, Servizi, Aggiornamenti con URL assoluto staging.propagandaadv.com; PDF: staging…/propaganda-adv-company-profile-2026.pdf e …/propaganda-adv-portfolio.pdf; 84–138 occorrenze del dominio per pagina nell'HTML. | Search-replace con strumento che gestisce i dati serializzati e Elementor (Strumenti → Sostituisci URL); poi rigenerare CSS Elementor. | 1–2 h |
| 🟠 Importante | Home | La home è già su "/" (/home/ risponde 301 → /). Restano da verificare link a "/home/". | Home | /home/ → 301 → https://staging.propagandaadv.com/; show_on_front=page, page_on_front=52; nessun link a /home/ nel crawl. | Stato OK: controllare solo che dopo la migrazione la pagina in Impostazioni → Lettura resti la stessa. | 5 min |
| 🟠 Importante | Tecnico | Nessun plugin di backup, sicurezza o cache. | Sito | 5 plugin attivi: ACF, Elementor, Elementor Pro, Royal MCP, WordPress Importer. La cache lato server (Varnish) esiste ma non c'è plugin di cache. | Prima del go-live: backup completo; attivare backup automatici; valutare cache/ottimizzazione immagini; disattivare WordPress Importer. | 2–3 h |
| 🟠 Importante | Tecnico | Aggiornamenti disponibili. | Plugin | Elementor 4.3.6 → 4.4.1; Elementor Pro 4.3.3 → 4.4.1; Royal MCP 1.5.15 → 1.5.17. | Aggiornare e ritestare layout/form; decidere se Royal MCP resta attivo in produzione. | 1 h |
| 🟠 Importante | Sicurezza | L'endpoint REST pubblico elenca il nome utente dell'amministratore. | /wp-json/wp/v2/users | Risposta 200 con slug "propagandaadv" (utente admin ID 1). | Limitare l'endpoint o usare un nome di visualizzazione diverso dal login; 2FA/plugin di sicurezza. | 30 min |
| 🟠 Importante | Accessibilità | Contrasto colore insufficiente (WCAG AA). | Circa 20 pagine | axe-core: color-contrast, 148 nodi in 20 pagine (es. etichetta footer "Agenzia", "2018" in Chi siamo, "Per chi è" in Servizi, "Scheda progetto", "Condividi", "Giorni 1–10"). | Scurire testi/etichette su fondo chiaro e testi chiari su fondo scuro per arrivare a 4.5:1. | 2–3 h |
| 🟠 Importante | Accessibilità | Link del logo (header/footer) senza nome accessibile. | Tutte le pagine | axe: link-name, 40 nodi in 20 pagine; immagini logo con alt vuoto (Logo-400-x-400…, Logo-11-1536x864…). | Aggiungere alt "Propaganda Adv – home" (o aria-label sul link). | 15 min |
| 🟠 Importante | Accessibilità | Struttura ARIA/landmark: nessun <main>, skip link non focusabile, ruoli ARIA errati. | Home, Servizi, Progetti, schede, articoli | Lighthouse: "Document does not have a main landmark" (4/5 pagine), "Skip links are not focusable" (4/5); axe: aria-required-children (10 nodi, loop-container role=list), aria-allowed-attr (4 nodi, tab titoli). | Impostare il tag contenitore main nel template; correggere skip link e ruoli dei widget loop/tab. | 1–2 h |
| 🟠 Importante | Performance | LCP mobile sopra i 2,5 s su tutte le pagine testate; pesi elevati. | Home, Servizi, Progetti, scheda, articolo | Lighthouse mobile (lab, via proxy: indicativo): Perf 86/87/83/78/80; LCP 3.0/3.0/3.2/4.0/3.5 s. Home desktop 7,4 MB trasferiti; Progetti: metodo-fase-0X.jpg da 316–455 KB l'uno; placeholder home 916 KB; PDF Portfolio 8,6 MB, Company Profile 2,4 MB. | Comprimere/convertire in WebP e ridimensionare le immagini grandi; precaricare l'immagine LCP; alleggerire il PDF Portfolio. | 3–5 h |
| 🟠 Importante | Redirect / PDF | I PDF sul live sono su usercontent.one; su staging sono in uploads del dominio. | /contattaci/ e footer del live | Live: …usercontent.one/wp/www.propagandaadv.com/wp-content/uploads/2025/11/Copia-di-Company-Profile-Presentazione-1.pdf e Portfolio-Propaganda-Adv-1.pdf; staging: file nuovi (200, 2,4 MB e 8,6 MB). | Reindirizzare i vecchi PDF ai nuovi se indicizzati/condivisi; verificare che i file siano la versione definitiva. | 30 min |
| 🟢 Miglioramento | SEO / Contenuti | Archivi /settore/ (13) e /tipologia-progetto/ (6+) senza meta description: pagine sottili da indicizzare o no. | /settore/…, /tipologia-progetto/… | Crawl: tutte 200, nessuna meta description. | DA DECIDERE: noindex o testo introduttivo e meta. | 1–2 h |
| 🟢 Miglioramento | Struttura | Categorie duplicate "Uncategorized" (32) e "Senza categoria" (68); tag poco usati; bozze residue. | Archivio blog | wp_get_categories; wp_count_posts: 4 bozze + 1 privato (tra cui "Ciao mondo!"). | Unificare le categorie (con redirect se cambia lo slug) e cancellare le bozze di prova. | 1 h |
| 🟢 Miglioramento | Contenuti | Un articolo ha due H1. | /2026/04/10/quale-tema-wordpress-scegliere-nel-2026/ | Crawl: 2 H1 con lo stesso testo. | Trasformare il secondo in H2. | 10 min |
| 🟢 Miglioramento | UX | Pagina 404 non personalizzata (testo di default del tema). | Qualsiasi URL inesistente | "La pagina non può essere trovata. Sembra che non sia stato trovato nulla in questa posizione." con header/footer corretti. | Messaggio in tono brand con link a Progetti/Contatti. | 30 min |
| 🟢 Miglioramento | Tecnico | Rate limiting del server sulle richieste ravvicinate. | Sito | 12 richieste parallele ⇒ HTTP 429 (poi 200 a ritmo normale). | Inferenza: potrebbe limitare crawler SEO; verificare la configurazione in produzione. | 30 min |
| 🟢 Miglioramento | Tecnico | Certificato SSL non verificabile in modo indipendente da questo ambiente (il traffico passa da un proxy che ri-termina TLS). | Tutto il sito | Il browser carica le pagine via https; l'emittente visto è quello del proxy, non del server. | Controllare certificato e HSTS sul server di produzione dopo la migrazione. | 15 min |
| 🟢 Miglioramento | Accessibilità | Navigazione da tastiera e focus non verificati a mano; solo controlli automatici (axe/Lighthouse). | Tutto il sito | Non verificato manualmente. | Test manuale con Tab/screen reader sulle pagine principali. | 1–2 h |

## 3. Mappa dei redirect (URL live → URL staging)

| URL live | URL staging | Redirect necessario |
|---|---|---|
| / | / | Nessuno (identico) |
| /chi-siamo/ | /chi-siamo/ | Nessuno |
| /servizi/ | /servizi/ | Nessuno |
| /contattaci/ | /contattaci/ | Nessuno |
| /grazie/ | /grazie/ | Nessuno (noindex; fuori sitemap) |
| /blog/ | /aggiornamenti/ | 301 (su staging /blog/ → 404) |
| /casi-studio/ | /progetti/ | 301 (su staging /casi-studio/ → 404) |
| /caso-studio-campagne-meta-77-contatti-sui-servizi-di-medicina-estetica-a-fronte-di-881e-di-investimento/ | /progetto/campagne-meta-per-la-medicina-estetica/ | 301 |
| /caso-studio-campagne-meta-84-contatti-in-target-a-fronte-di-1574e-investiti/ | /progetto/campagne-meta-84-contatti-in-target/ | 301 |
| /caso-studio-ecommerce-spirulinag-com/ | /progetto/spirulina-g/ | 301 |
| /caso-studio-google-ads-350-acquisti-sul-sito-web-a-a-fronte-di-239112e-di-investimento-per-un-vivaio-di-caserta/ | /progetto/google-ads-per-un-vivaio-di-caserta/ | 301 |
| /caso-studio-meta-ads-8136e-fatturati-in-30-giorni-a-fronte-di-1018e-investiti-per-un-forno-di-mantova/ | /progetto/meta-ads-per-un-forno-di-mantova/ | 301 |
| /caso-studio-sito-ecommerce-comeunavolta-shop/ | /progetto/come-una-volta/ | 301 |
| /caso-studio-sito-vetrina-agripm-it/ | /progetto/agripm/ | 301 |
| /caso-studio-sito-vetrina-piccolaosteriaandes-it/ | /progetto/piccola-osteria-andes/ | 301 |
| /<slug-articolo>/ (156 articoli, es. /caso-studio-ecommerce/) | /AAAA/MM/GG/<slug-articolo>/ | Nessuno se i permalink diventano /%postname%/; altrimenti 156 × 301 |
| /category/blog/, /category/casi-studio/, /category/senza-categoria/, /category/uncategorized/ | stesso percorso | Nessuno (esistono su staging) |
| /tag/creatives/, /tag/cro/, /tag/google-ads/, /tag/meta-ads/ | stesso percorso | Nessuno (esistono su staging) |
| /author/admin/ | /author/propagandaadv/ (oppure /) | 301 consigliato |
| PDF live: …/Copia-di-Company-Profile-Presentazione-1.pdf | /wp-content/uploads/2026/11/propaganda-adv-company-profile-2026.pdf | 301 se i vecchi PDF sono condivisi |
| PDF live: …/Portfolio-Propaganda-Adv-1.pdf | /wp-content/uploads/2026/11/propaganda-adv-portfolio.pdf | 301 se i vecchi PDF sono condivisi |
| /locations.kml (Yoast Local SEO) | nessun equivalente | DA DECIDERE (richiede Yoast Local SEO) |
| Sitemap live: video-sitemap.xml, geo-sitemap.xml, author-sitemap.xml | nessun equivalente | Rigenerati da Yoast, se attivati |

**URL live senza equivalente su staging:** /casi-studio/ (sostituita da /progetti/), /blog/ (sostituita da /aggiornamenti/), /locations.kml, le sitemap video/geo/author.

**URL staging senza equivalente sul live:** /aggiornamenti/, /progetti/, /metodo/, 5 schede progetto nuove, archivi /settore/ e /tipologia-progetto/ e l'articolo "Agent Ready" (17/11/2026).

## 4. Procedura di go-live consigliata

1. Congelare i contenuti sul live (o annotare le modifiche fatte dopo la copia) e fare un backup completo di database e file di entrambi i siti.
2. Chiudere i punti 🔴: validare i testi [DA VALIDARE], sostituire le immagini segnaposto, decidere i casi da pubblicare, correggere il campo telefono, installare Yoast, redirect, CMP/privacy e GTM (da attivare solo in produzione).
3. Impostare i permalink a /%postname%/ su staging (evita 156 redirect) e verificare che gli slug restino identici al live.
4. Migrare staging → produzione (stesso hosting del live: stesso stack Apache/Varnish/PHP 8.4 rilevato) e fare il search-replace degli URL con uno strumento compatibile Elementor; rigenerare CSS e svuotare le cache.
5. Verificare Impostazioni → Lettura: pagina statica "Home" su "/"; disattivare "Scoraggia i motori di ricerca".
6. Caricare i 301 della mappa (§3); controllare che il robots.txt indichi la sitemap e che /grazie/ sia in noindex e fuori sitemap.
7. Attivare GTM-W2QTW75 / GA4 G-VD3FNCBZXJ e iubenda; verificare in Tag Assistant che nulla parta prima del consenso e che la conversione su /grazie/ si registri.
8. Configurare SMTP e fare un invio reale del form: ricezione, mittente, SPF/DKIM, redirect a /grazie/.
9. Test post-lancio (entro 24 h): crawl completo, link e redirect, Search Console (invio sitemap, controllo copertura), Lighthouse, console, form, PDF.
10. Monitorare 2–4 settimane: errori 404 in Search Console, posizionamenti, conversioni GA4; tenere il backup del vecchio sito pronto al ripristino.

## 5. Decisioni che spettano a te

1. Pubblico anche i 5 progetti basati solo sul mockup (Reggiolo Factory, Baschieri, Studio Elle, Mantua Gin Experience, Centro Medico) o solo i casi con dati e consenso del cliente?
2. Confermi i numeri della home (450 progetti, 30 giorni dal kickoff al go-live, "Dal 2020") e "21+ Recensioni Google"?
3. Le recensioni devono comparire anche in home (oggi solo su /grazie/)?
4. Mantengo permalink /%postname%/ per gli articoli (consigliato) o preferisci la struttura con la data?
5. Mantengo "Aggiornamenti" in home con le ultime notizie dinamiche, oppure scrivo i 3 articoli previsti?
6. Quale CMP usiamo: iubenda (come oggi) o un altro? Chi fornisce le URL e i testi delle policy?
7. Il form deve avere una casella di consenso obbligatoria oltre all'informativa?
8. Le email del form vanno a commerciale@propagandaadv.com (come sul live) o a info@?
9. TikTok e HubSpot restano tra i servizi/strumenti elencati in Servizi (oggi segnati [DA VALIDARE])?
10. Gli archivi /settore/ e /tipologia-progetto/ vanno indicizzati o in noindex?
11. Vuoi mantenere Yoast SEO Premium (come il live) o preferisci un altro plugin SEO?
12. Royal MCP (connettore AI) resta attivo in produzione o lo disattiviamo al go-live?
13. Vuoi mantenere il Portfolio PDF da 8,6 MB o ne facciamo una versione alleggerita?

---

**Vuoi che prepari il prompt per correggere i punti bloccanti e importanti?**
