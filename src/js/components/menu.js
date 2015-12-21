import $ from 'jquery';

let $$ = {
  menuToggle : $('.menu-toggle'),
  svgToggle: $('.svg-menu-toggle'),
  mainMenu: $('.main-menu'),
  notMenu: $('.main-menu,.svg-menu-toggle'),
  menuItem: $('.menu-item'),
  html: $('html'),
  scroll: $('html, body'),
  benefits: $('.benefits'),
  about: $('.about'),
  advisors: $('.advisors'),
  formTrigger: $('.contact-form-trigger .button')
}

export default class Menu {
  constructor() {
    this.isOpen = false;

    $$.menuToggle.on('click', () => {
      this.isOpen ? this.closeMenu() : this.openMenu();
    });

    $$.menuItem.on('click', evt => {
      let $target = $(evt.target);
      const command = $target.attr('href').replace('#', '');

      this.navigateTo(command);
    })
  }

  openMenu() {
    $$.menuToggle.addClass('active');
    $$.mainMenu.addClass('active');
    $$.svgToggle.attr('class', 'svg-menu-toggle active');
    this.isOpen = true;
    setTimeout(this.bindHtmlClick.bind(this));
  }

  closeMenu() {
    $$.menuToggle.removeClass('active');
    $$.mainMenu.removeClass('active');
    $$.svgToggle.attr('class', 'svg-menu-toggle');
    this.isOpen = false;
    this.unbindHtmlClick();
  }

  bindHtmlClick() {
    $$.html.on('click.lbMainMenu', evt => {
      let $target = $(evt.target);
      if (!$target.closest($$.notMenu).length) {
        this.closeMenu();
      }
    });
  }

  unbindHtmlClick() {
    $$.html.off('click.lbMainMenu');
  }

  navigateTo(target) {
    switch (target) {
    case 'home':
      $$.scroll.animate({
        scrollTop: 0
      }, 300);
      break;
    case 'benefits':
      $$.scroll.animate({
        scrollTop: $$.benefits.offset().top - 100
      }, 300);
      break;
    case 'about':
      $$.scroll.animate({
        scrollTop: $$.about.offset().top - 100
      }, 300);
      break;
    case 'advisors':
      $$.scroll.animate({
        scrollTop: $$.advisors.offset().top - 100
      }, 300);
      break;
    case 'contact':
      $$.formTrigger.click();
      break;
    }
  }
}
