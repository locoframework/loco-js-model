const LocalEnv = {
  loco: {
    getLocale: () => { return 'en' },
    protocolWithHost: () => { return null }
  },
  scope: null
};

const Env = () => {
  if(typeof App === 'undefined') {
    return LocalEnv
  }
  return App.Env
}

export {Env};