import Marionette from 'backbone.marionette'

import MessageModel from './MessageModel'
import template from './MessageTemplate.hbs'

export default Marionette.View.extend({
  template,
  model: new MesageModel(), // is this necessary?
  tagName: 'tr'
})
