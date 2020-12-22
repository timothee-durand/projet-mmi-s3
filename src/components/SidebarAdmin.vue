<template>
  <sidebar-client sidebarWidth="var(--sidebar-width-admin)">
    <b-nav vertical class="w-100" pills  >
        <b-nav-item><router-link to="/admin/" class="title-page" :active-class="'page-selected'">Réservations</router-link></b-nav-item>
        <b-nav-item><router-link to="/materiel/" class="title-page" :active-class="'page-selected'">Matériel</router-link></b-nav-item>
        <b-nav-item><router-link to="/creneaux/" class="title-page" :active-class="'page-selected'">Créneaux</router-link></b-nav-item>
        <b-nav-item><router-link to="/mails/" class="title-page" :active-class="'page-selected'">Mails</router-link></b-nav-item>
        <b-nav-item><router-link to="/blacklist/" class="title-page" :active-class="'page-selected'">Blacklist</router-link></b-nav-item>
        <b-nav-item><router-link to="/roles/" class="title-page" :active-class="'page-selected'">Rôles</router-link></b-nav-item>
    </b-nav>

    <ul class="m-0 p-0"  style="margin-top: 20rem !important;">
      <li>
        <router-link to="/contact-admin" class="text-decoration-none text-white">Contact Admin</router-link>
      </li>
      <li>
        <router-link to="/mentions-legales" class="text-decoration-none text-white">Mentions légales</router-link>
      </li>
      <li>
        <router-link to="/conditions-utilisation" class="text-decoration-none text-white">Conditions d'utilisation</router-link>
      </li>
    </ul>
  </sidebar-client>
</template>

<script>
import SidebarClient from '@/components/SidebarClient.vue'
export default {
  name: 'SidebarAdmin',
  components: {SidebarClient},
  computed: {
    route () {
      return this.$route.path;
    }
  },
}
</script>

<style scoped>

.page-selected {
  background:  rgba(250, 250, 250, 0.4);
}

.title-page {
  color:white;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: block;
}

.title-page:hover {
  background:  rgba(250, 250, 250, 0.2);
  text-decoration: none;
}

</style>
