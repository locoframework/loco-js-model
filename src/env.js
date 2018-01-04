import Config from './config';

export const EnvObj = {
  loco: Config,
  scope: null
};

const Env = () => (typeof App === 'undefined') ? EnvObj : App.Env;

export default Env;