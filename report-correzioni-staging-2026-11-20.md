# Correzioni pre-go-live staging.propagandaadv.com — avanzamento 20/11/2026

## (a) Sito riconfermato
`wp_get_site_info` → https://staging.propagandaadv.com, WP 7.1.5, it_IT, Europe/Rome.

## (b) Backup: NON disponibile
- SiteVault: "SiteVault is not active". UpdraftPlus: "UpdraftPlus is not active".
- Sul connettore dello staging non esistono tool per installare/attivare/aggiornare plugin.
- Nessun backup manuale dell'hosting confermato.
- Conseguenza: eseguo solo modifiche annullabili con `mcp_undo_last_operation` (72 h). Restano **Bloccati da credenziali/strumenti**: installazione Yoast e Redirection (punti 3-6), aggiornamenti Elementor / Elementor Pro / Royal MCP / ACF (15), disattivazione WordPress Importer, backup automatici (16).
  - Nota: i tool `yoast_*` e `redirection_*` sono esposti ma richiedono i plugin attivi (oggi assenti).

## (c) Punto 1 — Form telefono: FATTO
- Causa: Elementor Pro 4.3.3 aggiunge `pattern="[0-9()#&+*-=.]+"` in render **e** valida lato server con lo stesso set di caratteri → gli spazi vengono rifiutati ("Il campo accetta solo numeri e caratteri telefonici").
- Rimuovere solo il pattern NON basta (provato: il server rifiuta comunque).
- Fix applicato nel Footer #232 (form unico, usato anche da /contattaci/ tramite ancora `#contatti`): nuovo widget HTML `47eb503a` (classe `pa-tel-fix`, in container `7b486b9`, dopo il widget redirect) che
  1. rimuove `pattern` dai campi `tel` e imposta `inputmode="tel"`;
  2. in fase di invio normalizza il numero togliendo spazi, trattini e slash (`+39 351 397 3029` → `+393513973029`).
- **Undo**: token `3823d7214d54730c8ef468492fba2079` (scade 23/11/2026 17:22 UTC). Un primo tentativo (solo rimozione pattern, widget `996535ad`) è stato annullato (token `b9aa5ab0…`, consumato).
- **Prova** (Playwright, 1440 px): compilazione con "TEST QA CLAUDE" e tel "+39 351 397 3029" → redirect a `https://staging.propagandaadv.com/grazie/`, errori console = 0. Prima del fix: errore "L'invio non è andato a buon fine".
- Effetti collaterali da sapere: (1) il numero arriva nell'email senza spazi; (2) l'invio di prova ha generato 1 email reale a commerciale@ e info@ (oggetto/dati "TEST QA CLAUDE", mittente test-qa-claude@example.com) e 1 eventuale voce form: da ignorare/cancellare.
- Soluzione definitiva consigliata: aggiornare Elementor Pro a 4.4.1 (da verificare se corregge la regex) o rimuovere la validazione dal widget form dall'editor Elementor; poi eliminare il widget `pa-tel-fix`.
- Non ancora verificato a 390 px e con `wp_verify_rendered_page` sulla home dopo la modifica (il footer è globale).

## Prossimi passi (non eseguiti in questa tornata)
Punti 7 (tag "[DA"), 8 (immagini segnaposto), 13-14 (home Aggiornamenti, URL relativi nel menu), 17 (accessibilità), 18 (performance) sono eseguibili con modifiche annullabili; 2 (informativa) solo in parte (URL privacy non disponibile → bloccato da contenuti). Punti 3-6, 15-16 bloccati finché non c'è backup/strumenti plugin.
