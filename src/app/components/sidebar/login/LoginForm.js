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
		$(".alert").removeClass("alert-success").addClass("alert-danger");
		$(".alert").hide();
		evt.preventDefault();
		$.post("/api/authenticate/login", {
			"username": $("#username").val(),
			"password": $("#password").val()
		},
		(data) => {
			if (!data.success) {
				$(".alert").empty().append(data.message);
				$(".alert").show();
				return;
			}
			localStorage.setItem("username", $("#username").val());
			localStorage.setItem("token", data.data[0].token);
			location.reload();
		});
	},
	register(evt) {
		$(".alert").removeClass("alert-success").addClass("alert-danger");
		$(".alert").hide();
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
					$(".alert").empty().append(data.message);
					$(".alert").show();
					return;
				}
				$(".alert").removeClass("alert-danger").addClass("alert-success");
				$(".alert").empty().append("Account successfully created!");
				$(".alert").show();
			}
		});
	}
})
