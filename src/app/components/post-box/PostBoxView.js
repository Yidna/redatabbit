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

    // if we are editing thread, we must get title and content
    if (!this.model.get('comment') && this.model.get('edit')) {
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

    // if we are editing comment, we must get title and content
    if (this.model.get('comment') && this.model.get('edit')) {
      $.get(`/api/sub${Backbone.history.fragment}`, (data) => {
        if (!data.success) {
          alert(data.message)
          window.history.back()
        } else {
          $('#post-box-text').text(data.data[0]['content'])
        }
      })
    }
  },

  async submitForm() {
    if (this.model.get('comment')) {
      this.submitComment()
    } else {
      this.submitThread()
    }
  },

  async submitThread() {
    const title = $('#post-box-title').val()
    const text = $('#post-box-text').val()
    // do not submit if empty
    if (!title || !text) {
      return;
    }

    const token = localStorage.getItem('token');
    // are we creating a new post? or editing?
    const editThread = this.model.get('edit')
    // api url
    let url;
    // api data
    let reqData;
    // request type
    let method;
    // new thread
    if (!editThread) {
      url = `/api/sub${Backbone.history.fragment.split('/create')[0]}`
      reqData = {
        text: text,
        title: title
      }
      method = 'POST'
    // old thread
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
  },

  async submitComment() {
    const text = $('#post-box-text').val()
    // do not submit if empty
    if (!text) {
      return;
    }
    let thread_id = Backbone.history.fragment.split('/create')[0]
    thread_id = thread_id.split('/').pop()

    const token = localStorage.getItem('token');
    // are we creating a new comment? or editing?
    const editComment = this.model.get('edit')

    let url
    let reqData
    let method

    // new comment
    if (!editComment) {
      url = `/api/sub${Backbone.history.fragment.split('/create')[0]}/replies`
      reqData = {
        text: text
      }
      method = 'POST'
      // old comment
    } else {
      url = `/api/sub${Backbone.history.fragment}`
      reqData = {
        text: text
      }
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
