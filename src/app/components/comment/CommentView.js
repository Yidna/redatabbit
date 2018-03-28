import Marionette from 'backbone.marionette'

import CommentModel from './CommentModel'
import template from './CommentTemplate.hbs'

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'comment',
  model: new CommentModel(), // is this necessary?

  onRender() {
    const user = localStorage.getItem('username')
    const threadOP = this.model.get('username')
    if (user !== threadOP) {
      this.$('.edit').hide()
    }
  }
})
