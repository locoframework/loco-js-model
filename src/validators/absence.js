import Base from './base.js';
import I18n from '../i18n';
import Config from '../config';

class Absence extends Base {

  constructor() {
    super();
  }

  validate() {
    switch (typeof this.val) {
      case 'string':
        if (this.val != null && this.val.length === 0) return;
        break;
      default:
        if (this.val == null) return;
    }
    this._addErrorMessage();
  }

  _addErrorMessage() {
    const message = this.opts.message != null ? this.opts.message : I18n[Config.locale].errors.messages.present;
    this.obj.addErrorMessage(message, { for: this.attr });
  }
}

export default Absence;

Absence.identity = 'Absence';


