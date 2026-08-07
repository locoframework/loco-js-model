import mockFetch from "../../__mock__/fetch";
import { Models, connector } from "index";

const { IdentityMap } = connector;

class Article extends Models.Base {
  static identity = "Article";
  static resources = { url: "/articles" };

  static attributes = {
    title: { type: "String" },
    publishedAt: { remoteName: "published_at", type: "Date" },
  };
}

const oldFetch = window.fetch;

// the 1st find puts the object in the identity map, the 2nd overwrites it with
// fresh server state — the object returned by the 1st one is now "dirty"
const findTwice = async (first, second) => {
  mockFetch(first);
  const article = await Article.find(1);
  mockFetch(second);
  await Article.find(1);
  return article;
};

afterEach(() => {
  window.fetch = oldFetch;
  IdentityMap.clear();
});

describe("#changes", () => {
  it("is empty when nothing changed on the server", async () => {
    const article = await findTwice(
      { id: 1, title: "Same", published_at: "2026-01-15T10:00:00Z" },
      { id: 1, title: "Same", published_at: "2026-01-15T10:00:00Z" },
    );
    expect(article.changes()).toEqual({});
  });

  it("reports the server value as 'is' and the local one as 'was'", async () => {
    const article = await findTwice(
      { id: 1, title: "Old" },
      { id: 1, title: "New" },
    );
    expect(article.changes()).toEqual({ title: { is: "New", was: "Old" } });
  });

  it("compares dates by value, not by reference", async () => {
    const article = await findTwice(
      { id: 1, published_at: "2026-01-15T10:00:00Z" },
      { id: 1, published_at: "2026-01-15T10:00:00Z" },
    );
    expect(article.changes().publishedAt).toBe(undefined);
  });

  it("reports a date that actually moved", async () => {
    const article = await findTwice(
      { id: 1, published_at: "2026-01-15T10:00:00Z" },
      { id: 1, published_at: "2026-03-01T10:00:00Z" },
    );
    expect(article.changes().publishedAt.is).toEqual(
      new Date("2026-03-01T10:00:00Z"),
    );
  });
});

describe("#applyChanges", () => {
  it("adopts the server state", async () => {
    const article = await findTwice(
      { id: 1, title: "Old" },
      { id: 1, title: "New" },
    );
    article.applyChanges();
    expect(article.title).toEqual("New");
    expect(article.changes()).toEqual({});
  });
});
