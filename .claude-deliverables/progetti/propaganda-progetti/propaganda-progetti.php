<?php
/**
 * Plugin Name: Propaganda Adv – Progetti
 * Description: Custom Post Type "Progetto" (portfolio siti web + advertising), tassonomie "Tipologia progetto" e "Settore", campi personalizzati e contenuti iniziali. Pensato per Elementor Pro (Loop Grid / Theme Builder).
 * Version: 1.0.0
 * Author: Propaganda Adv
 * Text Domain: propaganda-progetti
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'PAP_VERSION', '1.0.0' );
define( 'PAP_DIR', plugin_dir_path( __FILE__ ) );

/* ---------------------------------------------------------------
 * 1. CPT + tassonomie
 * ------------------------------------------------------------- */
function pap_register_types() {
	register_post_type( 'progetto', array(
		'labels' => array(
			'name'               => 'Progetti',
			'singular_name'      => 'Progetto',
			'menu_name'          => 'Progetti',
			'add_new'            => 'Aggiungi progetto',
			'add_new_item'       => 'Aggiungi nuovo progetto',
			'edit_item'          => 'Modifica progetto',
			'new_item'           => 'Nuovo progetto',
			'view_item'          => 'Visualizza progetto',
			'view_items'         => 'Visualizza progetti',
			'search_items'       => 'Cerca progetti',
			'not_found'          => 'Nessun progetto trovato',
			'not_found_in_trash' => 'Nessun progetto nel cestino',
			'all_items'          => 'Tutti i progetti',
			'featured_image'     => 'Immagine hero',
			'set_featured_image' => 'Imposta immagine hero',
		),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_rest'       => true,
		'has_archive'        => false, // l'archivio è la pagina Elementor /progetti/
		'rewrite'            => array( 'slug' => 'progetto', 'with_front' => false ),
		'menu_icon'          => 'dashicons-portfolio',
		'menu_position'      => 21,
		'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'page-attributes', 'revisions' ),
		'taxonomies'         => array( 'tipologia-progetto', 'settore' ),
	) );

	register_taxonomy( 'tipologia-progetto', 'progetto', array(
		'labels' => array(
			'name'          => 'Tipologie di progetto',
			'singular_name' => 'Tipologia di progetto',
			'menu_name'     => 'Tipologie',
			'all_items'     => 'Tutte le tipologie',
			'add_new_item'  => 'Aggiungi tipologia',
			'edit_item'     => 'Modifica tipologia',
			'search_items'  => 'Cerca tipologie',
		),
		'hierarchical'      => true,
		'public'            => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => 'tipologia-progetto', 'with_front' => false ),
	) );

	register_taxonomy( 'settore', 'progetto', array(
		'labels' => array(
			'name'          => 'Settori',
			'singular_name' => 'Settore',
			'all_items'     => 'Tutti i settori',
			'add_new_item'  => 'Aggiungi settore',
			'edit_item'     => 'Modifica settore',
			'search_items'  => 'Cerca settori',
		),
		'hierarchical'      => false,
		'public'            => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => 'settore', 'with_front' => false ),
	) );
}
add_action( 'init', 'pap_register_types', 5 );

/* ---------------------------------------------------------------
 * 2. Campi personalizzati (post meta, esposti in REST e quindi
 *    leggibili da Elementor con il tag dinamico "Campo personalizzato")
 * ------------------------------------------------------------- */
