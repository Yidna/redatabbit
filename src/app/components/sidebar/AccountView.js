import Marionette from 'backbone.marionette'
import $ from "jquery";
import localStorage from "localStorage"

import template from './AccountView.hbs'
import AccountModel from "./AccountModel"

export default Marionette.View.extend({
	template,
	model: new AccountModel()
})
