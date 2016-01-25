<?php

function create_layout($index) {
  $logo_template = ['light-yellow', 'dark-yellow', 'light-yellow', 'light-yellow',
  'dark-yellow', 'dark-yellow', 'light-yellow', 'dark-yellow',
   'light-yellow', 'logo', 'dark-yellow',
   'light-yellow'];

  $layouts = [];

  for($i = 0; $i < 12; $i++) {
    $layouts[$i] = $logo_template;

    switch($i) {
      case 0:
        $layouts[0][5] = 'face';
        break;
      case 1:
        $layouts[1][1] = 'face';
        $layouts[1][4] = 'face';
        break;
      case 2:
        $layouts[2][2] = 'face';
        $layouts[2][3] = 'face';
        $layouts[2][8] = 'face';
        break;
      case 3:
        $layouts[3][2] = 'face';
        $layouts[3][3] = 'face';
        $layouts[3][8] = 'face';
        $layouts[3][10] = 'face';
        break;
      case 4:
        $layouts[4][3] = 'face';
        $layouts[4][4] = 'face';
        $layouts[4][6] = 'face';
        $layouts[4][8] = 'face';
        $layouts[4][10] = 'face';
        break;
      case 5:
        $layouts[5][2] = 'face';
        $layouts[5][3] = 'face';
        $layouts[5][5] = 'face';
        $layouts[5][7] = 'face';
        $layouts[5][8] = 'face';
        $layouts[5][10] = 'face';
        break;
      case 6:
        $layouts[6][0] = 'face';
        $layouts[6][2] = 'face';
        $layouts[6][3] = 'face';
        $layouts[6][5] = 'face';
        $layouts[6][7] = 'face';
        $layouts[6][8] = 'face';
        $layouts[6][10] = 'face';
        break;
      case 7:
        $layouts[7][0] = 'face';
        $layouts[7][2] = 'face';
        $layouts[7][3] = 'face';
        $layouts[7][4] = 'face';
        $layouts[7][5] = 'face';
        $layouts[7][7] = 'face';
        $layouts[7][8] = 'face';
        $layouts[7][10] = 'face';
        break;
      case 8:
        $layouts[8][0] = 'face';
        $layouts[8][2] = 'face';
        $layouts[8][3] = 'face';
        $layouts[8][4] = 'face';
        $layouts[8][5] = 'face';
        $layouts[8][6] = 'face';
        $layouts[8][7] = 'face';
        $layouts[8][8] = 'face';
        $layouts[8][10] = 'face';
        break;
      case 9:
        $layouts[9][0] = 'face';
        $layouts[9][1] = 'face';
        $layouts[9][2] = 'face';
        $layouts[9][3] = 'face';
        $layouts[9][4] = 'face';
        $layouts[9][5] = 'face';
        $layouts[9][6] = 'face';
        $layouts[9][7] = 'face';
        $layouts[9][8] = 'face';
        $layouts[9][10] = 'face';
        break;
      case 10:
        $layouts[10][0] = 'face';
        $layouts[10][1] = 'face';
        $layouts[10][2] = 'face';
        $layouts[10][3] = 'face';
        $layouts[10][4] = 'face';
        $layouts[10][5] = 'face';
        $layouts[10][6] = 'face';
        $layouts[10][7] = 'face';
        $layouts[10][8] = 'face';
        $layouts[10][10] = 'face';
        $layouts[10][11] = 'face';
        break;
    }
  }

  return $layouts[$index];
}
?>