function pap_fields() {
	$f = array(
		'pa_cliente'      => array( 'Cliente', 'text' ),
		'pa_url_sito'     => array( 'URL del sito', 'url' ),
		'pa_anno'         => array( 'Anno (solo se noto)', 'text' ),
		'pa_obiettivo'    => array( 'Obiettivo', 'textarea' ),
		'pa_cosa_fatto'   => array( 'Cosa abbiamo fatto (un punto per riga)', 'textarea' ),
		'pa_risultati'    => array( 'Risultati (testo)', 'textarea' ),
		'pa_strumenti'    => array( 'Piattaforme / strumenti', 'text' ),
		'pa_investimento' => array( 'Investimento (solo ADV, se dichiarato)', 'text' ),
		'pa_kpi_principale' => array( 'KPI principale per la card (es. "350 acquisti")', 'text' ),
		'pa_fonte'        => array( 'Fonte dei dati', 'text' ),
		'pa_da_validare'  => array( 'Note interne [DA VALIDARE] / [DA VERIFICARE]', 'textarea' ),
		'pa_gallery'      => array( 'Gallery (ID allegati separati da virgola)', 'text' ),
	);
	for ( $i = 1; $i <= 3; $i++ ) {
		$f[ "pa_kpi{$i}_valore" ]    = array( "KPI $i – valore", 'text' );
		$f[ "pa_kpi{$i}_etichetta" ] = array( "KPI $i – etichetta", 'text' );
		$f[ "pa_kpi{$i}_fonte" ]     = array( "KPI $i – fonte", 'text' );
	}
	return $f;
}

function pap_register_meta() {
	foreach ( pap_fields() as $key => $def ) {
		register_post_meta( 'progetto', $key, array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => ( 'url' === $def[1] ) ? 'esc_url_raw' : ( 'textarea' === $def[1] ? 'sanitize_textarea_field' : 'sanitize_text_field' ),
			'auth_callback'     => function () { return current_user_can( 'edit_posts' ); },
		) );
	}
}
add_action( 'init', 'pap_register_meta', 6 );

function pap_add_metabox() {
	add_meta_box( 'pap_dati', 'Dati del progetto', 'pap_render_metabox', 'progetto', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'pap_add_metabox' );

function pap_render_metabox( $post ) {
	wp_nonce_field( 'pap_save', 'pap_nonce' );
	echo '<style>.pap-f{margin:0 0 14px}.pap-f label{display:block;font-weight:600;margin-bottom:4px}.pap-f input,.pap-f textarea{width:100%}.pap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}</style>';
	foreach ( pap_fields() as $key => $def ) {
		if ( 0 === strpos( $key, 'pa_kpi' ) && 'pa_kpi_principale' !== $key ) { continue; }
		$val = get_post_meta( $post->ID, $key, true );
		echo '<div class="pap-f"><label for="' . esc_attr( $key ) . '">' . esc_html( $def[0] ) . '</label>';
		if ( 'textarea' === $def[1] ) {
			echo '<textarea id="' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" rows="4">' . esc_textarea( $val ) . '</textarea>';
		} else {
			echo '<input type="' . ( 'url' === $def[1] ? 'url' : 'text' ) . '" id="' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" value="' . esc_attr( $val ) . '">';
		}
		echo '</div>';
	}
	echo '<h4>KPI / risultati dichiarati (solo numeri pubblicati nelle fonti)</h4><div class="pap-grid">';
	for ( $i = 1; $i <= 3; $i++ ) {
		echo '<div>';
		foreach ( array( 'valore' => 'Valore', 'etichetta' => 'Etichetta', 'fonte' => 'Fonte' ) as $s => $l ) {
			$k = "pa_kpi{$i}_{$s}";
			echo '<div class="pap-f"><label for="' . esc_attr( $k ) . '">KPI ' . $i . ' – ' . esc_html( $l ) . '</label><input type="text" id="' . esc_attr( $k ) . '" name="' . esc_attr( $k ) . '" value="' . esc_attr( get_post_meta( $post->ID, $k, true ) ) . '"></div>';
		}
		echo '</div>';
	}
	echo '</div>';
}

function pap_save_meta( $post_id ) {
	if ( ! isset( $_POST['pap_nonce'] ) || ! wp_verify_nonce( $_POST['pap_nonce'], 'pap_save' ) ) { return; }
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return; }
	if ( ! current_user_can( 'edit_post', $post_id ) ) { return; }
	foreach ( pap_fields() as $key => $def ) {
		if ( ! isset( $_POST[ $key ] ) ) { continue; }
		$raw = wp_unslash( $_POST[ $key ] );
		$val = 'url' === $def[1] ? esc_url_raw( $raw ) : ( 'textarea' === $def[1] ? sanitize_textarea_field( $raw ) : sanitize_text_field( $raw ) );
		update_post_meta( $post_id, $key, $val );
	}
}
add_action( 'save_post_progetto', 'pap_save_meta' );

