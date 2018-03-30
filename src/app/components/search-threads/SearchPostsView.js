import Marionette from 'backbone.marionette'
import $ from 'jquery'

import SearchPostsModel from './SearchPostsModel'
import template from './SearchPostsTemplate.hbs'

export default Marionette.View.extend({
  template,
  className: 'search-posts',
  model: new SearchPostsModel(), // is this necessary?

  events: {
    'click #search-posts-submit': 'submitForm'
  },

  initialize() {
  },

  async submitForm() {
    // we will use this value to search for users
    const input = $('#search-posts-field').val()
    const where = $('.search-posts-select').val()

    if(!input || !where) {
      return
    }

    $('#search-posts-results').empty()

    const thread_id = $('#thread_id').is(':checked')
    const username = $('#username').is(':checked')
    const date_created = $('#date_created').is(':checked')
    const post_content = $('#post_content').is(':checked')
    const token = localStorage.getItem('token');
    const url = `/api/${Backbone.history.fragment}`
    let reqData;

    let select = ''
    if (thread_id) {
      select = `${select},id`
    }
    if (username) {
      select = `${select},username`
    }
    if (date_created) {
      select = `${select},date_created`
    }
    if (post_content) {
      select = `${select},content`
    }
    if (select.length === 0) {
      return
    }
    select = select.substring(1)

    reqData = {
      select: select,
      where: where,
      search: input
    }

    let output;
    await $.ajax({
      method: 'POST',
      url: url,
      headers: {
        token: token
      },
      data: reqData,
      success: (data) => {
        if (!data.success) {
          alert(data.message)
        } else {
          output = data.data
        }
      }
    })

    output.forEach((row) => {
      $('#search-posts-results').append('<tr class="row col-sm-12"></tr>')
      for (let key in row) {
        if (row.hasOwnProperty(key)) {
          $('.row').last().append(`<td class="col-sm-3">${row[key]}</td>`)
        }
      }
      console.log(row)
    })
  }
})
