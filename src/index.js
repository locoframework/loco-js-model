import Base from "./base.js";
import Config from "./config.js";
import I18n from "./i18n.js";
import IdentityMap from "./IdentityMap.js";
import Validators from "./validators.js";

const Models = { Base };
const connector = { IdentityMap, Models };

export { Config, I18n, Models, Validators, connector };
