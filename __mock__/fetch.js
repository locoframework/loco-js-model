export default (responseJSON, status = 200) => {
  window.fetch = jest.fn(async (url, opts) => {
    // the real fetch throws on this, so the mock must too
    if (["GET", "HEAD"].includes(opts.method) && opts.body != null) {
      throw new TypeError(
        `Request with ${opts.method} method cannot have body (${url})`,
      );
    }
    return { status, json: async () => responseJSON || {} };
  });
  return window.fetch;
};
