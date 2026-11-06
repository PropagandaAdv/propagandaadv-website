# Installazione plugin "Propaganda Adv – Progetti"

1. WordPress admin di staging → **Plugin → Aggiungi nuovo → Carica plugin** → scegli `propaganda-progetti.zip` (3,2 MB) → Installa → **Attiva**.
   (In alternativa via FTP: cartella `propaganda-progetti/` in `wp-content/plugins/`, poi attiva.)
2. All'attivazione il plugin: registra il CPT `progetto` (slug `/progetto/nome/`, senza archivio), le tassonomie `tipologia-progetto` e `settore`, i campi personalizzati; abilita il CPT in Elementor; rigenera i permalink; carica nella Media Library la Company Profile compressa (2,4 MB, `propaganda-adv-company-profile-2026.pdf`) e i mockup; crea i 13 progetti (una sola volta).
3. Verifica: `/progetto/agripm/` risponde, menu admin "Progetti" presente.
4. Dimmelo e riprendo da Fase 4 (Loop Item, Single, pagina /progetti/, collegamenti, SEO, verifica).
