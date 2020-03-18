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
    IdentityMap.subscribe({ to: comment, with: view })
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
    IdentityMap.subscribe({ to: Comment, with: view })
    const imap = {
      "Article.Comment": {
        "collection": [view]
      }
    };
    expect(IdentityMap.imap).toEqual(imap);
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
    IdentityMap.subscribe({ to: comment, with: view });
    expect(IdentityMap.findConnected("Article.Comment", 106)).toEqual([view]);
  });
});

describe(".subscribe", () => {
  it("creates a correct structure", () => {
    const func = () => {};
    IdentityMap.subscribe({ to: comment, with: func })
    const imap = {
      "Article.Comment": {
        106: [comment, func]
      }
    };
    expect(IdentityMap.imap).toEqual(imap);
  });

  it("works for class instances and returns a function that can be used to unsubscribe", () => {
    const f1 = () => {};
    const f2 = () => {};
    const unsubscribe1 = IdentityMap.subscribe({ to: comment, with: f1 });
    const unsubscribe2 = IdentityMap.subscribe({ to: comment, with: f2 });
    const arr = IdentityMap.imap["Article.Comment"][106];
    expect(arr).toEqual([comment, f1, f2]);
    unsubscribe1();
    expect(arr).toEqual([comment, null, f2]);
    unsubscribe2();
    expect(arr).toEqual([comment, null, null]);
    const unsubscribe3 = IdentityMap.subscribe({ to: comment, with: f2 });
    expect(arr).toEqual([comment, f2, null]);
    unsubscribe3();
    expect(arr).toEqual([comment, null, null]);
  });

  it("works for classes and returns a function that can be used to unsubscribe", () => {
    const f1 = () => {};
    const f2 = () => {};
    const unsubscribe1 = IdentityMap.subscribe({ to: Comment, with: f1 });
    const unsubscribe2 = IdentityMap.subscribe({ to: Comment, with: f2 });
    const arr = IdentityMap.imap["Article.Comment"]["collection"];
    expect(arr).toEqual([f1, f2]);
    unsubscribe1();
    expect(arr).toEqual([null, f2]);
    unsubscribe2();
    expect(arr).toEqual([null, null]);
    const unsubscribe3 = IdentityMap.subscribe({ to: Comment, with: f2 });
    expect(arr).toEqual([f2, null]);
    unsubscribe3();
    expect(arr).toEqual([null, null]);
  });

  it("does not allow to use the same function more times", () => {
    const f1 = () => {};
    IdentityMap.subscribe({ to: comment, with: f1 });
    const unsubscribe2 = IdentityMap.subscribe({ to: comment, with: f1 });
    IdentityMap.subscribe({ to: Comment, with: f1 });
    const unsubscribe4 = IdentityMap.subscribe({ to: Comment, with: f1 });
    unsubscribe2();
    unsubscribe4();
    const imap = {
      "Article.Comment": {
        106: [comment, f1],
        "collection": [f1]
      }
    };
    expect(IdentityMap.imap).toEqual(imap);
  });
});