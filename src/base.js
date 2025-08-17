import Validators from "./validators";
import Config from "./config";
import IdentityMap from "./IdentityMap";
import { sendReq } from "./helpers/connectivity";

class Base {
  static getIdentity() {
    if (this.identity != null) return this.identity;
    throw new Error("Specify Model's identity!");
  }

  static getRemoteName() {
    return this.remoteName != null ? this.remoteName : this.getIdentity();
  }

  static all(opts = {}) {
    return this.get("all", opts);
  }

  static get(action, opts = {}) {
    return this.__send("GET", action, opts);
  }

  static post(action, opts = {}) {
    return this.__send("POST", action, opts);
  }

  static put(action, opts = {}) {
    return this.__send("PUT", action, opts);
  }

  static patch(action, opts = {}) {
    return this.__send("PATCH", action, opts);
  }

  static delete(action, opts = {}) {
    return this.__send("DELETE", action, opts);
  }

  static find(idOrObj) {
    let urlParams = {};
    let id;
    if (typeof idOrObj === "object") {
      urlParams = { ...idOrObj };
      id = idOrObj.id;
      delete urlParams.id;
    } else {
      id = idOrObj;
    }
    const url = `${this.__getResourcesUrl(urlParams)}/${id}`;
    const req = sendReq("GET", url, urlParams, this.__requestOpts());
    return new Promise((resolve, reject) => {
      req.onerror = (e) => reject(e);
      req.onload = (e) => {
        if (e.target.status === 404) {
          resolve(null);
          return;
        }
        const record = JSON.parse(e.target.response);
        resolve(this.__initFromJSON(record, idOrObj.resource));
      };
    });
  }

  static getAttribRemoteName(attrib) {
    if (this.attributes == null) return null;
    if (this.attributes[attrib] == null) return null;
    if (this.attributes[attrib].remoteName == null) return attrib;
    return this.attributes[attrib].remoteName;
  }

  static getResourcesUrlParams(opts) {
    let url = this.__getResourcesUrl({ resource: opts.resource });
    const regexp = /:(\w+)\/?/;
    const params = [];
    let match;
    // Extract all params like :id, :userId, etc.
    while ((match = regexp.exec(url))) {
      params.push(match[1]);
      url = url.replace(match[0], match[1]);
    }
    return params;
  }

  static __getResourcesUrl(opts = {}) {
    let resourcesUrl;
    if (this.resources == null) {
      resourcesUrl = `/${this.getRemoteName().toLowerCase()}s`;
    } else if (opts.resource) {
      resourcesUrl = this.resources[opts.resource].url;
    } else if (
      Config.scope != null &&
      this.resources != null &&
      this.resources[Config.scope] != null
    ) {
      resourcesUrl = this.resources[Config.scope].url;
    } else {
      resourcesUrl = this.resources.url;
    }
    if (this.protocolWithHost != null) {
      resourcesUrl = `${this.protocolWithHost}${resourcesUrl}`;
    } else if (Config.protocolWithHost != null) {
      resourcesUrl = `${Config.protocolWithHost}${resourcesUrl}`;
    }
    const match = /:([a-zA-Z]+)\/?/.exec(resourcesUrl);
    if (match == null) return resourcesUrl;
    if (opts[match[1]] != null) {
      resourcesUrl = resourcesUrl.replace(`:${match[1]}`, opts[match[1]]);
      delete opts[match[1]];
    } else if (opts.obj != null && opts.obj[match[1]] != null) {
      resourcesUrl = resourcesUrl.replace(`:${match[1]}`, opts.obj[match[1]]);
    }
    return resourcesUrl;
  }

  static __requestOpts() {
    return {
      authorizationHeader:
        Config.authorizationHeader || this.authorizationHeader,
      cookiesByCORS:
        this.cookiesByCORS != null ? this.cookiesByCORS : Config.cookiesByCORS,
    };
  }

