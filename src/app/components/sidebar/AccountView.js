import Marionette from 'backbone.marionette'
import $ from "jquery";
import localStorage from "localStorage"

import template from './AccountView.hbs'
import AccountModel from "./AccountModel"

export default Marionette.View.extend({
	template,
	model: new AccountModel(),
	events: {
		"click #logout-button": "logout",
		"click #settings-button": "toggleSettings",
		"click #submit": "submit"
	},
	
	logout(evt) {
		evt.preventDefault();
		localStorage.removeItem("token");
		location.reload();
	},
	
	toggleSettings(evt) {
		if ($("#settings").attr("style") == "visibility:hidden;height:0px") {
			$("#settings").attr("style", "visibility:visible");
		}
		else {
			$("#settings").attr("style", "visibility:hidden;height:0px");
			$(".alert").attr("style", "visibility:hidden;height:0px");
			$("#username").val("");
			$("#new-password").val("");
			$("#old-password").val("");
		}
	},
	
	submit(evt) {
		$(".alert").attr("style", "visibility:hidden");
		evt.preventDefault();
		$.post({
			url: "api/authenticate/verify",
			headers: {
				token: localStorage.getItem("token")
			},
			data: {
				password: $("#old-password").val()
			},
			success: (data) => {
				if (!data.success) {
					$(".alert").empty().append(data.message);
					$(".alert").attr("style", "visibility:visible");
					return;
				}
				$(".alert").empty().append("API call not yet implemented");
				$(".alert").attr("style", "visibility:visible");
			}
		});
	}
})
