import Marionette from 'backbone.marionette'
import $ from "jquery";
const localStorage = require("localStorage");

import template from './LoginForm.hbs'

export default Marionette.View.extend({
	template,
	events: {
		"click #login-button": "login",
		"click #register-button": "register"
	},
	login(evt) {
		$(".alert").attr("style", "visibility:hidden");
		evt.preventDefault();
		$.post("/api/authenticate", {
			"username": $("#username").val(),
			"password": $("#password").val()
		},
		(data) => {
			if (!data.success) {
				$(".alert").empty().append(data.message);
				$(".alert").attr("style", "visibility:visible");
				return;
			}
			localStorage.setItem("token", data.data[0].token);
			location.reload();
		});
	},
	register(evt) {
		evt.preventDefault();
	}
})
