import Marionette from 'backbone.marionette'
import SubboardView from './SubboardView'
import SubboardCollection from './SubboardCollection'

export default Marionette.CollectionView.extend({
  childView: SubboardView,
  collection: new SubboardCollection(),
  tagName: 'table',
  className: 'board'
})
