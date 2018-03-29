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
    const wackyUsers = {};
    $.get('api/special/accounts/wacky', (data) => {
      if (!data.success) {
        alert(data.message.sqlMessage)
      } else {
        data.data.forEach((datum) => {
          wackyUsers[datum.username] = true;
        })
        this.usersCollectionView.collection.forEach((userModel) => {
          if(wackyUsers[userModel.get('username')]) {
            userModel.set('wacky', true)
          }
        })
        this.usersCollectionView.render()
        $('.users').replaceWith(this.usersCollectionView.$el)
        $('#row0').remove()
        $('.users').prepend('<tr id="row0"><td>User name</td><td>Post count</td></tr>')
      }
    })
    // this.usersCollectionView.collection.forEach((model) => {
    //   model.set('wacky', true)
    // })
  }
})
