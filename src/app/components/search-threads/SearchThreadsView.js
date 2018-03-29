import Marionette from 'backbone.marionette'
import $ from 'jquery'

import SearchThreadsModel from './SearchThreadsModel'
import template from './SearchThreadsTemplate.hbs'
import ThreadCollectionView from "../thread/ThreadCollectionView";
import UserCollectionView from "../user-list/UserCollectionView";

export default Marionette.View.extend({
  template,
  className: 'search-threads',
  model: new SearchThreadsModel(), // is this necessary?

  events: {
    'click .search-threads-button': 'displayForm',
    'click #search-threads-submit': 'submitForm'
  },

  initialize() {
    this.threadCollectionView = new ThreadCollectionView()
    this.usersCollectionView = new UserCollectionView()
  },

  displayForm() {
    $('.search-threads-form').toggle()
    $('.board').toggle()
  },

  submitForm() {
    // we will use this value to search for users
    const input = $('#search-threads-field').val()
    const sel = $('.search-threads-select').val()
    const proj = $('.search-threads-proj').val()

    // TODO: remove and reset thread/user collectionviews

    // TODO: appropriate query threads
    if (input !== '' && sel && proj) {
      if (sel === 'username') {
        // TODO: appropriate query and add appropriate collectionview
      } else {
        // TODO: appropriate query and add appropriate collectionview
      }
    }
  }
})
