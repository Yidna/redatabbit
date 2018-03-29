import Marionette from 'backbone.marionette'
import $ from "jquery";
import localStorage from "localStorage"

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
		$.post("/api/authenticate/login", {
			"username": $("#username").val(),
			"password": $("#password").val()
		},
		(data) => {
			if (!data.success) {
				$(".alert").empty().append(data.message);
				$(".alert").attr("style", "visibility:visible");
				return;
			}
			localStorage.setItem("username", $("#username").val());
			localStorage.setItem("token", data.data[0].token);
			location.reload();
		});
	},
	register(evt) {
		$(".alert").attr("style", "visibility:hidden");
		evt.preventDefault();
		$.post({
			url: "/api/accounts",
			data: {
				"username": $("#username").val(),
				"password": $("#password").val(),
				"is_moderator": 0
			},
			success: (data) => {
				if (!data.success) {
					alert(data.message);
					$(".alert").empty().append(data.message);
					$(".alert").attr("style", "visibility:visible");
					return;
				}
				location.reload();
			}
		});
	}
})
