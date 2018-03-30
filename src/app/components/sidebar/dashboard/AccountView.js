import Marionette from 'backbone.marionette'
import $ from "jquery";
import localStorage from "localStorage"

import template from './AccountView.hbs'
import AccountModel from "./AccountModel"

export default Marionette.View.extend({
	template,
	model: new AccountModel(),
	events: {
		"click #inbox-button": "checkMail",
		"click #logout-button": "logout",
		"click #settings-button": "toggleSettings",
		"click #submit": "submit"
	},
	
	checkMail(evt) {
		$("li").removeClass("active");
	},
	
	logout(evt) {
		evt.preventDefault();
		localStorage.removeItem("token");
		location.reload();
	},
	
	toggleSettings(evt) {
		if ($("#settings").is(":hidden")) {
			$("#settings").show();
		}
		else {
			$("#settings").hide();
			$(".alert").hide();
			$("#username").val("");
			$("#new-password").val("");
			$("#old-password").val("");
		}
	},
	
	submit(evt) {
		$(".alert").hide();
		evt.preventDefault();
		var newUsername = $("#username").val();
		if (!newUsername) {
			newUsername = this.model.get("username");
		}
		var oldPassword = $("#old-password").val();
		if (!oldPassword) {
			$(".alert").show();
			$(".alert").empty().append("You must enter your current password!");
			return;
		}
		var newPassword = $("#new-password").val();
		if (!newPassword) {
			newPassword = oldPassword;
		}
		
		$.ajax({method: "PUT",
			url: "api/accounts/"+this.model.get("username"),
			headers: {
				token: localStorage.getItem("token"),
			},
			data: {
				oldPassword: oldPassword,
				username: newUsername,
				password: newPassword
			},
			success: (data) => {
				if (!data.success) {
					$(".alert").empty().append(data.message);
					$(".alert").show();
					return;
				}
				$.post({
					url: "api/authenticate/login",
					data: {
						username: newUsername,
						password: newPassword
					},
					success: (data) => {
						if (!data.success) {
							$(".alert").empty().append("Something awful happened. Please reload the page.");
							$(".alert").show();
						}
						localStorage.setItem("token", data.data[0].token);
						localStorage.setItem("username", newUsername);
						location.reload();
					}
				});
			}
		});
	}
})
