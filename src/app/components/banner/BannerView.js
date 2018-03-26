import Marionette from 'backbone.marionette'
import $ from "jquery";

import template from './BannerView.hbs'

export default Marionette.View.extend({
	template,
	events: {
		"click #boards-tab": "boardsClick",
		"click #users-tab": "usersClick"
	},
	
	boardsClick(evt) {
		$("li").removeClass("active");
		$("#boards-tab").addClass("active");
	},
	
	usersClick(evt) {
		$("li").removeClass("active");
		$("#users-tab").addClass("active");
	}
});