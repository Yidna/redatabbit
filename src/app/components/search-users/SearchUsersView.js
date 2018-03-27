import Marionette from 'backbone.marionette'
import $ from 'jquery'

import SearchUsersModel from './SearchUsersModel'
import template from './SearchUsersTemplate.hbs'

export default Marionette.View.extend({
  template,
  className: 'search-users',
  model: new SearchUsersModel(), // is this necessary?

  events: {
    'click .search-users-button': 'displayForm',
    'click #search-users-submit': 'submitForm'
  },

  displayForm() {
    $('.search-users-form').toggle()
  },

  submitForm() {
    const input = $('#create-board-field').val()
    // TODO: POST query search for users
  }
})
