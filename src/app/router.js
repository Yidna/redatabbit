import $ from 'jquery'
import Backbone from 'backbone'
import localStorage from "localStorage"

import BannerView from "app/components/banner/BannerView"
import LoginForm from "app/components/sidebar/LoginForm"
import AccountView from "app/components/sidebar/AccountView"

import HomePage from 'app/components/home-page/HomePage'
import SubboardCollectionView from './components/subboard/SubboardCollectionView'
import ThreadCollectionView from './components/thread/ThreadCollectionView'
import CommentCollectionView from "./components/comment/CommentCollectionView";
import PostButtonView from './components/post-button/PostButtonView'
import PostBoxView from "./components/post-box/PostBoxView";

export default Backbone.Router.extend({
  routes: {
    '': 'home',
    boards: 'visitBoards',
    'boards/:subboard': 'visitBoard',
    'boards/:subboard/create': 'createThread',
    'boards/:subboard/:thread': 'visitThread',
    'boards/:subboard/:thread/create': 'createComment'
  },

	initialize() {
		this.subboardCollectionView = new SubboardCollectionView()
		this.threadCollectionView = new ThreadCollectionView()
		this.commentCollectionView = new CommentCollectionView()
    this.postButtonView = new PostButtonView()
    this.postBoxView = new PostBoxView()

		const homePage = new HomePage().render()
		$('#content').empty().append(homePage.$el)

		const loginForm = new LoginForm().render()
		$('#login-box').empty().append(loginForm.$el)

		this.loadBanner();
		this.loadSideBar();
	},

  home() {
    $('.collection').empty()
  },

  visitBoards() {
    this.subboardCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      this.subboardCollectionView.collection.add(data.data)
    })
    this.subboardCollectionView.render()
    $('.collection').empty().append(this.subboardCollectionView.$el)
  },

  visitBoard() {
    // add post thread button
    const postRoute = `${window.location.hash}/create`
    this.postButtonView.model.set({
      message: 'Post thread',
      route: postRoute
    })
    this.postButtonView.render()
    $('.collection').empty().append(this.postButtonView.$el)

    // add threads
    this.threadCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      const models = []
      data.data.forEach((model) => {
        const newModel = model
        newModel.route = `${window.location.hash}/${model.password}`
        models.push(newModel)
      })
      this.threadCollectionView.collection.add(models)
    })
    this.threadCollectionView.render()
    $('.collection').append(this.threadCollectionView.$el)
  },

  visitThread() {
    // add post comment button
    const postRoute = `${window.location.hash}/create`
    this.postButtonView.model.set({
      message: 'Post comment',
      route: postRoute
    })
    this.postButtonView.render()
    $('.collection').empty().append(this.postButtonView.$el)

    // add comments
    this.commentCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      this.commentCollectionView.collection.add(data.data)
    })
    this.commentCollectionView.render()
    $('.collection').append(this.commentCollectionView.$el)
  },

  createThread() {
    this.postBoxView.render()
    $('.collection').empty().append(this.postBoxView.$el)
    // TODO: post request
  },

  createComment() {
    this.postBoxView.render()
    $('.collection').empty().append(this.postBoxView.$el)
    // TODO: post request
  },

  loadBanner() {
	  var bannerView = new BannerView().render();
	  $("#banner").empty().append(bannerView.$el);
  },

  loadSideBar() {
		var content;
		if (localStorage.getItem("token")) {
			content = new AccountView();
			$.post({
				url: '/api/authenticate/renew',
				headers: {
					"token": localStorage.getItem("token")
				},
				success: (data) => {
					if (!data.success) {
						localStorage.removeItem("token");
						location.reload();
						return;
					}
					localStorage.setItem("token", data.data[0].token);
					$.get('/api/accounts/'+localStorage.getItem("username"), (data) => {
						data.data[0].date_created = data.data[0].date_created.substring(0, 10);
						content.model.set(data.data[0]);
						content.render();
					})
				}
			});
		}
		else {
			content = new LoginForm().render();
		}
		$("#side-bar").empty().append(content.$el);
  }
})

