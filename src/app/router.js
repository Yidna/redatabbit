import $ from 'jquery'
import Backbone from 'backbone'
import localStorage from "localStorage"

import BannerView from "app/components/banner/BannerView"
import LoginForm from "app/components/sidebar/login/LoginForm"
import AccountView from "app/components/sidebar/dashboard/AccountView"
import FeaturedView from "app/components/sidebar/featured/FeaturedView"

import HomePage from 'app/components/home-page/HomePage'
import SubboardCollectionView from './components/subboard/SubboardCollectionView'
import ThreadCollectionView from './components/thread/ThreadCollectionView'
import CommentCollectionView from "./components/comment/CommentCollectionView";
import PostButtonView from './components/post-button/PostButtonView'
import PostBoxView from "./components/post-box/PostBoxView";
import ModeratorCollectionView from "./components/moderator-list/ModeratorCollectionView";

import MessageCollectionView from './components/inbox/MessageCollectionView';
import ComposeView from './components/compose-message/ComposeView';
import CreateBoardView from "./components/create-board/CreateBoardView";
import UserCollectionView from "./components/user-list/UserCollectionView";
import SearchUsersView from "./components/search-users/SearchUsersView";
import WackyUsersView from "./components/wacky-users/WackyUsersView";
import SearchPostsView from "./components/search-threads/SearchPostsView";

