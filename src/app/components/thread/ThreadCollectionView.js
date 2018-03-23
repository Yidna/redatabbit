import Marionette from 'backbone.marionette'
import ThreadView from './ThreadView'
import ThreadCollection from './ThreadCollection'

export default Marionette.CollectionView.extend({
  childView: ThreadView,
  collection: new ThreadCollection(),
  tagName: 'table',
  className: 'board'
})
