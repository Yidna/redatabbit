import Marionette from 'backbone.marionette'
import $ from "jquery"
import localStorage from "localStorage";

import FeaturedModel from './FeaturedModel'
import template from './FeaturedTemplate.hbs'

export default Marionette.View.extend({
	template,
	model: new FeaturedModel(), // is this necessary?
	tagName: "tr"
})
