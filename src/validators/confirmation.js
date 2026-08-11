import Base from "./base.js";
import I18n from "../i18n.js";
import Config from "../config.js";

class Confirmation extends Base {
  validate() {
    const properAttr = `${this.attr}Confirmation`;
    const properVal = this.obj[properAttr];
    if (this.val != null && properVal != null && this.val === properVal) return;
    const attrNames = I18n[Config.locale].attributes[this.obj.getIdentity()];
    const attrName =
      (attrNames && attrNames[this.attr]) ||
      this.attr.charAt(0).toUpperCase() + this.attr.slice(1);
    const message =
      this.opts.message != null
        ? this.opts.message
        : I18n[Config.locale].errors.messages.confirmation;
    this.obj.addErrorMessage(message.replace("%{attribute}", attrName), {
      for: properAttr,
    });
  }
}

export default Confirmation;
