# Verifica FAQ home – staging.propagandaadv.com (23/11/2026)

URL confermato con wp_get_site_info: https://staging.propagandaadv.com (WP 7.1.5).
FAQ rimossa dalla Home dall'utente (925b1e0c non più presente, 235 elementi cercati).

| Punto | Stato |
|---|---|
| 1. FAQ 925b1e0c rimossa dalla Home | OK |
| 1b. Divisore beam 5b6a84a2 rimosso | **NO**: esiste ancora → beam 8 invece di 7 (da eliminare a mano nel Navigator) |
| 2. Schema FAQPage solo in home | OK: widget HTML `0fcc197b` in `5f6c6ece`; JSON-LD valido, 6 domande. Undo `fc647ba4cbcb2bd8911592e492e26ff3` (scade 26/11/2026 09:03 UTC) |
| 3a. Home 1440/1024/768/390 | 1 `#faq` (footer) visibile, 1 accordion, 1 FAQPage, 1 H1, nessuno scroll orizzontale, console senza errori |
| 3b. Beam in home | 8 (atteso 7, vedi 1b) |
| 3c. Altre pagine | FAQPage da footer = 0 su /progetti/, /chi-siamo/, /contattaci/, /metodo/; /servizi/ = 1 (suo schema, non toccato); 1 H1 per pagina |
| 3d. Menu "FAQ" → #faq | OK da /chi-siamo/, /progetti/, /metodo/, /contattaci/ |
| 3e. Telefono/Azienda | Affiancati a 1440 (312+312), 1024 (225+225), 768 (314+314); impilati a 390 |
| 3f. Invio di prova "TEST CLAUDE" | 1 invio → redirect a /grazie/, nessun errore. **Email ricevuta: non verificata** (nessun accesso a commerciale@/info@) |

## Da fare a mano
Elementor → Home → Navigator: eliminare il divisore beam `5b6a84a2` (il secondo dopo "Aggiornamenti") → Aggiorna.
