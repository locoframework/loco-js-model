import { IdentityMap, Models } from "index";

class Comment extends Models.Base {
  static identity = "Article.Comment";

  static attributes = {
  };
}

describe(".add", () => {
  it("creates a correct structure", () => {
    const comment = new Comment({id: 106});
    IdentityMap.add(comment);
    const imap = {
      "Article.Comment": {
        106: [comment]
      }
    };
    expect(IdentityMap.imap).toEqual(imap);
  });
});
