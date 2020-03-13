let imap = {};

class IdentityMap {
  /*
  Ex.
  imap = {
    Post: {
      1: [
        #<Post id:1>
      ],
      10: [
        #<Post id:10>, #<PostView>
      ],
      collection: [
        #<PostsView>
      ]
    }
  }
  */

  static get imap() {
    return imap;
  }

  static clear() {
    imap = {};
  }

  static subscribe(args) {
    this.connect(args.with, { with: args.to });
  }

  static add(obj) {
    const identity = obj.getIdentity();
    if (imap[identity] === undefined) imap[identity] = {};
    if (imap[identity][obj.id] === undefined) imap[identity][obj.id] = [];
    imap[identity][obj.id][0] = obj;
  }

  static connect(obj, opts = {}) {
    const model = opts.with;
    this.add(model);
    imap[model.getIdentity()][model.id].push(obj);
  }

  static addCollection(identity, opts = {}) {
    if (imap[identity] === undefined) imap[identity] = {};
    if (imap[identity]["collection"] === undefined)
      imap[identity]["collection"] = [];
    if (imap[identity]["collection"].indexOf(opts.to) !== -1) return;
    imap[identity]["collection"].push(opts.to);
  }

  static all(identity) {
    if (imap[identity] === undefined) return null;
    const arr = [];
    for (const id of Object.keys(imap[identity])) {
      if (id === "collection") continue;
      arr.push(imap[identity][id][0]);
    }
    return arr;
  }

  static find(klass, id) {
    return imap[klass] !== undefined && imap[klass][id] != undefined
      ? imap[klass][id][0]
      : null;
  }

  static findConnected(klass, id) {
    if (
      imap[klass] !== undefined &&
      imap[klass][id] !== undefined &&
      imap[klass][id].length > 1
    ) {
      return imap[klass][id].slice(1);
    } else {
      return [];
    }
  }
}

export default IdentityMap;
