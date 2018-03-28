import Marionette from 'backbone.marionette'
import $ from 'jquery'

import CreateBoardModel from './CreateBoardModel'
import template from './CreateBoardTemplate.hbs'
import SubboardCollectionView from "../subboard/SubboardCollectionView";

export default Marionette.View.extend({
  template,
  className: 'create-board',
  model: new CreateBoardModel(), // is this necessary?

  initialize() {
    this.subboardCollectionView = new SubboardCollectionView()
  },

  events: {
    'click .create-board-button': 'displayForm',
    'click #create-board-submit': 'submitForm'
  },

  displayForm() {
    $('.create-board-form').toggle()
  },

  submitForm() {
    const input = $('#create-board-field').val()
    const date = new Date().toISOString().substring(0, 19).replace('T', ' ')
    const token = localStorage.getItem('token');
    if (input.length > 0) {
      $('#create-board-field').val('')
      $('.create-board-form').hide()
      $.ajax({
        method: 'POST',
        url: '/api/subboards/',
        headers: {
          token: token
        },
        data: {
          name: input,
          date_created: date
        },
        success: (data) => {
          if (!data.success) {
            alert(data.message.sqlMessage)
          } else {
            this.subboardCollectionView.collection.add({
              name: input
            })
          }
        }
      })
    }
  }
})
