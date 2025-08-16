import Base from './base.js';
import I18n from '../i18n';
import Config from '../config';

class Numericality extends Base {

  constructor() {
    super();
  }

  validate() {
    if (isNaN(this.val)) {
      this._addNaNErrorMessage();
    } else if (this.opts.only_integer != null && Number(this.val) !== parseInt(this.val, 10)) {
      this._addIntErrorMessage();
    } else if (this.opts.greater_than != null && Number(this.val) <= this.opts.greater_than) {
      this._addGreatherThanErrorMessage();
    } else if (this.opts.greater_than_or_equal_to != null && Number(this.val) < this.opts.greater_than_or_equal_to) {
      this._addGreatherThanOrEqualToErrorMessage();
    } else if (this.opts.equal_to != null && Number(this.val) !== this.opts.equal_to) {
      this._addEqualToErrorMessage();
    } else if (this.opts.less_than != null && Number(this.val) >= this.opts.less_than) {
      this._addLessThanErrorMessage();
    } else if (this.opts.less_than_or_equal_to != null && Number(this.val) > this.opts.less_than_or_equal_to) {
      this._addLessThanOrEqualToErrorMessage();
    } else if (this.opts.other_than != null && Number(this.val) === this.opts.other_than) {
      this._addOtherThanErrorMessage();
    } else if (this.opts.odd != null && Number(this.val) % 2 !== 1) {
      this._addOddErrorMessage();
    } else if (this.opts.even != null && Number(this.val) % 2 !== 0) {
      this._addEvenErrorMessage();
    }
  }

  _addNaNErrorMessage() {
    const message = this.opts.message != null ? this.opts.message : I18n[Config.locale].errors.messages.not_a_number;
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addIntErrorMessage() {
    const message = I18n[Config.locale].errors.messages.not_an_integer;
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addGreatherThanErrorMessage() {
    let message = I18n[Config.locale].errors.messages.greater_than;
    message = message.replace('%{count}', this.opts.greater_than);
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addGreatherThanOrEqualToErrorMessage() {
    let message = I18n[Config.locale].errors.messages.greater_than_or_equal_to;
    message = message.replace('%{count}', this.opts.greater_than_or_equal_to);
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addEqualToErrorMessage() {
    let message = I18n[Config.locale].errors.messages.equal_to;
    message = message.replace('%{count}', this.opts.equal_to);
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addLessThanErrorMessage() {
    let message = I18n[Config.locale].errors.messages.less_than;
    message = message.replace('%{count}', this.opts.less_than);
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addLessThanOrEqualToErrorMessage() {
    let message = I18n[Config.locale].errors.messages.less_than_or_equal_to;
    message = message.replace('%{count}', this.opts.less_than_or_equal_to);
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addOtherThanErrorMessage() {
    let message = I18n[Config.locale].errors.messages.other_than;
    message = message.replace('%{count}', this.opts.other_than);
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addOddErrorMessage() {
    const message = I18n[Config.locale].errors.messages.odd;
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _addEvenErrorMessage() {
    const message = I18n[Config.locale].errors.messages.even;
    this.obj.addErrorMessage(message, { for: this.attr });
  }
}

export default Numericality;

Numericality.identity = 'Numericality';


