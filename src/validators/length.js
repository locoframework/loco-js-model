import Base from './base.js';
import I18n from '../i18n';
import Config from '../config';

class Length extends Base {

  constructor() {
    super();
  }

  validate() {
    if (this.val == null) return;
    let message = null;
    const [from, to] = this._range();
    if (from != null && to != null && from === to && this.val.length !== from) {
      message = this._selectErrorMessage('wrong_length', from);
    } else if (from != null && this.val.length < from) {
      message = this._selectErrorMessage('too_short', from);
    } else if (to != null && this.val.length > to) {
      message = this._selectErrorMessage('too_long', to);
    }
    if (message === null) return;
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _range() {
    const from = this.opts.minimum || this.opts.is || (this.opts.within != null && this.opts.within[0]) || null;
    const to = this.opts.maximum || this.opts.is || (this.opts.within != null && this.opts.within[1]) || null;
    return [from, to];
  }

  _selectErrorMessage(msg, val) {
    if (val === 1) return I18n[Config.locale].errors.messages[msg].one;
    let message = null;
    for (const variant of ['few', 'many']) {
      if (this._checkVariant(variant, val)) {
        message = I18n[Config.locale].errors.messages[msg][variant];
        break;
      }
    }
    if (message == null) {
      message = I18n[Config.locale].errors.messages[msg].other;
    }
    if (this.opts.message != null) {
      message = this.opts.message;
    }
    if (/%\{count\}/.exec(message)) {
      message = message.replace('%{count}', val);
    }
    return message;
  }

  _checkVariant(variant, val) {
    if (I18n[Config.locale].variants[variant] == null) return undefined;
    return I18n[Config.locale].variants[variant](val);
  }
}

export default Length;

Length.identity = 'Length';


