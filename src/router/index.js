import Vue from 'vue'
import Router from 'vue-router'

import Accueil from '@/pages/client/Accueil'
import Search from '@/pages/client/Search'
import Reservation from '@/pages/client/Reservation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    }
  ]
})
