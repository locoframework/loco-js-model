import { Config, I18n, Models } from "index";

class Article extends Models.Base {
  static identity = "Article";

  static attributes = {
    title: {
      validations: {
        presence: true
      }
    }
  };
}

class DummyCustomMsg extends Models.Base {
  static identity = "Dummy";

  static attributes = {
    title: {
      validations: {
        presence: { message: "presence is required" }
      }
    }
  };
}

I18n.pl = {
  errors: {
    messages: {
      blank: "nie może być puste"
    }
  }
};

let article = null;

beforeEach(() => {
  article = new Article({ title: "" });
});

afterEach(() => {
  Config.locale = "en";
  article = new Article({ title: "" });
});

it("validates length if object is a string", () => {
  article.isValid();
  expect(article.errors.title[0]).toEqual("can't be blank");
});

it("supports i18n", () => {
  Config.locale = "pl";
  article.isValid();
  expect(article.errors.title[0]).toEqual("nie może być puste");
});

it("supports custom message", () => {
  const dcm = new DummyCustomMsg({ title: null });
  dcm.isValid();
  expect(dcm.errors.title[0]).toEqual("presence is required");
});
