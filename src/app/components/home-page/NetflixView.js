import Marionette from 'backbone.marionette'

import NetflixModel from './NetflixModel'
import template from './NetflixTemplate.hbs'

export default Marionette.View.extend({
  template,
  tagName: 'li',
  model: new NetflixModel() // is this necessary?
})
