# FAQ nel footer + modulo contatti compatto — staging.propagandaadv.com (20/11/2026)

Connettore verificato: `wp_get_site_info` → https://staging.propagandaadv.com.
Nel repo non esiste un CLAUDE.md: ho applicato le regole citate nel task.

## Backup
- Bozza footer: `footer-backup-faq-20261120` → elementor_library **#21440**
- Bozza home: `home-backup-faq-20261120` → pagina **#21442**
- Backup completo UpdraftPlus (locale): `11891e5da1721dd3` (20/11 17:35 UTC)

## Cosa è stato fatto (Footer #232)
1. **FAQ nel footer** — contenitore radice `e613a460` con ID `faq`, in cima, prima del blocco contatti (ordine: FAQ → divisore beam → modulo → colonne). Testi, widget (Accordion), classi (`pa-sec`, `pa-grid12 pa-faqgrid`, `pa-span4/8`, `pa-faq`, `pa-kick`, `pa-h2`…), globali del Kit e 6 domande/risposte identici alla home.
2. **CSS limitato al container**: due widget HTML nascosti dentro `#faq` (`6a2d2b38`, `c4684c71`) con regole scoped `#faq …` (nessun `page-id`). Il secondo contiene le regole base dell'Accordion perché Elementor carica il CSS del widget solo se l'accordion è nel contenuto della pagina, non se è solo nel footer (verificato: senza, le risposte erano tutte aperte).
3. **Divisore beam** `f10b1bca` sotto la FAQ (come in home), ID SVG rinominati (`bgf`/`bbf`).
4. **Schema FAQ**: l'accordion del footer ha `faq_schema` disattivato → il footer non emette JSON-LD su nessuna pagina.
5. **Modulo** — widget HTML nascosto `667ff05f` (CSS scoped `.pa-contatti .pa-formcard`): Telefono (`field_d937fe4`) e Azienda (`company`) sulla stessa riga 50/50 su desktop e tablet, 100% sotto 768 px; gap 20→12 px, padding campi 12/16→10/14, margine etichetta→campo 8→4, textarea ~120→96 px, margine pulsante 15→8, nota 16→12.
6. **Menu**: voce "FAQ" (item 31) da `/#faq` a `#faq` (funziona da ogni pagina perché il footer è globale). Le ancore FAQ nelle colonne del footer erano già `#faq`.

## Prima/dopo form (nessun ID, obbligatorietà, azione o messaggio modificato)
| Campo | ID | Obbl. | Larghezza prima | Larghezza dopo (effettiva) |
|---|---|---|---|---|
| Nome e cognome | `name` | sì | 50 | 50 (invariato) |
| Email | `email` | sì | 50 | 50 (invariato) |
| Numero di telefono | `field_d937fe4` | sì | 50 | 50 desktop/tablet, 100 mobile |
| Azienda | `company` | no | 100 | 50 desktop/tablet, 100 mobile |
| Raccontaci il tuo obiettivo | `message` | sì | 100 | 100 (textarea più bassa) |

Nota: le larghezze sono applicate via CSS; nel pannello Elementor il campo Azienda continua a mostrare "100%" (nessun tool permette di modificare i settings di un widget esistente).

## BLOCCO: rimozione della FAQ dalla home
Non ho potuto eliminare il contenitore FAQ dalla home (`925b1e0c`) né il divisore `5b6a84a2`:
- i tool Elementor del connettore non eliminano né modificano elementi esistenti;
- `wp_update_post_meta` su `_elementor_data` funziona ma il sanitizer **elimina `<script>`/`<style>` e corrompe `<` e `&`** (provato su un clone, poi cancellato): riscrivere la home distruggerebbe gli HTML widget.

Soluzione transitoria già attiva: una regola CSS auto-disattivante nasconde la FAQ del footer (e il suo divisore) solo nelle pagine che hanno ancora un `#faq` nel contenuto. Oggi la home mostra quindi **una sola FAQ visibile** (quella nel contenuto); nel DOM ci sono 2 `#faq` (1 nascosta).

**Azione richiesta (30 secondi):** Elementor → Home → Navigator → elimina il contenitore "FAQ" (`925b1e0c`) e il divisore beam subito dopo (`5b6a84a2`, il secondo dopo "Aggiornamenti") → Aggiorna. Da quel momento la FAQ del footer compare da sola in home. Il divisore `5f6c6ece` resta tra "Aggiornamenti" e il footer.

Dopo l'eliminazione va aggiunto lo **schema FAQ solo sulla home** (oggi lo emette l'accordion della home che sparirà). Snippet pronto, da inserire in un widget HTML nella home (es. dentro `5f6c6ece`) — posso aggiungerlo io appena confermi:

