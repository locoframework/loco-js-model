import Base from "./base.js";
import I18n from "../i18n";
import Config from "../config";

class Length extends Base {
  validate() {
    if (this.val == null) return;
    let message = null;
    const [from, to] = this.#range();
    if (from != null && to != null && from === to && this.val.length !== from) {
      message = this.#selectErrorMessage("wrong_length", from);
    } else if (from != null && this.val.length < from) {
      message = this.#selectErrorMessage("too_short", from);
    } else if (to != null && this.val.length > to) {
      message = this.#selectErrorMessage("too_long", to);
    }
    if (message === null) return;
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  #range() {
    const from =
      this.opts.minimum ||
      this.opts.is ||
      (this.opts.within != null && this.opts.within[0]) ||
      null;
    const to =
      this.opts.maximum ||
      this.opts.is ||
      (this.opts.within != null && this.opts.within[1]) ||
      null;
    return [from, to];
  }

  #selectErrorMessage(msg, val) {
    const messages = I18n[Config.locale].errors.messages[msg];
    if (val === 1) return messages.one;
    const variants = I18n[Config.locale].variants || {};
    const variant = ["few", "many"].find(
      (name) => variants[name] != null && variants[name](val),
    );
    const message =
      this.opts.message != null
        ? this.opts.message
        : messages[variant] || messages.other;
    return message.replace("%{count}", val);
  }
}

export default Length;