  static __page(i, pageData, resp) {
    const url = pageData.url;
    pageData.params[pageData.pageParam] = i;
    const req = sendReq(
      pageData.method,
      url,
      pageData.params,
      this.__requestOpts()
    );
    return new Promise((resolve, reject) => {
      req.onerror = (e) => reject(e);
      req.onload = (e) => {
        const data = JSON.parse(e.target.response);
        if (Array.isArray(data)) {
          for (const record of data) {
            const obj = this.__initFromJSON(record, pageData.resource);
            resp.push(obj);
          }
        } else if (data.resources != null) {
          if (resp.constructor === Array) {
            resp = { resources: [], count: 0 };
          }
          for (const record of data.resources) {
            const obj = this.__initFromJSON(record, pageData.resource);
            resp.resources.push(obj);
          }
          resp.count = data.count;
        } else {
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              resp[key] = data[key];
            }
          }
        }
        resolve(resp);
      };
    });
  }

  static __paginate(opts) {
    const pageData = {
      method: opts.method,
      url: opts.url,
      params: opts.params,
      pageParam: opts.pageParam,
      resource: opts.resource,
    };
    return this.__page(opts.pageNum || 1, pageData, []).then((data) => {
      const total = data.count || opts.total;
      let promise = Promise.resolve(data);
      if (opts.pageNum != null) return promise;
      if (total <= opts.perPage) return promise;
      let max = parseInt(total / opts.perPage, 10);
      if (max !== total / opts.perPage) max += 1;
      if (max === 1) return promise;
      for (let i = 2; i <= max; i += 1) {
        const func = (ii) => {
          promise = promise.then(() => this.__page(ii, pageData, data));
        };
        func(i);
      }
      return promise;
    });
  }

  static __getPaginationParam(resource) {
    const defaultParam = "page";
    if (
      resource != null &&
      this.resources != null &&
      this.resources[resource]
    ) {
      return (
        (this.resources[resource].paginate &&
          this.resources[resource].paginate.param) ||
        defaultParam
      );
    }
    if (
      Config.scope != null &&
      this.resources != null &&
      this.resources[Config.scope] != null
    ) {
      const param =
        this.resources[Config.scope] &&
        this.resources[Config.scope].paginate &&
        this.resources[Config.scope].paginate.param;
      return param || defaultParam;
    }
    if (
      this.resources != null &&
      this.resources.paginate != null &&
      this.resources.paginate.param != null
    ) {
      return this.resources.paginate.param;
    }
    return defaultParam;
  }

  static __getPaginationPer(resource) {
    if (
      resource != null &&
      this.resources != null &&
      this.resources[resource]
    ) {
      return (
        this.resources[resource].paginate &&
        this.resources[resource].paginate.per
      );
    }
    if (
      Config.scope != null &&
      this.resources != null &&
      this.resources[Config.scope] != null
    ) {
      return (
        this.resources[Config.scope] &&
        this.resources[Config.scope].paginate &&
        this.resources[Config.scope].paginate.per
      );
    }
    if (
      this.resources != null &&
      this.resources.paginate != null &&
      this.resources.paginate.per != null
    ) {
      return this.resources.paginate.per;
    }
    return null;
  }

  static __send(method, action, opts) {
    let url = this.__getResourcesUrl(opts);
    if (action !== "all") {
      url = `${url}/${action}`;
    }
    const data = {
      method,
      url,
      params: opts,
      resource: opts.resource,
      perPage: this.__getPaginationPer(opts.resource),
      pageNum: opts.page,
      pageParam: this.__getPaginationParam(opts.resource),
      total: opts.total || opts.count,
    };
    return this.__paginate(data);
  }

  static __initFromJSON(record, resource) {
    const obj = new this(record);
    obj.resource = resource;
    IdentityMap.add(obj);
    return obj;
  }

  constructor(data = {}) {
    this.id = null;
    this.errors = null;
    this.resource = data.resource;
    if (this.constructor.attributes != null) this.__initAttributes();
    if (data != null) this.__assignAttributes(data);
  }

  setResource(name) {
    this.resource = name;
  }

  getIdentity() {
    return this.constructor.getIdentity();
  }

  getAttrRemoteName(attr) {
    if (this.constructor.attributes == null) return null;
    if (this.constructor.attributes[attr] == null) return null;
    return this.constructor.attributes[attr].remoteName || attr;
  }

  getAttrName(remoteName) {
    if (this.constructor.attributes == null) return remoteName;
    if (this.constructor.attributes[remoteName] != null) return remoteName;
    for (const name in this.constructor.attributes) {
      const config = this.constructor.attributes[name];
      if (config.remoteName === remoteName) return name;
    }
    return remoteName;
  }

  getAttrType(attrName) {
    if (this.constructor.attributes == null) return null;
    if (this.constructor.attributes[attrName] == null) return null;
    return this.constructor.attributes[attrName].type;
  }

  assignAttr(attrName, val) {
    const attrType = this.getAttrType(attrName);
    if (val == null) {
      this[attrName] = null;
      return;
    }
    switch (attrType) {
      case "Date":
        // eslint-disable-next-line no-param-reassign
        val = new Date(Date.parse(val));
        break;
      case "Integer":
      case "Int":
        // eslint-disable-next-line no-param-reassign
        val = parseInt(val, 10);
        break;
      case "Float":
        // eslint-disable-next-line no-param-reassign
        val = parseFloat(val);
        break;
      case "Boolean":
      case "Bool":
        // eslint-disable-next-line no-param-reassign
        val = typeof val === "boolean" ? val : Boolean(parseInt(val, 10));
        break;
      case "Number":
        // eslint-disable-next-line no-param-reassign
        val = Number(val);
        break;
      case "String":
        // eslint-disable-next-line no-param-reassign
        val = String(val);
        break;
      default:
        break;
    }
    this[attrName] = val;
  }

  attributes() {
    const attribs = { id: this.id };
    if (this.constructor.attributes == null) return attribs;
    for (const name in this.constructor.attributes) {
      attribs[name] = this[name];
    }
    return attribs;
  }

  isValid() {
    if (this.constructor.attributes == null) return true;
    this.errors = null;
    for (const name in this.constructor.attributes) {
      const config = this.constructor.attributes[name];
      if (config == null || config.validations == null) continue;
      for (const validationName in config.validations) {
        const validationSettings = config.validations[validationName];
        if (this.id != null && validationSettings.on === "create") continue;
        if (this.id == null && validationSettings.on === "update") continue;
        if (validationSettings.if != null && !validationSettings.if(this))
          continue;
        const validator =
          validationName.charAt(0).toUpperCase() + validationName.slice(1);
        if (Validators[validator] == null) {
          // eslint-disable-next-line no-console
          console.warn(`"${validator}" validator is not implemented!`);
          continue;
        }
        const pvs = this.__processedValidationSettings(validationSettings);
        Validators[validator].instance(this, name, pvs).validate();
      }
    }
    if (this.constructor.validate != null) {
      for (const meth of this.constructor.validate) {
        if (typeof this[meth] === "function") this[meth]();
      }
    }
    return this.errors == null;
  }

  isInvalid() {
    return !this.isValid();
  }

  isEmpty() {
    const attrs = this.attributes();
    for (const name in attrs) {
      if (this[name] !== null) return false;
    }
    return true;
  }

  addErrorMessage(message, opts = {}) {
    if (this.errors == null) this.errors = {};
    const forKey = opts.for;
    if (this.errors[forKey] == null) this.errors[forKey] = [];
    this.errors[forKey].push(message);
  }

  save() {
    const httpMeth = this.id != null ? "PUT" : "POST";
    const req = sendReq(
      httpMeth,
      this.__getResourceUrl(),
      this.serialize(),
      this.constructor.__requestOpts()
    );
    return new Promise((resolve, reject) => {
      req.onerror = (e) => reject(e);
      req.onload = (e) => {
        const data = JSON.parse(e.target.response);
        if (data.success) {
          resolve(data);
          return;
        }
        if (data.errors != null) this.__assignRemoteErrorMessages(data.errors);
        resolve(data);
      };
    });
  }

  updateAttribute(attr) {
    const req = sendReq(
      "PUT",
      this.__getResourceUrl(),
      this.serialize(attr),
      this.constructor.__requestOpts()
    );
    return new Promise((resolve, reject) => {
      req.onerror = (e) => reject(e);
      req.onload = (e) => {
        if (e.target.status >= 200 && e.target.status < 400) {
          const data = JSON.parse(e.target.response);
          if (data.success) {
            resolve(data);
            return;
          }
          if (data.errors != null)
            this.__assignRemoteErrorMessages(data.errors);
          resolve(data);
        } else if (e.target.status >= 500) {
          reject(e);
        }
      };
    });
  }

  serialize(attr = null) {
    if (this.constructor.attributes == null) return {};
    const hash = {};
    const mainKey = this.constructor.getRemoteName().toLowerCase();
    hash[mainKey] = {};
    let attribs = {};
    if (attr != null) {
      attribs[attr] = null;
    } else {
      attribs = this.constructor.attributes;
    }
    for (const key in attribs) {
      const remoteName = this.getAttrRemoteName(key);
      hash[mainKey][remoteName] = this[key];
    }
    return hash;
  }

  reload() {
    const findParams = { id: this.id, resource: this.resource };
    const params = this.constructor.getResourcesUrlParams({
      resource: this.resource,
    });
    for (const param of params) {
      findParams[param] = this[param];
    }
    return this.constructor.find(findParams);
  }

  changes() {
    const result = {};
    const currentObj = IdentityMap.find(this.getIdentity(), this.id);
    const attrs = this.attributes();
    for (const name in attrs) {
      const val = attrs[name];
      if (val !== currentObj[name]) {
        if (
          val != null &&
          val.constructor === Date &&
          currentObj[name] - val === 0
        )
          continue;
        if (val !== currentObj[name])
          result[name] = { is: currentObj[name], was: val };
      }
    }
    return result;
  }

  applyChanges() {
    const diffs = this.changes();
    for (const name in diffs) {
      this[name] = diffs[name].is;
    }
  }

  toKey() {
    return `${this.getIdentity().toLowerCase()}_${this.id}`;
  }

  get(action, data = {}) {
    return this.__send("GET", action, data);
  }

  post(action, data = {}) {
    return this.__send("POST", action, data);
  }

  put(action, data = {}) {
    return this.__send("PUT", action, data);
  }

  patch(action, data = {}) {
    return this.__send("PATCH", action, data);
  }

  delete(action, data = {}) {
    return this.__send("DELETE", action, data);
  }

  __send(method, action, data) {
    let url = this.__getResourceUrl();
    if (action != null) {
      url = `${url}/${action}`;
    }
    const req = sendReq(method, url, data, this.constructor.__requestOpts());
    return new Promise((resolve, reject) => {
      req.onerror = (e) => reject(e);
      req.onload = (e) => {
        if (e.target.status >= 200 && e.target.status < 400) {
          const respData = JSON.parse(e.target.response);
          resolve(respData);
        } else if (e.target.status >= 500) {
          reject(e);
        }
      };
    });
  }

  __assignAttributes(data) {
    for (const key in data) {
      const val = data[key];
      const attrName = this.getAttrName(key);
      this.assignAttr(attrName, val);
    }
  }

  __initAttributes() {
    for (const name in this.constructor.attributes) {
      this[name] = null;
    }
  }

  __assignRemoteErrorMessages(remoteErrors) {
    for (const remoteName in remoteErrors) {
      const errors = remoteErrors[remoteName];
      const attr = this.getAttrName(remoteName);
      for (const error of errors) {
        this.addErrorMessage(error, { for: attr });
      }
    }
  }

  __getResourceUrl() {
    const url = this.constructor.__getResourcesUrl({
      resource: this.resource,
      obj: this,
    });
    if (this.id == null) return url;
    return `${url}/${this.id}`;
  }

  __processedValidationSettings(validationSettings) {
    const res = {};
    for (const confName in validationSettings) {
      const confVal = validationSettings[confName];
      if (typeof confVal === "function") {
        res[confName] = confVal(this);
      } else {
        res[confName] = confVal;
      }
    }
    return res;
  }
}

export default Base;
