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
		
		var content;
		if (localStorage.getItem("token")) {
			$.get('/api/accounts/AndySiu', (data) => {
				content = new AccountView({ model: data.data[0] });
				alert(JSON.stringify(content.model));
				content.render();
				$("#side-bar").empty().append(content.$el);
			})
		}
		else {
			content = new LoginForm().render();
			$("#side-bar").empty().append(content.$el);
		}
	},

  visitBoards() {
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

