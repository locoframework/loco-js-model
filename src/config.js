class Configurator {
  constructor() {
    this.localeVar = "en";
    this.protocolWithHostVar = null;
    this.scopeVar = null;
  }

  get locale() {
    return this.localeVar;
  }

  set locale(val) {
    this.localeVar = val;
  }

  get protocolWithHost() {
    return this.protocolWithHostVar;
  }

  set protocolWithHost(val) {
    if (!val) {
      this.protocolWithHostVar = null;
    } else if (val[val.length - 1] === "/") {
      this.protocolWithHostVar = val.slice(0, val.length - 1);
    } else {
      this.protocolWithHostVar = val;
    }
  }

  get scope() {
    return this.scopeVar;
  }

  set scope(val) {
    this.scopeVar = val;
  }
}

const Config = new Configurator();

export default Config;
