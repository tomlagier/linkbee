import $ from 'jquery';
import _ from 'lodash';
import mobileDetect from './is-mobile';

let $$ = {
  graphicWrapper: $('.graphic-wrapper'),
  benefitTrigger: $('.interactive-graphic .icon-wrapper'),
  benefit: $('.benefit'),
  benefits: $('.benefits'),
  window: $(window),
  adminBar: $('.admin-bar'),
  skipLink: $('.skip-link'),
  skipLinkTrigger: $('.skip-link .button'),
  header: $('.wrap-header'),
  html: $('html')
}

const PLAYER_RATIO = 1.7777;

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

    if (mobileDetect.isDevice()) {
      this.scrollThreshold = 0;
      this.delta = 0;
      $$.window.on('scroll mousewheel', this.handleMobileScroll.bind(this));
    }
  }

  handleMobileScroll(evt) {
    // --- Scrolling up ---
    if (evt.originalEvent.detail < 0 || evt.originalEvent.wheelDelta > 0) {
      this.delta--;
    } else {
      this.delta++;
    }

    // Prevent page from scrolling
    return false;
  }

  activateBenefit(evt) {
    const $target = $(evt.currentTarget);
    const target = $target.attr('data-benefit');
    $$.benefit.removeClass('active');
    $$.benefitTrigger.removeClass('active');

    $(`[data-benefit=${target}]`).addClass('active');
  }

  slideBenefits() {
    this.benefitsSlid = true;
    $$.benefits.addClass('slid');
    let containerHeight = this.getContainerHeight();
    this.sizeGraphic(containerHeight);
    this.sizeVideo(containerHeight);
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

    if (($$.window.width() / containerHeight) >= PLAYER_RATIO) {
      $$.graphicWrapper.css({
        height: '100%',
        width: parseInt(containerHeight * PLAYER_RATIO - 1, 10)
      });
    } else {
      $$.graphicWrapper.css({
        height: parseInt($$.window.width() / PLAYER_RATIO - 1, 10),
        width: '100%'
      });
    }
  }

  sizeVideo(containerHeight) {

    $$.videoPlayerWrapper.height(containerHeight);

    if (($$.window.width() / containerHeight) >= PLAYER_RATIO) {
      $$.videoPlayer.css({
        height: '100%',
        width: parseInt(containerHeight * PLAYER_RATIO, 10)
      });
    } else {
      $$.videoPlayer.css({
        height: parseInt($$.window.width() / PLAYER_RATIO, 10),
        width: '100%'
      });
    }
  }
}
