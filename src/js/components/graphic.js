import $ from 'jquery';
import _ from 'lodash';
import videojs from 'video.js';

let $$ = {
  graphicWrapper: $('.graphic-wrapper'),
  window: $(window)
}

export default class Graphic {
  constructor() {
    $$.videoPlayer = $('#videojs-player-desktop');
    this.setupGraphic();
  }

  setupGraphic() {
    this.sizeGraphic();

    $(window).on('resize orientationchange', this.sizeGraphic.bind(this));
  }

  //Set container size, set video to fill container
  //Set video to fill container
  sizeGraphic() {
    $$.graphicWrapper.width($$.videoPlayer.width());
    $$.graphicWrapper.height($$.videoPlayer.height());
  }
}
