export const filterParams = data => {
  const params = {};
  if (!data) return params;
  Object.keys(data).forEach(prop => {
    if (prop !== "resource") {
      params[prop] = data[prop];
    }
  });
  return params;
};

export const sendReq = (httpMeth, url, data) => {
  const meta = document.querySelector("meta[name='csrf-token']");
  const req = new XMLHttpRequest();
  req.open(httpMeth, url);
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json");
  if (meta) {
    req.setRequestHeader("X-CSRF-Token", meta.content);
  }
  req.send(JSON.stringify(data));
  return req;
};