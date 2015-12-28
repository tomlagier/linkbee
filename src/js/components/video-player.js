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
  window: $(window),
  htmlBody: $('html,body')
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

    this.player.on('timeupdate', () => {
      let currentTime = this.player.currentTime();
      if (currentTime > 13.4 && !this.backgroundToggled) {
        this.toggleBackground();
      }
    });

    this.player.on('ended', () => {
      $$.interactiveGraphic.addClass('rays');
    });
  }

  setupPlayer() {
    if (mobileDetect.isDesktop()) {
      this.options.callbacks.push(() => {
        this.moveSkipLink();
        this.player.play();
      });

      this.setupDesktop();
    } else {
      this.options.autoplay = false;
      this.options.callbacks.push(() => {
        this.player.on('ended', this.hideVideoSection.bind(this));
      });
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
    if (!this.backgroundToggled) {
      $$.videoWrapper.addClass('switch-background');
      $$.interactiveGraphic.addClass('switch-background');
      this.backgroundToggled = true;
    }
  }

  skipVideo() {
    this.hidePoster();
    this.toggleBackground();
    this.player.pause();
    $$.videoPlayer.addClass('stopped');
    $$.interactiveGraphic.addClass('rays');
    // this.player.currentTime(this.player.duration());

    if (mobileDetect.isDevice()) {
      this.hideVideoSection();
    }
  }

  hideVideoSection() {
    this.isHidden = true;
    $$.videoWrapper.addClass('is-hidden')
    $$.videoWrapper.height(0);
    $$.htmlBody.animate({
      scrollTop: $$.header.height()
    })
  }

  hidePoster() {
    $$.mobilePoster.addClass('hidden');
    setTimeout(this.toggleBackground.bind(this), 13500);
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
    if (!this.isHidden) {
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
}
