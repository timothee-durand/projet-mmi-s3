<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="containerRightAdmin p-4">
      <div class="w-100 d-inline-flex justify-content-between mb-2">
        <h1>Matériel</h1>
        <b-button type="button" variant="primary" @click="changeModeSearch(modeSearch)" size="sm">
          <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
        </b-button>
      </div>

      <search-bar @changeType="changeModeSearch" @search-input="filterString" :types-materiel="typesMateriel"
                  @changeTypeMat="typeSearch"
                  @addMat="addMat"
      ></search-bar>

      <row-result v-for="materiel in listeSearch" :key="materiel.id" :id="materiel.id.toString()"
                  :buttons="buttons(materiel)"
                  :reference="materiel.ref" :disable-ref="modeSearch==='types'||modeSearch==='departements'"
                  :img="materiel[keyImg]" :nom="materiel.nom"
                  :disable-dispo="modeSearch==='types'||modeSearch==='departements'"
                  :dispo="getDisponibilite(materiel)"
                  @editMat="editMat"
                  @deleteMat="delMat"
                  @lockMat="lockMat"
                  :type="modeSearch"
                  class="mt-3"></row-result>


      <modal-pictum id-modal="lock-mat-modal" title="Gestion indisponibilité matériel" hide-footer>
        <b-form @submit.prevent="sendLockMat">
          <b-input-group>
            <b-form-group label="Nom">
              <b-input v-model="matToLock.nom" disabled/>
            </b-form-group>
            <b-form-group label="Référence">
              <b-input v-model="matToLock.ref" disabled/>
            </b-form-group>
          </b-input-group>

          <b-form-group label="Disponibilité">
            <b-radio-group buttons v-model="matToLock.indisp" button-variant="primary" :options="optionsIndisp">
            </b-radio-group>
          </b-form-group>

          <b-form-group label="Raison">
            <b-textarea :required="matToLock.indisp === 1" v-model="matToLock.indisp_raison"
                        placeholder="Quel est le problème ?" :disabled="matToLock.indisp === 0"></b-textarea>
          </b-form-group>
          <b-button variant="outline-primary" type="submit">Valider</b-button>
        </b-form>
      </modal-pictum>


      <mat-edit :modal="modal" id-perso="modif-mat" :mode="modeMatEdit" :callback-ok="getListe"
                :materiel-to-edit="matSelected"/>

      <type-edit :callback-ok="callbackTypeCreation" :mode="modeMatEdit" id-perso="modif-type"
                 :type-to-edit="matSelected"></type-edit>

      <kit-edit :callback-ok="getListe" :mode="modeMatEdit" id-perso="modif-kit" :kit-to-edit="matSelected"></kit-edit>

      <dep-edit :callback-ok="getListe" :mode="modeMatEdit" id-perso="modif-dep"
                :departement-to-edit="matSelected"></dep-edit>
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
import utilsServices from '@/services/utilsServices.js'
import param from '@/param/param.js'
//import param from '@/param/param.js'

