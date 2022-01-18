import nock from 'nock';
import createMockXHR from "../../__mock__/xhr";
import { Config, Models } from "index";

class Comment extends Models.Base {
  static authorizationHeader = "Bearer XXX";

  static identity = "Article.Comment";
  static remoteName = "Comment";
  static resources = {
    url: "/user/articles/:articleId/comments",
    paginate: { per: 10 }
  };

  static attributes = {
    author: {
      validations: {
        presence: true
      }
    },
    text: {
      validations: {
        presence: true
      }
    },
    articleId: {
      type: "Int",
      validations: {
        presence: true
      },
      remoteName: "article_id"
    },
    approved: {
      type: "Boolean"
    }
  };
}

class Article extends Models.Base {
  static identity = "Article";

  static attributes = {
    title: {
      type: "String"
    },
    adminRate: {
      type: "Float"
    },
    adminReviewStartedAt: {
      type: "Number"
    }
  };

  static validate = ["vulgarityLevel"];

  vulgarityLevel = () => {
    if (this.content != null && /fuck/i.exec(this.content)) {
      this.addErrorMessage("Article contains strong language.", {
        for: "base"
      });
    }
  };
}

class Dummy extends Models.Base {
  static protocolWithHost = "https://myapp.test";

  static identity = "Dummy";

  static attributes = {
    dumbAttrib5: {
      validations: {
        size: { minimum: 1 },
        format: {
          with: /^[a-z0-9]{5,}$/,
          if: o => o.dumbAttrib5 != null && o.dumbAttrib5.length >= 5
        }
      }
    }
  };
}

const oldXMLHttpRequest = window.XMLHttpRequest;

const mockXHR = () => {
  const mock = createMockXHR();
  window.XMLHttpRequest = jest.fn(() => mock);
  return mock;
};

afterEach(() => {
  window.XMLHttpRequest = oldXMLHttpRequest;
});

it("does not send param if was used in URL + .all uses Authorization header if defined", () => {
  const mock = mockXHR();
  Comment.all({ articleId: 1 });
  expect(mock.open).toBeCalledWith(
    "GET",
    "/user/articles/1/comments?page=1"
  );
  expect(mock.setRequestHeader).toBeCalledWith("Authorization", "Bearer XXX");
});

describe("requests", () => {
  it("does not set withCredentials by default", () => {
    const mock = mockXHR();
    new Comment({ articleId: 1, author: "Joe Doe", text: "foo bar baz"}).save();
    expect(mock.open).toBeCalledWith("POST", "/user/articles/1/comments");
    expect(mock.withCredentials).toEqual(false);
  });

  it("is possible to set withCredentials via Config", () => {
    const mock = mockXHR();
    Config.cookiesByCORS = true;
    new Comment({ articleId: 1, author: "Joe Doe", text: "foo bar baz"}).save();
    expect(mock.open).toBeCalledWith("POST", "/user/articles/1/comments");
    expect(mock.withCredentials).toEqual(true);
  });
});

describe("attribute types", () => {
  it("can be Number", () => {
    const article = new Article({ adminReviewStartedAt: "1464490570.0260842" });
    expect(article.adminReviewStartedAt).toEqual(1464490570.0260842);
  });

  it("can be Float", () => {
    const article = new Article({ adminRate: "  8.33 aaa " });
    expect(article.adminRate).toEqual(8.33);
  });

  it("can be String", () => {
    const article = new Article({ title: 12.33 });
    expect(article.title).toEqual("12.33");
  });
});

describe("validation", () => {
  it("allows custom validations", () => {
    const article = new Article({ content: "Some words.. and fUCk!" });
    expect(article.isInvalid()).toBe(true);
    expect(article.errors.base[0]).toEqual("Article contains strong language.");
  });

  it("supports conditional validation", () => {
    const dummy = new Dummy({ dumbAttrib5: "KRAKOW" });
    dummy.isValid();
    expect(dummy.errors.dumbAttrib5[0]).toEqual("is invalid");
    dummy.dumbAttrib5 = "KRK";
    dummy.isValid();
    expect(dummy.errors).toBe(null);
  });
});

describe(".find", () => {
  afterEach(() => {
    Config.protocolWithHost = null;
  });

  it("returns null if 404", (done) => {
    Config.protocolWithHost = "http://localhost";
    const scope = nock('http://localhost')
      .get('/user/articles/4/comments/25?')
      .reply(404, '');
    Comment.find({id: 25, articleId: 4}).then(comment => {
      expect(comment).toBe(null);
      scope.done();
      done();
    });
  });

  it("uses a correct URL and sets Authorization if defined", () => {
    const mock = mockXHR();
    Comment.find({id: 25, articleId: 4});
    expect(mock.open).toBeCalledWith("GET", "/user/articles/4/comments/25?");
    expect(mock.setRequestHeader).toBeCalledWith("Authorization", "Bearer XXX");
  });

  it("uses a correct URL even with the specified protocol and host", () => {
    const mock = mockXHR();
    Config.protocolWithHost = "http://localhost:3001";
    Comment.find({id: 25, articleId: 4});
    expect(mock.open).toBeCalledWith("GET", "http://localhost:3001/user/articles/4/comments/25?");
  });
});

describe(".__getResourcesUrl", () => {
  it("returns a correct URL", () => {
    expect(Dummy.__getResourcesUrl()).toEqual("https://myapp.test/dummys");
  });
});

describe("#save", () => {
  it("properly builds URL for nested models and sets Authorization header if defined", () => {
    const mock = mockXHR();
    const comment = new Comment({
      articleId: 1,
      author: "Joe Doe",
      text: "foo bar baz"
    });
    comment.save();
    expect(mock.open).toBeCalledWith("POST", "/user/articles/1/comments");
    expect(mock.setRequestHeader).toBeCalledWith("Authorization", "Bearer XXX");
  });
});

describe("#serialize", () => {
  it("sets proper key's name for nested models", () => {
    const comment = new Comment({
      articleId: 1,
      author: "Joe Doe",
      text: "foo bar baz"
    });
    expect(comment.serialize()["comment"]).not.toBe(undefined);
  });
});

describe("#assignAttr", () => {
  it("assigns Boolean values", () => {
    const comment = new Comment();
    comment.assignAttr("approved", true);
    expect(comment.approved).toEqual(true);
  });

  it("converts to Boolean values", () => {
    const comment = new Comment();
    comment.assignAttr("approved", "0");
    expect(comment.approved).toEqual(false);
  });
});

describe("#clone", () => {
  it("clones an object", () => {
    const comment = new Comment({ id: 123, author: "Joe", text: "good article", articleId: 100, approved: true });
    const clonedComment = comment.clone();
    expect(comment).toEqual(clonedComment);
    expect(comment).not.toBe(clonedComment);
  });
});
