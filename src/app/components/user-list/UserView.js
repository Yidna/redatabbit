import Marionette from 'backbone.marionette'

import UserModel from './UserModel'
import template from './UserTemplate.hbs'

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  model: new UserModel(), // is this necessary?

  onRender() {
    if (this.model.get('wacky')) {
      console.log(this.$el.css('background-color', 'red'))
    }
  }
})
