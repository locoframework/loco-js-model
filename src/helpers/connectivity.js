const FORBIDDEN_PARAMS = ["resource", "total", "count"];

export const sendReq = (httpMeth, url, data, opts = {}) => {
  const params = Object.fromEntries(
    Object.entries(data || {}).filter(
      ([key]) => !FORBIDDEN_PARAMS.includes(key),
    ),
  );
  const csrf = document.querySelector("meta[name='csrf-token']");
  const isGet = httpMeth === "GET";
  return fetch(isGet ? `${url}?${new URLSearchParams(params)}` : url, {
    method: httpMeth,
    credentials: opts.cookiesByCORS === true ? "include" : "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(csrf && { "X-CSRF-Token": csrf.content }),
      ...(opts.authorizationHeader != null && {
        Authorization: opts.authorizationHeader,
      }),
    },
    ...(isGet ? {} : { body: JSON.stringify(params) }),
  });
};

export default sendReq;
