import Base from './src/base.coffee';
import IdentityMap from './src/identity_map.coffee';
import BaseValidator from './src/validators/base.coffee';
import Validators from './src/validators.js';
import Config from './src/config';

Validators.Base = BaseValidator;

export {
  Base,
  Config,
  IdentityMap,
  Validators
};