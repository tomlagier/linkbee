import $ from 'jquery';

let $$ = {
  formTrigger: $('.contact-form-trigger .button'),
  overlay: $('.contact-form-overlay'),
  wrapper: $('.contact-form-wrapper'),
  closeButton: $('.contact-form-wrapper .close'),
  html: $('html'),
  submitButton: $('.submit-button'),
  submitButtonInput: $('.submit-button input')
};

export default class ContactForm {
  constructor() {
    this.setupEvents();
  }

  setupEvents() {
    $$.formTrigger.on('click', this.openForm.bind(this));
    $$.closeButton.on('click', this.closeForm.bind(this));
    $$.submitButton.on('click', evt => {
      if (!$(evt.target).closest('input').length) {
        $$.submitButtonInput.click();
      }
    });
  }

  openForm() {
    $$.overlay.addClass('active');
    $$.html.addClass('form-active');
    this.isActive = true;
    setTimeout(() => this.bindHtmlClick());
  }

  closeForm() {
    $$.overlay.removeClass('active');
    $$.html.removeClass('form-active');
    this.isActive = false;

    this.unbindHtmlClick();
  }

  bindHtmlClick() {
    $$.html.on('click.lbContactForm', evt => {
      let $target = $(evt.target);
      if (!$target.closest($$.wrapper).length) {
        this.closeForm();
      }
    });
  }

  unbindHtmlClick() {
    $$.html.off('click.lbContactForm');
  }
}
