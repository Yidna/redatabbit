import Marionette from 'backbone.marionette'

import PostBoxModel from './PostBoxModel'
import template from './PostBoxTemplate.hbs'

export default Marionette.View.extend({
  template,
  model: new PostBoxModel() // is this necessary?
})
