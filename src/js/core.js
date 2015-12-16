import $ from 'jquery';
import Menu from './components/menu';
import StickyHeader from './components/sticky-header';
import VideoPlayer from './components/video-player';

let $$ = {
  desktopPlayer: $('#videojs-player-desktop')
}

class App {
  constructor() {
  }

  ready() {
    let menu = new Menu();
    let stickyHeader = new StickyHeader();

    let videoPlayer = new VideoPlayer($$.desktopPlayer[0], {
      autoplay: true,
      desktop: true
    });


  }
}

let app = new App();

$(() => {
  app.ready();
});
