import $ from 'jquery';

let $$ = {
  window: $(window)
};

class MobileDetect {
  constructor() {

  }

  isDesktop() {
    return $$.window.width() > 1100;
  }

  isTablet() {
    return $$.window.width() <= 1100 && $$.window.width() > 767
  }

  isMobile() {
    return $$.window.width() <= 767;
  }

  isDevice() {
    return $$.window.width() <= 1100;
  }
}

export default new MobileDetect();
