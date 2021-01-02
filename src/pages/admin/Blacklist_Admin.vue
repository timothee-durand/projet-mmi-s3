<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="blacklist containerRightAdmin p-4">
      <search-bar :modes="[]" :types-materiel="[]" @addMat="$bvModal.show('add-bl-modal')"></search-bar>
      <row-result v-for="bl in listeBlacklist" :key="bl.id" :nom="bl.nom + ' ' + bl.prenom " disable-dispo disable-ref
                  img="../assets/img/person.png" :buttons="button"
                  :id="bl.id" class="mt-2"
      @deleteBlacklist = "delBl"></row-result>
    </div>

    <modal-pictum id-modal="add-bl-modal" title="Ajouter Profil Blacklist" hide-footer :on-close-method="getBlacklist">
      <b-form @submit.prevent="addBl">
        <p>Recherche dans la liste des réservations : </p>
        <b-input placeholder="Recherche Utilisateur" v-model="searchUser"></b-input>
        <p>Liste des réservations (sélectionnez la personne que vous voulez ajouter)</p>
        <b-select v-model="blToAdd.id" required>
          <b-select-option v-for="res in resList" :key="res.id" :value="res.id">{{ res.prenom }} {{ res.nom }}
          </b-select-option>
        </b-select>
        <b-button type="submit">Ajouter</b-button>
        <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>
      </b-form>
    </modal-pictum>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import ajaxService from '@/services/ajaxService.js'
import ModalPictum from '@/components/ModalPictum.vue'
import utilsServices from '@/services/utilsServices.js'
import param from '@/param/param.js'

export default {
  name: 'Blacklist_Admin',
  components: {ModalPictum, RowResult, SearchBar, SidebarAdmin},
  data () {
    return {
      button: [
        {
          icon: 'x',
          variant: 'success',
          eventName: 'deleteBlacklist'
        }
      ],
      listeBlacklist: [],
      searchUser:'',
      listeRes:[],
      alertMessage : '',
      blToAdd:{
        id:""
      }
    }
  },
  computed: {
    resList () {
      return this.listeRes.filter(function (user) {
        if (this.searchUser !== '') {
          return (user.nom.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1
              || user.prenom.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1);


        } else {
          return true
        }
      }.bind(this))
    },
  },
  methods: {
    getBlacklist () {
      this.listeBlacklist = [];
      ajaxService.getAllApi('blacklists').then(result => this.listeBlacklist = result).catch(error => utilsServices.alertError(error, this))
    },
    delBl(payload){
      this.$bvModal.msgBoxConfirm("Voulez-vous vraiment supprimer " + payload.nom + " de la blacklist ?").then(value => {
        if(value){
          ajaxService.delApi("blacklists", payload.id)
              .then(response => { this.$bvModal.msgBoxOk(param.messages.success + "(" + response + ")"); this.getBlacklist()} )
              .catch(error => this.$bvModal.msgBoxOk(param.messages.problem + "(" + utilsServices.getCoolestError(error) + ")"));
        }
      })

    },
    getUsers () {
      ajaxService.getAllApi('reservations').then(result => this.listeRes = result)
    },
    addBl(){
      let blToAdd = utilsServices.getById(this.listeRes, this.blToAdd.id);
      this.alertMessage = param.messages.sending;
      ajaxService.postAPI("blacklists", utilsServices.getFormData(blToAdd)).then(response => this.alertMessage = param.messages.stored + response).catch(error => this.alertMessage = param.messages.problem + utilsServices.getCoolestError(error))
    }
  },
  mounted () {
    this.getBlacklist();
    this.getUsers();
  }
}
</script>

<style scoped>

</style>
