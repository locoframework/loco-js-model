import { IdentityMap, Models } from "index";

class Comment extends Models.Base {
  static identity = "Article.Comment";

  static attributes = {
  };
}

class View {
  constructor(name) {
    this.name = name;
  }
}

const comment = new Comment({id: 106});
const view = new View("show-comment");

beforeEach(() => {
  IdentityMap.clear();
});

describe(".clear", () => {
  it("clears imap", () => {
    IdentityMap.add(comment);
    IdentityMap.clear();
    expect(IdentityMap.imap).toEqual({});
  });
});

describe(".add", () => {
  it("creates a correct structure", () => {
    IdentityMap.add(comment);
    const imap = {
      "Article.Comment": {
        106: [comment]
      }
    };
    expect(IdentityMap.imap).toEqual(imap);
  });
});

describe(".connect", () => {
  it("creates a correct structure", () => {
    IdentityMap.add(comment);
    IdentityMap.connect(view, { with: comment })
    const imap = {
      "Article.Comment": {
        106: [comment, view]
      }
    };
    expect(IdentityMap.imap).toEqual(imap);
  });
});

describe(".addCollection", () => {
  it("creates a correct structure", () => {
    IdentityMap.addCollection("Article.Comment", { to: view })
    const imap = {
      "Article.Comment": {
        "collection": [view]
      }
    };
    expect(IdentityMap.imap).toEqual(imap);
  });
});

describe(".all", () => {
  it("returns proper objects", () => {
    IdentityMap.add(comment);
    IdentityMap.connect(view, { with: comment })
    IdentityMap.addCollection("Article.Comment", { to: view })
    expect(IdentityMap.all("Article.Comment")).toEqual([comment]);
  });
});

describe(".find", () => {
  it("returns proper object", () => {
    IdentityMap.add(comment);
    expect(IdentityMap.find("Article.Comment", 106)).toEqual(comment);
  });
});

describe(".findConnected", () => {
  it("returns proper objects", () => {
    IdentityMap.add(comment);
    IdentityMap.connect(view, { with: comment })
    expect(IdentityMap.findConnected("Article.Comment", 106)).toEqual([view]);
  });
});
