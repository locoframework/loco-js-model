import Base from "./base.js";
import Length from "./length.js";

class Size extends Base {
  constructor() {
    super();
  }

  validate() {
    return Length.instance(this.obj, this.attr, this.opts).validate();
  }
}

export default Size;

Size.identity = "Size";
