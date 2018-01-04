import Config from './config';

const LocalEnv = {
  loco: Config,
  scope: null
};

const Env = () => (typeof App === 'undefined') ? LocalEnv : App.Env;

export default Env;