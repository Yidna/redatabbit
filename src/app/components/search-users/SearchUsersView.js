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
    $('.users').remove()
    this.usersCollectionView.collection.reset()
    // TODO: search users query
    $.get('/api/accounts', (data) => {
      this.usersCollectionView.collection.add(data.data)
    })
    this.usersCollectionView.render()
    $('#content').append(this.usersCollectionView.$el)
    $('#row0').remove()
    $('.users').append('<tr id="row0"><td>User name</td><td>Post count</td></tr>')
  }
})
