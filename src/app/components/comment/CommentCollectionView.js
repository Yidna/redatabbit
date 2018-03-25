import Marionette from 'backbone.marionette'
import CommentView from './CommentView'
import CommentCollection from './CommentCollection'

export default Marionette.CollectionView.extend({
  childView: CommentView,
  collection: new CommentCollection(),
  tagName: 'table',
  className: 'thread'
})
