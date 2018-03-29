import Marionette from 'backbone.marionette'
import $ from "jquery";
import localStorage from "localStorage";

import template from './ComposeView.hbs'

export default Marionette.View.extend({
	template,
	events: {
		"click #send-button": "sendMessage"
	},
	
	sendMessage(evt) {
		$(".alert").hide();
		evt.preventDefault();
		$.post({
			url: "api/messages/"+localStorage.getItem("username"),
			headers: {
				token: localStorage.getItem("token")
			},
			data: {
				to_account: $("#to_account").val(),
				content: $("#composition").val()
			},
			success: (data) => {
				if (!data.success) {
					alert("failed");
					$(".alert").empty().append("Failed to send message!").show();
					return;
				}
				window.location = "/#/messages/"+localStorage.getItem("username");
			}
		});
	}
});