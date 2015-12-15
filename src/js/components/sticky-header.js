import $ from 'jquery';
import '../libs/jquery.sticky.js';

let $$ = {
  header: $('.wrap-header'),
  body: $('body')
}

export default class StickyHeader {
  constructor() {
    $$.header.sticky({
      topSpacing: $$.body.hasClass('admin-bar') ? 32 : 0
    });
  }
}
