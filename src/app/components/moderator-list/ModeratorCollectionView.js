import Marionette from 'backbone.marionette'
import ModeratorView from './ModeratorView'
import ModeratorCollection from './ModeratorCollection'

export default Marionette.CollectionView.extend({
  childView: ModeratorView,
  collection: new ModeratorCollection()
})
