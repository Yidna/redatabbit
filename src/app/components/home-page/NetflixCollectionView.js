import Marionette from 'backbone.marionette'

import NetflixView from './NetflixView'
import NetflixCollection from './NetflixCollection'

export default Marionette.CollectionView.extend({
  childView: NetflixView,
  collection: new NetflixCollection(),
  tagName: 'ul'
})
