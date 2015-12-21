import $ from 'jquery';
import _ from 'lodash';
import videojs from 'video.js';

let defaults = {
  responsive: true,
  controls: true,
  autoplay: false
}

let $$ = {
  adminBar: $('.admin-bar'),
  header: $('.wrap-header'),
  videoWrapperDesktop: $('.video-wrapper.desktop-only'),
  videoPlayerDesktop: $('#videojs-player-desktop'),
  interactiveGraphic: $('.interactive-graphic'),
  skipLink: $('.skip-link'),
  skipLinkTrigger: $('.skip-link .button'),
  window: $(window)
}

const PLAYER_RATIO = 1.777;

export default class VideoPlayer {
  constructor(el, options) {

    this.el = el, this.$el = $(el), this.$parent = $(el).parent();

    _.defaults(options, defaults);

    //Queue up callbacks
    const callbacks = [];
    if (options.callback) callbacks.push(options.callback.bind(this));
    if (options.autoplay) callbacks.push( () => this.player.play() )

    if (options.desktop) this.setupDesktop();
    if (options.mobile) this.setupMobile();

    this.player = videojs(el, options,
      //Execute all callbacks
      () => {
        $$.videoPlayerDesktop = $('#videojs-player-desktop');
        this.moveSkipLink();
        callbacks.forEach( callback => callback());

        setTimeout(this.toggleBackground.bind(this), 6000);
      });

    $$.skipLinkTrigger.on('click', this.skipVideo.bind(this))
  }

  //Set container size, set video to fill container
  //Set video to fill container
  setupDesktop() {
    this.sizeDesktop();

    // $$.window.on('resize orientationchange', () => {
    //   this.sizeDesktop();
    // })
  }

  moveSkipLink() {
    $('.video-js').append($$.skipLink);
  }

  toggleBackground() {
    $$.interactiveGraphic.addClass('switch-background');
  }

  skipVideo() {
    this.toggleBackground();
    this.player.currentTime(this.player.duration());
  }

  sizeDesktop() {
    let containerHeight = this.getContainerHeight()
    $$.videoWrapperDesktop.height(containerHeight);
    this.sizePlayerDesktop(containerHeight);
  }

  //Gets window size minus header
  getContainerHeight() {
    let headerHeight = $$.header.height();
    if ($$.adminBar.length) headerHeight += 32;

    let containerHeight = $(window).height() - headerHeight;

    return containerHeight;
  }

  sizePlayerDesktop(containerHeight) {
    if (($$.window.width() / containerHeight) >= PLAYER_RATIO) {
      $$.videoPlayerDesktop.css({
        height: '100%',
        width: containerHeight * PLAYER_RATIO
      });
    } else {
      $$.videoPlayerDesktop.css({
        height: $$.window.width() / PLAYER_RATIO,
        width: '100%'
      });
    }
  }
}
