import Base from "./base";
import Config from "./config";
import I18n from "./i18n";
import IdentityMap from "./IdentityMap";
import Validators from "./validators";

const Models = { Base };
const connector = { IdentityMap, Models };

export { Config, I18n, Models, Validators, connector };
