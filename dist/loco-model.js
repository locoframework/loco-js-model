!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.LocoModel=e():t.LocoModel=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(3),s=r.n(o);n=function(){function t(){this.obj=null,this.attr=null,this.val=null,this.opts=null}return t.sharedInstances={},t.instance=function(t,e,r){var n,o;return o=this.identity,null==this.sharedInstances[o]&&(this.sharedInstances[o]=new s.a[o]),n=this.sharedInstances[o],n.assignAttribs(t,e,r),n},t.prototype.assignAttribs=function(t,e,r){return this.obj=t,this.attr=e,this.val=this.obj[this.attr],this.opts=r},t}(),e.default=n},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=r(4),i=function(t){return t&&t.__esModule?t:{default:t}}(s),a=i.default,u=function(){function t(){n(this,t)}return o(t,[{key:"loco",get:function(){return a},set:function(t){return a=t}},{key:"scope",get:function(){return a.getScope()},set:function(t){return a.setScope(t)}}]),t}(),l=new u;e.default=l},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.I18nObj=void 0;var n=r(11),o=function(t){return t&&t.__esModule?t:{default:t}}(n),s=e.I18nObj={en:o.default},i=function(){return s};e.default=i},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=r(10),s=n(o),i=r(12),a=n(i),u=r(13),l=n(u),c=r(14),p=n(c),h=r(15),f=n(h),d=r(5),_=n(d),g=r(16),v=n(g),y=r(17),m=n(y),b=r(18),M=n(b),E={Absence:s.default,Confirmation:a.default,Exclusion:l.default,Format:p.default,Inclusion:f.default,Length:_.default,Numericality:v.default,Presence:m.default,Size:M.default};e.default=E},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s="en",i=null,a=null,u=function(){function t(){n(this,t)}return o(t,[{key:"getLocale",value:function(){return s}},{key:"setLocale",value:function(t){return s=t}},{key:"getProtocolWithHost",value:function(){return i}},{key:"setProtocolWithHost",value:function(t){return i=t?"/"===t[t.length-1]?t.slice(0,t.length-1):t:null}},{key:"getScope",value:function(){return a}},{key:"setScope",value:function(t){return a=t}},{key:"protocolWithHost",get:function(){return i}}]),t}(),l=new u;e.default=l},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Length",e.prototype.validate=function(){var t;if(null!=this.val&&null!==(t=null!=this._range()[0]&&null!=this._range()[1]&&this._range()[0]===this._range()[1]&&this.val.length!==this._range()[0]?this._selectErrorMessage("wrong_length",this._range()[0]):null!=this._range()[0]&&this.val.length<this._range()[0]?this._selectErrorMessage("too_short",this._range()[0]):null!=this._range()[1]&&this.val.length>this._range()[1]?this._selectErrorMessage("too_long",this._range()[1]):null))return this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._range=function(){var t,e;return t=this.opts.minimum||this.opts.is||null!=this.opts.within&&this.opts.within[0]||null,e=this.opts.maximum||this.opts.is||null!=this.opts.within&&this.opts.within[1]||null,[t,e]},e.prototype._selectErrorMessage=function(t,e){var r,n,o,s,a;if(1===e)return i()()[u.a.loco.getLocale()].errors.messages[t].one;for(o=null,s=["few","many"],r=0,n=s.length;r<n;r++)if(a=s[r],this._checkVariant(a,e)){o=i()()[u.a.loco.getLocale()].errors.messages[t][a];break}return null==o&&(o=i()()[u.a.loco.getLocale()].errors.messages[t].other),null!=this.opts.message&&(o=this.opts.message),/%{count}/.exec(o)&&(o=o.replace("%{count}",e)),o},e.prototype._checkVariant=function(t,e){if(null!=i()()[u.a.loco.getLocale()].variants[t])return i()()[u.a.loco.getLocale()].variants[t](e)},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n;n=function(){function t(){}return t.imap={},t.clear=function(){return this.imap={}},t.add=function(t){var e;return e=t.getIdentity(),null==this.imap[e]&&(this.imap[e]={}),null==this.imap[e][t.id]&&(this.imap[e][t.id]=[]),this.imap[e][t.id][0]=t},t.connect=function(t,e){var r;return null==e&&(e={}),r=e.with,this.add(r),this.imap[r.getIdentity()][r.id].push(t)},t.addCollection=function(t,e){if(null==e&&(e={}),null==this.imap[t]&&(this.imap[t]={}),null==this.imap[t].collection&&(this.imap[t].collection=[]),-1===this.imap[t].collection.indexOf(e.to))return this.imap[t].collection.push(e.to)},t.all=function(t){var e,r,n,o;if(null==this.imap[t])return null;e=[],o=this.imap[t];for(r in o)n=o[r],"collection"!==r&&e.push(n[0]);return e},t.find=function(t,e){return this.imap[t]&&this.imap[t][e]?this.imap[t][e][0]:null},t.findConnected=function(t,e){var r;return this.imap[t]&&this.imap[t][e]&&this.imap[t][e].length>1?(r=this.imap[t][e],r.slice(1,+(r.length-1)+1||9e9)):[]},t}(),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=e.ModelsObj={},o=function(){return n};e.default=o},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Validators=e.Models=e.IdentityMap=e.I18n=e.Env=e.Config=e.Base=void 0;var o=r(9),s=n(o),i=r(6),a=n(i),u=r(0),l=n(u),c=r(3),p=n(c),h=r(4),f=n(h),d=r(1),_=n(d),g=r(2),v=r(7);p.default.Base=l.default,v.ModelsObj.Base=s.default,e.Base=s.default,e.Config=f.default,e.Env=_.default,e.I18n=g.I18nObj,e.IdentityMap=a.default,e.Models=v.ModelsObj,e.Validators=p.default},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(3),s=r.n(o),i=r(1),a=r.n(i),u=r(19),l=r.n(u),c=r(6),p=r(7),h=r.n(p);n=function(){function t(t){null==t&&(t={}),this.id=null,this.errors=null,this.resource=t.resource,null!=this.constructor.attributes&&this.__initAttributes(),null!=t&&this.__assignAttributes(t)}return t.all=function(t){return null==t&&(t={}),this.get("all",t)},t.find=function(t){var e,r,n;return n={},"object"==typeof t?(n=t,e=t.id,delete n.id):e=t,r=new XMLHttpRequest,r.open("GET",this.__getResourcesUrl(n)+"/"+e),r.setRequestHeader("Accept","application/json"),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(n)),new Promise(function(t){return function(e,n){return r.onerror=function(t){return n(t)},r.onload=function(r){var n,o;return o=JSON.parse(r.target.response),n=t.__initSubclass(o),c.default.add(n),e(n)}}}(this))},t.get=function(t,e){return null==e&&(e={}),this.__send("GET",t,e)},t.post=function(t,e){return null==e&&(e={}),this.__send("POST",t,e)},t.put=function(t,e){return null==e&&(e={}),this.__send("PUT",t,e)},t.delete=function(t,e){return null==e&&(e={}),this.__send("DELETE",t,e)},t.getIdentity=function(){if(null!=this.identity)return this.identity;throw"Specify Model's @identity!"},t.getRemoteName=function(){return null!=this.remoteName?this.remoteName:this.getIdentity()},t.getAttribRemoteName=function(t){return null==this.attributes?null:null==this.attributes[t]?null:null==this.attributes[t].remoteName?t:this.attributes[t].remoteName},t.getResourcesUrlParams=function(){var t,e,r,n;for(n=this.__getResourcesUrl(),r=/:(\w+)\/?/,e=[];t=r.exec(n);)e.push(t[1]),n=n.replace(t[0],t[1]);return e},t.__getResourcesUrl=function(t){var e,r;return null==t&&(t={}),r=null==this.resources?"/"+this.getRemoteName().toLowerCase()+"s":t.resource?this.resources[t.resource].url:null!=a.a.scope&&null!=this.resources[a.a.scope]?this.resources[a.a.scope].url:this.resources.url,null!=a.a.loco.protocolWithHost&&(r=""+a.a.loco.protocolWithHost+r),null==(e=/:(\w+)\/?/.exec(r))?r:(null!=t[e[1]]?(r=r.replace(":"+e[1],t[e[1]]),delete t[e[1]]):null!=t.obj&&null!=t.obj[e[1]]&&(r=r.replace(":"+e[1],t.obj[e[1]])),r)},t.__initSubclass=function(t){var e,r;return null==t&&(t={}),r=this.getIdentity().split("."),1===r.length?(e=h()()[r[0]],null==e?new this(t):new e(t)):new(e=h()()[r[0]][r[1]])(t)},t.__page=function(t,e,r,n){var o,s,i,a,u,p,h,f;if(null==e&&(e={}),null==r&&(r={}),null==n&&(n={resources:[],count:0}),s=r.method||"GET",h=r.url||this.__getResourcesUrl(e),o={},null!=r.data){a=r.data;for(i in a)f=a[i],"resource"!==i&&(o[i]=f)}return o[this.__getPaginationParam()]=t,"GET"===s&&(h=h+"?"+l.a.Obj.toURIParams(o)),p=new XMLHttpRequest,p.open(s,h),p.setRequestHeader("Accept","application/json"),p.setRequestHeader("Content-Type","application/json"),p.setRequestHeader("X-CSRF-Token",null!=(u=document.querySelector("meta[name='csrf-token']"))?u.content:void 0),p.send(JSON.stringify(o)),new Promise(function(t){return function(r,s){return p.onerror=function(t){return s(t)},p.onload=function(s){var a,u,l,p,h;o=JSON.parse(s.target.response),n.count=o.count;for(i in o)f=o[i],-1===["resources","count"].indexOf(i)&&(n[i]=f);for(h=o.resources,a=0,u=h.length;a<u;a++)p=h[a],l=t.__initSubclass(p),null!=e.resource&&(l.resource=e.resource),c.default.add(l),n.resources.push(l);return r(n)}}}(this))},t.__paginate=function(t,e){var r,n,o;return n=this.__getPaginationPer(),r=null!=(o=t.page)?o:1,this.__page(r,t,e).then(function(r){return function(o){var s,i,a,u,l;if(null!=t.page)return Promise.resolve(o);if(o.count<=n)return Promise.resolve(o);if(a=parseInt(o.count/n),a!==o.count/n&&(a+=1),u=Promise.resolve(o),1===a)return u;for(s=i=2,l=a;2<=l?i<=l:i>=l;s=2<=l?++i:--i)(function(n){return u=u.then(function(s){return r.__page(n,t,e,o)})})(s);return u}}(this))},t.__getPaginationParam=function(){var t,e,r,n,o,s;return t="page",null!=a.a.scope&&null!=this.resources&&null!=this.resources[a.a.scope]?(e=null!=(r=this.resources[a.a.scope])&&null!=(n=r.paginate)?n.param:void 0,null!=e?e:t):null!=(null!=(o=this.resources)&&null!=(s=o.paginate)?s.param:void 0)?this.resources.paginate.param:t},t.__getPaginationPer=function(){var t,e,r,n;return null!=a.a.scope&&null!=this.resources&&null!=this.resources[a.a.scope]?null!=(t=this.resources[a.a.scope])&&null!=(e=t.paginate)?e.per:void 0:null!=(null!=(r=this.resources)&&null!=(n=r.paginate)?n.per:void 0)?this.resources.paginate.per:null},t.__send=function(t,e,r){var n,o;return o=this.__getResourcesUrl(r),"all"!==e&&(o=o+"/"+e),n={method:t,url:o,data:r},this.__paginate(r,n)},t.prototype.setResource=function(t){return this.resource=t},t.prototype.getIdentity=function(){return this.constructor.getIdentity()},t.prototype.getAttrRemoteName=function(t){return null==this.constructor.attributes?null:null==this.constructor.attributes[t]?null:this.constructor.attributes[t].remoteName||t},t.prototype.getAttrName=function(t){var e,r,n;if(null==this.constructor.attributes)return t;if(null!=this.constructor.attributes[t])return t;n=this.constructor.attributes;for(r in n)if(e=n[r],e.remoteName===t)return r;return t},t.prototype.getAttrType=function(t){return null==this.constructor.attributes?null:null==this.constructor.attributes[t]?null:this.constructor.attributes[t].type},t.prototype.assignAttr=function(t,e){var r;if(r=this.getAttrType(t),null==e)return void(this[t]=null);switch(r){case"Date":e=new Date(Date.parse(e));break;case"Integer":case"Int":e=parseInt(e);break;case"Float":e=parseFloat(e);break;case"Boolean":case"Bool":e="boolean"==typeof e?e:Boolean(parseInt(e));break;case"Number":e=Number(e);break;case"String":e=String(e)}return this[t]=e},t.prototype.attributes=function(){var t,e,r;if(t={id:this.id},null==this.constructor.attributes)return t;r=this.constructor.attributes;for(e in r)r[e],t[e]=this[e];return t},t.prototype.isValid=function(){var t,e,r,n,o,i,a,u,l,c,p,h;if(null==this.constructor.attributes)return!0;this.errors=null,a=this.constructor.attributes;for(o in a)if(t=a[o],null!=t.validations){u=t.validations;for(c in u)p=u[c],null!=this.id&&"create"===p.on||null==this.id&&"update"===p.on||(null==p.if||p.if(this))&&(h=c.charAt(0).toUpperCase()+c.slice(1),null!=s.a[h]?(i=this.__processedValidationSettings(p),s.a[h].instance(this,o,i).validate()):console.log('Warning! "'+h+'" validator is not implemented!'))}if(null!=this.constructor.validate)for(l=this.constructor.validate,e=0,r=l.length;e<r;e++)n=l[e],this[n]();return null==this.errors},t.prototype.isInvalid=function(){return!this.isValid()},t.prototype.isEmpty=function(){var t,e;e=this.attributes();for(t in e)if(e[t],null!==this[t])return!1;return!0},t.prototype.addErrorMessage=function(t,e){return null==e&&(e={}),null==this.errors&&(this.errors={}),null==this.errors[e.for]&&(this.errors[e.for]=[]),this.errors[e.for].push(t)},t.prototype.save=function(){var t,e,r;return t=null!=this.id?"PUT":"POST",r=new XMLHttpRequest,r.open(t,this.__getResourceUrl()),r.setRequestHeader("Accept","application/json"),r.setRequestHeader("Content-Type","application/json"),r.setRequestHeader("X-CSRF-Token",null!=(e=document.querySelector("meta[name='csrf-token']"))?e.content:void 0),r.send(JSON.stringify(this.serialize())),new Promise(function(t){return function(e,n){return r.onerror=function(t){return n(t)},r.onload=function(r){var n;return n=JSON.parse(r.target.response),n.success?void e(n):(null!=n.errors&&t.__assignRemoteErrorMessages(n.errors),e(n))}}}(this))},t.prototype.updateAttribute=function(t){var e,r;return r=new XMLHttpRequest,r.open("PUT",this.__getResourceUrl()),r.setRequestHeader("Accept","application/json"),r.setRequestHeader("Content-Type","application/json"),r.setRequestHeader("X-CSRF-Token",null!=(e=document.querySelector("meta[name='csrf-token']"))?e.content:void 0),r.send(JSON.stringify(this.serialize(t))),new Promise(function(t){return function(e,n){return r.onerror=function(t){return n(t)},r.onload=function(r){var o;return r.target.status>=200&&r.target.status<400?(o=JSON.parse(r.target.response),o.success?void e(o):(null!=o.errors&&t.__assignRemoteErrorMessages(o.errors),e(o))):r.target.status>=500?n(r):void 0}}}(this))},t.prototype.serialize=function(t){var e,r,n,o;if(null==t&&(t=null),null==this.constructor.attributes)return{};r={},n=this.constructor.getRemoteName().toLowerCase(),r[n]={},e={},null!=t?e[t]=null:e=this.constructor.attributes;for(t in e)e[t],o=this.getAttrRemoteName(t),r[n][o]=this[t];return r},t.prototype.reload=function(){var t,e,r,n,o;for(t={id:this.id},o=this.constructor.getResourcesUrlParams(),e=0,r=o.length;e<r;e++)n=o[e],t[n]=this[n];return this.constructor.find(t)},t.prototype.changes=function(){var t,e,r,n,o;n={},t=c.default.find(this.getIdentity(),this.id),r=this.attributes();for(e in r)if((o=r[e])!==t[e]){if(null!=o&&o.constructor===Date&&t[e]-o==0)continue;o!==t[e]&&(n[e]={is:t[e],was:o})}return n},t.prototype.applyChanges=function(){var t,e,r,n;e=this.changes(),r=[];for(t in e)n=e[t],r.push(this[t]=n.is);return r},t.prototype.toKey=function(){return this.getIdentity().toLowerCase()+"_"+this.id},t.prototype.get=function(t,e){return null==e&&(e={}),this.__send("GET",t,e)},t.prototype.post=function(t,e){return null==e&&(e={}),this.__send("POST",t,e)},t.prototype.put=function(t,e){return null==e&&(e={}),this.__send("PUT",t,e)},t.prototype.patch=function(t,e){return null==e&&(e={}),this.__send("PATCH",t,e)},t.prototype.delete=function(t,e){return null==e&&(e={}),this.__send("DELETE",t,e)},t.prototype.__send=function(t,e,r){var n,o,s;return s=this.__getResourceUrl(),null!=e&&(s=s+"/"+e),o=new XMLHttpRequest,o.open(t,s),o.setRequestHeader("Accept","application/json"),o.setRequestHeader("Content-Type","application/json"),o.setRequestHeader("X-CSRF-Token",null!=(n=document.querySelector("meta[name='csrf-token']"))?n.content:void 0),o.send(JSON.stringify(r)),new Promise(function(t,e){return o.onerror=function(t){return e(t)},o.onload=function(n){return n.target.status>=200&&n.target.status<400?(r=JSON.parse(n.target.response),t(r)):n.target.status>=500?e(n):void 0}})},t.prototype.__assignAttributes=function(t){var e,r,n,o;n=[];for(r in t)o=t[r],e=this.getAttrName(r),n.push(this.assignAttr(e,o));return n},t.prototype.__initAttributes=function(){var t,e,r;e=this.constructor.attributes,r=[];for(t in e)e[t],r.push(this[t]=null);return r},t.prototype.__assignRemoteErrorMessages=function(t){var e,r,n,o,s;s=[];for(o in t)n=t[o],e=this.getAttrName(o),s.push(function(){var t,o,s;for(s=[],t=0,o=n.length;t<o;t++)r=n[t],s.push(this.addErrorMessage(r,{for:e}));return s}.call(this));return s},t.prototype.__getResourceUrl=function(){var t;return t=this.constructor.__getResourcesUrl({resource:this.resource,obj:this}),null==this.id?t:t+"/"+this.id},t.prototype.__processedValidationSettings=function(t){var e,r,n;n={};for(e in t)r=t[e],n[e]="function"==typeof r?r(this):r;return n},t}(),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Absence",e.prototype.validate=function(){switch(typeof this.val){case"string":if(null!=this.val&&0===this.val.length)return;break;default:if(null==this.val)return}return this._addErrorMessage()},e.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:i()()[u.a.loco.getLocale()].errors.messages.present,this.obj.addErrorMessage(t,{for:this.attr})},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n;n={variants:{},models:{},attributes:{},errors:{messages:{accepted:"must be accepted",blank:"can't be blank",confirmation:"doesn't match %{attribute}",empty:"can't be empty",equal_to:"must be equal to %{count}",even:"must be even",exclusion:"is reserved",greater_than:"must be greater than %{count}",greater_than_or_equal_to:"must be greater than or equal to %{count}",inclusion:"is not included in the list",invalid:"is invalid",less_than:"must be less than %{count}",less_than_or_equal_to:"must be less than or equal to %{count}",not_a_number:"is not a number",not_an_integer:"must be an integer",odd:"must be odd",present:"must be blank",too_long:{one:"is too long (maximum is 1 character)",other:"is too long (maximum is %{count} characters)"},too_short:{one:"is too short (minimum is 1 character)",other:"is too short (minimum is %{count} characters)"},wrong_length:{one:"is the wrong length (should be 1 character)",other:"is the wrong length (should be %{count} characters)"},other_than:"must be other than %{count}"}}},e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Confirmation",e.prototype.validate=function(){var t;if(t=this.obj[this._properAttr()],null==this.val||null==t||this.val!==t)return this._addErrorMessage()},e.prototype._addErrorMessage=function(){var t,e,r,n;return r=this.attr.charAt(0).toUpperCase()+this.attr.slice(1),e=i()()[u.a.loco.getLocale()].attributes[this.obj.getIdentity()],t=e&&e[this.attr]||r,n=null!=this.opts.message?this.opts.message:i()()[u.a.loco.getLocale()].errors.messages.confirmation,n=n.replace("%{attribute}",t),this.obj.addErrorMessage(n,{for:this._properAttr()})},e.prototype._properAttr=function(){return this.attr+"Confirmation"},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Exclusion",e.prototype.validate=function(){var t;if(t=this.opts.in||this.opts.within||[],-1!==t.indexOf(this.val))return this._addErrorMessage()},e.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:i()()[u.a.loco.getLocale()].errors.messages.exclusion,this.obj.addErrorMessage(t,{for:this.attr})},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Format",e.prototype.validate=function(){if(null==this.opts.with.exec(this.val))return this._addErrorMessage()},e.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:i()()[u.a.loco.getLocale()].errors.messages.invalid,this.obj.addErrorMessage(t,{for:this.attr})},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Inclusion",e.prototype.validate=function(){var t;if(t=this.opts.in||this.opts.within||[],-1===t.indexOf(this.val))return this._addErrorMessage()},e.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:i()()[u.a.loco.getLocale()].errors.messages.inclusion,this.obj.addErrorMessage(t,{for:this.attr})},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Numericality",e.prototype.validate=function(){return isNaN(this.val)?this._addNaNErrorMessage():null!=this.opts.only_integer&&Number(this.val)!==parseInt(this.val)?this._addIntErrorMessage():null!=this.opts.greater_than&&Number(this.val)<=this.opts.greater_than?this._addGreatherThanErrorMessage():null!=this.opts.greater_than_or_equal_to&&Number(this.val)<this.opts.greater_than_or_equal_to?this._addGreatherThanOrEqualToErrorMessage():null!=this.opts.equal_to&&Number(this.val)!==this.opts.equal_to?this._addEqualToErrorMessage():null!=this.opts.less_than&&Number(this.val)>=this.opts.less_than?this._addLessThanErrorMessage():null!=this.opts.less_than_or_equal_to&&Number(this.val)>this.opts.less_than_or_equal_to?this._addLessThanOrEqualToErrorMessage():null!=this.opts.other_than&&Number(this.val)===this.opts.other_than?this._addOtherThanErrorMessage():null!=this.opts.odd&&Number(this.val)%2!=1?this._addOddErrorMessage():null!=this.opts.even&&Number(this.val)%2!=0?this._addEvenErrorMessage():void 0},e.prototype._addNaNErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:i()()[u.a.loco.getLocale()].errors.messages.not_a_number,this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addIntErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.not_an_integer,this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addGreatherThanErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.greater_than,t=t.replace("%{count}",this.opts.greater_than),this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addGreatherThanOrEqualToErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.greater_than_or_equal_to,t=t.replace("%{count}",this.opts.greater_than_or_equal_to),this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addEqualToErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.equal_to,t=t.replace("%{count}",this.opts.equal_to),this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addLessThanErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.less_than,t=t.replace("%{count}",this.opts.less_than),this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addLessThanOrEqualToErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.less_than_or_equal_to,t=t.replace("%{count}",this.opts.less_than_or_equal_to),this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addOtherThanErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.other_than,t=t.replace("%{count}",this.opts.other_than),this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addOddErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.odd,this.obj.addErrorMessage(t,{for:this.attr})},e.prototype._addEvenErrorMessage=function(){var t;return t=i()()[u.a.loco.getLocale()].errors.messages.even,this.obj.addErrorMessage(t,{for:this.attr})},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(2),i=r.n(s),a=r(1),u=r.n(a),l=function(t,e){function r(){this.constructor=t}for(var n in e)c.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return l(e,t),e.identity="Presence",e.prototype.validate=function(){switch(typeof this.val){case"string":if(null!=this.val&&this.val.length>0)return;break;default:if(null!=this.val)return}return this._addErrorMessage()},e.prototype._addErrorMessage=function(){var t;return t=null!=this.opts.message?this.opts.message:i()()[u.a.loco.getLocale()].errors.messages.blank,this.obj.addErrorMessage(t,{for:this.attr})},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=r(0),s=r(5),i=function(t,e){function r(){this.constructor=t}for(var n in e)a.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},a={}.hasOwnProperty;n=function(t){function e(){e.__super__.constructor.call(this)}return i(e,t),e.identity="Size",e.prototype.validate=function(){return s.default.instance(this.obj,this.attr,this.opts).validate()},e}(o.default),e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(20),o=function(t){return t&&t.__esModule?t:{default:t}}(n),s={Obj:o.default};e.default=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n;n=function(){function t(){}return t.toURIParams=function(t){var e,r,n;r="";for(e in t)n=t[e],""!==r&&(r+="&"),r+=e+"="+encodeURIComponent(n);return r},t}(),e.default=n}])});