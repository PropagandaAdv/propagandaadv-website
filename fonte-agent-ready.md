# Fonte: Agent Ready di Elementor — fatti verificati

Fonte primaria: Ronnie Kerem (Product Marketing Manager, Elementor), "Your next visitor isn't human, is your site ready?", 12/11/2026 — https://elementor.com/blog/introducing-agent-ready/
Fonti collegate lette: scanner https://elementor.com/checker/ · https://elementor.com/blog/webmcp-agent-ready/ · https://ora.ai/blog/what-agents-do-on-wordpress

## Cos'è l'Agent Readiness (art. primario)
- Agenti AI (ChatGPT, Claude, Gemini, Mistral, Perplexity) visitano i siti per conto delle persone: confrontare opzioni, prenotare, ordinare.
- Se l'agente non trova, non legge o non riesce ad agire sul sito, passa a un concorrente e il titolare non lo sa.
- Tre passi: scoperta (discovery), contenuto chiaro e leggibile, completamento del compito con conferma.
- Problemi citati: contesto mancante (prezzi in immagini, orari in slider JS, prenotazione solo "per umani"); blocchi (pop-up, cookie banner, form senza etichette); informazioni obsolete (prezzi vecchi citati dagli agenti).

## Funzioni (WP Admin > menu Elementor > Agent Ready, due schermate)
- **Readiness score**: esegue i controlli, dà un punteggio; per ogni controllo fallito propone un fix (toggle in Agent access, richiesta ad Angie, strumento di plugin, modifica manuale, prompt per un client AI) e permette di riscansionare. Punteggio e controlli si aggiornano con l'evolvere degli standard.
- **Agent access**:
  - llms.txt: guida in testo semplice ai contenuti principali.
  - Versioni Markdown delle pagine (Elementor o Gutenberg).
  - File well-known: agent.json, api-catalog, auth.md; catalogo risorse ard.json / ai-catalog.json; openapi.json (descrizione in sola lettura delle API).
  - Controlli di accesso dei bot e "content signals": regole per singolo bot o per tutti, in un robots.txt virtuale; lettura e addestramento sono scelte separate.
  - Strumenti WebMCP: 4 strumenti in sola lettura (info aziendali, ricerca nel sito, struttura del sito, contenuto delle pagine) + supporto WebMCP per i form Atomic (l'agente può inviare richieste).
  - Strumenti MCP: per diagnosticare e correggere i problemi di readiness.
- Gratuito per ogni sito Elementor. Nessuna versione indicata nell'articolo ("la versione più recente"); l'articolo collegato su WebMCP parla di Elementor 4.4 (beta).

## Limiti dichiarati / non ancora disponibili
- Controlli bot = "preferenze dichiarate" nel robots.txt virtuale; nessun blocco tecnico impone il rispetto ai bot (citazione: "stated preferences").
- Commercio ("Commerce – coming soon"): protocolli di checkout per acquisti da parte degli agenti — NON ancora disponibile.
- WebMCP: standard sperimentale (origin trial Chrome/Edge fino al 30/03/2027, API già cambiata una volta, WebKit contrario, Mozilla neutrale); strumenti Elementor in sola lettura; azioni di invio/acquisto da tenere dietro conferma umana; prompt injection = rischio non risolto; gli agenti devono comunque chiamare gli strumenti (webmcp-agent-ready).
- Scanner (elementor.com/checker): gratuito, URL pubblico, anche non-WordPress; non modifica il sito; non traccia visite né citazioni; punteggio alto ≠ garanzia di ranking/citazioni/successo; rate limit. Controlla Find (accesso/scoperta), Read (chi sei, cosa fai, prezzi, dove, contatti), Act (form, percorso acquisto/prenotazione, policy, versione testuale).

## Dati di ricerca (chi li ha prodotti)
- Ora (ora.ai), laboratorio di ricerca AI, partner di Elementor. Studio sul traffico: log edge di 27.088 siti Elementor con dominio personalizzato, 12/10–08/11/2026. Nella fascia 100k–1M visite "di persone" (1.216 siti) il 97,6% ha ricevuto una lettura da agente live. ~86% delle richieste degli assistenti (2.314.694) è andato a home e pagine interne. Ora precisa che sono stime per eccesso (user agent falsificabili).
- Ora, studio precedente su 1.056 aziende: risposte costruite da altri siti 3,7 volte più probabili di non contenere nessuno dei fatti richiesti (periodo/metodo non indicati). Elementor lo presenta come "quando gli agenti non leggono il sito in modo pulito".
- **NON USATI** (non verificabili): "43% di richieste 404" (la pagina Ora riporta invece "almeno 46% delle esecuzioni di Claude Code" su 400 run: dato diverso); "2,2 milioni di richieste" (Ora: 2,3 milioni); "77,4% agenzie" (sondaggio Elementor etichettato "2027" in un articolo del 2026, metodo non spiegato).

## Altro
- Elementor è partner di Ora ed è membro del comitato di AgentReady.org.
- Staging: Elementor installato è 4.3.6 (4.4.1 disponibile) — non rilevante per l'articolo, nessuna affermazione sul sito del cliente.
