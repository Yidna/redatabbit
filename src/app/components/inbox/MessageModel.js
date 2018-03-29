import Backbone from 'backbone'

export default Backbone.Model.extend({
	defaults: {
		id: -1,
		from_account: "N/A",
		to_account: "N/A",
		date_created: "N/A",
		content: "N/A"
	}
})
