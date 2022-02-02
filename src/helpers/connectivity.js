import { toURIParams } from "./obj";

const filterParams = (data) => {
  const params = {};
  if (!data) return params;
  const forbidden = ["resource", "total", "count"];
  Object.keys(data).forEach((prop) => {
    if (forbidden.indexOf(prop) === -1) {
      params[prop] = data[prop];
    }
  });
  return params;
};

export const sendReq = (httpMeth, url, data, opts = {}) => {
  const params = filterParams(data);
  const finalURL = httpMeth === "GET" ? `${url}?${toURIParams(params)}` : url;
  const meta = document.querySelector("meta[name='csrf-token']");
  const req = new XMLHttpRequest();
  req.withCredentials = opts.cookiesByCORS === true ? true : false;
  req.open(httpMeth, finalURL);
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json");
  if (meta) {
    req.setRequestHeader("X-CSRF-Token", meta.content);
  }
  if (opts.authorizationHeader != null) {
    req.setRequestHeader("Authorization", opts.authorizationHeader);
  }
  req.send(JSON.stringify(params));
  return req;
};

export default sendReq;
