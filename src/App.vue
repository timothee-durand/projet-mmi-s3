<template>
  <div id="app">
    <header class="bg-dark text-light w-100 sticky-top d-inline-flex align-items-center justify-content-between p-3 appHeader">
      <img alt="Logo Pictum" class="logo w-auto h-100" src="./assets/img/fond_sombre_st_logo.svg">

      <b-dropdown text="AM" toggle-class="rounded-pill button-drop-pill" no-caret right block variant="primary">
        <b-dropdown-item><router-link to="/">Voir vue étudiant</router-link></b-dropdown-item>
        <b-dropdown-item class="text-danger" @click="console.log('disconnect')">Se déconnecter</b-dropdown-item>
      </b-dropdown>

      <b-button @click="login">Login</b-button>
    </header>

    <router-view/>
  </div>
</template>

<script>

import ajaxService from '@/services/ajaxService.js'
import appService from '@/services/appService.js'

export default {
  name: 'App',

  data () {
    return {
      isConnected:false,
    }
  },
  created () {
    this.login();
  },

  methods: {
    login () {
      //vérifie si on est identitifé par le CAS
      //ajaxService.getApi("isAuthenticatedCAS").then(data => console.log(data)).catch(error => console.log(error));
     // window.location = param.login;
      //ajaxService.test();
      let params = new FormData();
      params.append("username", "tdurand5");
      params.append("password", "tdurand5");
      ajaxService.postAPI("login", params).then(result => {
        //stocke le token dans le localStorage
        appService.setLocal(result.token)

        //stocke l'utilisateur dans le store
        this.$store.commit("setuser", result.user);
        this.$store.commit("setusertype", result.user_type);
      });
    },
    verifyLDAP(){
      let params = new FormData();
      params.append("id_univ", "tdurand5");
      ajaxService.postAPI("getLDAP", params).then(result => console.log(result)).catch(error => console.log(error));
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
    --sidebar-width-admin: 15%;
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

  .containerRightAdmin {
    width: calc(100% - var(--sidebar-width-admin));
    margin-left: var(--sidebar-width-admin);
  }

  .button-drop-pill{
    width: 45px;
    height: 45px;
  }

  .c-card
  {
    border-radius: 10px; background-color: #ffffff; overflow: hidden;
  }
</style>
