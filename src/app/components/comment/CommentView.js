import Marionette from 'backbone.marionette'

import CommentModel from './CommentModel'
import template from './CommentTemplate.hbs'
import ModeratorCollectionView from "../moderator-list/ModeratorCollectionView";

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'comment',
  model: new CommentModel(), // is this necessary?

  initialize() {
    this.modsView = new ModeratorCollectionView
  },

  onRender() {
    const user = localStorage.getItem('username')
    const loggedIn = localStorage.getItem('token')
    const threadOP = this.model.get('username')
    const modStatus = this.isMod(user)
    if (!loggedIn || user !== threadOP) {
      if (!modStatus) {
        this.$('.edit').hide()
      }
    }
  },

  isMod(user) {
    let ret = false
    this.modsView.collection.forEach((moderator) => {
      if (user === moderator.get('username')) {
        ret = true
      }
    })
    return ret
  }
})
