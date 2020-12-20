<template>
  <div class="containerRight p-4">
    <h1>Matériel</h1>
    <search-bar @changeType="changeModeSearch" @search-input="filterString" :types-materiel="typesMateriel"
                @changeTypeMat="typeSearch"
                @addMat="addMat"
    ></search-bar>

    <row-result v-for="materiel in listeSearch" :key="materiel.id" :id="materiel.id.toString()" :buttons="buttons"
                :reference="materiel.ref" :disable-ref="modeSearch==='types'||modeSearch==='departements'"
                :img="materiel[keyImg]" :nom="materiel.nom"
                :disable-dispo="modeSearch==='types'||modeSearch==='departements'"
                @lock-mat="openModal(materiel, 'lock')"
                @deleteMat="openModal(materiel,'del')"
                class="mt-3"></row-result>

    <modal-pictum :title="modal.title" id-modal="modal-mat" text-cancel-button="Fermer" :callback-ok="modal.callback">
      <p>{{ modal.message }}</p>
    </modal-pictum>

    <mat-edit :modal="modal" :departements="listeDep" id-perso="modif-mat" :malettes="listeMalette" :types="typesMateriel" :mode="modeMatEdit"/>

  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
import ModalPictum from '@/components/ModalPictum.vue'
import ajaxService from '@/services/ajaxService.js'
import MatEdit from '@/components/admin/MatEdit.vue'
//import param from '@/param/param.js'

export default {
  name: 'Materiel_Admin',
  components: {MatEdit, ModalPictum, RowResult, SearchBar},
  data () {
    return {
      buttons: [
        {
          icon: 'lock',
          variant: 'success',
          eventName: 'lock-mat'
        },
        {
          icon: 'pencil-fill',
          variant: 'success',
          eventName: 'editMat'
        },
        {
          icon: 'x',
          variant: 'success',
          eventName: 'deleteMat'
        }
      ],
      matSelected: {},
      listeMat: [],
      modeSearch: 'materiels',
      stringSearch: '',
      typesMateriel: [{text: 'Tous', value: ''}],
      typeMatSearch: '',
      modal: {
        title: '',
        callback: function (){return this.lockMat;},
        message: '',
        idModal: 'modal-mat'
      },
      listeMalette:[],
      listeDep:[],
      modeMatEdit:"add"

    }
  },
  computed: {
    listeSearch () {
      return this.listeMat.filter(function (mat) {
        if (this.stringSearch !== '' || this.typeMatSearch !== '') {
          if (this.stringSearch !== '' && this.typeMatSearch !== '') {
            return (mat.nom.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1
                || mat.ref.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1) && (mat.type.nom.toLowerCase().indexOf(this.typeMatSearch.toLowerCase()) !== -1)
          }
          if (this.stringSearch !== '') {
            return mat.nom.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1
                || mat.ref.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1
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

    openModal (mat, action) {
      let actions = {
        lock: {
          title: 'Mettre matériel en indisponible',
          callback: this.lockMat,
          message: 'Êtes-vous sûrs de vouloir mettre ' + this.matSelected.nom + ' en indisponible ?',
          idModal: 'modal-mat'
        },
        edit: {
          title: 'Mettre matériel en indisponible',
          callback: "editMat",
          message: 'Êtes-vous sûrs de vouloir mettre ' + this.matSelected.nom + ' en indisponible ?',
          idModal: 'modal-mat-edit'
        },
        del:{
          title: 'Supprimer',
          callback: this.delMat,
          message: 'Êtes-vous sûrs de vouloir supprimer ' + this.matSelected.nom + ' ?',
          idModal: 'modal-mat'
        }
      };
      switch (action) {
        case 'edit':
          this.modal = actions.edit
          break
        case 'lock':
          this.modal = actions.lock
          break
        case "del":
          this.modal = actions.del
          break
      }

      this.matSelected = mat
      this.$bvModal.show(this.modal.idModal)
    },
    modifMatApi () {
      console.log(this.matSelected)
      this.$bvModal.hide(this.idModal)
    },
    getListe () {
      ajaxService.getApi(this.modeSearch).then(result => {
        this.listeMat = result
        console.log(result[0]['picto'])
      }).catch(error => console.log(error))
    },
    changeModeSearch (mode) {
      this.listeMat = []
      this.modeSearch = mode
      this.getListe()
    },
    filterString (search) {
      this.stringSearch = search
    },
    setTypesMateriel () {
      ajaxService.getApi('types')
          .then(result => {
            result.forEach(function (type) {
              this.typesMateriel.push({text: type.nom, value: type.nom})
            }.bind(this)).catch(error => console.log(error))

          })
    },
    setDeps () {
      ajaxService.getApi('departements')
          .then(result => {
            this.listeDep = result;
          })
    },
    setMals () {
      ajaxService.getApi('malettes')
          .then(result => {
            this.listeMalette = result;
          })
    },
    typeSearch (type) {
      this.typeMatSearch = type
    },
    lockMat () {
      console.log('blaoquer matériel')
      this.$bvModal.hide(this.modal.idModal)
    },
    delMat(){
      console.log('del matériel')
      this.$bvModal.hide(this.modal.idModal)
    },
    addMat(){
      this.modeMatEdit = "add";
      this.$bvModal.show("modif-mat");

    }

  },
  mounted () {
    console.log("yo")
    this.getListe()
    this.setTypesMateriel()
    this.setDeps()
    this.setMals()
  }
}
</script>

