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

import MessageCollectionView from './components/inbox/MessageCollectionView';

export default Backbone.Router.extend({
  routes: {
    '': 'home',
    boards: 'visitBoards',
    'boards/:subboard': 'visitBoard',
    'boards/:subboard/:thread': 'visitThread',
    'boards/:subboard/create': 'createThread',
    'boards/:subboard/:thread': 'visitThread',
    'boards/:subboard/:thread/create': 'createComment',
	'users': 'visitUsers',
	'messages/:username': 'visitInbox'
  },

	initialize() {
		this.subboardCollectionView = new SubboardCollectionView()
		this.threadCollectionView = new ThreadCollectionView()
		this.commentCollectionView = new CommentCollectionView()
		this.postButtonView = new PostButtonView()
		this.postBoxView = new PostBoxView()
		
		this.messageCollectionView = new MessageCollectionView();
		
		this.loadBanner();
		this.loadSideBar();
	},

  home() {
	$("#home-tab").addClass("active");
	const homePage = new HomePage().render()
	$('#content').empty().append(homePage.$el)
  },

  visitBoards() {
	$("#boards-tab").addClass("active");
	
    this.subboardCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      this.subboardCollectionView.collection.add(data.data)
    })
    this.subboardCollectionView.render()
    $('#content').empty().append(this.subboardCollectionView.$el)
  },

  visitBoard() {
    // add post thread button
    const postRoute = `${window.location.hash}/create`
    this.postButtonView.model.set({
      message: 'Post thread',
      route: postRoute
    })
    this.postButtonView.render()
    $('#content').empty().append(this.postButtonView.$el)

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
    $('#content').empty().append(this.threadCollectionView.$el)
  },

  visitThread() {
    // add post comment button
    const postRoute = `${window.location.hash}/create`
    this.postButtonView.model.set({
      message: 'Post comment',
      route: postRoute
    })
    this.postButtonView.render()
    $('#content').empty().append(this.postButtonView.$el)

    // add comments
    this.commentCollectionView.collection.reset()
    $.get('/api/accounts', (data) => {
      this.commentCollectionView.collection.add(data.data)
    })
    this.commentCollectionView.render()
    $('#content').append(this.commentCollectionView.$el)
  },

  createThread() {
    this.postBoxView.render()
    $('#content').empty().append(this.postBoxView.$el)
    // TODO: post request
  },

  createComment() {
    this.postBoxView.render()
    $('#content').empty().append(this.postBoxView.$el)
    // TODO: post request
  },
  
  visitUsers() {
	$("#users-tab").addClass("active");
    $('#content').empty();
  },
  
  visitInbox(username) {
    $('#content').empty();
    this.messageCollectionView.collection.reset()
	$.get({
		url: "/api/messages/"+username,
		headers: {
			token: localStorage.getItem("token")
		},
		success: (data) => {
			if (!data.success) {
				return;
			}
			this.messageCollectionView.render();
			var messageTable = $("<table></table>").addClass("table");
			messageTable.append(this.messageCollectionView.$el);
			$("#content").empty().append(messageTable);
		}
	});
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

