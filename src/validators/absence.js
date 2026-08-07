import Base from "./base.js";

class Absence extends Base {
  validate() {
    if (typeof this.val === "string" ? this.val.length === 0 : this.val == null)
      return;
    this.addError("present");
  }
}

export default Absence;
