import Marionette from 'backbone.marionette'
import $ from 'jquery'

import CreateBoardModel from './CreateBoardModel'
import template from './CreateBoardTemplate.hbs'

export default Marionette.View.extend({
  template,
  className: 'create-board',
  model: new CreateBoardModel(), // is this necessary?

  events: {
    'click .create-board-button': 'displayForm',
    'click #create-board-submit': 'submitForm'
  },

  displayForm() {
    $('.create-board-form').toggle()
  },

  submitForm() {
    const input = $('#create-board-field').val()
    // TODO: POST query adding board
  }
})
