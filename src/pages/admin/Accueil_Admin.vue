<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="containerRightAdmin p-4">
      <h1>Réservation</h1>
      <reservation-vue></reservation-vue>
    </div>
  </div>
</template>

<script>
  import SidebarAdmin from '@/components/SidebarAdmin.vue'
  import ReservationVue from '@/components/admin/ReservationVue.vue'




export default {
name: "Accueil_Admin.vue",

  components:{
    ReservationVue,
    SidebarAdmin
  }

}
</script>

<style scoped>

</style>
