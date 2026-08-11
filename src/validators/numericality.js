import Base from "./base.js";
import I18n from "../i18n.js";
import Config from "../config.js";

// [option, fails?, message key (defaults to the option name)]
const CHECKS = [
  ["only_integer", (v) => Number(v) !== parseInt(v, 10), "not_an_integer"],
  ["greater_than", (v, limit) => Number(v) <= limit],
  ["greater_than_or_equal_to", (v, limit) => Number(v) < limit],
  ["equal_to", (v, limit) => Number(v) !== limit],
  ["less_than", (v, limit) => Number(v) >= limit],
  ["less_than_or_equal_to", (v, limit) => Number(v) > limit],
  ["other_than", (v, limit) => Number(v) === limit],
  ["odd", (v) => Number(v) % 2 !== 1],
  ["even", (v) => Number(v) % 2 !== 0],
];

class Numericality extends Base {
  validate() {
    if (isNaN(this.val)) return this.addError("not_a_number");
    for (const [option, fails, msgKey = option] of CHECKS) {
      const limit = this.opts[option];
      if (limit == null || !fails(this.val, limit)) continue;
      const message = I18n[Config.locale].errors.messages[msgKey];
      this.obj.addErrorMessage(message.replace("%{count}", limit), {
        for: this.attr,
      });
      return;
    }
  }
}

export default Numericality;
