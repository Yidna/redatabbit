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

  onRender() {
    // so hacky
    if ((Backbone.history.fragment.split('/').pop() === 'edit')) {
      $.get(`/api/sub${Backbone.history.fragment.split('/edit')[0]}`, (data) => {
        if (!data.success) {
          alert(data.message)
          window.history.back()
        } else {
          $('#post-box-title').text(data.data[0]['title'])
          $('#post-box-text').text(data.data[0]['content'])
        }
      })
    }
  },

  submitForm: async () => {
    const title = $('#post-box-title').val()
    const text = $('#post-box-text').val()
    // do not submit if empty
    if (!title || !text) {
      return;
    }

    const token = localStorage.getItem('token');
    // are we creating a new post? or editing?
    const newPost = (Backbone.history.fragment.split('/').pop() === 'create')
    // api url
    let url;
    // api data
    let reqData;
    // request type
    let method;
    if (newPost) {
      url = `/api/sub${Backbone.history.fragment.split('/create')[0]}`
      reqData = {
        text: text,
        title: title
      }
      method = 'POST'
    } else {
      url = `/api/sub${Backbone.history.fragment.split('/edit')[0]}`
      await $.get(url, (data) => {
        if (!data.success) {
          alert(data.message)
          window.history.back()
        } else {
          reqData = {
            subboard_name: data.data[0]['subboard'],
            thread_id: data.data[0]['id'],
            text: text
          }
        }
      })
      method = 'PUT'
    }
    $.ajax({
      method: method,
      url: url,
      headers: {
        token: token
      },
      data: reqData,
      success: (data) => {
        if (!data.success) {
          alert(data.message)
        } else {
          window.history.back()
        }
      }
    })
  }
})
