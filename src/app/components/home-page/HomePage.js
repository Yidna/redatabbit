import $ from 'jquery'
import Marionette from 'backbone.marionette'

import template from './HomePage.hbs'
import NetflixCollectionView from './NetflixCollectionView'

export default Marionette.View.extend({
  template,

  initialize() {
  },

  onRender() {
    const netflixCollectionView = new NetflixCollectionView()

    $.get('/api', (data) => {
      netflixCollectionView.collection.add(data)
    })

    netflixCollectionView.render()
    $('body').append(netflixCollectionView.$el)
  }
})
