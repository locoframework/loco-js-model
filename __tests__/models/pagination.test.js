import mockFetch from "../../__mock__/fetch";
import { Models } from "index";

class Coupon extends Models.Base {
  static identity = "Coupon";
  static resources = {
    url: "/coupons",
    paginate: { per: 2 },
    admin: { url: "/admin/coupons", paginate: { per: 2, param: "current" } },
  };
  static attributes = { name: {} };
}

const oldFetch = window.fetch;

afterEach(() => {
  window.fetch = oldFetch;
});

it("fetches every page and merges the resources", async () => {
  const mock = mockFetch({
    resources: [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ],
    count: 4,
  });
  const resp = await Coupon.all();
  expect(mock.mock.calls.map((call) => call[0])).toEqual([
    "/coupons?page=1",
    "/coupons?page=2",
  ]);
  expect(resp.resources.length).toEqual(4);
  expect(resp.count).toEqual(4);
});

it("does not paginate when a page is requested explicitly", async () => {
  const mock = mockFetch({ resources: [{ id: 1 }], count: 4 });
  await Coupon.all({ page: 2 });
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock.mock.calls[0][0]).toEqual("/coupons?page=2");
});

it("uses the pagination param of the requested resource", async () => {
  const mock = mockFetch([{ id: 1 }]);
  await Coupon.all({ resource: "admin" });
  expect(mock.mock.calls[0][0]).toEqual("/admin/coupons?current=1");
});
