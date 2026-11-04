# Gap report — home-v2 (ID 52) vs Vercel

Metodo: Playwright Chromium, capture full-page per sezione a 1440/1024/768/390, pixelmatch (threshold 0.15, includeAA off).
Risultati completi: `diff-table.txt` (sezione × breakpoint, % pixel diversi e dimensioni). Soglia 3%: tutte le sezioni rispettate (max 1.59%). Altezze entro ±1px.

Esclusioni dinamiche dichiarate: stato dei contatori (+0 nello screenshot della sorgente prima dell'animazione vs +450 finale), particelle ambient, marquee, header sticky/scrolled, fotogramma canvas hero.

`gap-raw.txt` e' l'elenco delle differenze di box/testo per elemento (rumore dovuto al matching per testo: line-height degli inline e posizione dei link). Non rappresentano differenze visibili: i diff pixel sono il criterio.
