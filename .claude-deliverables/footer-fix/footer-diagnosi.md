# Diagnosi footer – /metodo/ e /chi-siamo/ (staging.propagandaadv.com)

Riferimento: footer di /home/ (template Theme Builder 232). Backup in bozza: footer **264**, Metodo **266**, Chi siamo **268** ("…-backup-footerfix-20261106").

## Esito delle cause
| Causa | Esito |
|---|---|
| a. Footer duplicato | NO – 1 solo `[data-elementor-type=footer]` su tutte le pagine; nessun footer copiato nelle pagine |
| b. Condizioni template | OK – solo 228/232/5 nel Theme Builder; 232 su "Intero sito"; le bozze di backup (264/242) senza condizioni |
| c. Template di pagina | OK – 226 e 251 usano Elementor Full Width (header+footer visibili) |
| d. CSS che scappa / manca | **CAUSA CONFERMATA** (vedi sotto) |
| e. Layout che invade | NO |
| f. CSS non generato | Il file post-232.css veniva caricato, ma non conteneva lo stile di Contatti+footer (vedi sotto); dopo le modifiche i file CSS sono stati rigenerati |
| g. Errori | 0 errori JS; nessuna richiesta fallita (il 404 di prova genera ovviamente un 404) |

## Causa radice (doppia)
1. **Il CSS del footer non viveva nel footer.** Tutto lo stile della sezione Contatti e del footer (`.pa-form`, `.pa-formcard`, `.pa-fcols`, `.pa-flist`, `.pa-fbottom`, `.pa-contatti`, `.pa-grid12`…) era scritto nel CSS aggiuntivo del tema e in `.page-id-52 …` (solo Home). Template 232 aveva `_elementor_page_settings` vuoto. Su qualsiasi altra pagina il footer restava quindi senza stile (colonne collassate, form senza griglia, testi grigi su blu, logo tagliato).
2. **CSS di pagina "globale".** Il CSS di Chi siamo (226) e Metodo (251) era scritto con prefisso `.page-id-N` → colpiva anche header/footer (reset `.e-con{--gap:0…}`, `.elementor-element{--widgets-spacing:0}`, `.pa-grid12`, ecc.) in conflitto con le classi omonime del footer.

Prova: screenshot `before/` (footer a 1440px alto 2193 su chi-siamo, 1599 su metodo contro 1344 su home); dopo la correzione l'altezza è identica (1344/1383/2077/2374 a 1440/1024/768/390) su home, chi-siamo, metodo e 404.

Effetto collaterale trovato in verifica: il widget form del footer ha `background-color:#fff` a specificità più alta del CSS home → su /home/ il campo era #FAFAF8 grazie alle regole `.page-id-52`, altrove bianco. Risolto con regola nel footer a pari specificità (senza `!important`).

## Modifiche
- **Template 232 (footer)** – `_elementor_page_settings.custom_css`: CSS autonomo, tutte le regole prefissate `.elementor-location-footer`. Design del template invariato.
- **Pagina 226** – CSS di pagina: `.page-id-226 …` → `.elementor-226 …` (resta solo `body.page-id-226` per sfondo/font). Regole reveal limitate a `.pa-js .elementor-226`.
- **Pagina 251** – idem con `.elementor-251`.
- CSS rigenerato (add/undo spacer su 232/226/251, rebuild post_content). LiteSpeed non attivo.
- Non toccato: CSS tema della home (`.page-id-52`), che ora duplica le regole footer ed è innocuo (consigliata pulizia futura).

## Verifica (Playwright anonimo, 1440/1024/768/390)
- 1 solo footer, logo 300px, link mailto/tel/social corretti, 0 errori console, nessuno scroll orizzontale (sw = cw).
- pixelmatch footer vs home (tolleranza sub-pixel ±1px): chi-siamo 0.52/0.24/0.62/0.14 %, metodo 0.12/0.24/0.64/0.00 %, 404 ≤0.05% (1440/1024) – tutti ≤1%.
- Sezioni sopra il footer di chi-siamo e metodo: confronto prima/dopo 0.000% su tutte le sezioni (1440 e 390).
