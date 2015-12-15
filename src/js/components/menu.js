import $ from 'jquery';

let $$ = {
  menuToggle : $('.menu-toggle'),
  svgToggle: $('.svg-menu-toggle'),
  mainMenu: $('.main-menu')
}

export default class Menu {
  constructor() {
    $$.menuToggle.on('click', evt => {
      $$.menuToggle.toggleClass('active');
      if ($$.svgToggle.attr('class').indexOf('active') === -1) {
        $$.svgToggle.attr('class', 'svg-menu-toggle active');
      } else {
        $$.svgToggle.attr('class', 'svg-menu-toggle');
      }
      evt.preventDefault();
    });


  }
}
