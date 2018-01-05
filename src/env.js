import Config from './config';

let loco = Config;

class EnvClass {
  get loco() {
    return loco;
  }

  set loco(val) {
    return loco = val;
  }
}

const Env = new EnvClass;

export default Env;