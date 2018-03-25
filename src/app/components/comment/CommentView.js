import Marionette from 'backbone.marionette'

import CommentModel from './CommentModel'
import template from './CommentTemplate.hbs'

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'comment',
  model: new CommentModel() // is this necessary?
})
