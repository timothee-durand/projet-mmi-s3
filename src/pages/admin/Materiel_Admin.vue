<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="containerRightAdmin p-4">
      <h1>Matériel</h1>
      <search-bar @changeType="changeModeSearch" @search-input="filterString" :types-materiel="typesMateriel"
                  @changeTypeMat="typeSearch"
                  @addMat="addMat"
      ></search-bar>

      <row-result v-for="materiel in listeSearch" :key="materiel.id" :id="materiel.id.toString()"
                  :buttons="buttons"
                  :reference="materiel.ref" :disable-ref="modeSearch==='types'||modeSearch==='departements'"
                  :img="materiel[keyImg]" :nom="materiel.nom"
                  :disable-dispo="modeSearch==='types'||modeSearch==='departements'"
                  @lock-mat="openModal(materiel, 'lock')"
                  @deleteMat="openModal(materiel,'del')"
                  class="mt-3"></row-result>

      <modal-pictum :title="modal.title" id-modal="modal-mat" text-cancel-button="Fermer"
                    :callback-ok="modal.callback">
        <p>{{ modal.message }}</p>
      </modal-pictum>


      <mat-edit :modal="modal" id-perso="modif-mat"  :mode="modeMatEdit" :callback-ok="getListe"/>

      <type-edit :callback-ok="callbackTypeCreation" :mode="modeMatEdit" id-perso="modif-type" ></type-edit>

      <kit-edit :callback-ok="getListe" :mode="modeMatEdit" id-perso="modif-kit"></kit-edit>
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
//import param from '@/param/param.js'

export default {
  name: 'Materiel_Admin',
  components: {KitEdit, TypeEdit, MatEdit, ModalPictum, RowResult, SearchBar, SidebarAdmin},
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
          callback: 'editMat',
          message: 'Êtes-vous sûrs de vouloir mettre ' + this.matSelected.nom + ' en indisponible ?',
          idModal: 'modal-mat-edit'
        },
        del: {
          title: 'Supprimer',
          callback: this.delMat,
          message: 'Êtes-vous sûrs de vouloir supprimer ' + this.matSelected.nom + ' ?',
          idModal: 'modal-mat'
        }
      }
      switch (action) {
        case 'edit':
          this.modal = actions.edit
          break
        case 'lock':
          this.modal = actions.lock
          break
        case 'del':
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
      ajaxService.getApi('types')
          .then(result => {
            result.forEach(function (type) {
              this.typesMateriel.push({text: type.nom, value: type.nom, id: type.id})
            }.bind(this))
          }).catch(error => console.log(error))
    },
    typeSearch (type) {
      this.typeMatSearch = type
    },
    lockMat () {
      console.log('blaoquer matériel')
      this.$bvModal.hide(this.modal.idModal)
    },
    delMat () {
      console.log('del matériel')
      this.$bvModal.hide(this.modal.idModal)
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
      }
    },
    callbackTypeCreation(){
      this.modeSearch = 'types';
      this.getListe();
    }

  },
  mounted () {
    console.log('yo')
    this.getListe()
    this.setTypesMateriel()
    this.setDeps()
    this.setMals()
  }
}
</script>

