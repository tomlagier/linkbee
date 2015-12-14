import $ from 'jquery';
import Menu from './components/menu';

class App {
  constructor() {

  }

  ready() {
    let menu = new Menu();
  }
}

let app = new App();

$(() => {
  app.ready();
});
