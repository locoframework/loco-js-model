import Base from './base.js';
import I18n from '../i18n';
import Config from '../config';

class Confirmation extends Base {

  constructor() {
    super();
  }

  validate() {
    const properVal = this.obj[this._properAttr()];
    if (this.val != null && properVal != null && this.val === properVal) return;
    this._addErrorMessage();
  }

  _addErrorMessage() {
    const defaultAttrName = this.attr.charAt(0).toUpperCase() + this.attr.slice(1);
    const attrNames = I18n[Config.locale].attributes[this.obj.getIdentity()];
    const attrName = (attrNames && attrNames[this.attr]) || defaultAttrName;
    let message = this.opts.message != null ? this.opts.message : I18n[Config.locale].errors.messages.confirmation;
    message = message.replace('%{attribute}', attrName);
    this.obj.addErrorMessage(message, { for: this._properAttr() });
  }

  _properAttr() {
    return `${this.attr}Confirmation`;
  }
}

export default Confirmation;

Confirmation.identity = 'Confirmation';


