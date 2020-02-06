import { Config, Env, I18n, Models, Validators } from "index";

class Vulgarity extends Validators.Base {
  static identity = "Vulgarity";

  constructor() {
    super();
  }

  validate() {
    if (this.val == null) return;

    switch (typeof this.val) {
      case "string": {
        const vulgarWord = this._getVulgarWord();
        if (new RegExp(vulgarWord, "i").exec(this.val)) {
          this._addErrorMessage();
        }
        break;
      }
      default:
        throw new TypeError(
          "Vulgarity validator is applicable only for strings and #{this.attr} isn't."
        );
    }
  }

  _addErrorMessage() {
    const message = I18n[Config.locale].errors.messages.vulgarity;
    this.obj.addErrorMessage(message, { for: this.attr });
  }

  _getVulgarWord() {
    switch (Config.locale) {
      case "pl":
        return "kurwa";
      case "en":
        return "fuck";
    }
  }
}

Object.assign(Validators, { Vulgarity });

I18n.en.errors.messages.vulgarity = "contains strong language.";

I18n.pl = {
  errors: {
    messages: {
      vulgarity: "zawiera mocny język."
    }
  }
};

class Comment extends Models.Base {
  static identity = "Article.Comment";

  static attributes = {
    text: {
      validations: {
        vulgarity: true
      }
    }
  };
}

it("allows to define custom validators", () => {
  Config.locale = "en";
  const comment = new Comment({ text: "Some nice words + FUCK at the end." });
  expect(comment.isInvalid()).toBe(true);
  expect(comment.errors.text[0]).toEqual("contains strong language.");
});

it("supports i18n", () => {
  Config.locale = "pl";
  const comment = new Comment({
    text: "Trochę ciepłych słów + KuRwA na końcu."
  });
  expect(comment.isInvalid()).toBe(true);
  expect(comment.errors.text[0]).toEqual("zawiera mocny język.");
});
