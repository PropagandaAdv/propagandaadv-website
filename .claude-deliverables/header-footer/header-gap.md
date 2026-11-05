# Header: differenze staging (prima) vs Vercel e stato finale

## Prima (header #228 originale, rilevato con Playwright)
| Elemento | Vercel | Staging prima |
|---|---|---|
| Posizione | fixed, trasparente, poi blu a scroll | static (scorreva via con la pagina), nessun cambio a scroll |
| Voci menu | 15.2px / 500 / bianco 90%, gap 32px | 16px / 700 / grigio #57575C, padding 13x20 (stile Elementor) |
| CTA | 14px/600, pill, padding 10x20, bordo bianco 35% | 15px/300, raggio 3px, #5568FF, padding 12x24 |
| Hamburger | 40px tondo, bordo bianco 40% | icona 22px senza cerchio |
| Pannello mobile | a tutta larghezza, voci 48px, CTA 44px | voci a destra (136px), niente CTA |
| Link | ancore assolute | `#contatti`, `/home/#...` (/home/ ora fa 301) |
| Logo | SVG testuale 28px | SVG inline (HTML widget) |

## Dopo (template #228)
- Container padre `pa-header` -> logo (2 widget Immagine) | Nav Menu | CTA. Fixed, z-index 1000.
- Trasparente 72px in cima; oltre 40px di scroll (torna sotto 8px): bianco, ombra `0 2px 16px rgba(0,0,0,.06)`, voci scure, logo scuro, CTA nera (hover blu brand). Altezza costante 72px, nessuna transizione: il cambio e' istantaneo e sincrono (sfondo, ombra, colori e logo nello stesso frame).
- Logo: due immagini (B chiara, C scura) nello stesso riquadro 147x27px, ritagliate sull'inchiostro: posizione e dimensione identiche al pixel nei due stati.
- Misure replicate da Vercel: voci 15.2px/500 gap 32; CTA 14px/600 pill 10x20 (42px); hamburger 40px tondo; pannello a tutta larghezza.
- Link: `/#progetti`, `/#chi-siamo`, ..., CTA `/#contatti` (la home e' la front page: `/home/` reindirizza a `/`).

## Differenze residue (da validare)
- Menu a 1440px: ~19px piu' a sinistra rispetto a Vercel (il blocco logo e' piu' stretto dell'SVG originale).
- A 1024px Vercel va a capo (logo su 2 righe, "Chi siamo" su 2 righe): lo staging resta su una riga (gap ridotto a 20px tra 1024 e 1199px). Scelta voluta.
- Il wordmark del logo immagine (B, 300x150) e' piu' piccolo e sottile del logo testuale Vercel.
- Sticky: usato `position:fixed` + classe via script al posto di Motion Effects > Sticky di Elementor (evita lo spacer che spingerebbe giu' la hero).
- Pagine senza `#hero`: header bianco fin dall'inizio (classe `pa-solid`).
