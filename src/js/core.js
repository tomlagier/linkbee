import $ from 'jquery';
import './libs/calc.js';
import Menu from './components/menu';
import StickyHeader from './components/sticky-header';
import VideoPlayer from './components/video-player';
import Graphic from './components/graphic';
import ContactForm from './components/contact-form';
import AboutHexagons from './components/about';
import Loader from './components/loader';

class App {
  constructor() {
    let loader = new Loader();
  }

  ready() {
    let menu = new Menu();
    let stickyHeader = new StickyHeader();
    let videoPlayer = new VideoPlayer();
    let graphic = new Graphic();
    let contactForm = new ContactForm();
    let about = new AboutHexagons();
  }
}

let app = new App();

$(() => {
  app.ready();
});
