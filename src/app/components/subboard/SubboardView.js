import Marionette from 'backbone.marionette'

import SubboardModel from './SubboardModel'
import template from './SubboardTemplate.hbs'

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'subboard',
  model: new SubboardModel() // is this necessary?
})
