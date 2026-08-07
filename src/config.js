let protocolWithHost = null;

const Config = {
  locale: "en",
  scope: null,

  get protocolWithHost() {
    return protocolWithHost;
  },

  set protocolWithHost(val) {
    protocolWithHost = val ? val.replace(/\/$/, "") : null;
  },
};

export default Config;
