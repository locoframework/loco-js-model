import Base from "./base.js";
import I18n from "../i18n";
import Config from "../config";

class Inclusion extends Base {
  constructor() {
    super();
  }

  validate() {
    const set = this.opts.in || this.opts.within || [];
    if (set.indexOf(this.val) !== -1) return;
    this.#addErrorMessage();
  }

  #addErrorMessage() {
    const message =
      this.opts.message != null
        ? this.opts.message
        : I18n[Config.locale].errors.messages.inclusion;
    this.obj.addErrorMessage(message, { for: this.attr });
  }
}

export default Inclusion;

Inclusion.identity = "Inclusion";
