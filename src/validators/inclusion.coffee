import Base from './base.coffee'
import I18n from '../i18n'
import Env from '../env'

class Inclusion extends Base
  @identity = "Inclusion"

  constructor: -> super()

  validate: ->
    set = @opts.in or @opts.within or []
    return if set.indexOf(@val) isnt -1
    this._addErrorMessage()

  _addErrorMessage: ->
    message = if @opts.message?
      @opts.message
    else
      I18n[Env.loco.getLocale()].errors.messages.inclusion
    @obj.addErrorMessage message, for: @attr

export default Inclusion