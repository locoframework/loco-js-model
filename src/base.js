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

  static async find(idOrObj) {
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
    const res = await sendReq("GET", url, urlParams, this.__requestOpts());
    if (res.status === 404) return null;
    return this.__initFromJSON(await res.json(), idOrObj.resource);
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

  static async __page(i, pageData, resp) {
    pageData.params[pageData.pageParam] = i;
    const res = await sendReq(
      pageData.method,
      pageData.url,
      pageData.params,
      this.__requestOpts(),
    );
    const data = await res.json();
    if (Array.isArray(data)) {
      for (const record of data) {
        resp.push(this.__initFromJSON(record, pageData.resource));
      }
    } else if (data.resources != null) {
      if (Array.isArray(resp)) resp = { resources: [], count: 0 };
      for (const record of data.resources) {
        resp.resources.push(this.__initFromJSON(record, pageData.resource));
      }
      resp.count = data.count;
    } else {
      Object.assign(resp, data);
    }
    return resp;
  }

  static async __paginate(opts) {
    const pageData = {
      method: opts.method,
      url: opts.url,
      params: opts.params,
      pageParam: opts.pageParam,
      resource: opts.resource,
    };
    const firstPage = await this.__page(opts.pageNum || 1, pageData, []);
    const total = firstPage.count || opts.total;
    if (opts.pageNum != null || opts.perPage == null) return firstPage;
    if (!(total > opts.perPage)) return firstPage;
    let result = firstPage;
    const max = Math.ceil(total / opts.perPage);
    for (let i = 2; i <= max; i += 1) {
      result = await this.__page(i, pageData, firstPage);
    }
    return result;
  }

  static __paginateOpt(resource, key, fallback = null) {
    if (this.resources == null) return fallback;
    const scoped =
      (resource != null && this.resources[resource]) ||
      (Config.scope != null && this.resources[Config.scope]) ||
      null;
    const from = scoped || this.resources;
    return (from.paginate && from.paginate[key]) || fallback;
  }

  static __send(method, action, opts) {
    let url = this.__getResourcesUrl(opts);
    if (action !== "all") {
      url = `${url}/${action}`;
    }
    return this.__paginate({
      method,
      url,
      params: opts,
      resource: opts.resource,
      perPage: this.__paginateOpt(opts.resource, "per"),
      pageNum: opts.page,
      pageParam: this.__paginateOpt(opts.resource, "param", "page"),
      total: opts.total || opts.count,
    });
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
    if (this.constructor.attributes != null) this.#initAttributes();
    if (data != null) this.#assignAttributes(data);
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
        val = new Date(Date.parse(val));
        break;
      case "Integer":
      case "Int":
        val = parseInt(val, 10);
        break;
      case "Float":
        val = parseFloat(val);
        break;
      case "Boolean":
      case "Bool":
        val = typeof val === "boolean" ? val : Boolean(parseInt(val, 10));
        break;
      case "Number":
        val = Number(val);
        break;
      case "String":
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

  clone() {
    return new this.constructor({ ...this.attributes() });
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
          console.warn(`"${validator}" validator is not implemented!`);
          continue;
        }
        const pvs = this.#processedValidationSettings(validationSettings);
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

  async save() {
    const res = await sendReq(
      this.id != null ? "PUT" : "POST",
      this.#getResourceUrl(),
      this.serialize(),
      this.constructor.__requestOpts(),
    );
    const data = await res.json();
    if (!data.success && data.errors != null) {
      this.#assignRemoteErrorMessages(data.errors);
    }
    return data;
  }

  async updateAttribute(attr) {
    const data = await this.#request(
      "PUT",
      this.#getResourceUrl(),
      this.serialize(attr),
    );
    if (!data.success && data.errors != null) {
      this.#assignRemoteErrorMessages(data.errors);
    }
    return data;
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
      if (val === currentObj[name]) continue;
      if (
        val != null &&
        val.constructor === Date &&
        currentObj[name] - val === 0
      )
        continue;
      result[name] = { is: currentObj[name], was: val };
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
    return this.#send("GET", action, data);
  }

  post(action, data = {}) {
    return this.#send("POST", action, data);
  }

  put(action, data = {}) {
    return this.#send("PUT", action, data);
  }

  patch(action, data = {}) {
    return this.#send("PATCH", action, data);
  }

  delete(action, data = {}) {
    return this.#send("DELETE", action, data);
  }

  #send(method, action, data) {
    const url = this.#getResourceUrl();
    return this.#request(
      method,
      action != null ? `${url}/${action}` : url,
      data,
    );
  }

  async #request(method, url, data) {
    const res = await sendReq(
      method,
      url,
      data,
      this.constructor.__requestOpts(),
    );
    if (res.status >= 500) throw res;
    // ponytail: 4xx never settles, as in the XHR version. Reject here once
    // callers are ready to handle it.
    if (res.status >= 400) return new Promise(() => {});
    return res.json();
  }

  #assignAttributes(data) {
    for (const key in data) {
      const val = data[key];
      const attrName = this.getAttrName(key);
      this.assignAttr(attrName, val);
    }
  }

  #initAttributes() {
    for (const name in this.constructor.attributes) {
      this[name] = null;
    }
  }

  #assignRemoteErrorMessages(remoteErrors) {
    for (const remoteName in remoteErrors) {
      const errors = remoteErrors[remoteName];
      const attr = this.getAttrName(remoteName);
      for (const error of errors) {
        this.addErrorMessage(error, { for: attr });
      }
    }
  }

  #getResourceUrl() {
    const url = this.constructor.__getResourcesUrl({
      resource: this.resource,
      obj: this,
    });
    if (this.id == null) return url;
    return `${url}/${this.id}`;
  }

  #processedValidationSettings(validationSettings) {
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
