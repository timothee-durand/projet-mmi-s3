<template>
  <div id="app">
    <header
        class="bg-dark text-light w-100 sticky-top d-inline-flex align-items-center justify-content-between p-3 appHeader">
      <img alt="Logo Pictum" class="logo w-auto h-100" src="./assets/img/fond_sombre_st_logo.svg">

      <div class="d-flex flex-row align-items-center" v-if="isAuth">
        <router-link to="/" class="mr-3 text-white">Accueil</router-link>
        <router-link :to="{ name: 'Reservation', params : { state:'selection'}}" class="mr-3 text-white"><div class="d-flex flex-row align-items-start">Réservation <div v-if="reservationExist" class="d-flex"><div class="blob" ></div></div></div></router-link>
        <b-dropdown :text="initials" toggle-class="rounded-pill button-drop-pill" no-caret right block variant="primary" >
          <div v-if="isGest">
            <b-dropdown-item >
              <router-link :to="toDropdown">{{textLinkDropdown}}</router-link>
            </b-dropdown-item>
          </div>
          <b-dropdown-item >
            <router-link to="/password">Mot de passe</router-link>
          </b-dropdown-item>
          <b-dropdown-item class="text-danger" @click="disconnect">Se déconnecter</b-dropdown-item>
        </b-dropdown>
      </div>
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
      }
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
      if(appService.isGestRoute(this.$route.name)){
        return "Voir vue Etudiant"
      } else {
        return "Voir vue Gestionnaire"
      }
    },
    toDropdown(){
      if(appService.isGestRoute(this.$route.name)){
        return "/"
      } else {
        return "/admin"
      }
    },
    initials(){
      let user = this.$store.getters.getUser;
      return user.prenom.charAt(0) + user.nom.charAt(0) ;
    },
      reservationExist()
      {
          return this.$store.getters.getCurrentMaterielsId.length !== 0;
      },
  },
  created () {
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to) {
        if((to.name !== "Login" || to.name !== "AdminContact"  )&& !this.$store.getters.isAuthenticated) {
          //si on ne va pas se connecter et que on est pas authentifié
          this.$router.push("/login");
        }

        if(to.name === "Login" && this.$store.getters.isAuthenticated) {
          //si on est connecté et que on veut aller sur la page de connexion
          if(this.$store.getters.isGest) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }

        }
        //si pas gestionnaire et va dans admin
        if(!this.$store.getters.isGest && appService.isGestRoute(to.name) && this.$store.getters.isAuthenticated){
          this.$router.push("/")
          // eslint-disable-next-line no-unused-vars
          this.$bvModal.msgBoxOk("Vous n'avez pas le droit d'accéder à cette page. Si vous en avez besoin, contactez l'administrateur !");
        }

        if(!this.$store.getters.isAdmin && appService.isAdminRoute(to.name) && this.$store.getters.isAuthenticated){
          //si pas admin
          this.$router.push("/admin")
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

    @import "./styles/custom-bootstrap.scss";

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
  .c-card
  {
    border-radius: 10px; background-color: #ffffff; overflow: hidden;
  }

  #__BVID__8__BV_toggle_
  {
    padding: 0;
    width: 45px;
    height: 45px;
    text-align: center;
  }

.dot {
    height: 8px;
    width: 8px;
    background-color: $primary;
    border-radius: 50%;
    display: inline-block;
}

.blob {
    background: $primary;
    border-radius: 50%;
    box-shadow: 0 0 0 0 $primary;
    margin: 3px;
    height: 10px;
    width: 10px;
    transform: scale(1);
    animation: pulse-black 2s infinite;
}
@keyframes pulse-black {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba($primary, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba($primary, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba($primary, 0);
    }
}

</style>
