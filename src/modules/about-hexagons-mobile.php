<?php
/**
 * For printing out the indivudal hexagons
 */


function print_mobile_hexagons($employees) {
  $employee_count = 0;
  foreach($employees as $employee) {
    print_mobile_hexagon($employee, $employee_count);
    $employee_count++;
  }
}

function print_mobile_hexagon($employee, $count) {
  $color = get_post_meta( $employee->ID, '_linkbee_color_value_key', true );

  $image_path = wp_get_attachment_image_src( get_post_thumbnail_id($employee->ID), 'employee-image' )[0];

  $svg_contents = "<image class='employee-image' xlink:href='$image_path' x='0' y='0' clip-path='url(#hexagonPath)' width='100%' height='100%'/>";

  $title = get_post_meta( $employee->ID, '_linkbee_title_value_key', true);
  $name = $employee->post_title;
  $blurb = $employee->post_content;
  $text_contents = "<div class='mobile-text-inner'>
    <div class='name' style='color:#$color'>$name</div>
    <div class='title'>$title</div>
    <div class='blurb'>$blurb</div>
  </div>";

  ?><div class="about-hexagon-mobile-wrapper">
    <div class="mobile-image-wrapper">
      <svg class="image-hexagon" viewBox="0 0 100 114.4">
        <path fill="#<?php echo $color ?>" stroke="#<?php echo $color ?>" d="<?php echo linkbee_hexagon_path() ?>" stroke-width="3px" ></path>
        <?php echo $svg_contents; ?>
      </svg>
    </div>
    <div class="mobile-text-outer">
      <?php echo $text_contents; ?>
    </div>
  </div>
<?php } ?>

<svg width="0" height="0" viewBox="0 0 100 100">
 <defs>
   <clipPath id="hexagonPath">
     <path d="<?php echo linkbee_hexagon_path() ?>" ></path>
   </clipPath>
 </defs>
</svg>

<?php $employees = get_posts(array('post_type'=>'linkbee_employee','posts_per_page' => -1));;
print_mobile_hexagons($employees);
wp_reset_postdata(); ?>
