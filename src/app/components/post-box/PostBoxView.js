import Marionette from 'backbone.marionette'

import PostBoxModel from './PostBoxModel'
import template from './PostBoxTemplate.hbs'
import UserCollectionView from "../user-list/UserCollectionView";
import $ from "jquery";

export default Marionette.View.extend({
  template,
  model: new PostBoxModel(), // is this necessary?

  events: {
    'click #submit-button': 'submitForm'
  },

  submitForm() {
    const title = $('#post-box-text').val()
    const token = localStorage.getItem('token');
    $.ajax({
      method: 'POST',
      url: `/api/sub${Backbone.history.fragment.split('/create')[0]}`,
      headers: {
        token: token
      },
      data: {
        text: title,
        title: title
      },
      success: (data) => {
        if (!data.success) {
          alert(data.message.sqlMessage)
        } else {
          window.location = `#/${Backbone.history.fragment.split('/create')[0]}`
        }
      }
    })
  }
})
