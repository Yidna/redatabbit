import $ from 'jquery'
import Marionette from 'backbone.marionette'

import ThreadModel from './ThreadModel'
import template from './ThreadTemplate.hbs'
import ModeratorCollectionView from "../moderator-list/ModeratorCollectionView";

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'thread',
  model: new ThreadModel(), // is this necessary?

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
