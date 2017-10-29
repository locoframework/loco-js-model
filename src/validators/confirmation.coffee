import {Base} from './base.coffee';
import {I18n} from '../i18n';
import {Env} from '../env';

class Confirmation extends Base
  @identity = "Confirmation"

  constructor: -> super()

  validate: ->
    properVal = @obj[this._properAttr()]
    return if @val? and properVal? and @val is properVal
    this._addErrorMessage()

  _addErrorMessage: ->
    defaultAttrName = @attr.charAt(0).toUpperCase() + @attr.slice(1)
    attrNames = I18n[Env().loco.getLocale()].attributes[@obj.getIdentity()]
    attrName = (attrNames and attrNames[@attr]) || defaultAttrName
    message = if @opts.message?
      @opts.message
    else
      I18n[Env().loco.getLocale()].errors.messages.confirmation
    message = message.replace '%{attribute}', attrName
    @obj.addErrorMessage message, for: this._properAttr()

  _properAttr: -> "#{@attr}Confirmation"

export {Confirmation};