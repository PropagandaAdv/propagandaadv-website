# Hero uniformi pagine di navigazione – staging (23/11/2026)

Pagine: Progetti (279), Chi siamo (226), Metodo (251), Servizi (274), Aggiornamenti (337). Home esclusa.
Struttura: etichetta + H1 + sottotitolo + bottoni ("Richiedi una consulenza" primario → /#contatti; secondario per pagina). Bottoni esistenti lasciati, nuovi aggiunti.

| Pagina | H1 | Bottoni nell'hero |
|---|---|---|
| Progetti | invariato | Richiedi una consulenza (nuovo), Esplora i progetti, Scarica la Company Profile |
| Chi siamo | invariato | Richiedi una consulenza, Scopri il metodo (nuovi) |
| Metodo | invariato | Richiedi una consulenza, Scopri i servizi (nuovi) |
| Servizi | Un processo integrato, non servizi scollegati. | Richiedi una consulenza (nuovo), Scopri i servizi, Vedi i progetti (nuovo) |
| Aggiornamenti | Guide e novità su web, advertising e AI. (etichetta "Aggiornamenti", era "Blog") | Richiedi una consulenza, Vedi i progetti (nuovi) |

CSS: su Chi siamo, Metodo e Aggiornamenti aggiunto un widget HTML nascosto con stile scoped `.elementor-<id>` per il bottone secondario e la spaziatura.
Non uniformati (non modificabili via API): sfondi e altezze degli hero (Metodo ~1170px).
Backup: bozze 21450, 21452, 21454, 21456, 21458.
Undo 72 h (fino al 26/11/2026): vedi risposte dei tool.

## Immagini blog (campione, non ancora caricate su WP)
5 immagini astratte blu/nero 4:3 generate con Magnific (135 crediti ciascuna, ~675 totali; saldo iniziale 17.860):
privacy (21098), proprietà dei dati (8950), Meta Ads Q4 (8685), copy Google Ads (8465), lead generation B2B e brand reputation (8817).
Estensione a 163 articoli ≈ 22.000 crediti: oltre il saldo.

## Blog: immagini in evidenza (23/11/2026)
155 articoli puntavano a media inesistenti (il blog mostrava lo stesso segnaposto). Generate 155 immagini nuove (Nano Banana 2.1, 3:2, 1k, 50 crediti l'una) in 16 stili e con soggetti diversi, caricate come webp (≤180 KB) e impostate come immagine in evidenza. Controllo visivo e di somiglianza: nessun duplicato; 3 immagini troppo vicine ad altre rigenerate (6872, 2385, 9073).
Crediti: circa 8.000 su 16.780. Restano le 8 immagini originali degli articoli che già ne avevano una valida.

## Placeholder
Rimossi i marcatori [DA VALIDARE]/[DA VERIFICARE] da schede progetto e pagina Servizi (note interne comprese). Restano solo nei campi interni pa_fonte.
