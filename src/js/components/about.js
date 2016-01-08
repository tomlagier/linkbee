import $ from 'jquery'
import mobileDetect from './is-mobile'

const $$ = {
  hexagons: $('.about-hexagon-wrapper'),
  window: $(window),
  html: $('html')
}

export default class AboutHexagons {
  constructor() {
    $$.hexagons.on('click', evt => {
      console.log('fired')
      $$.hexagons.removeClass('active')
      $(evt.currentTarget).addClass('active')
    })
    
    $$.html.on('click', evt => {
      if (!$(evt.target).closest($$.hexagons).length) {
        $$.hexagons.removeClass('active')
      }
    })
  }
}