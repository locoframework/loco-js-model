import Config from './config';

let loco = Config;

class EnvClass {
  get loco() {
    return loco;
  }

  set loco(val) {
    return loco = val;
  }

  get scope() {
    return loco.getScope();
  }

  set scope(val) {
    return loco.setScope(val);
  }
}

const Env = new EnvClass;

export default Env;