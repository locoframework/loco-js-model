import Base from "./base.js";

class Presence extends Base {
  validate() {
    if (typeof this.val === "string" ? this.val.length > 0 : this.val != null)
      return;
    this.addError("blank");
  }
}

export default Presence;
