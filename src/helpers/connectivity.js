export const filterParams = (data) => {
  params = {}
  if(!data) return params;
  for(const prop in data) {
    if(prop === "resource") continue;
    params[prop] = data[prop];
  }
  return params;
}

export const sendReq = (httpMeth, url, data) => {
  const meta = document.querySelector("meta[name='csrf-token']");
  const req = new XMLHttpRequest();
  req.open(httpMeth, url);
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json");
  if(meta) {
    req.setRequestHeader("X-CSRF-Token", meta.content);
  }
  req.send(JSON.stringify(data));
  return req;
}
