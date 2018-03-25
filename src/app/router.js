import $ from 'jquery'
import Backbone from 'backbone'
import localStorage from "localStorage"

import LoginForm from "app/components/sidebar/LoginForm"
import AccountView from "app/components/sidebar/AccountView"

import HomePage from 'app/components/home-page/HomePage'
import SubboardCollectionView from './components/subboard/SubboardCollectionView'
import ThreadCollectionView from './components/thread/ThreadCollectionView'
import CommentCollectionView from "./components/comment/CommentCollectionView";

export default Backbone.Router.extend({
  routes: {
    '': 'home',
    boards: 'visitBoards',
    'boards/:subboard': 'visitBoard',
    'boards/:subboard/:thread': 'visitThread'
  },
  
	initialize() {
		this.subboardCollectionView = new SubboardCollectionView()
		this.threadCollectionView = new ThreadCollectionView()
		this.commentCollectionView = new CommentCollectionView()
		
		const homePage = new HomePage().render()
		$('#content').empty().append(homePage.$el)

		const loginForm = new LoginForm().render()
		$('#login-box').empty().append(loginForm.$el)
		
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

