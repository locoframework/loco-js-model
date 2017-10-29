const LocalEnv = {
  loco: {
    getLocale: () => { return 'en' },
    protocolWithHost: () => { return null }
  },
  scope: null
};

const Env = () => {
  if(typeof window === 'undefined') {
    return LocalEnv
  }
  return window.App === undefined ? LocalEnv : window.App.Env
}

export {Env};