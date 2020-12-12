<template>
  <sidebar-client>
    <b-nav vertical class="w-100">
        <b-nav-item><router-link to="/admin/">Réservations</router-link></b-nav-item>
        <b-nav-item><router-link to="/materiel/">Matériel</router-link></b-nav-item>
        <b-nav-item><router-link to="/creneaux/">Créneaux</router-link></b-nav-item>
        <b-nav-item><router-link to="/mails/">Mails</router-link></b-nav-item>
        <b-nav-item><router-link to="/blacklist/">Blacklist</router-link></b-nav-item>
        <b-nav-item><router-link to="/roles/">Rôles</router-link></b-nav-item>
    </b-nav>
  </sidebar-client>
</template>

<script>
import SidebarClient from '@/components/SidebarClient.vue'
export default {
  name: 'SidebarAdmin',
  components: {SidebarClient}
}
</script>

<style scoped>

</style>
