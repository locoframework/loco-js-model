import Config from "./config";
import I18n from "./i18n";
import IdentityMap from "./IdentityMap";
import Models from "./models";
import Validators from "./validators";

const connector = {
  IdentityMap,
  Models,
};

export { Config, I18n, Models, Validators, connector };