```html
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Quanto tempo serve per lanciare un nuovo sito web?","acceptedAnswer":{"@type":"Answer","text":"Il nostro percorso standard porta al go-live in 30 giorni: kickoff il giorno 0, analisi e strategia nei primi 10 giorni, design e sviluppo tra il giorno 11 e il 25, poi test, pubblicazione e formazione entro il giorno 30. Progetti più complessi vengono pianificati insieme in fase di prima consulenza."}},
{"@type":"Question","name":"Quanto costa lavorare con Propaganda Adv?","acceptedAnswer":{"@type":"Answer","text":"Ogni progetto ha un ambito diverso, quindi non usiamo listini standard. Dopo la prima consulenza gratuita, in cui analizziamo settore, concorrenti e obiettivi, ricevi un preventivo dettagliato basato su ciò che serve davvero al tuo business — senza costi nascosti."}},
{"@type":"Question","name":"Come funziona il processo, dal primo contatto al lancio?","acceptedAnswer":{"@type":"Answer","text":"Quattro fasi: prima consulenza per capire fattibilità e obiettivi, inizio lavori per raccogliere dati e definire le KPI, design e interfaccia per validare l'esperienza utente prima di scrivere codice, infine sviluppo e pubblicazione con test su prestazioni, sicurezza e scalabilità."}},
{"@type":"Question","name":"Cosa succede dopo il lancio del sito?","acceptedAnswer":{"@type":"Answer","text":"Il lavoro non finisce al go-live. Monitoriamo costantemente i KPI, correggiamo eventuali criticità e implementiamo ottimizzazioni continue su performance, SEO e conversioni, così il progetto migliora nel tempo invece di restare fermo."}},
{"@type":"Question","name":"Lavorate anche con aziende che non hanno mai fatto marketing digitale?","acceptedAnswer":{"@type":"Answer","text":"Sì, è il nostro pubblico principale: PMI italiane che vogliono strutturare per la prima volta (o rimettere in ordine) la propria presenza online. Ti guidiamo passo passo, dalla definizione degli obiettivi fino alla scelta dei canali più adatti al tuo settore."}},
{"@type":"Question","name":"Su quali piattaforme sviluppate i siti web?","acceptedAnswer":{"@type":"Answer","text":"Sviluppiamo principalmente su WordPress, sia siti vetrina che progetti 100% personalizzati, con integrazioni avanzate verso CRM, ERP e piattaforme di advertising. In base alle esigenze del progetto valutiamo insieme anche soluzioni su misura."}}
]}</script>
```

## Verifica (Playwright, anonimo, 1440/1024/768/390)
- Una sola FAQ visibile per pagina su home, /servizi/, /progetti/, /chi-siamo/, /contattaci/, /grazie/; un solo H1 per pagina; nessuno scroll orizzontale; console senza errori.
- Accordion: click apri/chiudi OK; tastiera OK (Tab sui link dei titoli + Invio/Spazio); la frecce non spostano il focus (comportamento del widget, uguale all'originale).
- Menu "FAQ" → `#faq` su /chi-siamo/, /progetti/, /metodo/, /contattaci/: scroll alla FAQ OK.
- Telefono e Azienda: stessa riga a 1440/1024/768 (312/225/314 px ciascuno), impilati a 390.
- Invio di prova "TEST CLAUDE" (tel "+39 351 397 3029") → `/grazie/`, nessun errore. **Email ricevuta: non verificata** (non ho accesso alla casella commerciale@/info@).
- Schema FAQ: footer = 0; home = 1 (dall'accordion nel contenuto, transitorio); /servizi/ = 1 (suo accordion).
- Cache: LiteSpeed e ForgeCache non attivi; CSS del footer rigenerato con `elementor_rebuild_post_content` (force).
- Screenshot prima/dopo (4 larghezze × home, servizi, progetti, contattaci, grazie + FAQ home prima):
  `/tmp/claude-0/-home-user-propagandaadv-website/961b8a05-d1e6-5d45-8b47-4ea599835d1a/scratchpad/before/` e `.../after/`. Non coperti: scheda /progetto/… e articolo (nessuna regressione attesa: stesso footer).

## Da sapere / proposte
- **/servizi/ ha una FAQ propria** (`#faq-servizi`, 6 domande, schema suo; 2 domande coincidono con quelle della home). Con il footer la pagina ha ora due blocchi FAQ: decidere se togliere la sua o la duplicata nel footer.
- **Risposte [DA VALIDARE]**: nessuna nelle 6 FAQ della home/footer.
- **CSS orfano in home**: il blocco `/* faq */` nel CSS aggiuntivo del tema (`.page-id-52 .pa-faq…`, `.pa-faqgrid`) resta valido ma ridondante; non l'ho riscritto (richiederebbe di rinviare 14 KB di CSS). Rimuovibile in sicurezza dopo l'eliminazione della FAQ dalla home.
- **Ulteriore compattazione (non applicata)**: Nome + Email già affiancati; si potrebbe ridurre il padding della card (40→32 px desktop) e unire etichetta e placeholder dell'Azienda.
- **Link del footer** "Agenzia" (`#progetti`, `#chi-siamo`, `#metodo`, `#servizi`, `#numeri`) e "Aggiornamenti" funzionano solo in home: fuori scope, da trasformare in URL di pagina.
- Il numero di telefono arriva nelle email senza spazi (fix del punto 1 precedente).

## Undo (72 h, scadono 23/11/2026)
- FAQ container `e613a460`: `1dd400e7b095365e863176932b8bdf4a`
- Beam `f10b1bca`: `52ca1e581134b619ffbaadc2c3fe5a81`
- CSS modulo `667ff05f`: `3564ddb8ced570e32ff048d1b86a381a`
- CSS accordion base `c4684c71`: `855c48ff4ad5eee02f4b3000ef9a4667`
- Menu FAQ: `9fcb76cc29174aa76c9809caa61a125f`
- Rebuild post_content footer: `c9d0f95ab2a0d7bda335f9a9d146b883`
- Fix telefono (widget `47eb503a`): `3823d7214d54730c8ef468492fba2079`
