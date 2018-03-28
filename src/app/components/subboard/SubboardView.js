import $ from 'jquery'
import Marionette from 'backbone.marionette'

import SubboardModel from './SubboardModel'
import template from './SubboardTemplate.hbs'
import SubboardCollectionView from "./SubboardCollectionView";

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'subboard',
  model: new SubboardModel(), // is this necessary?

  initialize() {
    this.subboardCollectionView = new SubboardCollectionView()
  },

  events: {
    'click .delete-subboard': 'deleteSubboard'
  },

  deleteSubboard() {
    // console.log(this.subboardCollectionView)
    const name = this.model.get('name')
    $.ajax({
      method: 'DELETE',
      url: `/api/subboards/${name}`,
      success: (data) => {
        this.subboardCollectionView.collection.remove(this.model)
      }
    })
  }
})
