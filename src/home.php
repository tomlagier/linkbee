<?php
/**
 *	Home page template for LinkBee website
 *	author: Tom Lagier
 *	email: tom@tomlagier.com
 */

get_header(); ?>

<div class="content-wrapper">
  <?php
    require( linkbee_path() . 'modules/video.php' );
    require( linkbee_path() . 'modules/graphic.php' );
    require( linkbee_path() . 'modules/benefits.php' );
    require( linkbee_path() . 'modules/about.php' );
    require( linkbee_path() . 'modules/contact-form.php' );
  ?>
</div>

<div class="overlays">
  <?php require( linkbee_path() . 'modules/contact-form-overlay.php' ); ?>
</div>

<?php get_footer(); ?>
