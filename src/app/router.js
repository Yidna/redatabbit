import $ from 'jquery'
import Backbone from 'backbone'
import localStorage from "localStorage"

import LoginForm from "app/components/sidebar/LoginForm"
import AccountView from "app/components/sidebar/AccountView"

import HomePage from 'app/components/home-page/HomePage'
import SubboardCollectionView from './components/subboard/SubboardCollectionView'
import ThreadCollectionView from './components/thread/ThreadCollectionView'


export default Backbone.Router.extend({
  routes: {
    '': 'home',
    ':subboard': 'visitBoard',
    ':subboard/:thread': 'visitThread'
  },
  
	initialize() {
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

