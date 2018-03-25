import Marionette from 'backbone.marionette'

import template from './LoginForm.hbs'

export default Marionette.View.extend({
	template,
	events: {
		"click #login-button": "login",
		"click #register-button": "register"
	},
	login: function(evt) {
		evt.preventDefault();
		alert("login");
	},
	register(evt) {
		evt.preventDefault();
		alert("registeR");
	}
})
