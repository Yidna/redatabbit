import Marionette from 'backbone.marionette'
import $ from "jquery";

import template from './BannerView.hbs'

export default Marionette.View.extend({
	template,
	events: {
		"click #tabs li": "tabClick"
	},
	
	tabClick(evt) {
		var tabID = "#" + $(evt.currentTarget).attr("id");
		$("#tabs li").removeClass("active");
		$(tabID).addClass("active");
	}
});