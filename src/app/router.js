import $ from 'jquery'
import Backbone from 'backbone'

import HomePage from 'app/components/home-page/HomePage'
import SubboardCollectionView from './components/subboard/SubboardCollectionView'

export default Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home() {
    const homePage = new HomePage().render()
    $('#root').empty().append(homePage.$el)

    const subboardCollectionView = new SubboardCollectionView()
    $.get('/api', (data) => {
      subboardCollectionView.collection.add(data)
    })
    subboardCollectionView.render()
    $('.collection').append(subboardCollectionView.$el)
  }
})

