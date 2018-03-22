import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';

import template from './home.hbs';

export default Marionette.ItemView.extend({

  template: template,

  serializeData() {
    return {
      name: 'world'
    };
  }

});
