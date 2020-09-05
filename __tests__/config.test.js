import { Config } from "index";

describe("cookiesByCORS", () => {
  it("provides getter and setter", () => {
    expect(Config.cookiesByCORS).toEqual(false);
    Config.cookiesByCORS = true;
    expect(Config.cookiesByCORS).toEqual(true);
  });
});