class IdentityMap
  # Ex.
  # @imap = {
  #   Post: {
  #     1: [
  #       #<Post id:1>
  #     ],
  #     10: [
  #       #<Post id:10>, #<PostView>
  #     ],
  #     collection: [
  #       #<PostsView>
  #     ]
  #   }
  # }
  @imap = {}

  @clear: -> this.imap = {}

  @add: (obj) ->
    identity = obj.getIdentity()
    if not this.imap[identity]?
      this.imap[identity] = {}
    if not this.imap[identity][obj.id]?
      this.imap[identity][obj.id] = []
    this.imap[identity][obj.id][0] = obj

  @connect: (obj, opts = {}) ->
    model = opts.with
    this.add model
    this.imap[model.getIdentity()][model.id].push obj

  @addCollection: (identity, opts = {}) ->
    if not this.imap[identity]?
      this.imap[identity] = {}
    if not this.imap[identity]["collection"]?
      this.imap[identity]["collection"] = []
    return if this.imap[identity]["collection"].indexOf(opts.to) isnt -1
    this.imap[identity]["collection"].push opts.to

  @all: (identity) ->
    return null if not this.imap[identity]?
    arr = []
    for id, objs of this.imap[identity]
      continue if id is "collection"
      arr.push objs[0]
    return arr

  @find: (klass, id) ->
    if this.imap[klass] and this.imap[klass][id] then this.imap[klass][id][0] else null

  @findConnected: (klass, id) ->
    if this.imap[klass] and this.imap[klass][id] and this.imap[klass][id].length > 1
      arr = this.imap[klass][id]
      arr[1..(arr.length - 1)]
    else
      []

export default IdentityMap