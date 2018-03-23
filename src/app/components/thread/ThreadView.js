import Marionette from 'backbone.marionette'

import ThreadModel from './ThreadModel'
import template from './ThreadTemplate.hbs'

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'thread',
  model: new ThreadModel() // is this necessary?
})
