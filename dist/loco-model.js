!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.LocoModel=r():t.LocoModel=r()}(window,(function(){return function(t){var r={};function e(o){if(r[o])return r[o].exports;var s=r[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}return e.m=t,e.c=r,e.d=function(t,r,o){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var s in t)e.d(o,s,function(r){return t[r]}.bind(null,s));return o},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=0)}([function(t,r,e){"use strict";e.r(r);var o=function(){function t(){this.obj=null,this.attr=null,this.val=null,this.opts=null}return t.sharedInstances={},t.instance=function(t,r,e){var o,s;return s=this.identity,null==this.sharedInstances[s]&&(this.sharedInstances[s]=new N[s]),(o=this.sharedInstances[s]).assignAttribs(t,r,e),o},t.prototype.assignAttribs=function(t,r,e){return this.obj=t,this.attr=r,this.val=this.obj[this.attr],this.opts=e},t}(),s={en:{variants:{},models:{},attributes:{},errors:{messages:{accepted:"must be accepted",blank:"can't be blank",confirmation:"doesn't match %{attribute}",empty:"can't be empty",equal_to:"must be equal to %{count}",even:"must be even",exclusion:"is reserved",greater_than:"must be greater than %{count}",greater_than_or_equal_to:"must be greater than or equal to %{count}",inclusion:"is not included in the list",invalid:"is invalid",less_than:"must be less than %{count}",less_than_or_equal_to:"must be less than or equal to %{count}",not_a_number:"is not a number",not_an_integer:"must be an integer",odd:"must be odd",present:"must be blank",too_long:{one:"is too long (maximum is 1 character)",other:"is too long (maximum is %{count} characters)"},too_short:{one:"is too short (minimum is 1 character)",other:"is too short (minimum is %{count} characters)"},wrong_length:{one:"is the wrong length (should be 1 character)",other:"is the wrong length (should be %{count} characters)"},other_than:"must be other than %{count}"}}}};function n(t,r){for(var e=0;e<r.length;e++){var o=r[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var i,a=new(function(){function t(){!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),this.localeVar="en",this.protocolWithHostVar=null,this.scopeVar=null}var r,e,o;return r=t,(e=[{key:"locale",get:function(){return this.localeVar},set:function(t){return this.localeVar=t,this.localeVar}},{key:"protocolWithHost",get:function(){return this.protocolWithHostVar},set:function(t){return t?"/"===t[t.length-1]?(this.protocolWithHostVar=t.slice(0,t.length-1),this.protocolWithHostVar):(this.protocolWithHostVar=t,this.protocolWithHostVar):(this.protocolWithHostVar=null,this.protocolWithHostVar)}},{key:"scope",get:function(){return this.scopeVar},set:function(t){return this.scopeVar=t,this.scopeVar}}])&&n(r.prototype,e),o&&n(r,o),t}()),u={}.hasOwnProperty,l=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)u.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Absence",r.prototype.validate=function(){switch(typeof this.val){case"string":if(null!=this.val&&0===this.val.length)return;break;default:if(null==this.val)return}return this._addErrorMessage()},r.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:s[a.locale].errors.messages.present,this.obj.addErrorMessage(t,{for:this.attr})},r}(o),c={}.hasOwnProperty,h=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)c.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Confirmation",r.prototype.validate=function(){var t;if(t=this.obj[this._properAttr()],null==this.val||null==t||this.val!==t)return this._addErrorMessage()},r.prototype._addErrorMessage=function(){var t,r,e,o;return e=this.attr.charAt(0).toUpperCase()+this.attr.slice(1),t=(r=s[a.locale].attributes[this.obj.getIdentity()])&&r[this.attr]||e,o=(o=null!=this.opts.message?this.opts.message:s[a.locale].errors.messages.confirmation).replace("%{attribute}",t),this.obj.addErrorMessage(o,{for:this._properAttr()})},r.prototype._properAttr=function(){return this.attr+"Confirmation"},r}(o),p={}.hasOwnProperty,f=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)p.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Exclusion",r.prototype.validate=function(){if(-1!==(this.opts.in||this.opts.within||[]).indexOf(this.val))return this._addErrorMessage()},r.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:s[a.locale].errors.messages.exclusion,this.obj.addErrorMessage(t,{for:this.attr})},r}(o),_={}.hasOwnProperty,d=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)_.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Format",r.prototype.validate=function(){if(null==this.opts.with.exec(this.val))return this._addErrorMessage()},r.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:s[a.locale].errors.messages.invalid,this.obj.addErrorMessage(t,{for:this.attr})},r}(o),g={}.hasOwnProperty,m=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)g.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Inclusion",r.prototype.validate=function(){if(-1===(this.opts.in||this.opts.within||[]).indexOf(this.val))return this._addErrorMessage()},r.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:s[a.locale].errors.messages.inclusion,this.obj.addErrorMessage(t,{for:this.attr})},r}(o),y={}.hasOwnProperty,v=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)y.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Length",r.prototype.validate=function(){var t;if(null!=this.val&&null!==(t=null!=this._range()[0]&&null!=this._range()[1]&&this._range()[0]===this._range()[1]&&this.val.length!==this._range()[0]?this._selectErrorMessage("wrong_length",this._range()[0]):null!=this._range()[0]&&this.val.length<this._range()[0]?this._selectErrorMessage("too_short",this._range()[0]):null!=this._range()[1]&&this.val.length>this._range()[1]?this._selectErrorMessage("too_long",this._range()[1]):null))return this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._range=function(){return[this.opts.minimum||this.opts.is||null!=this.opts.within&&this.opts.within[0]||null,this.opts.maximum||this.opts.is||null!=this.opts.within&&this.opts.within[1]||null]},r.prototype._selectErrorMessage=function(t,r){var e,o,n,i,u;if(1===r)return s[a.locale].errors.messages[t].one;for(n=null,e=0,o=(i=["few","many"]).length;e<o;e++)if(u=i[e],this._checkVariant(u,r)){n=s[a.locale].errors.messages[t][u];break}return null==n&&(n=s[a.locale].errors.messages[t].other),null!=this.opts.message&&(n=this.opts.message),/%{count}/.exec(n)&&(n=n.replace("%{count}",r)),n},r.prototype._checkVariant=function(t,r){if(null!=s[a.locale].variants[t])return s[a.locale].variants[t](r)},r}(o),b={}.hasOwnProperty,E=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)b.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Numericality",r.prototype.validate=function(){return isNaN(this.val)?this._addNaNErrorMessage():null!=this.opts.only_integer&&Number(this.val)!==parseInt(this.val)?this._addIntErrorMessage():null!=this.opts.greater_than&&Number(this.val)<=this.opts.greater_than?this._addGreatherThanErrorMessage():null!=this.opts.greater_than_or_equal_to&&Number(this.val)<this.opts.greater_than_or_equal_to?this._addGreatherThanOrEqualToErrorMessage():null!=this.opts.equal_to&&Number(this.val)!==this.opts.equal_to?this._addEqualToErrorMessage():null!=this.opts.less_than&&Number(this.val)>=this.opts.less_than?this._addLessThanErrorMessage():null!=this.opts.less_than_or_equal_to&&Number(this.val)>this.opts.less_than_or_equal_to?this._addLessThanOrEqualToErrorMessage():null!=this.opts.other_than&&Number(this.val)===this.opts.other_than?this._addOtherThanErrorMessage():null!=this.opts.odd&&Number(this.val)%2!=1?this._addOddErrorMessage():null!=this.opts.even&&Number(this.val)%2!=0?this._addEvenErrorMessage():void 0},r.prototype._addNaNErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:s[a.locale].errors.messages.not_a_number,this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addIntErrorMessage=function(){var t;return t=s[a.locale].errors.messages.not_an_integer,this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addGreatherThanErrorMessage=function(){var t;return t=(t=s[a.locale].errors.messages.greater_than).replace("%{count}",this.opts.greater_than),this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addGreatherThanOrEqualToErrorMessage=function(){var t;return t=(t=s[a.locale].errors.messages.greater_than_or_equal_to).replace("%{count}",this.opts.greater_than_or_equal_to),this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addEqualToErrorMessage=function(){var t;return t=(t=s[a.locale].errors.messages.equal_to).replace("%{count}",this.opts.equal_to),this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addLessThanErrorMessage=function(){var t;return t=(t=s[a.locale].errors.messages.less_than).replace("%{count}",this.opts.less_than),this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addLessThanOrEqualToErrorMessage=function(){var t;return t=(t=s[a.locale].errors.messages.less_than_or_equal_to).replace("%{count}",this.opts.less_than_or_equal_to),this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addOtherThanErrorMessage=function(){var t;return t=(t=s[a.locale].errors.messages.other_than).replace("%{count}",this.opts.other_than),this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addOddErrorMessage=function(){var t;return t=s[a.locale].errors.messages.odd,this.obj.addErrorMessage(t,{for:this.attr})},r.prototype._addEvenErrorMessage=function(){var t;return t=s[a.locale].errors.messages.even,this.obj.addErrorMessage(t,{for:this.attr})},r}(o),M={}.hasOwnProperty,w=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)M.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Presence",r.prototype.validate=function(){switch(typeof this.val){case"string":if(null!=this.val&&this.val.length>0)return;break;default:if(null!=this.val)return}return this._addErrorMessage()},r.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:s[a.locale].errors.messages.blank,this.obj.addErrorMessage(t,{for:this.attr})},r}(o),P={}.hasOwnProperty;i=function(t){function r(){r.__super__.constructor.call(this)}return function(t,r){for(var e in r)P.call(r,e)&&(t[e]=r[e]);function o(){this.constructor=t}o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype}(r,t),r.identity="Size",r.prototype.validate=function(){return v.instance(this.obj,this.attr,this.opts).validate()},r}(o);var N={Absence:l,Base:o,Confirmation:h,Exclusion:f,Format:d,Inclusion:m,Length:v,Numericality:E,Presence:w,Size:i},O=function(){function t(){}return t.imap={},t.clear=function(){return this.imap={}},t.add=function(t){var r;return r=t.getIdentity(),null==this.imap[r]&&(this.imap[r]={}),null==this.imap[r][t.id]&&(this.imap[r][t.id]=[]),this.imap[r][t.id][0]=t},t.connect=function(t,r){var e;return null==r&&(r={}),e=r.with,this.add(e),this.imap[e.getIdentity()][e.id].push(t)},t.addCollection=function(t,r){if(null==r&&(r={}),null==this.imap[t]&&(this.imap[t]={}),null==this.imap[t].collection&&(this.imap[t].collection=[]),-1===this.imap[t].collection.indexOf(r.to))return this.imap[t].collection.push(r.to)},t.all=function(t){var r,e,o,s;if(null==this.imap[t])return null;for(e in r=[],s=this.imap[t])o=s[e],"collection"!==e&&r.push(o[0]);return r},t.find=function(t,r){return this.imap[t]&&this.imap[t][r]?this.imap[t][r][0]:null},t.findConnected=function(t,r){var e;return this.imap[t]&&this.imap[t][r]&&this.imap[t][r].length>1?(e=this.imap[t][r]).slice(1,+(e.length-1)+1||9e9):[]},t}(),j={},T=function(t){var r="";return Object.keys(t).forEach((function(e){""!==r&&(r="".concat(r,"&")),r="".concat(r).concat(e,"=").concat(encodeURIComponent(t[e]))})),r},q=function(t,r,e){var o=function(t){var r={};if(!t)return r;var e=["resource","total","count"];return Object.keys(t).forEach((function(o){-1===e.indexOf(o)&&(r[o]=t[o])})),r}(e),s="GET"===t?"".concat(r,"?").concat(T(o)):r,n=document.querySelector("meta[name='csrf-token']"),i=new XMLHttpRequest;return i.open(t,s),i.setRequestHeader("Accept","application/json"),i.setRequestHeader("Content-Type","application/json"),n&&i.setRequestHeader("X-CSRF-Token",n.content),i.send(JSON.stringify(o)),i},A=function(){function t(t){null==t&&(t={}),this.id=null,this.errors=null,this.resource=t.resource,null!=this.constructor.attributes&&this.__initAttributes(),null!=t&&this.__assignAttributes(t)}return t.getIdentity=function(){if(null!=this.identity)return this.identity;throw"Specify Model's identity!"},t.getRemoteName=function(){return null!=this.remoteName?this.remoteName:this.getIdentity()},t.all=function(t){return null==t&&(t={}),this.get("all",t)},t.get=function(t,r){return null==r&&(r={}),this.__send("GET",t,r)},t.post=function(t,r){return null==r&&(r={}),this.__send("POST",t,r)},t.put=function(t,r){return null==r&&(r={}),this.__send("PUT",t,r)},t.patch=function(t,r){return null==r&&(r={}),this.__send("PATCH",t,r)},t.delete=function(t,r){return null==r&&(r={}),this.__send("DELETE",t,r)},t.find=function(t){var r,e,o,s;return o={},"object"==typeof t?(o=t,r=t.id,delete o.id):r=t,e=q("GET",this.__getResourcesUrl(o)+"/"+r,o),new Promise((s=this,function(r,o){return e.onerror=function(t){return o(t)},e.onload=function(e){var o;return o=JSON.parse(e.target.response),r(s.__initFromJSON(o,t.resource))}}))},t.getAttribRemoteName=function(t){return null==this.attributes?null:null==this.attributes[t]?null:null==this.attributes[t].remoteName?t:this.attributes[t].remoteName},t.getResourcesUrlParams=function(t){var r,e,o,s;for(s=this.__getResourcesUrl({resource:t.resource}),o=/:(\w+)\/?/,e=[];r=o.exec(s);)e.push(r[1]),s=s.replace(r[0],r[1]);return e},t.__getResourcesUrl=function(t){var r,e;return e=null==this.resources?"/"+this.getRemoteName().toLowerCase()+"s":t.resource?this.resources[t.resource].url:null!=a.scope&&null!=this.resources[a.scope]?this.resources[a.scope].url:this.resources.url,null!=a.protocolWithHost&&(e=""+a.protocolWithHost+e),null==(r=/:(\w+)\/?/.exec(e))?e:(null!=t[r[1]]?(e=e.replace(":"+r[1],t[r[1]]),delete t[r[1]]):null!=t.obj&&null!=t.obj[r[1]]&&(e=e.replace(":"+r[1],t.obj[r[1]])),e)},t.__initSubclass=function(t){var r,e;return null==t&&(t={}),1===(e=this.getIdentity().split(".")).length?null==(r=j[e[0]])?new this(t):new r(t):new(r=j[e[0]][e[1]])(t)},t.__page=function(t,r,e){var o,s,n;return s=r.url,r.params[r.pageParam]=t,o=q(r.method,s,r.params),new Promise((n=this,function(t,s){return o.onerror=function(t){return s(t)},o.onload=function(o){var s,i,a,u,l,c,h,p,f,_;if((s=JSON.parse(o.target.response)).constructor===Array)for(i=0,l=s.length;i<l;i++)p=s[i],h=n.__initFromJSON(p,r.resource),e.push(h);else if(null!=s.resources){for(e.constructor===Array&&(e={resources:[],count:0}),a=0,c=(f=s.resources).length;a<c;a++)p=f[a],h=n.__initFromJSON(p,r.resource),e.resources.push(h);e.count=s.count}else for(u in s)_=s[u],e[u]=_;return t(e)}}))},t.__paginate=function(t){var r,e;return r={method:t.method,url:t.url,params:t.params,pageParam:t.pageParam,resource:t.resource},this.__page(t.pageNum||1,r,[]).then((e=this,function(o){var s,n,i,a,u,l;if(l=o.count||t.total,a=Promise.resolve(o),null!=t.pageNum)return a;if(l<=t.perPage)return a;if((i=parseInt(l/t.perPage))!==l/t.perPage&&(i+=1),1===i)return a;for(s=n=2,u=i;2<=u?n<=u:n>=u;s=2<=u?++n:--n)!function(t){a=a.then((function(s){return e.__page(t,r,o)}))}(s);return a}))},t.__getPaginationParam=function(t){var r,e,o,s,n;return"page",null!=t&&null!=this.resources&&this.resources[t]?(null!=(r=this.resources[t].paginate)?r.param:void 0)||"page":null!=a.scope&&null!=this.resources&&null!=this.resources[a.scope]?(null!=(e=this.resources[a.scope])&&null!=(o=e.paginate)?o.param:void 0)||"page":null!=(null!=(s=this.resources)&&null!=(n=s.paginate)?n.param:void 0)?this.resources.paginate.param:"page"},t.__getPaginationPer=function(t){var r,e,o,s,n;return null!=t&&null!=this.resources&&this.resources[t]?null!=(r=this.resources[t].paginate)?r.per:void 0:null!=a.scope&&null!=this.resources&&null!=this.resources[a.scope]?null!=(e=this.resources[a.scope])&&null!=(o=e.paginate)?o.per:void 0:null!=(null!=(s=this.resources)&&null!=(n=s.paginate)?n.per:void 0)?this.resources.paginate.per:null},t.__send=function(t,r,e){var o,s;return s=this.__getResourcesUrl(e),"all"!==r&&(s=s+"/"+r),o={method:t,url:s,params:e,resource:e.resource,perPage:this.__getPaginationPer(e.resource),pageNum:e.page,pageParam:this.__getPaginationParam(e.resource),total:e.total||e.count},this.__paginate(o)},t.__initFromJSON=function(t,r){var e;return(e=this.__initSubclass(t)).resource=r,O.add(e),e},t.prototype.setResource=function(t){return this.resource=t},t.prototype.getIdentity=function(){return this.constructor.getIdentity()},t.prototype.getAttrRemoteName=function(t){return null==this.constructor.attributes?null:null==this.constructor.attributes[t]?null:this.constructor.attributes[t].remoteName||t},t.prototype.getAttrName=function(t){var r,e;if(null==this.constructor.attributes)return t;if(null!=this.constructor.attributes[t])return t;for(r in e=this.constructor.attributes)if(e[r].remoteName===t)return r;return t},t.prototype.getAttrType=function(t){return null==this.constructor.attributes?null:null==this.constructor.attributes[t]?null:this.constructor.attributes[t].type},t.prototype.assignAttr=function(t,r){var e;if(e=this.getAttrType(t),null!=r){switch(e){case"Date":r=new Date(Date.parse(r));break;case"Integer":case"Int":r=parseInt(r);break;case"Float":r=parseFloat(r);break;case"Boolean":case"Bool":r="boolean"==typeof r?r:Boolean(parseInt(r));break;case"Number":r=Number(r);break;case"String":r=String(r)}return this[t]=r}this[t]=null},t.prototype.attributes=function(){var t,r,e;if(t={id:this.id},null==this.constructor.attributes)return t;for(r in e=this.constructor.attributes)e[r],t[r]=this[r];return t},t.prototype.isValid=function(){var t,r,e,o,s,n,i,a,u,l,c;if(null==this.constructor.attributes)return!0;for(o in this.errors=null,n=this.constructor.attributes)if(null!=(t=n[o]).validations)for(u in i=t.validations)l=i[u],null!=this.id&&"create"===l.on||null==this.id&&"update"===l.on||(null==l.if||l.if(this))&&(c=u.charAt(0).toUpperCase()+u.slice(1),null!=N[c]?(s=this.__processedValidationSettings(l),N[c].instance(this,o,s).validate()):console.warn('"'+c+'" validator is not implemented!'));if(null!=this.constructor.validate)for(r=0,e=(a=this.constructor.validate).length;r<e;r++)this[a[r]]();return null==this.errors},t.prototype.isInvalid=function(){return!this.isValid()},t.prototype.isEmpty=function(){var t,r;for(t in r=this.attributes())if(r[t],null!==this[t])return!1;return!0},t.prototype.addErrorMessage=function(t,r){return null==r&&(r={}),null==this.errors&&(this.errors={}),null==this.errors[r.for]&&(this.errors[r.for]=[]),this.errors[r.for].push(t)},t.prototype.save=function(){var t,r,e;return t=null!=this.id?"PUT":"POST",r=q(t,this.__getResourceUrl(),this.serialize()),new Promise((e=this,function(t,o){return r.onerror=function(t){return o(t)},r.onload=function(r){var o;if(!(o=JSON.parse(r.target.response)).success)return null!=o.errors&&e.__assignRemoteErrorMessages(o.errors),t(o);t(o)}}))},t.prototype.updateAttribute=function(t){var r,e;return r=q("PUT",this.__getResourceUrl(),this.serialize(t)),new Promise((e=this,function(t,o){return r.onerror=function(t){return o(t)},r.onload=function(r){var s;return r.target.status>=200&&r.target.status<400?(s=JSON.parse(r.target.response)).success?void t(s):(null!=s.errors&&e.__assignRemoteErrorMessages(s.errors),t(s)):r.target.status>=500?o(r):void 0}}))},t.prototype.serialize=function(t){var r,e,o,s;if(null==t&&(t=null),null==this.constructor.attributes)return{};for(t in(e={})[o=this.constructor.getRemoteName().toLowerCase()]={},r={},null!=t?r[t]=null:r=this.constructor.attributes,r)r[t],s=this.getAttrRemoteName(t),e[o][s]=this[t];return e},t.prototype.reload=function(){var t,r,e,o,s;for(t={id:this.id,resource:this.resource},r=0,e=(s=this.constructor.getResourcesUrlParams({resource:this.resource})).length;r<e;r++)t[o=s[r]]=this[o];return this.constructor.find(t)},t.prototype.changes=function(){var t,r,e,o,s;for(r in o={},t=O.find(this.getIdentity(),this.id),e=this.attributes())if((s=e[r])!==t[r]){if(null!=s&&s.constructor===Date&&t[r]-s==0)continue;s!==t[r]&&(o[r]={is:t[r],was:s})}return o},t.prototype.applyChanges=function(){var t,r,e,o;for(t in e=[],r=this.changes())o=r[t],e.push(this[t]=o.is);return e},t.prototype.toKey=function(){return this.getIdentity().toLowerCase()+"_"+this.id},t.prototype.get=function(t,r){return null==r&&(r={}),this.__send("GET",t,r)},t.prototype.post=function(t,r){return null==r&&(r={}),this.__send("POST",t,r)},t.prototype.put=function(t,r){return null==r&&(r={}),this.__send("PUT",t,r)},t.prototype.patch=function(t,r){return null==r&&(r={}),this.__send("PATCH",t,r)},t.prototype.delete=function(t,r){return null==r&&(r={}),this.__send("DELETE",t,r)},t.prototype.__send=function(t,r,e){var o,s;return s=this.__getResourceUrl(),null!=r&&(s=s+"/"+r),o=q(t,s,e),new Promise((function(t,r){return o.onerror=function(t){return r(t)},o.onload=function(o){return o.target.status>=200&&o.target.status<400?(e=JSON.parse(o.target.response),t(e)):o.target.status>=500?r(o):void 0}}))},t.prototype.__assignAttributes=function(t){var r,e,o,s;for(e in o=[],t)s=t[e],r=this.getAttrName(e),o.push(this.assignAttr(r,s));return o},t.prototype.__initAttributes=function(){var t,r,e;for(t in e=[],r=this.constructor.attributes)r[t],e.push(this[t]=null);return e},t.prototype.__assignRemoteErrorMessages=function(t){var r,e,o,s,n;for(s in n=[],t)o=t[s],r=this.getAttrName(s),n.push(function(){var t,s,n;for(n=[],t=0,s=o.length;t<s;t++)e=o[t],n.push(this.addErrorMessage(e,{for:r}));return n}.call(this));return n},t.prototype.__getResourceUrl=function(){var t;return t=this.constructor.__getResourcesUrl({resource:this.resource,obj:this}),null==this.id?t:t+"/"+this.id},t.prototype.__processedValidationSettings=function(t){var r,e,o;for(r in o={},t)e=t[r],o[r]="function"==typeof e?e(this):e;return o},t}();e.d(r,"Config",(function(){return a})),e.d(r,"I18n",(function(){return s})),e.d(r,"IdentityMap",(function(){return O})),e.d(r,"Models",(function(){return j})),e.d(r,"Validators",(function(){return N})),j.Base=A}])}));