let locale = 'en';
let protocolWithHost = null;

const Config = {
  getLocale: () => locale,
  setLocale: val => locale = val,
  getProtocolWithHost: () => protocolWithHost,
  setProtocolWithHost: (val) => protocolWithHost = val,
  protocolWithHost: null
};

export default Config;