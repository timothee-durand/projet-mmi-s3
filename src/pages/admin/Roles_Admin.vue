<template>
  <div>
  <Sidebar-admin ></sidebar-admin>
  <div class="containerRight p-4">
    <search-bar :modes="roles" lib-mode="Rôle" :types-materiel="[]" lib-type="Lieux"
                @addMat="$bvModal.show('add-blacklist-modal')"
                @search-input="changeSearch"
                @changeType="changeModeSearch"
    ></search-bar>

    <row-result v-for="gest in listeSearch" :key="gest.id" :nom="gest.nom + ' '+ gest.prenom "  disable-dispo :reference="getDepNom(gest)" img="../assets/img/person.png" :buttons="getButtons(gest)" :id="gest.id"
                class="mt-2"></row-result>

    <modal-pictum   hide-footer id-modal="add-blacklist-modal" title="Ajout Blacklist">
      <b-form @submit.prevent="addRole">
        <p>Recherche dans liste IUT-BM : </p>
        <b-input placeholder="Recherche Utilisateur" v-model="searchUser"></b-input>
        <p>Liste IUT-BM (sélectionnez la personne que vous voulez ajouter)</p>
        <b-select v-model="userToAdd" required>
          <b-select-option v-for="(user,index) in userList" :key="index" :value="user">{{ user.prenom }} {{ user.nom }}
          </b-select-option>
        </b-select>
        <p>Choississez le rôle que vous voulez lui attribuer :</p>
        <b-select v-model="userToAddRole" required>
          <b-select-option value="admin">Administrateur</b-select-option>
          <b-select-option value="gest">Gestionnaire</b-select-option>
        </b-select>
        <p>Entrez son identifiant universitaire :</p>
        <b-input placeholder="id_univ" v-model="idUnivToAdd" required></b-input>
        <p>Un mot de passe va lui être envoyé par mail.</p>
<!--        <p>Entrez le mot de passe qu'elle désire :</p>-->
<!--        <b-input placeholder="mot de passe" v-model="password" type="password" required></b-input>-->
        <b-button type="submit">Ajouter</b-button>
        <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>
      </b-form>
    </modal-pictum>

  </div>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
import ajaxService from '@/services/ajaxService.js'
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import ModalPictum from '@/components/ModalPictum.vue'
import param from '@/param/param.js'

export default {
  name: 'Roles_Admin',
  components: {
    ModalPictum,
    SearchBar,
    RowResult,
    SidebarAdmin
  },
  data () {
    return {
      roles: [{text: 'Administrateur', value: 'ADM'}, {text: 'Gestionnaire', value: 'GEST'},{text: 'Tous', value: 'ALL'} ],
      lieux: [{text: 'MMI', value: 'mmi'}, {text: 'BU', value: 'bu'},],
      users: [],
      userToAdd: null,
      userToAddRole: '',
      searchUser: '',
      idUnivToAdd:'',
      password:'',
      alertMessage:'',
      listeGest:[],
      stringSearchGest:'',
      modeSearchGest:'',
      depSearchGest:''
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
    },
    listeSearch () {
      return this.listeGest.filter(function (gest) {
        if (this.stringSearchGest !== '' || this.modeSearchGest !== '') {
          if (this.stringSearchGest !== '' && this.modeSearchGest !== '') {
            return (gest.nom.toLowerCase().indexOf(this.stringSearchGest.toLowerCase()) !== -1 || gest.prenom.toLowerCase().indexOf(this.stringSearchGest.toLowerCase()) !== -1)
                && (this.verifyType(gest));
          }

          if (this.stringSearchGest !== '') {
            return gest.nom.toLowerCase().indexOf(this.stringSearchGest.toLowerCase()) !== -1 || gest.prenom.toLowerCase().indexOf(this.stringSearchGest.toLowerCase()) !== -1;
          }
          if (this.modeSearchGest !== '') {
            return this.verifyType(gest);
          }

        } else {
          return true
        }
      }.bind(this))
    }
  },
  methods: {
    getUsers () {
      ajaxService.getAllApi('allLDAP').then(result => this.users = result)
    },

    addRole () {
        let params = new FormData();
        params.append("id_univ", this.idUnivToAdd);
        params.append("admin", this.isAdmin());
        //params.append("password", this.password);

      this.alertMessage = param.messages.sending;

        ajaxService.postAPI("gestionnaires", params).then(response => this.alertMessage = param.messages.stored + response).catch(response => this.alertMessage = param.messages.problem + response);


    },
    isAdmin(){
      if(this.userToAddRole === "admin") {
        return 1;
      } else {
        return 0;
      }
    },
    getGestionnaires(){
      ajaxService.getAllApi("gestionnaires").then(result => this.listeGest = result).catch(error=>console.log(error));
    },
    getDepNom(gest){
      if(gest.departement != null) {
        return gest.departement.nom;
      } else {
        return "Non assigné à un département";
      }
    },
    changeSearch(string){
      this.stringSearchGest = string;
    },
    changeModeSearch(mode){
      this.modeSearchGest = mode;
    },
    verifyType(gest){
      if(this.modeSearchGest==="ADM"){
        return gest.admin === 1;
      } else if (this.modeSearchGest==="GEST") {
        return gest.admin === 0;
      } else {
        return true;
      }
    },
    getButtons(gest){
      if(gest.departement === null) {
        return [
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
        ]
      } else {
        return [
          {
            icon: 'pencil-fill',
            variant: 'success',
            eventName: 'editRole'
          }
        ]
      }

    }
  },
  mounted () {
    this.getUsers();
    this.getGestionnaires();
  },

}
</script>

<style scoped>

</style>
