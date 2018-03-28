import $ from 'jquery'
import Marionette from 'backbone.marionette'

import ThreadModel from './ThreadModel'
import template from './ThreadTemplate.hbs'

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'thread',
  model: new ThreadModel(), // is this necessary?

  onRender() {
    const user = localStorage.getItem('username')
    const threadOP = this.model.get('username')
    if (user !== threadOP) {
      this.$('.edit').hide()
    }
  }
})
