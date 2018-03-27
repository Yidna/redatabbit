import Marionette from 'backbone.marionette'
import FeaturedView from './FeaturedView'
import FeaturedCollection from './FeaturedCollection'

export default Marionette.CollectionView.extend({
	childView: FeaturedView,
	collection: new FeaturedCollection(),
	tagName: 'ul',
	id: 'featured',
})
