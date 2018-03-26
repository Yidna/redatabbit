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
		$("#tabs li").removeClass("active");
		$("#boards-tab").addClass("active");
	},
	
	usersClick(evt) {
		$("#tabs li").removeClass("active");
		$("#users-tab").addClass("active");
	}
});