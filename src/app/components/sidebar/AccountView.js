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
		"click #settings-button": "toggleSettings"
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
		}
	}
})
