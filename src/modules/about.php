<div class="module about">
  <div class="module-inner">
    <div class="upper-text">
    <?php $about_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'about-us')); ?>
    <h2><?php echo $about_post[0]->post_title; ?></h2>
    <p><?php echo $about_post[0]->post_content; ?></p>
    </div>
    <div class="about-hexagons">
      <div class="desktop-only">
        <?php require( linkbee_path() . 'modules/about-hexagons.php' ); ?>
      </div>
      <div class="mobile-only">
        <?php require( linkbee_path() . 'modules/about-hexagons-mobile.php' ); ?>
      </div>
    </div>
  </div>
</div>