export default Backbone.Router.extend({
  routes: {
    '': 'home',
    boards: 'visitBoards',
    'boards/:subboard': 'visitBoard',
    'boards/:subboard/create': 'createThread', // order matters here
    'boards/:subboard/threads/:thread_id': 'visitThread',
    'boards/:subboard/threads/:thread_id/edit': 'editThread',
    'boards/:subboard/threads/:thread_id/create': 'createComment',
    'boards/:subboard/threads/:thread_id/replies/:comment_id': 'editComment',
	'users': 'visitUsers',
	'messages/:username': 'visitInbox',
	'messages/:username/compose(/:to_account)': 'visitCompose',
    "searchPosts": 'searchPosts'
  },

	initialize() {
		this.commentCollectionView = new CommentCollectionView()
		this.postButtonView = new PostButtonView()
		this.messageCollectionView = new MessageCollectionView();
    this.createBoardView = new CreateBoardView()
    this.searchPostsView = new SearchPostsView()
    this.usersCollectionView = new UserCollectionView()

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

    this.createBoardView.render()
    $('#content').empty().append(this.createBoardView.$el)

    this.subboardCollectionView = new SubboardCollectionView()
    this.subboardCollectionView.collection.reset()
    // TODO: boards query
    $.get('/api/subboards', (data) => {
      if (!data.success) {
        alert(data.message)
      } else {
        this.subboardCollectionView.collection.add(data.data)
      }
    })
    this.subboardCollectionView.render()
    $('#content').append(this.subboardCollectionView.$el)
  },

  visitBoard() {
    // add mods list
    $('#content').empty().append('<div id="moderators-tag">Moderators:</div>')
    this.modsView = new ModeratorCollectionView()
    this.modsView.collection.reset()
    $.get(`/api/sub${Backbone.history.getFragment()}/moderators`, (data) => {
      if (!data.success) {
        alert(data.message)
      } else {
        this.modsView.collection.add(data.data)
      }
    })
    this.modsView.render()
    $('#moderators-tag').append(this.modsView.$el)

    // add post thread button
    const postRoute = window.location.hash
    this.postButtonView.model.set({
      message: 'Post thread',
      route: postRoute
    })
    this.postButtonView.render()
    $('#content').append(this.postButtonView.$el)

    // add threads
    this.threadCollectionView = new ThreadCollectionView()
    this.threadCollectionView.collection.reset()
    $.get(`/api/sub${Backbone.history.getFragment()}/threads`, (data) => {
      if (!data.success) {
        alert(data.message)
      } else {
        const models = []
        data.data.forEach((model) => {
          const newModel = model
          newModel.route = postRoute
          models.push(newModel)
        })
        this.threadCollectionView.collection.add(models)
      }
    })
    this.threadCollectionView.render()
    $('#content').append(this.threadCollectionView.$el)
  },

  visitThread() {
    // add post comment button
    const postRoute = window.location.hash
    this.postButtonView.model.set({
      message: 'Post comment',
      route: postRoute
    })
    this.postButtonView.render()
    $('#content').empty().append(this.postButtonView.$el)

    // add comments
    this.commentCollectionView.collection.reset()
    $.get(`api/sub${Backbone.history.fragment}/replies`, (data) => {
      if (!data.success) {
        alert(data.message)
      } else {
        const models = []
        data.data.forEach((model) => {
          const newModel = model
          newModel.route = postRoute
          models.push(newModel)
        })
        this.commentCollectionView.collection.add(models)
      }
    })
    this.commentCollectionView.render()
    $('#content').append(this.commentCollectionView.$el)
  },

  createThread() {
    this.postBoxView = new PostBoxView()
    this.postBoxView.model.set({
      'comment': false,
      'edit': false
    })
    this.postBoxView.render()
    $('#content').empty().append(this.postBoxView.$el)
    $('#post-box-title').show()
  },

  createComment() {
    this.postBoxView = new PostBoxView()
    this.postBoxView.model.set({
      'comment': true,
      'edit': false
    })
    this.postBoxView.render()
    $('#content').empty().append(this.postBoxView.$el)
    // TODO: post request
  },

  editThread() {
    this.postBoxView = new PostBoxView()
    this.postBoxView.model.set({
      'comment': false,
      'edit': true
    })
    // // TODO: retrieve threadContent
    // const stubContent = 'thread user should be about to edit'
    // this.postBoxView.render()
    // this.postBoxView.$('#post-box-text').text(stubContent)
    // $('#content').empty().append(this.postBoxView.$el)
    // // TODO: post request
    this.postBoxView.render()
    $('#content').empty().append(this.postBoxView.$el)
  },

  editComment() {
    this.postBoxView = new PostBoxView()
    this.postBoxView.model.set({
      'comment': true,
      'edit': true
    })
    this.postBoxView.render()
    $('#content').empty().append(this.postBoxView.$el)
  },

  visitUsers() {
	$("#users-tab").addClass("active");

    $('#content').empty()
    this.searchUsersView = new SearchUsersView()
    this.wackyUsersView = new WackyUsersView()

    // search users button
    this.searchUsersView.render()
    $('#content').append(this.searchUsersView.$el)

    // wacky users button
    this.wackyUsersView.render()
    $('.search-users-button').after(this.wackyUsersView.$el)

    // add users
    this.usersCollectionView.collection.reset()
    // TODO: users query, ranked by post count
    $.get('/api/accounts', (data) => {
      if (!data.success) {
        alert(data.message)
      } else {
        this.usersCollectionView.collection.add(data.data)
      }
    })
    this.usersCollectionView.render()
    $('#content').append(this.usersCollectionView.$el)
    $('#row0').remove()
    $('.users').append('<tr id="row0"><td>User name</td><td>Post count</td></tr>')
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
				window.location = "/";
				return;
			}
			this.messageCollectionView.collection.add(data.data);
			this.messageCollectionView.render();
			var newMessageButton = $("<a></a>").addClass("btn").addClass("btn-primary").attr("href", "/#/messages/"+localStorage.getItem("username")+"/compose");
			newMessageButton.append("Send New Message");
			var messageTable = $("<table></table>").addClass("table");
			messageTable.append(this.messageCollectionView.$el);
			$("#content").empty().append(newMessageButton).append(messageTable);
		}
	});
  },

  visitCompose(username, to_account) {
	  var composeView = new ComposeView().render();
	  $("#content").empty().append(composeView.$el);
	  if (to_account) {
		$("#to_account").attr("value", to_account);
	  }
  },

  searchPosts() {
    $("#search-threads-tab").addClass("active");

    // search threads button
    this.searchPostsView.render()
    $('#content').empty().append(this.searchPostsView.$el)
  },

  loadBanner() {
	  var bannerView = new BannerView().render();
	  $("#banner").empty().append(bannerView.$el);
  },

  loadSideBar() {
	$("#side-bar").empty().append(this.getUserPanel());
	var featuredView = new FeaturedView().render();
	$("#side-bar").append(featuredView.$el);
	if (localStorage.getItem("token")) {
		$("#feat-userboards-tab").show();
		$("#feat-userboards").show();
		this.getFeaturedBoards("#feat-userboards", "/api/accounts/"+localStorage.getItem("username")+"/boards");
	}
	else {
		$("#feat-top").show();
	}
	this.getFeaturedBoards("#feat-top", "/api/special/subboards/top");
	this.getFeaturedBoards("#feat-bottom", "/api/special/subboards/bottom");
  },

  getUserPanel() {
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
				$.get({
					url: '/api/accounts/'+localStorage.getItem("username"),
					success: (data) => {
						data.data[0].date_created = data.data[0].date_created.substring(0, 10);
						content.model.set(data.data[0]);
						content.render();
					}
				});
			}
		});
	}
	else {
		content = new LoginForm().render();
	}
	return content.$el;
  },

  getFeaturedBoards(divID, apiURL) {
	$.get({
		url: apiURL,
		success: (data) => {
			if (!data.success) {
				return;
			}
			var item;
			data.data.forEach((obj) => {
				item = $("<a></a>").attr("href", "/#/boards/"+obj.name);
				item.append(obj.name + "@" + obj.postCount);
				$(divID + " ul").append($("<li></li>").attr("style", "cursor:pointer").append(item));
			});
		},
		error: (e) => {
			var item;
			item = $("<a></a>").attr("href", "/#/boards/"+divID+"1");
			item.append(divID+"1" + "@" + 5);
			$(divID + " ul").append($("<li></li>").attr("style", "cursor:pointer").append(item));
			item = $("<a></a>").attr("href", "/#/boards/"+divID+"2");
			item.append(divID+"2" + "@" + 4);
			$(divID + " ul").append($("<li></li>").attr("style", "cursor:pointer").append(item));
			item = $("<a></a>").attr("href", "/#/boards/"+divID+"3");
			item.append(divID+"3" + "@" + 3);
			$(divID + " ul").append($("<li></li>").attr("style", "cursor:pointer").append(item));
		}
	});
	return "";
  }
})

