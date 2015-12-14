<?php

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
