import Marionette from 'backbone.marionette'
import $ from 'jquery'

import WackyUsersModel from './WackyUsersModel'
import template from './WackyUsersTemplate.hbs'
import UserCollectionView from "../user-list/UserCollectionView";

export default Marionette.View.extend({
  template,
  className: 'wacky-users',
  model: new WackyUsersModel(), // is this necessary?

  events: {
    'click .wacky-users-button': 'displayResults'
  },

  initialize() {
    this.usersCollectionView = new UserCollectionView()
  },

  displayResults() {
    console.log('hi')
  }
})
