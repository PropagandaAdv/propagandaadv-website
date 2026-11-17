# PROMPT — Correzioni pre-go-live di staging.propagandaadv.com

Contesto: il report `report-golive-propagandaadv.md` (17/11/2026) ha dato verdetto NO al go-live. Questo prompt corregge i punti 🔴 Bloccanti e 🟠 Importanti. Fonte di verità: il report (sezioni 2–5).

## REGOLE
- Lavora SOLO su https://staging.propagandaadv.com/ (connettore MCP "Staging_Propaganda": verifica con `wp_get_site_info` che l'URL sia quello). NON toccare www.propagandaadv.com.
- Prima di iniziare: backup completo dello staging (e annota l'ID di ogni modifica per poterla annullare con `mcp_undo_last_operation`).
- Autonomia: esegui tutto ciò che non dipende dalle DECISIONI qui sotto; per ciò che dipende da una decisione senza risposta applica il DEFAULT indicato e segnalalo nel report finale. Non inventare contenuti, dati, numeri o testi legali.
- NON attivare GTM/GA4 sullo staging (vanno solo preparati per la produzione). NON disattivare "Scoraggia i motori di ricerca" (si fa al go-live).
- Dopo ogni gruppo di modifiche: verifica con `wp_verify_rendered_page` / browser (1440 e 390 px), console senza errori, nessuna regressione del layout.
- Al termine: report in italiano (cosa fatto, prova, cosa resta bloccato e perché) e commit di eventuali file di lavoro sul branch `claude/clever-einstein-9kyr3o`. Nessuna pull request.

## DECISIONI (rispondi o accetta i default)
1. Progetti basati solo sul mockup (Reggiolo Factory, Baschieri, Studio Elle, Mantua Gin Experience, Centro Medico): DEFAULT = riportarli in bozza finché non c'è conferma del cliente.
2. Permalink articoli: DEFAULT = `/%postname%/` (come il live, nessun redirect per i 156 articoli).
3. Home "Aggiornamenti": DEFAULT = sezione dinamica con gli ultimi 3 articoli pubblicati.
4. Plugin SEO: DEFAULT = Yoast SEO (come il live).
5. Plugin redirect: DEFAULT = Redirection.
6. CMP: DEFAULT = preparare l'integrazione iubenda (come il live) ma solo se ho codice/ID forniti; altrimenti documentare cosa serve.
7. Testi privacy/policy: li fornisce il cliente/legale (non scriverli tu).
8. Destinatario del form: DEFAULT = commerciale@propagandaadv.com (come sul live).
9. TikTok e HubSpot in /servizi/: DEFAULT = rimuovere le due voci finché non confermate.
10. Contatori home (450 progetti, 30 gg), "21+ Recensioni Google", "Dal 2020": DEFAULT = lasciare invariati e segnalare "da confermare".

## 🔴 BLOCCANTI
1. **Form telefono.** Nel form del footer e di /contattaci/ il campo `field_d937fe4` rifiuta i numeri con spazi (pattern `[0-9()#&+*-=.]+` non valido con flag /v). Correggi in modo che "+39 351 397 3029" sia accettato (rimuovi il pattern o usa uno valido). Prova: invio con dati "TEST QA CLAUDE" → redirect a /grazie/, nessun errore in console.
2. **Informativa nel form.** Aggiungi sotto il form (footer + /contattaci/) il link all'informativa privacy (URL da inserire quando disponibile; fino ad allora segnala il blocco) e, se la decisione 7 lo prevede, una casella di consenso obbligatoria.
3. **Plugin SEO + meta.** Installa/attiva il plugin SEO (decisione 4). Imposta title (≤60) e meta description (≤155) per: Home, Progetti, Chi siamo, Metodo, Servizi, Aggiornamenti, Contattaci, Grazie. Home title di partenza: "Agenzia Marketing per Acquisire Clienti | Propaganda Adv" (è quello del live); per le altre pagine riusa i meta del live dove coerenti, altrimenti scrivi proposte e segnalale. Imposta anche title/description e og:image per l'articolo "Agent Ready" (post 21436: title "Agent Ready di Elementor: il sito pronto per gli agenti AI", description = excerpt, immagine = media 21435). Verifica con `wp_verify_rendered_page` che i meta compaiano.
4. **Sitemap, canonical, OG.** Sitemap XML con articoli, pagine e CPT `progetto`; /grazie/ esclusa e noindex; og:image di default; canonical su tutte le pagine; riga `Sitemap:` nel robots.txt virtuale. Verifica /sitemap_index.xml (200) e che /grazie/ non vi compaia.
5. **Permalink.** Imposta `/%postname%/` (decisione 2). Poi controlla che gli slug degli articoli coincidano con il live (156 su 158 coincidevano) e che le 4 URL interne delle card/menu funzionino; rigenera i CSS Elementor.
6. **Redirect.** Installa il plugin (decisione 5) e carica la mappa del §3 del report: `/blog/`→`/aggiornamenti/`; `/casi-studio/`→`/progetti/`; le 8 `/caso-studio-…/` → rispettive `/progetto/…/`; `/author/admin/`→`/author/propagandaadv/`; i due PDF vecchi → nuovi (company profile e portfolio). Verifica ogni regola con una richiesta HTTP (301 e destinazione 200). Non creare redirect per le URL che non esistono ancora sul live.
7. **Tag [DA VALIDARE]/[DA VERIFICARE].** Rimuovi i tag da /servizi/ (applica decisione 9) e dalle schede progetto. Nelle schede in cui il testo "dedotto dal mockup" non è verificato, applica decisione 1 (bozza). Dove i tag segnalano una voce da validare e non puoi decidere, NON inventare: elenca la voce nel report. A fine lavoro nessuna pagina pubblicata deve contenere "[DA".
8. **Immagini segnaposto.** Sostituisci `placeholder-grid/arrow/shatter.jpg` (media 49–51) nelle card progetto della home e le miniature `metodo-fase-0X.jpg` usate come featured image di 5 progetti. Se non ci sono screenshot reali, genera creatività on-brand (Magnific, #233DFF/nero/bianco, senza testo né loghi, WebP) coerenti con ogni progetto, con alt text corretto; segnala che sono illustrative. Aggiorna gli alt "in attesa dello screenshot reale".
9. **Privacy/cookie (preparazione).** Crea le pagine Privacy Policy e Cookie Policy come bozze vuote con struttura e link nel footer SOLO se il cliente fornisce i testi; altrimenti non pubblicare nulla e lascia istruzioni (iubenda sync ID 2948134 sul live, blocco preventivo di GTM, GA4, mappa Google e video).
10. **Tracking (preparazione).** NON inserire GTM/GA4 su staging. Prepara uno snippet documentato per la produzione: GTM-W2QTW75, GA4 G-VD3FNCBZXJ, evento di conversione su /grazie/ (`generate_lead` o equivalente), e le istruzioni per il test in Tag Assistant.
11. **Email.** Installa/configura SMTP solo se ricevi credenziali; altrimenti documenta cosa serve (mittente, SPF/DKIM/DMARC) e rimani in attesa. Non dichiarare "email verificata" senza una ricezione reale.
12. **Indicizzazione.** Lascia `blog_public=0`; verifica che /grazie/ sia noindex e documenta il momento in cui riattivare l'indicizzazione (dopo migrazione e redirect).

## 🟠 IMPORTANTI
13. **Home "Aggiornamenti".** Applica decisione 3: Loop Grid con ultimi 3 articoli (card cliccabili). Non pubblicare le bozze ID 32–34 senza testo reale.
14. **URL assoluti dello staging.** Sostituisci nel menu (Progetti, Servizi, Aggiornamenti) gli URL assoluti con relativi; verifica template (Header #228, Footer #232, Kit) e link ai PDF in /contattaci/. NON fare search-replace globale su staging: elenca soltanto cosa resta da sostituire al momento della migrazione.
15. **Plugin e sicurezza.** Aggiorna Elementor e Elementor Pro (4.3.x→4.4.1) e Royal MCP; dopo ogni aggiornamento ricontrolla home, form e template. Disattiva WordPress Importer. Limita l'esposizione di `/wp-json/wp/v2/users` (nasconde il login dell'admin).
16. **Backup e cache.** Proponi (e installa se approvato) backup automatici; documenta cache/ottimizzazione immagini.
17. **Accessibilità.** Contrasto AA: correggi i colori di etichette/testi segnalati (footer "Agenzia", "2018", "Per chi è", "Scheda progetto", "Condividi", "Giorni 1–10") e verifica con axe (obiettivo: 0 violazioni color-contrast). Alt/aria-label sul logo header/footer. Template con `<main>`, skip link focusabile, ruoli ARIA di loop-grid e tab corretti. Verifica con axe e Lighthouse.
18. **Performance.** Comprimi/riconverti in WebP le immagini grandi (metodo-fase-01/02/03 316–455 KB, placeholder 916 KB, altre >150 KB), imposta preload per l'immagine LCP, alleggerisci il PDF Portfolio (8,6 MB → ≤3 MB, a parità di contenuto) mantenendo l'originale. Obiettivo: LCP mobile ≤2,5 s su Home, Servizi, Progetti, scheda progetto, articolo (Lighthouse lab; riporta i valori prima/dopo).
19. **Contenuti da confermare.** Non modificare contatori, "21+ Recensioni Google", "Dal 2020": lasciali e riportali in una lista "da confermare con il cliente".

## VERIFICA FINALE
- Ricrawl di staging: 0 link rotti, 0 occorrenze di "[DA", 0 immagini segnaposto, un solo H1 per pagina, meta presenti su tutte le pagine chiave, sitemap 200, redirect 301 corretti, /grazie/ noindex.
- Invio di prova del form ("TEST QA CLAUDE") → /grazie/, nessun errore in console.
- Lighthouse mobile e desktop su Home, Servizi, Progetti, una scheda progetto, un articolo (valori prima/dopo).
- Report finale: tabella punto → stato (Fatto / Bloccato da decisione o credenziali / Non eseguito) con prova. Chiudi chiedendo conferma prima di procedere alla migrazione.
