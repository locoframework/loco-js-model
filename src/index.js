import Base from './base.coffee';
import IdentityMap from './identity_map.coffee';
import BaseValidator from './validators/base.coffee';
import Validators from './validators.js';
import Config from './config';

Validators.Base = BaseValidator;

export {
  Base,
  Config,
  IdentityMap,
  Validators
};