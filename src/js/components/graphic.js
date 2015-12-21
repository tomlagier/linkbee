import $ from 'jquery';
import _ from 'lodash';
import videojs from 'video.js';

let $$ = {
  graphicWrapper: $('.graphic-wrapper'),
  benefitTrigger: $('.interactive-graphic .icon-wrapper'),
  benefit: $('.benefit'),
  benefits: $('.benefits'),
  window: $(window),
  adminBar: $('.admin-bar'),
  skipLinkTrigger: $('.skip-link .button'),
  header: $('.wrap-header'),
}

const PLAYER_RATIO = 1.7777;

export default class Graphic {
  constructor() {
    $$.videoPlayer = $('#videojs-player-desktop');
    $$.videoPlayerWrapper = $('.video-wrapper.desktop-only');
    this.setupGraphic();
  }

  setupGraphic() {
    this.sizeGraphic(this.getContainerHeight());
    this.bindEvents();
  }

  bindEvents() {
    $(window).on('resize orientationchange', () => {
      let containerHeight = this.getContainerHeight();
      this.sizeGraphic(containerHeight);
      this.sizeVideo(containerHeight);
    });
    $$.benefitTrigger.on('click', evt => {
      this.activateBenefit(evt);
      this.slideBenefits();
    });

    $$.skipLinkTrigger.on('click', this.slideBenefits.bind(this));

    $$.benefit.on('click', this.activateBenefit.bind(this));
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
        width: containerHeight * PLAYER_RATIO
      });
    } else {
      $$.graphicWrapper.css({
        height: $$.window.width() / PLAYER_RATIO,
        width: '100%'
      });
    }
  }

  sizeVideo(containerHeight) {

    $$.videoPlayerWrapper.height(containerHeight);

    if (($$.window.width() / containerHeight) >= PLAYER_RATIO) {
      $$.videoPlayer.css({
        height: '100%',
        width: containerHeight * PLAYER_RATIO
      });
    } else {
      $$.videoPlayer.css({
        height: $$.window.width() / PLAYER_RATIO,
        width: '100%'
      });
    }
  }
}
