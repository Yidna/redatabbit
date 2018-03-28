import Marionette from 'backbone.marionette'
import $ from 'jquery'

import SearchUsersModel from './SearchUsersModel'
import template from './SearchUsersTemplate.hbs'
import UserCollectionView from "../user-list/UserCollectionView";

export default Marionette.View.extend({
  template,
  className: 'search-users',
  model: new SearchUsersModel(), // is this necessary?

  events: {
    'click .search-users-button': 'displayForm',
    'click #search-users-submit': 'submitForm'
  },

  initialize() {
    this.usersCollectionView = new UserCollectionView()
  },

  displayForm() {
    $('.search-users-form').toggle()
  },

  submitForm() {
    // we will use this value to search for users
    const input = $('#search-users-field').val()

    // add users satisfying search loop
    // $('.users').remove()
    this.usersCollectionView.collection.reset()
    $.get(`/api/accounts/${input}`, (data)=> {
      if (!data.success) {
        alert(data.message.sqlMessage)
      } else {
        this.usersCollectionView.collection.add(data.data)
      }
    })
    $('#row0').remove()
    $('.users').append('<tr id="row0"><td>User name</td><td>Post count</td></tr>')
  }
})
