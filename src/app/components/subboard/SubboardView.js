import $ from 'jquery'
import Marionette from 'backbone.marionette'

import SubboardModel from './SubboardModel'
import template from './SubboardTemplate.hbs'
import SubboardCollectionView from "./SubboardCollectionView";

export default Marionette.View.extend({
  template,
  tagName: 'tr',
  className: 'subboard',
  model: new SubboardModel(), // is this necessary?
})
