import Marionette from 'backbone.marionette'
import UserView from './UserView'
import UserCollection from './UserCollection'

export default Marionette.CollectionView.extend({
  childView: UserView,
  tagName: 'table',
  className: 'users',
  collection: new UserCollection()
})
