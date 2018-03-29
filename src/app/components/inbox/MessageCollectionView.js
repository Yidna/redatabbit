import Marionette from 'backbone.marionette'
import MessageView from './MessageView'
import MessageCollection from './MessageCollection'

export default Marionette.CollectionView.extend({
	childView: MessageView,
	collection: new MessageCollection(),
	tagName: 'tbody',
	id: 'messages',
})
