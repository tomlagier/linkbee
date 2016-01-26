<div class="module benefits">
  <div class="module-inner column-wrapper">
    <div class="mobile-only mobile-heading">
      <h2>Benefits</h2>
    </div>
    <div class="col-5 benefit energy" data-benefit="energy">
      <div class="icon-wrapper">
        <img src="<?php echo linkbee_uri() ?>assets/images/benefits/energy-icon.png">
      </div>
      <div class="text-wrapper">
        <?php $energy_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'benefit-energy')); ?>
        <h3><?php echo $energy_post[0]->post_title; ?></h3>
        <p><?php echo $energy_post[0]->post_content; ?></p>
      </div>
    </div>
    <div class="col-5 benefit health" data-benefit="health">
      <div class="icon-wrapper">
        <img src="<?php echo linkbee_uri() ?>assets/images/benefits/health-icon.png">
      </div>
      <div class="text-wrapper">
        <?php $health_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'benefit-health')); ?>
        <h3><?php echo $health_post[0]->post_title; ?></h3>
        <p><?php echo $health_post[0]->post_content; ?></p>
      </div>
    </div>
    <div class="col-5 benefit lifestyle" data-benefit="lifestyle">
      <div class="icon-wrapper">
        <img src="<?php echo linkbee_uri() ?>assets/images/benefits/lifestyle-icon.png">
      </div>
      <div class="text-wrapper">
        <?php $tech_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'benefit-lifestyle')); ?>
        <h3><?php echo $tech_post[0]->post_title; ?></h3>
        <p><?php echo $tech_post[0]->post_content; ?></p>
      </div>
    </div>
    <div class="col-5 benefit security" data-benefit="security">
      <div class="icon-wrapper">
        <img src="<?php echo linkbee_uri() ?>assets/images/benefits/security-icon.png">
      </div>
      <div class="text-wrapper">
        <?php $security_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'benefit-security')); ?>
        <h3><?php echo $security_post[0]->post_title; ?></h3>
        <p><?php echo $security_post[0]->post_content; ?></p>
      </div>
    </div>
    <div class="col-5 benefit living" data-benefit="living">
      <div class="icon-wrapper">
        <img src="<?php echo linkbee_uri() ?>assets/images/benefits/living-icon.png">
      </div>
      <div class="text-wrapper">
        <?php $living_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'benefit-independent')); ?>
        <h3><?php echo $living_post[0]->post_title; ?></h3>
        <p><?php echo $living_post[0]->post_content; ?></p>
      </div>
    </div>
  </div>
</div>
