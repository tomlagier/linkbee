<div class="module advisors">
  <div class="module-inner">
    <div class="upper-text">
      <?php $advisors_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'advisors')); ?>
      <h2><?php echo $advisors_post[0]->post_title; ?></h2>
      <p><?php echo $advisors_post[0]->post_content; ?></p>
    </div>
    <div class="lower-text column-wrapper">
      <div class="advisor col-2 loeb">
        <?php $advisors_loeb_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'advisors-loeb')); 
        $loeb_link = get_post_meta($advisors_loeb_post[0]->ID, 'linkbee_advisors_url', true);
        ?>
        <div class="icon-wrapper">
          <a href="<?php echo $loeb_link; ?>" target="_blank">
            <img src="<?php echo linkbee_uri() ?>assets/images/advisors/loeb.png" alt="">
          </a>
        </div>
        <div class="text-wrapper">
          <h4><a href="<?php echo $loeb_link; ?>" target="_blank"><?php echo $advisors_loeb_post[0]->post_title ?></a></h4>
          <p><?php echo $advisors_loeb_post[0]->post_content; ?></p>
        </div>
      </div>
      <div class="advisor col-2 pegasus">
        <?php $advisors_pegasus_post = get_posts(array('post_type'=>'linkbee_content','posts_per_page' => 1, 'tag' => 'advisors-pegasus')); 
        $pegasus_link = get_post_meta($advisors_pegasus_post[0]->ID, 'linkbee_advisors_url', true);
        ?>
        <div class="icon-wrapper">
          <a href="<?php echo $pegasus_link ?>" target="_blank">
            <img src="<?php echo linkbee_uri() ?>assets/images/advisors/pegasus.png" alt="">
          </a>
        </div>
        <div class="text-wrapper">
          <h4><a href="<?php echo $pegasus_link; ?>" target="_blank"><?php echo $advisors_pegasus_post[0]->post_title ?></a></h4>
          <p><?php echo $advisors_pegasus_post[0]->post_content; ?></p>
        </div>
      </div>
    </div>
  </div>
</div>
