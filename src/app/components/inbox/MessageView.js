import Marionette from 'backbone.marionette'
import $ from "jquery"
import localStorage from "localStorage";

import MessageModel from './MessageModel'
import template from './MessageTemplate.hbs'

export default Marionette.View.extend({
	template,
	model: new MessageModel(), // is this necessary?
	tagName: "tr",
	events: {
		"click table#messages, tbody, tr, a": "messageClicked"
	},
	
	messageClicked(evt) {
		var button = $(evt.currentTarget).attr("id");
		var action = button.split("-")[0];
		var id = button.split("-")[1];
		switch (action) {
			case "expand":
				this.toggleExpand(id);
			break;
			case "delete":
				this.deleteMessage(id);
			break;
		}
	},
	
	toggleExpand(id) {
		var target = "#" + "message-" + id;
		var button = "#" + "expand-" + id + " span";
		if ($(target).attr("style")) {
			$(target).removeAttr("style");
			$(button).removeClass("glyphicon-plus");
			$(button).addClass("glyphicon-minus");
		}
		else {
			$(target).attr("style", "visibility:hidden;height:0px");
			$(button).removeClass("glyphicon-minus");
			$(button).addClass("glyphicon-plus");
		}
	},
	
	deleteMessage(id) {
		var confirm = "#" + "confirm-delete-" + id;
		if (!$(confirm).is(":visible")) {
			$(confirm).show();
		}
		else {
			$.ajax({type:"DELETE",
				url: "/api/messages/"+this.model.get("to_account")+"/"+this.model.get("id"),
				headers: {
					token: localStorage.getItem("token")
				},
				success: (data) => {
					if (!data.success) {
						window.location = "/";
						return;
					}
					location.reload();
				}
			});
		}
	}
})
