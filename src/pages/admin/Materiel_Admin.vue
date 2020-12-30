<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="containerRightAdmin p-4">
      <div class="w-100 d-inline-flex justify-content-between mb-2">
        <h1>Matériel</h1>
        <b-button type="button" variant="primary"  @click="changeModeSearch(modeSearch)" size="sm">
          <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
        </b-button>
      </div>

      <search-bar @changeType="changeModeSearch" @search-input="filterString" :types-materiel="typesMateriel"
                  @changeTypeMat="typeSearch"
                  @addMat="addMat"
      ></search-bar>

      <row-result v-for="materiel in listeSearch" :key="materiel.id" :id="materiel.id.toString()"
                  :buttons="buttons"
                  :reference="materiel.ref" :disable-ref="modeSearch==='types'||modeSearch==='departements'"
                  :img="materiel[keyImg]" :nom="materiel.nom"
                  :disable-dispo="modeSearch==='types'||modeSearch==='departements'"
                  @editMat="editMat"
                  @deleteMat="delMat"
                  :type="modeSearch"
                  class="mt-3"></row-result>

      <modal-pictum :title="modal.title" id-modal="modal-mat" text-cancel-button="Fermer"
                    :callback-ok="modal.callback">
        <p>{{ modal.message }}</p>
      </modal-pictum>


      <mat-edit :modal="modal" id-perso="modif-mat"  :mode="modeMatEdit" :callback-ok="getListe" :materiel-to-edit="matSelected"/>

      <type-edit :callback-ok="callbackTypeCreation" :mode="modeMatEdit" id-perso="modif-type" :type-to-edit="matSelected"></type-edit>

      <kit-edit :callback-ok="getListe" :mode="modeMatEdit" id-perso="modif-kit" :kit-to-edit="matSelected" ></kit-edit>

      <dep-edit :callback-ok="getListe" :mode="modeMatEdit" id-perso="modif-dep" :departement-to-edit="matSelected"></dep-edit>
    </div>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
import ModalPictum from '@/components/ModalPictum.vue'
import ajaxService from '@/services/ajaxService.js'
import MatEdit from '@/components/admin/MatEdit.vue'
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import TypeEdit from '@/components/admin/TypeEdit.vue'
import KitEdit from '@/components/admin/KitEdit.vue'
import DepEdit from '@/components/admin/DepEdit.vue'
//import param from '@/param/param.js'

export default {
  name: 'Materiel_Admin',
  components: {DepEdit, KitEdit, TypeEdit, MatEdit, ModalPictum, RowResult, SearchBar, SidebarAdmin},
  data () {
    return {
      buttons: [
        {
          icon: 'pencil-fill',
          variant: 'success',
          eventName: 'editMat'
        },
        {
          icon: 'x',
          variant: 'success',
          eventName: 'deleteMat'
        },
      ],
      matSelected: {},
      listeMat: [],
      modeSearch: 'materiels',
      stringSearch: '',
      typesMateriel: [{text: 'Tous', value: ''}],
      typeMatSearch: '',
      modal: {
        title: '',
        callback: function () {
          return this.lockMat
        },
        message: '',
        idModal: 'modal-mat'
      },
      modeMatEdit: 'add',

    }
  },
  computed: {
    listeSearch () {
      return this.listeMat.filter(function (mat) {
        if (this.stringSearch !== '' || this.typeMatSearch !== '') {
          if (this.stringSearch !== '' && this.typeMatSearch !== '') {
            return (mat.nom.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1 && mat.type.nom.toLowerCase().indexOf(this.typeMatSearch.toLowerCase()) !== -1)
          }
          if (this.stringSearch !== '') {
            return mat.nom.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1;
          }
          if (this.typeMatSearch !== '') {
            return mat.type.nom.toLowerCase().indexOf(this.typeMatSearch.toLowerCase()) !== -1
          }

        } else {
          return true
        }
      }.bind(this))
    },
    keyImg () {

      if (this.modeSearch === 'materiels') {
        return 'photo'
      } else if (this.modeSearch === 'types') {
        return 'picto'
      } else if (this.modeSearch === 'malettes') {
        return 'photo'
      } else {
        return null
      }
    }
  },
  methods: {

    openModal (modal) {
      this.modal = modal;
      this.$bvModal.show(this.modal.idModal)
    },
    modifMatApi () {
      console.log(this.matSelected)
      this.$bvModal.hide(this.idModal)
    },
    getListe () {
     ajaxService.getAllApi(this.modeSearch).then(result => {
        this.listeMat = result
      }).catch(error => console.log(error))
    },
    changeModeSearch (mode) {
      this.listeMat = []
      this.modeSearch = mode;
      this.typeMatSearch = "";
      this.getListe()
    },
    filterString (search) {
      this.stringSearch = search
    },
    setTypesMateriel () {
      ajaxService.getAllApi('types')
          .then(result => {
            result.forEach(function (type) {
              this.typesMateriel.push({text: type.nom, value: type.nom, id: type.id})
            }.bind(this))
          }).catch(error => console.log(error))
    },
    typeSearch (type) {
      this.typeMatSearch = type
    },
    delMat (payload) {
      this.openModal({
        title: 'Supprimer',
        callback: function (){
          //ajaxService.delApi(this.modeSearch, payload.id).then(result => this.modal.message = result).catch(error => this.modal.message = error);
        }.bind(this),
        message: 'Êtes-vous sûrs de vouloir supprimer ' + payload.nom + ' ? (non implémenté)',
        idModal: 'modal-mat'
      })
    },
    editMat(payload){
      this.modeMatEdit = 'edit'
      this.matSelected = this.getMatById(parseInt(payload.id))[0];
      console.log(payload)

      switch (this.modeSearch) {
        case 'materiels':
          this.$bvModal.show('modif-mat')
          break;
        case 'types':
          this.$bvModal.show("modif-type")
          break;
        case "malettes":
          this.$bvModal.show("modif-kit")
          break
        case "departements":
          this.$bvModal.show("modif-dep")
          break
      }
    },
    addMat () {
      this.modeMatEdit = 'add'

      switch (this.modeSearch) {
        case 'materiels':
          this.$bvModal.show('modif-mat')
          break;
        case 'types':
          this.$bvModal.show("modif-type")
          break;
        case "malettes":
          this.$bvModal.show("modif-kit")
          break
        case "departements":
          this.$bvModal.show("modif-dep")
          break
      }
    },
    callbackTypeCreation(){
      this.modeSearch = 'types';
      this.getListe();
    },
    getMatById(id) {
      return this.listeMat.filter(function (mat){
          return mat.id === id;
      })
    }

  },
  mounted () {
    console.log('yo')
    this.getListe()
    this.setTypesMateriel()
  }
}
</script>