/* ---------------------------------------------------------------
 * 3. Abilita il CPT in Elementor (Impostazioni → Tipi di post)
 * ------------------------------------------------------------- */
function pap_enable_elementor() {
	$cpt = get_option( 'elementor_cpt_support', array( 'page', 'post' ) );
	if ( ! is_array( $cpt ) ) { $cpt = array( 'page', 'post' ); }
	if ( ! in_array( 'progetto', $cpt, true ) ) {
		$cpt[] = 'progetto';
		update_option( 'elementor_cpt_support', $cpt );
	}
}

/* ---------------------------------------------------------------
 * 4. Contenuti iniziali (una sola volta, all'attivazione)
 * ------------------------------------------------------------- */
function pap_sideload( $file, $title, $alt ) {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';
	$path = PAP_DIR . 'assets/' . $file;
	if ( ! file_exists( $path ) ) { return 0; }
	$existing = get_posts( array( 'post_type' => 'attachment', 'post_status' => 'inherit', 'meta_key' => '_pap_asset', 'meta_value' => $file, 'fields' => 'ids', 'numberposts' => 1 ) );
	if ( $existing ) { return (int) $existing[0]; }
	$tmp = wp_tempnam( $file );
	copy( $path, $tmp );
	$id = media_handle_sideload( array( 'name' => $file, 'tmp_name' => $tmp ), 0, $title );
	if ( is_wp_error( $id ) ) { @unlink( $tmp ); return 0; }
	update_post_meta( $id, '_pap_asset', $file );
	if ( $alt ) { update_post_meta( $id, '_wp_attachment_image_alt', $alt ); }
	return (int) $id;
}

function pap_media_by_slug( $slug ) {
	$p = get_posts( array( 'post_type' => 'attachment', 'post_status' => 'inherit', 'name' => $slug, 'fields' => 'ids', 'numberposts' => 1 ) );
	return $p ? (int) $p[0] : 0;
}

function pap_term( $name, $tax, $parent = 0 ) {
	$t = term_exists( $name, $tax, $parent );
	if ( ! $t ) { $t = wp_insert_term( $name, $tax, $parent ? array( 'parent' => $parent ) : array() ); }
	return is_wp_error( $t ) ? 0 : (int) ( is_array( $t ) ? $t['term_id'] : $t );
}

