import $ from 'jquery';
import Menu from './components/menu';
import StickyHeader from './components/sticky-header';

class App {
  constructor() {
  }

  ready() {
    let menu = new Menu();
    let stickyHeader = new StickyHeader();
  }
}

let app = new App();

$(() => {
  app.ready();
});
