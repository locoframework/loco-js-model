import mockFetch from "../../__mock__/fetch.js";
import { Models } from "index";

class Article extends Models.Base {
  static identity = "Article";
  static resources = { url: "/articles" };

  static attributes = {
    title: { type: "String" },
    publishedAt: { remoteName: "published_at", type: "Date" },
  };
}

class Comment extends Models.Base {
  static identity = "Comment";
  static resources = { url: "/articles/:articleId/comments" };

  static attributes = {
    text: {},
    articleId: { type: "Int" },
  };
}

const requestedURL = (mock) => mock.mock.calls[0][0];
const requestedOpts = (mock) => mock.mock.calls[0][1];

const oldFetch = window.fetch;

afterEach(() => {
  window.fetch = oldFetch;
});

describe("instance HTTP methods", () => {
  it("appends the action to the resource URL", async () => {
    const mock = mockFetch({ ok: true });
    const resp = await new Article({ id: 7 }).get("stats");
    expect(requestedURL(mock)).toEqual("/articles/7/stats?");
    expect(requestedOpts(mock).method).toEqual("GET");
    expect(resp).toEqual({ ok: true });
  });

  it("omits the action when not given", async () => {
    const mock = mockFetch({ success: true });
    await new Article({ id: 7 }).delete();
    expect(requestedURL(mock)).toEqual("/articles/7");
    expect(requestedOpts(mock).method).toEqual("DELETE");
  });

  it("sends the data as the body for non-GET methods", async () => {
    const mock = mockFetch({});
    await new Article({ id: 7 }).post("publish", { notify: true });
    expect(requestedURL(mock)).toEqual("/articles/7/publish");
    expect(JSON.parse(requestedOpts(mock).body)).toEqual({ notify: true });
  });

  it.each(["put", "patch"])("supports #%s", async (method) => {
    const mock = mockFetch({});
    await new Article({ id: 7 })[method]("archive");
    expect(requestedOpts(mock).method).toEqual(method.toUpperCase());
  });

  it("interpolates URL params from the object", async () => {
    const mock = mockFetch({});
    await new Comment({ id: 3, articleId: 9, text: "hi" }).get("replies");
    expect(requestedURL(mock)).toEqual("/articles/9/comments/3/replies?");
  });

  it("rejects on a server error", async () => {
    mockFetch({}, 500);
    await expect(new Article({ id: 7 }).get("stats")).rejects.toMatchObject({
      status: 500,
    });
  });

  // ponytail: 4xx never settles — pins the shortcut noted in src/base.js
  it("never settles on 4xx", async () => {
    mockFetch({}, 422);
    const settled = await Promise.race([
      new Article({ id: 7 }).get("stats").then(() => "settled"),
      new Promise((resolve) => setTimeout(() => resolve("pending"), 50)),
    ]);
    expect(settled).toEqual("pending");
  });
});

describe("#updateAttribute", () => {
  it("sends only the given attribute", async () => {
    const mock = mockFetch({ success: true });
    const article = new Article({ id: 7, title: "New" });
    const resp = await article.updateAttribute("title");
    expect(requestedURL(mock)).toEqual("/articles/7");
    expect(requestedOpts(mock).method).toEqual("PUT");
    expect(JSON.parse(requestedOpts(mock).body)).toEqual({
      article: { title: "New" },
    });
    expect(resp).toEqual({ success: true });
  });

  it("assigns remote errors to their local attribute names", async () => {
    mockFetch({
      success: false,
      errors: { published_at: ["can't be blank"] },
    });
    const article = new Article({ id: 7 });
    await article.updateAttribute("publishedAt");
    expect(article.errors.publishedAt).toEqual(["can't be blank"]);
  });
});

describe("#reload", () => {
  it("re-fetches the record with the URL params it was found by", async () => {
    const mock = mockFetch({ id: 3, text: "reloaded", article_id: 9 });
    const comment = new Comment({ id: 3, articleId: 9, text: "stale" });
    const reloaded = await comment.reload();
    expect(requestedURL(mock)).toEqual("/articles/9/comments/3?");
    expect(reloaded.text).toEqual("reloaded");
  });
});
