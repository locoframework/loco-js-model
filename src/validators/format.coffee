import Base from './base.coffee'
import I18n from '../i18n'
import Env from '../env'

class Format extends Base
  @identity = "Format"

  constructor: -> super()

  validate: ->
    match = @opts.with.exec @val
    return if match?
    this._addErrorMessage()

  _addErrorMessage: ->
    message = if @opts.message?
      @opts.message
    else
      I18n()[Env().loco.getLocale()].errors.messages.invalid
    @obj.addErrorMessage message, for: @attr

export default Format