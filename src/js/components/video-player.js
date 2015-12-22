import $ from 'jquery';
import _ from 'lodash';
import videojs from 'video.js';
import mobileDetect from './is-mobile';

let defaults = {
  responsive: true,
  controls: true,
  autoplay: false,
  callbacks: []
}

let $$ = {
  adminBar: $('.admin-bar'),
  header: $('.wrap-header'),
  videoWrapper: $('.video-wrapper'),
  videoPlayer: $('#videojs-player'),
  interactiveGraphic: $('.interactive-graphic'),
  skipLink: $('.skip-link'),
  skipLinkTrigger: $('.skip-link .button'),
  mobilePoster: $('.mobile-poster').not('.skip-link .button'),
  window: $(window)
}

const PLAYER_RATIO = 1.777;

export default class VideoPlayer {
  constructor(el, options) {
    this.options = options || {};
    _.defaults(this.options, defaults);

    //Queue up callbacks
    this.setupPlayer();

    $$.skipLinkTrigger.on('click', this.skipVideo.bind(this));
    $$.mobilePoster.on('click', () => {
      this.hidePoster();
      this.player.play();
    });
  }

  setupPlayer() {
    if (mobileDetect.isDesktop()) {
      this.options.callbacks.push(() => {
        setTimeout(this.toggleBackground.bind(this), 6000);
        this.moveSkipLink();
        this.player.play();
      });

      this.setupDesktop();
    } else {
      this.options.autoplay = false;
      this.setupDesktop();
    }

    this.player = videojs($$.videoPlayer[0], this.options,
    //Execute all callbacks
    () => {
      $$.videoPlayer = $('#videojs-player');
      this.options.callbacks.forEach(callback => callback());
    });
  }

  //Set container size, set video to fill container
  //Set video to fill container
  setupDesktop() {
    this.sizeDesktop();
  }

  moveSkipLink() {
    $('.video-js').append($$.skipLink);
  }

  toggleBackground() {
    $$.interactiveGraphic.addClass('switch-background');
  }

  skipVideo() {
    this.hidePoster();
    this.toggleBackground();
    this.player.currentTime(this.player.duration());
  }

  hidePoster() {
    $$.mobilePoster.addClass('hidden');
    setTimeout(this.toggleBackground.bind(this), 6000);
  }

  sizeDesktop() {
    let containerHeight = this.getContainerHeight()
    $$.videoWrapper.height(containerHeight);
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
      $$.videoPlayer.css({
        height: '100%',
        width: parseInt(containerHeight * PLAYER_RATIO + 2, 10)
      });
    } else {
      $$.videoPlayer.css({
        height: parseInt($$.window.width() / PLAYER_RATIO + 2, 10),
        width: '100%'
      });
    }
  }
}
