<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title><?php wp_title( '-', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <div id="page" class="hfeed site">
    <div id="wrap-header" class="wrap-header">
      <header id="masthead" class="site-header module">
        <div class="site-branding module-inner">
          <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
            <img class="site-logo" src="<?php echo get_theme_mod('site_logo', trailingslashit( get_stylesheet_directory_uri() ) . 'assets/images/logos/site-logo.png' ); ?>"
          </a></h1>
        </div>
        <nav id="site-navigation" class="site-navigation">
          <button class="menu-toggle">
            <?php require_once(linkbee_path() . '/components/hamburger.php'); ?>
          </button>
          <div class="main-menu"><?php wp_nav_menu( array( 'theme_location' => 'header', 'menu_id' => 'menu-header', 'menu_class' => 'menu-inline' ) ); ?></div>
        </nav>
      </header>
    </div>
    <div id="wrap-main" class="wrap-main">
