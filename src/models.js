import Base from "./base";

Base.prototype.clone = function () {
  return new this.constructor({ ...this.attributes() });
};

const Models = { Base };

export default Models;
