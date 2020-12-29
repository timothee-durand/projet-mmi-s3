import Vue from 'vue'
import Router from 'vue-router'

import Accueil from '@/pages/client/Accueil'
import Search from '@/pages/client/Search'
import Reservation from '@/pages/client/Reservation'
import Accueil_Admin from '@/pages/admin/Accueil_Admin.vue'
import Materiel_Admin from '@/pages/admin/Materiel_Admin.vue'
import Creneaux_Admin from '@/pages/admin/Creneaux_Admin.vue'
import Mail_Admin from '@/pages/admin/Mail_Admin.vue'
import Blacklist_Admin from '@/pages/admin/Blacklist_Admin.vue'
import Roles_Admin from '@/pages/admin/Roles_Admin.vue'
import Admin_Contact from '@/pages/Admin_Contact.vue'
import Article from "../pages/client/Article";
import RDV_Admin from '@/pages/admin/RDV_Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //client
    {path: '/', name: 'Accueil', component: Accueil},
    {path: '/search', name: 'Search', component: Search},
    {path: '/reservation', name: 'Reservation', component: Reservation},
    {path: '/article', name: 'Article', component: Article},


    //admin
    {path: '/admin/', name: 'AccueilAdmin', component: Accueil_Admin},
    {path: '/materiel/', name: 'MaterielAdmin', component: Materiel_Admin},
    {path: '/creneaux/', name: 'CreneauxAdmin', component: Creneaux_Admin},
    {path: '/mails/', name: 'MailAdmin', component: Mail_Admin},
    {path: '/blacklist/', name: 'BlacklistAdmin', component: Blacklist_Admin},
    {path: '/roles/', name: 'RoleAdmin', component: Roles_Admin},
    {path: '/creneaux/rdvs/', name: 'RDVAdmin', component: RDV_Admin},


    //communes
    {path: '/contact-admin/', name: 'AdminContact', component: Admin_Contact},
  ]
})
