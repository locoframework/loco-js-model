import Base from "./base.js";

class Exclusion extends Base {
  validate() {
    const set = this.opts.in || this.opts.within || [];
    if (set.indexOf(this.val) === -1) return;
    this.addError("exclusion");
  }
}

export default Exclusion;
