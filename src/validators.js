import Absence from "./validators/absence.js";
import Base from "./validators/base.js";
import Confirmation from "./validators/confirmation.js";
import Exclusion from "./validators/exclusion.js";
import Format from "./validators/format.js";
import Inclusion from "./validators/inclusion.js";
import Length from "./validators/length.js";
import Numericality from "./validators/numericality.js";
import Presence from "./validators/presence.js";

const Validators = {
  Absence,
  Base,
  Confirmation,
  Exclusion,
  Format,
  Inclusion,
  Length,
  Numericality,
  Presence,
  Size: Length,
};

export default Validators;
