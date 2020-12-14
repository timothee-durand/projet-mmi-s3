<template>
  <div id="app">
    <header class="bg-dark text-light w-100 sticky-top d-inline-flex align-items-center justify-content-between p-3 appHeader">
      <img alt="Logo Pictum" class="logo w-auto h-100" src="./assets/img/fond_sombre_st_logo.svg">

      <b-dropdown text="AM" toggle-class="rounded-pill button-drop-pill" no-caret right block variant="primary">
        <b-dropdown-item><router-link to="/">Voir vue étudiant</router-link></b-dropdown-item>
        <b-dropdown-item class="text-danger" @click="console.log('disconnect')">Se déconnecter</b-dropdown-item>
      </b-dropdown>

    </header>
    <sidebar-admin ></sidebar-admin>
    <router-view/>
  </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
export default {
  name: 'App',
  components:{
    SidebarAdmin
  },
  data () {
    return {

    }
  },
}
</script>

<style lang="scss">

  :root
  {
    --header-height: 70px;
    --navbar-height: 40px;
    --sidebar-width: 20%;
  }
  .spacer
  {
    margin-top: var(--navbar-height);
  }
  .appHeader {
    height: var(--header-height);
  }
  #accountButton {
    width: 45px;
    height: 45px;
  }

  .containerRight {
    width: calc(100% - var(--sidebar-width));
    margin-left: var(--sidebar-width);
  }

  .button-drop-pill{
    width: 45px;
    height: 45px;
  }
</style>
