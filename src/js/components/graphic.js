import $ from 'jquery';
import _ from 'lodash';
import mobileDetect from './is-mobile';

let $$ = {
  graphicOuter: $('.interactive-graphic'),
  graphicWrapper: $('.graphic-wrapper'),
  benefitTrigger: $('.interactive-graphic .icon-wrapper'),
  benefit: $('.benefit'),
  benefits: $('.benefits'),
  window: $(window),
  adminBar: $('.admin-bar'),
  skipLink: $('.skip-link'),
  skipLinkTrigger: $('.skip-link .button'),
  header: $('.wrap-header'),
  html: $('html'),
  replayButton: $('.play-wrapper'),
  htmlBody: $('html,body')
}

const PLAYER_RATIO = 1.7777;
const MOBILE_GRAPHIC_RATIO = 0.868;

export default class Graphic {
  constructor() {
    $$.videoPlayer = $('#videojs-player');
    $$.videoPlayerWrapper = $('.video-wrapper');
    this.setupGraphic();
  }

  setupGraphic() {
    this.sizeGraphic(this.getContainerHeight());
    this.bindEvents();
  }

  bindEvents() {
    $$.window.on('resize orientationchange', () => {
      let containerHeight = this.getContainerHeight();
      this.sizeGraphic(containerHeight);
      this.sizeVideo(containerHeight);
    });
    $$.benefitTrigger.on('click', evt => {
      this.activateBenefit(evt);
      if (mobileDetect.isDesktop()) this.slideBenefits();
    });

    $$.skipLinkTrigger.on('click', () => {
      if (mobileDetect.isDesktop()) {
        this.slideBenefits.bind(this)
      } else {
        $$.skipLink.addClass('hidden');
      }
    });

    $$.benefit.on('click', this.activateBenefit.bind(this));
    
    $$.replayButton.on('click', this.unslideBenefits.bind(this))

  }

  activateBenefit(evt) {
    const $target = $(evt.currentTarget);
    const target = $target.attr('data-benefit');
    $$.benefit.removeClass('active');
    $$.benefitTrigger.removeClass('active');
    $$.benefits.addClass('is-active');

    $(`[data-benefit=${target}]`).addClass('active');

    if (mobileDetect.isDevice()) {
      $$.htmlBody.animate({
        scrollTop: $(`.benefit[data-benefit=${target}]`).offset().top - 100
      });
    }
  }

  slideBenefits() {
    if (mobileDetect.isDesktop()) {
      this.benefitsSlid = true;
      $$.benefits.addClass('slid');
      let containerHeight = this.getContainerHeight();
      this.sizeGraphic(containerHeight);
      this.sizeVideo(containerHeight);
    }
  }
  
  unslideBenefits() {
    if (mobileDetect.isDesktop()) {
      this.benefitsSlid = false;
      $$.benefits.removeClass('slid');
      let containerHeight = this.getContainerHeight();
      this.sizeGraphic(containerHeight);
      this.sizeVideo(containerHeight);
    }
  }

  getContainerHeight() {
    let headerHeight = $$.header.height();
    if ($$.adminBar.length) headerHeight += 32;
    if (this.benefitsSlid) headerHeight += $$.benefits.height();

    let containerHeight = $(window).height() - headerHeight;
    return containerHeight;
  }

  //Set container size, set video to fill container
  //Set video to fill container
  sizeGraphic(containerHeight) {

    // let graphicHeight = mobileDetect.isDevice() ? $$.window.height() : containerHeight;
    $$.graphicOuter.height(containerHeight);

    let ratio = mobileDetect.isDevice() ? MOBILE_GRAPHIC_RATIO : PLAYER_RATIO;

    console.log($$.window.width() / containerHeight);

    if (($$.window.width() / containerHeight) >= ratio) {
      $$.graphicWrapper.css({
        height: '100%',
        width: parseInt(containerHeight * ratio - 1, 10)
      });
    } else {
      $$.graphicWrapper.css({
        height: parseInt($$.window.width() / ratio - 1, 10),
        width: '100%'
      });
    }
  }

  sizeVideo(containerHeight) {
    if (!$$.videoPlayerWrapper.hasClass('is-hidden')) {
      $$.videoPlayerWrapper.height(containerHeight);

      if (($$.window.width() / containerHeight) >= PLAYER_RATIO) {
        $$.videoPlayer.css({
          height: '100%',
          width: parseInt(containerHeight * PLAYER_RATIO + 1, 10)
        });
      } else {
        $$.videoPlayer.css({
          height: parseInt($$.window.width() / PLAYER_RATIO + 1, 10),
          width: '100%'
        });
      }
    }
  }
}
