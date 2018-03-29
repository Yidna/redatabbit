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
    const loggedIn = localStorage.getItem('token')
    const threadOP = this.model.get('username')
    if (!loggedIn || user !== threadOP) {
      this.$('.edit').hide()
    }
  }
})
