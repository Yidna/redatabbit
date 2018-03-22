import $ from 'jquery';
import Backbone from 'backbone';

import HomeView from './views/home';


export default Backbone.Router.extend({

  routes: {
    '': 'home'
  },

  initialize() {
    //$('body').append('<div id="js-app"></div>');
  },

  home() {
    var homeView = new HomeView().render();

    $('#content').empty().append(homeView.$el);
  }

});
