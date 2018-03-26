import Marionette from 'backbone.marionette'

import PostButtonModel from './PostButtonModel'
import template from './PostButtonTemplate.hbs'

export default Marionette.View.extend({
  template,
  className: 'post-button',
  model: new PostButtonModel() // is this necessary?
})
