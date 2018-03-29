import Marionette from 'backbone.marionette'

import ModeratorModel from './ModeratorModel'
import template from './ModeratorTemplate.hbs'

export default Marionette.View.extend({
  template,
  className: 'moderator-name',
  model: new ModeratorModel() // is this necessary?
})