function pap_seed() {
	if ( get_option( 'pap_seeded' ) ) { return; }
	require_once PAP_DIR . 'includes/data.php';
	$data = pap_seed_data();

	// Tassonomie
	$siti = pap_term( 'Siti web', 'tipologia-progetto' );
	$adv  = pap_term( 'Advertising', 'tipologia-progetto' );
	$tipi = array(
		'sito-vetrina' => array( pap_term( 'Sito vetrina', 'tipologia-progetto', $siti ), $siti ),
		'e-commerce'   => array( pap_term( 'E-commerce', 'tipologia-progetto', $siti ), $siti ),
		'google-ads'   => array( pap_term( 'Google Ads', 'tipologia-progetto', $adv ), $adv ),
		'meta-ads'     => array( pap_term( 'Meta Ads', 'tipologia-progetto', $adv ), $adv ),
	);

	// Company Profile
	$pdf = pap_sideload( 'propaganda-adv-company-profile-2026.pdf', 'Propaganda Adv – Company Profile 2026', '' );
	if ( $pdf ) { update_option( 'pap_company_profile_id', $pdf ); }
	pap_sideload( 'company-profile-copertina.webp', 'Company Profile 2026 – copertina', 'Copertina della Company Profile 2026 di Propaganda Adv: sfondo blu, logo e claim "Idee veloci. Decisioni chiare. Risultati misurabili."' );

	$order = 0;
	foreach ( $data as $p ) {
		$order++;
		if ( get_page_by_path( $p['slug'], OBJECT, 'progetto' ) ) { continue; }

		$content = '';
		foreach ( array( 'Contesto e obiettivo' => $p['obiettivo'], 'Cosa abbiamo fatto' => $p['fatto'], 'Risultati' => $p['risultati'], 'Strumenti' => $p['strumenti'] ) as $h => $t ) {
			if ( ! $t ) { continue; }
			$content .= '<h2>' . esc_html( $h ) . '</h2>';
			if ( 'Cosa abbiamo fatto' === $h ) {
				$content .= '<ul><li>' . implode( '</li><li>', array_map( 'esc_html', preg_split( '/\r?\n/', trim( $t ) ) ) ) . '</li></ul>';
			} else {
				$content .= '<p>' . esc_html( $t ) . '</p>';
			}
		}

		$id = wp_insert_post( array(
			'post_type'    => 'progetto',
			'post_status'  => 'publish',
			'post_title'   => $p['titolo'],
			'post_name'    => $p['slug'],
			'post_excerpt' => $p['excerpt'],
			'post_content' => $content,
			'menu_order'   => $order,
		) );
		if ( is_wp_error( $id ) || ! $id ) { continue; }

		wp_set_object_terms( $id, array( (int) $tipi[ $p['tipo'] ][0], (int) $tipi[ $p['tipo'] ][1] ), 'tipologia-progetto' );
		if ( ! empty( $p['settore'] ) ) { wp_set_object_terms( $id, $p['settore'], 'settore' ); }

		$meta = array(
			'pa_cliente' => $p['cliente'], 'pa_url_sito' => $p['url'], 'pa_obiettivo' => $p['obiettivo'], 'pa_cosa_fatto' => $p['fatto'],
			'pa_risultati' => $p['risultati'], 'pa_strumenti' => $p['strumenti'], 'pa_investimento' => $p['investimento'],
			'pa_kpi_principale' => $p['kpi_main'], 'pa_fonte' => $p['fonte'], 'pa_da_validare' => $p['da_validare'],
		);
		foreach ( $p['kpi'] as $i => $k ) {
			$n = $i + 1;
			$meta[ "pa_kpi{$n}_valore" ] = $k[0]; $meta[ "pa_kpi{$n}_etichetta" ] = $k[1]; $meta[ "pa_kpi{$n}_fonte" ] = $k[2];
		}
		foreach ( $meta as $mk => $mv ) { if ( '' !== (string) $mv ) { update_post_meta( $id, $mk, $mv ); } }

		// Immagine hero
		$hero = 0;
		if ( ! empty( $p['hero_file'] ) ) { $hero = pap_sideload( $p['hero_file'], $p['titolo'], $p['hero_alt'] ); }
		elseif ( ! empty( $p['hero_slug'] ) ) { $hero = pap_media_by_slug( $p['hero_slug'] ); }
		if ( $hero ) { set_post_thumbnail( $id, $hero ); }

		// Gallery
		$g = array();
		foreach ( $p['gallery'] as $gf ) { $gid = pap_sideload( $gf[0], $gf[1], $gf[2] ); if ( $gid ) { $g[] = $gid; } }
		if ( $g ) { update_post_meta( $id, 'pa_gallery', implode( ',', $g ) ); }
	}
	update_option( 'pap_seeded', PAP_VERSION );
}

function pap_activate() {
	pap_register_types();
	pap_register_meta();
	pap_enable_elementor();
	pap_seed();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'pap_activate' );

function pap_deactivate() { flush_rewrite_rules(); }
register_deactivation_hook( __FILE__, 'pap_deactivate' );
