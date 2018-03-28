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
    $('#create-board-field').val('')
    $('.create-board-form').hide()
    $.post('/api/subboards', {
        name: input,
        date: date
      },
      () => {
        this.subboardCollectionView.collection.add({
          name: input,
          date: date
        })
      })
  }
})
