let locale = 'en';
let protocolWithHost = null;
let scope = null;

class ConfigClass {
  getLocale() {
    return locale;
  }

  setLocale(val) {
    return locale = val;
  }

  get protocolWithHost() {
    return protocolWithHost;
  }

  getProtocolWithHost() {
    return protocolWithHost;
  }

  setProtocolWithHost(val) {
    if(!val)
      return protocolWithHost = null;
    if(val[val.length - 1] === '/')
      return protocolWithHost = val.slice(0, val.length - 1);
    return protocolWithHost = val;
  }

  get scope() {
    return scope;
  }

  set scope(val) {
    return scope = val;
  }
}

const Config = new ConfigClass;

export default Config;