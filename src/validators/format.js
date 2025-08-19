import Base from "./base.js";
import I18n from "../i18n";
import Config from "../config";

class Format extends Base {
  constructor() {
    super();
  }

  validate() {
    const match = this.opts.with.exec(this.val || "");
    if (match != null) return;
    this.#addErrorMessage();
  }

  #addErrorMessage() {
    const message =
      this.opts.message != null
        ? this.opts.message
        : I18n[Config.locale].errors.messages.invalid;
    this.obj.addErrorMessage(message, { for: this.attr });
  }
}

export default Format;

Format.identity = "Format";
