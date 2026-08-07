import Base from "./base.js";

class Format extends Base {
  validate() {
    if (this.opts.with.exec(this.val || "") != null) return;
    this.addError("invalid");
  }
}

export default Format;
