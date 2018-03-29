import Marionette from 'backbone.marionette'
import $ from "jquery"
import localStorage from "localStorage";

import FeaturedModel from './FeaturedModel'
import template from './FeaturedTemplate.hbs'

export default Marionette.View.extend({
	template,
	events: {
		"click #featured-tabs a": "tabClicked"
	},
	
	tabClicked(evt) {
		var splitID = $(evt.currentTarget).attr("id").split("-");
		var id = splitID[0] + "-" + splitID[1];
		$("#featured div").hide();
		$("#featured div#"+id).show();
	}
})
