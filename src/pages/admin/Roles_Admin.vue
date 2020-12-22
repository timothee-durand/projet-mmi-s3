<template>
  <div>
  <Sidebar-admin></sidebar-admin>
  <div class="containerRight p-4">
    <search-bar :modes="roles" :types-materiel="lieux" lib-mode="Rôle" lib-type="Lieux"></search-bar>
    <row-result nom="Martin Baumner" disable-dispo disable-ref img="../assets/img/person.png" :buttons="buttons" id="0"
                class="mt-2"></row-result>
    <b-form @submit.prevent="addRole">
      <b-input placeholder="Recherche Utilisateur" v-model="searchUser"></b-input>
      <b-select v-model="userToAdd" required>
        <b-select-option v-for="(user,index) in userList" :key="index" :value="user">{{ user.prenom }} {{ user.nom }}
        </b-select-option>
      </b-select>
      <b-select v-model="userToAddRole">
        <b-select-option value="admin">Administrateur</b-select-option>
        <b-select-option value="gest">Gestionnaire</b-select-option>
      </b-select>
      <b-input placeholder="id_univ" v-model="idUnivToAdd"></b-input>
      <b-input placeholder="mot de passe" v-model="password" type="password"></b-input>
      <b-button type="submit">Ajouter</b-button>
    </b-form>
  </div>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
import ajaxService from '@/services/ajaxService.js'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
  name: 'Roles_Admin',
  components: {
    SearchBar,
    RowResult,
    SidebarAdmin
  },
  data () {
    return {
      roles: [{text: 'Administrateur', value: 'ADM'}, {text: 'Gestionnaire', value: 'GEST'}],
      lieux: [{text: 'MMI', value: 'mmi'}, {text: 'BU', value: 'bu'},],
      buttons: [
        {
          icon: 'pencil-fill',
          variant: 'success',
          eventName: 'editRole' 
        },
        {
          icon: 'x',
          variant: 'success',
          eventName: 'deleteRole'
        }
      ],
      users: [],
      userToAdd: null,
      userToAddRole: '',
      searchUser: '',
      idUnivToAdd:'',
      password:'',
    }
  },
  computed: {
    userList () {
      return this.users.filter(function (user) {
        if (this.searchUser !== '') {
          return (user.nom.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1
              || user.prenom.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1);


        } else {
          return true
        }
      }.bind(this))
    }
  },
  methods: {
    getUsers () {
      ajaxService.getApi('allLDAP').then(result => this.users = result)
    },

    addRole () {
        let params = new FormData();
        params.append("id_univ", this.idUnivToAdd);
        params.append("admin", this.isAdmin());
        params.append("password", this.password);

        ajaxService.postAPI("gestionnaires", params).then(response => console.log(response));


    },
    isAdmin(){
      if(this.userToAddRole === "admin") {
        return 1;
      } else {
        return 0;
      }
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped>

</style>
