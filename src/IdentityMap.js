let imap = {};

const findPosition = arr => {
  let idx = arr.length;
  arr.find((element, index) => {
    if (element === null) {
      idx = index;
      return true;
    }
  });
  return idx;
};

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
    const forExistingElement = () => {};
    if (typeof args.to === "object") {
      const idx = IdentityMap.connect(args.with, { with: args.to });
      if (idx === null) return forExistingElement;
      return () => {
        IdentityMap.unsubscribe(args.to.getIdentity(), args.to.id, idx);
      };
    } else if (typeof args.to === "function") {
      const idx = IdentityMap.addCollection(args.to.getIdentity(), {
        to: args.with
      });
      if (idx === null) return forExistingElement;
      return () => {
        IdentityMap.unsubscribe(args.to.getIdentity(), "collection", idx);
      };
    }
  }

  static unsubscribe(identity, id, idx) {
    imap[identity][id][idx] = null;
  }

  static add(obj) {
    const identity = obj.getIdentity();
    if (imap[identity] === undefined) imap[identity] = {};
    if (imap[identity][obj.id] === undefined) imap[identity][obj.id] = [];
    imap[identity][obj.id][0] = obj;
  }

  static connect(obj, opts = {}) {
    const model = opts.with;
    IdentityMap.add(model);
    const arr = imap[model.getIdentity()][model.id];
    if (arr.indexOf(obj) !== -1) return null;
    const idx = findPosition(arr);
    arr[idx] = obj;
    return idx;
  }

  static addCollection(identity, opts = {}) {
    if (imap[identity] === undefined) imap[identity] = {};
    if (imap[identity]["collection"] === undefined)
      imap[identity]["collection"] = [];
    const arr = imap[identity]["collection"];
    if (arr.indexOf(opts.to) !== -1) return null;
    const idx = findPosition(arr);
    arr[idx] = opts.to;
    return idx;
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