export default {
  name: 'Materiel_Admin',
  components: {DepEdit, KitEdit, TypeEdit, MatEdit, ModalPictum, RowResult, SearchBar, SidebarAdmin},
  data () {
    return {
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
      matToLock: {
        id: 0,
        indisp: 0,
        indisp_raison: ''
      },
      optionsIndisp: [
        {text: 'Disponible', value: 0},
        {text: 'Indisponible', value: 1},
      ]
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
            return mat.nom.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1
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
      this.modal = modal
      this.$bvModal.msgBoxOk(this.modal.message, {
        title: this.modal.title
      }).then(this.modal.callback)
    },
    modifMatApi () {
      console.log(this.matSelected)
      this.$bvModal.hide(this.idModal)
    },
    getListe () {
      if (!this.$store.getters.isAdmin && this.modeSearch === 'materiels') {
        ajaxService.getSingleApi('gestionnaires', this.$store.getters.getUser.id).then(result => {
          this.listeMat = result.materiels
        }).catch(error => utilsServices.alertError(error, this))
      } else {
        //si pas admin
        ajaxService.getAllApi(this.modeSearch).then(result => {
          this.listeMat = result
        }).catch(error => utilsServices.alertError(error, this))
      }

    },
    changeModeSearch (mode) {
      this.listeMat = []
      this.modeSearch = mode
      this.typeMatSearch = ''
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
          }).catch(error => utilsServices.alertError(error, this))
    },
    typeSearch (type) {
      this.typeMatSearch = type
    },
    delMat (payload) {
      this.openModal({
        title: 'Supprimer',
        callback: function () {
          ajaxService.delApi(this.modeSearch, payload.id).then(res => {
            this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(this.$bvModal.hide(this.modal.idModal))
            this.getListe()
          }).catch(err => {
            this.$bvModal.msgBoxOk(param.messages.problem + err.response.data).then(this.$bvModal.hide(this.modal.idModal))
            this.getListe()
          })
        }.bind(this),
        message: 'Êtes-vous sûrs de vouloir supprimer ' + payload.nom + ' ?',
        idModal: 'modal-mat'
      })
    },
    editMat (payload) {
      this.modeMatEdit = 'edit'
      this.matSelected = this.getMatById(parseInt(payload.id))[0]
      console.log(payload)

      switch (this.modeSearch) {
        case 'materiels':
          this.$bvModal.show('modif-mat')
          break
        case 'types':
          this.$bvModal.show('modif-type')
          break
        case 'malettes':
          this.$bvModal.show('modif-kit')
          break
        case 'departements':
          this.$bvModal.show('modif-dep')
          break
      }
    },
    addMat () {
      this.modeMatEdit = 'add'

      switch (this.modeSearch) {
        case 'materiels':
          this.$bvModal.show('modif-mat')
          break
        case 'types':
          this.$bvModal.show('modif-type')
          break
        case 'malettes':
          this.$bvModal.show('modif-kit')
          break
        case 'departements':
          this.$bvModal.show('modif-dep')
          break
      }
    },
    callbackTypeCreation () {
      this.modeSearch = 'types'
      this.getListe()
    },
    getMatById (id) {
      return this.listeMat.filter(function (mat) {
        return mat.id === id
      })
    },
    getDisponibilite (mat) {
      if (this.modeSearch === 'types' || this.modeSearch === 'departements' || this.modeSearch === 'malettes') {
        return {
          text: '',
          variant: ''
        }
      }
      if (mat.indisp === 0) {
        return {
          text: 'Disponible',
          variant: 'success'
        }
      } else {
        return {
          text: utilsServices.getShortVersion(mat.indisp_raison),
          variant: 'danger'
        }
      }
    },
    lockMat (payload) {
      console.log(payload)
      this.matToLock = utilsServices.getById(this.listeMat, parseInt(payload.id))
      this.$bvModal.show('lock-mat-modal')
    },
    sendLockMat () {
      let data = new FormData()
      data.append('indisp', this.matToLock.indisp)
      if (this.matToLock.indisp === 0) {
        data.append('indisp_raison', ' ')
      } else {
        data.append('indisp_raison', this.matToLock.indisp_raison)
      }

      ajaxService.putApi('materiels', this.matToLock.id, data).then(res => {
        this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(this.$bvModal.hide('lock-mat-modal'))
        this.getListe()
      }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + utilsServices.getCoolestError(err)).then(this.$bvModal.hide('lock-mat-modal'))
        this.getListe()
      })
    },
    buttons (mat) {
      let buttons = [
        {
          icon: 'pencil-fill',
          variant: 'success',
          eventName: 'editMat'
        }
      ]
      if (this.modeSearch === 'materiels') {
        buttons.push({
          icon: 'lock',
          variant: 'success',
          eventName: 'lockMat'
        })
      }
      if (mat.prets !== undefined) {
        if (mat.prets.length === 0) {
          buttons.push({
            icon: 'x',
            variant: 'success',
            eventName: 'deleteMat'
          })
        }
      }
      if (mat.materiels !== undefined) {
        if (mat.materiels.length === 0) {
          buttons.push({
            icon: 'x',
            variant: 'success',
            eventName: 'deleteMat'
          })
        }

      }
      return buttons
    },

  },
  mounted () {
    console.log('yo')
    this.getListe()
    this.setTypesMateriel()

    //event
    this.$root.$on('bv::modal::hidden', () => {
      this.getListe()
    })
  }
}
</script>

