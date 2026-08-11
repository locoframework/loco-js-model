import I18n from "../i18n.js";
import Config from "../config.js";

class Base {
  static instance(obj, attr, opts) {
    const validator = new this();
    validator.assignAttribs(obj, attr, opts);
    return validator;
  }

  assignAttribs(obj, attr, opts) {
    this.obj = obj;
    this.attr = attr;
    this.val = obj[attr];
    this.opts = opts;
  }

  addError(msgKey) {
    const message =
      this.opts.message != null
        ? this.opts.message
        : I18n[Config.locale].errors.messages[msgKey];
    this.obj.addErrorMessage(message, { for: this.attr });
  }
}

export default Base;
