import $ from 'jquery'
import Backbone from 'backbone'

import HomePage from 'app/components/home-page/HomePage'
import SubboardCollectionView from './components/subboard/SubboardCollectionView'
import ThreadCollectionView from './components/thread/ThreadCollectionView'

import LoginForm from "app/components/login/LoginForm"

export default Backbone.Router.extend({
  routes: {
    '': 'home',
    ':subboard': 'visitBoard',
    ':subboard/:thread': 'visitThread'
  },
  
  initialize() {
	const loginForm = new LoginForm().render();
	$("#login-box").empty().append(loginForm.$el);
  },

  home() {
    const homePage = new HomePage().render()
    $('#content').empty().append(homePage.$el)

    const subboardCollectionView = new SubboardCollectionView()
    $.get('/api/accounts', (data) => {
      subboardCollectionView.collection.add(data)
    })
    subboardCollectionView.render()
    $('.collection').append(subboardCollectionView.$el)
  },

  visitBoard() {
    $('.subboard').remove()

    const threadCollectionView = new ThreadCollectionView()
    $.get('/api/accounts', (data) => {
      threadCollectionView.collection.add(data)
    })
    threadCollectionView.render()
    $('.collection').append(threadCollectionView.$el)
  }
})

