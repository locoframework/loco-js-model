const LocalEnv = {
  loco: {
    getLocale: () => { return 'en' },
    protocolWithHost: null
  },
  scope: null
};

const Env = () => {
  if(typeof App === 'undefined') {
    return LocalEnv
  }
  return App.Env
}

export default Env;