import $ from 'jquery'
import Backbone from 'backbone'

import HomePage from 'app/components/home-page/HomePage'
import SubboardCollectionView from './components/subboard/SubboardCollectionView'
import ThreadCollectionView from './components/thread/ThreadCollectionView'

import LoginForm from "app/components/login/LoginForm"
import CommentCollectionView from "./components/comment/CommentCollectionView";

export default Backbone.Router.extend({
  initialize() {
    this.subboardCollectionView = new SubboardCollectionView()
    this.threadCollectionView = new ThreadCollectionView()
    this.commentCollectionView = new CommentCollectionView()

    const homePage = new HomePage().render()
    $('#content').empty().append(homePage.$el)

    const loginForm = new LoginForm().render()
    $('#login-box').empty().append(loginForm.$el)
  },

  routes: {
    '': 'home',
    ':subboard': 'visitBoard',
    ':subboard/:thread': 'visitThread'
  },

  home() {
    this.subboardCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      console.log(data.data)
      this.subboardCollectionView.collection.add(data.data)
    })
    this.subboardCollectionView.render()
    $('.collection').empty().append(this.subboardCollectionView.$el)
  },

  visitBoard() {
    this.threadCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      this.threadCollectionView.collection.add(data.data)
    })
    this.threadCollectionView.render()
    $('.collection').empty().append(this.threadCollectionView.$el)
  },

  visitThread() {
    this.commentCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      this.commentCollectionView.collection.add(data.data)
    })
    this.commentCollectionView.render()
    $('.collection').empty().append(this.commentCollectionView.$el)
  }
})

