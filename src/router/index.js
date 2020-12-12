import Vue from 'vue'
import Router from 'vue-router'

import Accueil from '@/pages/client/Accueil'
import Search from '@/pages/client/Search'
import Reservation from '@/pages/client/Reservation'
import Accueil_Admin from '@/pages/admin/Accueil_Admin.vue'
import Materiel_Admin from '@/pages/admin/Materiel_Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //client
    {path: '/', name: 'Accueil', component: Accueil},
    {path: '/search', name: 'Search', component: Search},
    {path: '/reservation', name: 'Reservation', component: Reservation},


    //admin
    {path: '/admin/', name: 'Accueil', component: Accueil_Admin},
    {path: '/materiel/', name: 'MaterielAdmin', component: Materiel_Admin},
  ]
})
