# Verifica FAQ home – staging.propagandaadv.com (23/11/2026)

URL confermato con wp_get_site_info: https://staging.propagandaadv.com (WP 7.1.5).

| Punto | Stato |
|---|---|
| 1. Rimozione FAQ 925b1e0c e beam 5b6a84a2 dalla Home (post 52) | **NON fatto**: 925b1e0c esiste ancora (container, `_element_id` "faq", 1 figlio) |
| 2. Schema FAQPage sulla home (container 5f6c6ece) | **Non eseguito di proposito**: duplicherebbe il FAQPage dell'accordion della home |
| 3. Verifica finale completa (4 viewport, altre pagine, menu, invio di prova) | **Non eseguita**: dipende dal punto 1 |
| Verifica pubblica home (1440px, sola lettura) | `#faq`: 2 · accordion: 2 · `.pa-beam`: 8 · FAQPage JSON-LD: 1 · H1: 1 · scroll orizzontale: no · errori console: 0 |

## Azione richiesta (manuale)
Elementor → Home → Navigator: eliminare il contenitore FAQ (ID `faq`, 925b1e0c) e il secondo divisore beam dopo "Aggiornamenti" (5b6a84a2) → Aggiorna.
Nessun tool consente di eliminare elementi; `wp_update_post_meta` su `_elementor_data` è escluso (il sanitizer corrompe script/style).

## Dopo l'eliminazione
Attesi: 1 `#faq` (footer), beam 7, 1 FAQPage. Poi si procede con lo schema (punto 2) e la verifica finale (punto 3).
Nessuna modifica effettuata sul sito in questa sessione. Nessun invio di prova (nessuna email inviata).
