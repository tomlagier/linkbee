<?php
/**
 * For printing out the indivudal hexagons
 */

require( linkbee_path() . 'modules/about-layouts.php');


function print_hexagons($employees) {
  $layout = create_layout(count($employees) - 1);

  $employee_count = 0;
  $hex_count = 0;
  $row_ends = [4, 8];
  $row_count = 1;
  echo '<div class="hex-row row-1">';
  foreach($layout as $type) {
    switch($type) {
      case 'face':
        print_face_hexagon($employees[$employee_count]);
        $employee_count++;
        break;
      case 'light-yellow':
        print_hexagon('FBF1A2');
        break;
      case 'dark-yellow':
        print_hexagon('F8E446');
        break;
      case 'logo':
        print_logo_hexagon();
    }

    $hex_count++;

    if(in_array($hex_count, $row_ends) ) {
      $row_count++;
      echo "</div>";
      echo "<div class='hex-row row-$row_count'>";
    }
  }
  echo "</div>";
}

function print_face_hexagon($employee) {

  $color = get_post_meta( $employee->ID, '_linkbee_color_value_key', true );

  $image_path = wp_get_attachment_image_src( get_post_thumbnail_id($employee->ID), 'employee-image' )[0];

  $svg_contents = "<image class='employee-image' xlink:href='$image_path' x='0' y='0' clip-path='url(#hexagonPath)' width='100%' height='100%'/>";

  $title = get_post_meta( $employee->ID, '_linkbee_title_value_key', true);
  $name = $employee->post_title;
  $blurb = $employee->post_content;
  $text_contents = "<div class='text-hexagon'>
    <div class='name'>$name</div>
    <div class='title'>$title</div>
    <div class='blurb'>$blurb</div>
  </div>";

  print_hexagon($color, $svg_contents, $text_contents);
}

function print_logo_hexagon() {
  $color = "f8e446";

  $image_path = linkbee_uri() . 'assets/images/logos/hex-logo.png';

  $svg_contents = "<image class='employee-image' xlink:href='$image_path' x='0' y='0' clip-path='url(#hexagonPath)' width='100%' height='100%'/>";

  print_hexagon($color, $svg_contents);
}

function print_hexagon($color, $svg_contents = false, $text_contents = false) {
  $class = '';
  if($text_contents) $class .= ' has-text';
  ?>
  <div class="about-hexagon-wrapper <?php echo $class ?>">
    <svg class="image-hexagon" viewBox="0 0 100 114.4">
      <defs>
        <clipPath id="hexagonPath">
          <path d="<?php echo linkbee_hexagon_path() ?>" ></path>
        </clipPath>
      </defs>
      <path fill="#<?php echo $color ?>" stroke="#<?php echo $color ?>" d="<?php echo linkbee_hexagon_path() ?>" stroke-width="3px" ></path>
      <?php if($svg_contents) echo $svg_contents; ?>
    </svg>
    <?php if($text_contents) echo $text_contents; ?>
  </div>
<?php } ?>

 <div class="about-lb-wrapper">
   <img src="<?php echo linkbee_uri() ?>assets/images/logos/hex-icon.png" />
 </div>

<?php $employees = get_posts('post_type=linkbee_employee'); ?>
<?php print_hexagons($employees);
wp_reset_postdata(); ?>
