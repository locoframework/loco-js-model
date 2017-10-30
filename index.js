import {Base} from './src/base.coffee';
import {IdentityMap} from './src/identity_map.coffee';
import {Base as BaseValidator} from './src/validators/base.coffee';
import {Validators} from './src/validators.js';

Validators.Base = BaseValidator;

export {Base, IdentityMap, Validators};