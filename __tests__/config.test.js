import { Config } from "index";

describe("cookiesByCORS", () => {
  it("provides getter and setter", () => {
    expect(Config.cookiesByCORS).toEqual(false);
    Config.cookiesByCORS = true;
    expect(Config.cookiesByCORS).toEqual(true);
  });
});

describe("authorizationHeader", () => {
  it("provides getter and setter", () => {
    expect(Config.authorizationHeader).toEqual(undefined);
    Config.authorizationHeader = "Bearer XXX";
    expect(Config.authorizationHeader).toEqual("Bearer XXX");
  });
});
