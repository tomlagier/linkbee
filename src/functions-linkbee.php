<?php

add_action( 'after_setup_theme', 'linkbee_setup' );
function linkbee_setup() {
	add_theme_support( 'post-thumbnails' );

	add_image_size('employee-image', 200, 235, array('center', 'center'));
}

function linkbee_customize_theme_settings( $wp_customize ) {

	$wp_customize->add_setting('site_logo', array(
		'default' => trailingslashit( get_stylesheet_directory_uri() ) . 'assets/images/logos/site-logo.png'
	));

	$wp_customize->add_section( 'linkbee_site_logo_section' , array(
    'title'      => __( 'Site Logo', 'linkbee' ),
    'priority'   => 60,
	));

	$wp_customize->add_control(new WP_Customize_Image_Control( $wp_customize, 'linkbee_site_logo', array(
		'section' => 'linkbee_site_logo_section',
		'settings' => 'site_logo'
	)));
}

add_action('customize_register', 'linkbee_customize_theme_settings');

/**
 * Helper function to get correctly formatted uri
 * or file location
 */

function linkbee_uri() {
	return trailingslashit( get_stylesheet_directory_uri() );
}

function linkbee_path() {
	return trailingslashit( get_stylesheet_directory() );
}

/**
 * Create our "About" post type
 */

add_action('init', 'create_linkbee_about_post_type');
function create_linkbee_about_post_type() {
	register_post_type( 'linkbee_employee',
    array(
      'labels' => array(
        'name' => __( 'Employees' ),
        'singular_name' => __( 'Employee' ),
      ),
      'description' => 'Homepage employee bio hexagon',
      'public' => true,
      'has_archive' => false,
      'menu_position' => 5,
      'menu_icon' => 'dashicons-universal-access',
      'supports' => array(
        'title',
        'editor',
        'thumbnail'
      ),
      'register_meta_box_cb' => 'linkbee_create_employee_post_meta_boxes'
    )
  );
}

function linkbee_create_employee_post_meta_boxes() {
  add_meta_box('linkbee-title', 'Title', 'linkbee_print_title_box', 'linkbee_employee', 'side');
	add_meta_box('linkbee-color', 'Color', 'linkbee_print_color_box', 'linkbee_employee', 'side');
}

function linkbee_print_title_box($post, $metabox) {
  //Add a nonce field so we can check for it later.
	wp_nonce_field( 'linkbee_save_title_meta_box_data', 'linkbee_title_meta_box_nonce' );

  $value = get_post_meta( $post->ID, '_linkbee_title_value_key', true );

	echo '<input type="text" id="linkbee_title_field" name="linkbee_title_field" value="' . esc_attr( $value ) . '" size="25" placeholder="Employee\'s title"/>';
}

function linkbee_print_color_box($post, $metabox) {
  // Add a nonce field so we can check for it later.
	wp_nonce_field( 'linkbee_save_color_meta_box_data', 'linkbee_color_meta_box_nonce' );

  $value = get_post_meta( $post->ID, '_linkbee_color_value_key', true );

	echo '<input type="text" id="linkbee_color_field" name="linkbee_color_field" value="' . esc_attr( $value ) . '" size="25" placeholder="Tile hex color"/>';
}

function linkbee_save_title_meta_box_data( $post_id ) {
  // Check if our nonce is set.
	if ( ! isset( $_POST['linkbee_title_meta_box_nonce'] ) ) {
		return;
	}

  // Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['linkbee_title_meta_box_nonce'], 'linkbee_save_title_meta_box_data' ) ) {
		return;
	}

  // If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

  // Make sure that it is set.
	if ( ! isset( $_POST['linkbee_title_field'] ) ) {
		return;
	}

  // Sanitize user input.
	$title_data = sanitize_text_field( $_POST['linkbee_title_field'] );

	// Update the meta field in the database.
	update_post_meta( $post_id, '_linkbee_title_value_key', $title_data );
}

function linkbee_save_color_meta_box_data( $post_id ) {

  // Check if our nonce is set.
	if ( ! isset( $_POST['linkbee_color_meta_box_nonce'] ) ) {
		return;
	}

  // Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['linkbee_color_meta_box_nonce'], 'linkbee_save_color_meta_box_data' ) ) {
		return;
	}

  // If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

  // Make sure that it is set.
	if ( ! isset( $_POST['linkbee_color_field'] ) ) {
		return;
	}

  // Sanitize user input.
	$color_data = sanitize_text_field( $_POST['linkbee_color_field'] );

	// Update the meta field in the database.
	update_post_meta( $post_id, '_linkbee_color_value_key', $color_data );
}

add_action( 'save_post', 'linkbee_save_title_meta_box_data' );
add_action( 'save_post', 'linkbee_save_color_meta_box_data' );

function linkbee_hexagon_path() {
	return 'M1.7,27.4L48.3,0.4c1-0.6,2.3-0.6,3.3,0l46.7,26.9c1,0.6,1.7,1.7,1.7,2.9v53.9
	c0,1.2-0.6,2.3-1.7,2.9L51.7,114c-1,0.6-2.3,0.6-3.3,0L1.7,87c-1-0.6-1.7-1.7-1.7-2.9l0-53.9C0,29.1,0.6,28,1.7,27.4z';
}
