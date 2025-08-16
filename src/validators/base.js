import Validators from '../validators';

class Base {

  static instance(obj, attr, opts) {
    const validatorName = this.identity;
    if (this.sharedInstances[validatorName] == null) {
      this.sharedInstances[validatorName] = new Validators[validatorName]();
    }
    const sharedInstance = this.sharedInstances[validatorName];
    sharedInstance.assignAttribs(obj, attr, opts);
    return sharedInstance;
  }

  constructor() {
    this.obj = null;
    this.attr = null;
    this.val = null;
    this.opts = null;
  }

  assignAttribs(obj, attr, opts) {
    this.obj = obj;
    this.attr = attr;
    this.val = this.obj[this.attr];
    this.opts = opts;
  }
}

export default Base;

Base.sharedInstances = {};


