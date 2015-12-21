import $ from 'jquery';
import ImagesLoaded from 'imagesloaded';

let $$ = {
  loader: $('.loader'),
  html: $('html')
}

export default class Loader {
  constructor() {
    ImagesLoaded($$.html[0], this.hideLoader.bind(this));
  }

  hideLoader() {
    setTimeout(() => {
      $$.loader.addClass('hidden');
    }, 1500);
  }
}
