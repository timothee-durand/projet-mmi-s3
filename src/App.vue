<template>
  <div id="app">
    <header
        class="bg-dark text-light w-100 sticky-top d-inline-flex align-items-center justify-content-between p-3 appHeader">
      <img alt="Logo Pictum" class="logo w-auto h-100" src="./assets/img/fond_sombre_st_logo.svg">

      <b-dropdown text="AM" toggle-class="rounded-pill button-drop-pill" no-caret right block variant="primary" v-if="isAuth">
        <div v-if="isGest">
          <b-dropdown-item >
            <router-link :to="toDropdown">{{textLinkDropdown}}</router-link>
          </b-dropdown-item>
        </div>

        <b-dropdown-item class="text-danger" @click="disconnect">Se déconnecter</b-dropdown-item>
      </b-dropdown>
    </header>
    <router-view/>
  </div>
</template>

<script>

import appService from '@/services/appService.js'


export default {
  name: 'App',

  data () {
    return {
      userToLogin: {
        username: '',
        passord: ''
      },
    }
  },
  computed: {
    isGest(){
      return this.$store.getters.isGest;
    },
    isAuth(){
      return this.$store.getters.isAuthenticated;
    },
    textLinkDropdown(){
      if(appService.isAdminRoute(this.$route.name)){
        return "Voir vue Etudiant"
      } else {
        return "Voir vue Gestionnaire"
      }
    },
    toDropdown(){
      if(appService.isAdminRoute(this.$route.name)){
        return "/"
      } else {
        return "/admin"
      }
    }
  },
  created () {
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to) {
        if(to.name !== "Login" && !this.$store.getters.isAuthenticated) {
          //si on ne va pas se connecter et que on est pas authentifié
          this.$router.push("/login");
        }

        if(to.name === "Login" && this.$store.getters.isAuthenticated) {
          //si on est connecté et que on veut aller sur la page de connexion
          this.$router.push("/");
        }

        if(!this.$store.getters.isGest && appService.isAdminRoute(to.name) && this.$store.getters.isAuthenticated){
          this.$router.push("/")
          // eslint-disable-next-line no-unused-vars
          this.$bvModal.msgBoxOk("Vous n'avez pas le droit d'accéder à cette page. Si vous en avez besoin, contactez l'administrateur !");
        }

      }
    }
  },
  methods: {
    disconnect(){
      this.$store.commit("resetUser");
      this.$bvModal.msgBoxOk("Vous avez bien été déconnectés")
      this.$router.push("/login");
    }

  },


}
</script>

<style lang="scss">

:root {
  --header-height: 70px;
  --navbar-height: 40px;
  --sidebar-width: 20%;
  --sidebar-width-admin: 15%;
}

.spacer {
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

.button-drop-pill {
  width: 45px;
  height: 45px;
}

.c-card {
  border-radius: 10px;
  background-color: #ffffff;
  overflow: hidden;
}
</style>
