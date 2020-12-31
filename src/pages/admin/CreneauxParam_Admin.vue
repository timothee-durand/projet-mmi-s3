<template>
  <div>
    <sidebar-admin></sidebar-admin>

    <div class="rdv containerRightAdmin p-4">
      <b-card class="mx-auto w-75">
        <slot name="header">
          <div class="d-inline-flex w-25 justify-content-between ">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
                 viewBox="0 0 121.013 138.301" class="d-block ">
              <path id="Icon_awesome-calendar-alt" data-name="Icon awesome-calendar-alt"
                    d="M0,125.335A12.969,12.969,0,0,0,12.966,138.3h95.082a12.969,12.969,0,0,0,12.966-12.966V51.863H0ZM86.438,72.392a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241h-10.8A3.251,3.251,0,0,1,86.438,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241h-10.8a3.251,3.251,0,0,1-3.241-3.241ZM51.863,72.392A3.251,3.251,0,0,1,55.1,69.15h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241H55.1A3.251,3.251,0,0,1,51.863,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241H55.1a3.251,3.251,0,0,1-3.241-3.241ZM17.288,72.392a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241h-10.8A3.251,3.251,0,0,1,17.288,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241h-10.8a3.251,3.251,0,0,1-3.241-3.241Zm90.76-89.679H95.082V4.322A4.335,4.335,0,0,0,90.76,0H82.116a4.335,4.335,0,0,0-4.322,4.322V17.288H43.219V4.322A4.335,4.335,0,0,0,38.9,0H30.253a4.335,4.335,0,0,0-4.322,4.322V17.288H12.966A12.969,12.969,0,0,0,0,30.253V43.219H121.013V30.253A12.969,12.969,0,0,0,108.047,17.288Z"
                    fill="#81cb51"/>
            </svg>
            <h2>Créneaux</h2>

          </div>
        </slot>

        <b-row>
          <b-col cols="12" sm="6">
            <div class="d-inline-flex justify-content-between w-100 mb-2 mt-2">
              <h5>Disponibilités :</h5>
              <b-button type="button" variant="primary" @click="getCreneaux" size="sm">
                <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
              </b-button>
            </div>

            <b-form @submit.prevent="sendCreneaux">
              <b-input-group class="d-inline-flex align-items-center  ">
                <p class="mr-2">Lundi matin :</p>
                <b-form-timepicker v-model="creneaux[0].heure_debut_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[0].heure_fin_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <b-input-group class="d-inline-flex align-items-center mt-2  ">
                <p class="mr-2">Lundi après-midi :</p>
                <b-form-timepicker v-model="creneaux[0].heure_debut_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[0].heure_fin_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <hr/>
              <b-input-group class="d-inline-flex align-items-center  ">
                <p class="mr-2">Mardi matin :</p>
                <b-form-timepicker v-model="creneaux[1].heure_debut_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[1].heure_fin_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <b-input-group class="d-inline-flex align-items-center mt-2  ">
                <p class="mr-2">Mardi après-midi :</p>
                <b-form-timepicker v-model="creneaux[1].heure_debut_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[1].heure_fin_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <hr/>
              <b-input-group class="d-inline-flex align-items-center  ">
                <p class="mr-2">Mercredi matin :</p>
                <b-form-timepicker v-model="creneaux[2].heure_debut_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[2].heure_fin_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <b-input-group class="d-inline-flex align-items-center mt-2  ">
                <p class="mr-2">Mercredi après-midi :</p>
                <b-form-timepicker v-model="creneaux[2].heure_debut_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[2].heure_fin_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <hr/>
              <b-input-group class="d-inline-flex align-items-center  ">
                <p class="mr-2">Jeudi matin :</p>
                <b-form-timepicker v-model="creneaux[3].heure_debut_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[3].heure_fin_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <b-input-group class="d-inline-flex align-items-center mt-2  ">
                <p class="mr-2">Jeudi après-midi :</p>
                <b-form-timepicker v-model="creneaux[3].heure_debut_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[3].heure_fin_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <hr/>
              <b-input-group class="d-inline-flex align-items-center  ">
                <p class="mr-2">Vendredi matin :</p>
                <b-form-timepicker v-model="creneaux[4].heure_debut_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[4].heure_fin_matin" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <b-input-group class="d-inline-flex align-items-center mt-2  ">
                <p class="mr-2">Vendredi après-midi :</p>
                <b-form-timepicker v-model="creneaux[4].heure_debut_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
                <b-form-timepicker v-model="creneaux[4].heure_fin_am" size="sm"
                                   :disabled="!initialized"></b-form-timepicker>
              </b-input-group>
              <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>
              <b-btn type="submit" pill variant="outline-primary" class="mx-auto">Envoyer Créneaux</b-btn>
            </b-form>
          </b-col>

          <b-col cols="12" sm="6">
            <b-card>
              <b-card-body>
                <h5>Ajouter indisponibilité :</h5>
                <b-form class="mt-2" @submit.prevent="sendIndispo">
                  <b-form-group label="Date de début" :state="indispoToAdd.date_debut !== ''"
                                invalid-feedback="Vous devez renseigner cette date pour ajouter une indisponibilite">
                    <date-picker v-model="indispoToAdd.date_debut" placeholder="11/12/2020 12:30"
                                 :config="optionsDatePicker"></date-picker>
                  </b-form-group>
                  <b-form-group label="Date de fin" :state="stateFinIndispo"
                                invalid-feedback="Vous devez renseinger cette date et faire en sorte qu'elle soit après la date de début">
                    <date-picker v-model="indispoToAdd.date_fin" class="mt-2"
                                 placeholder="01/02/2021 08:00" :config="optionsDatePicker"></date-picker>
                  </b-form-group>

                  <b-button type="submit" variant="outline-primary" pill>Ajouter</b-button>
                  <b-alert dismissible :show="alertMessageIndispo !== ''">{{ alertMessageIndispo }}</b-alert>
                </b-form>
              </b-card-body>
            </b-card>
            <div class="d-inline-flex justify-content-between w-100 mb-2 mt-2">
              <h5>Prochaines indisponibilités :</h5>
              <b-button type="button" variant="primary" @click="getIndispo" size="sm">
                <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
              </b-button>
            </div>
            <div class="overflow-auto mt-2" style="height: 200px">
              <row-result class="mt-2" v-for="indispo in listeIndispo" :key="indispo.id" :id="indispo.id"
                          :nom="getDateFormated(indispo.date_debut)"
                          :reference="getDateFormated(indispo.date_fin)" disable-dispo disable-img
                          :buttons="buttonIndispo"
                          @editIndispo="editIndispo"
              ></row-result>
            </div>
            <modal-pictum id-modal="edit-indispo-modal" title="Modifier Indisponibilité" hide-footer>

              <b-form class="p-3" @submit.prevent="modifIndispo">
                <b-form-group>
                  <b-form-group label="Date début">
                    <date-picker v-model="indispoToEdit.date_debut" :config="optionsDatePicker"
                                 placeholder="Sélectionnez une date"></date-picker>
                  </b-form-group>
                  <b-form-group label="Date fin">
                    <date-picker v-model="indispoToEdit.date_fin" :config="optionsDatePicker"
                                 placeholder="Sélectionnez une date"></date-picker>
                  </b-form-group>
                  <b-input-group class="justify-content-between w-75 mx-auto">
                    <b-btn type="button" variant="outline-danger" pill @click="delIndispo">Supprimer</b-btn>
                    <b-btn type="submit" variant="primary" pill>Modifier</b-btn>
                  </b-input-group>

                </b-form-group>
              </b-form>
            </modal-pictum>
          </b-col>
        </b-row>

      </b-card>

    </div>
  </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import ajaxService from '@/services/ajaxService.js'
import param from '@/param/param.js'
import utilsServices from '@/services/utilsServices.js'
import RowResult from '@/components/RowResult.vue'
import moment from 'moment'
import ModalPictum from '@/components/ModalPictum.vue'
// Import this component
import datePicker from 'vue-bootstrap-datetimepicker'

// Import date picker css
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

export default {
  name: 'CreneauxParam_Admin',
  components: {ModalPictum, RowResult, SidebarAdmin, datePicker},
  data () {
    return {
      creneaux: [
        {
          jour: 1,
          heure_debut_matin: '08:00',
          heure_fin_matin: '12:00',
          heure_debut_am: '14:00',
          heure_fin_am: '18:00',
          gestionnaire_id: this.$store.state.user.user.id
        },
        {
          jour: 2,
          heure_debut_matin: '08:00',
          heure_fin_matin: '12:00',
          heure_debut_am: '14:00',
          heure_fin_am: '18:00',
          gestionnaire_id: this.$store.state.user.user.id
        },
        {
          jour: 3,
          heure_debut_matin: '08:00',
          heure_fin_matin: '12:00',
          heure_debut_am: '14:00',
          heure_fin_am: '18:00',
          gestionnaire_id: this.$store.state.user.user.id
        },
        {
          jour: 4,
          heure_debut_matin: '08:00',
          heure_fin_matin: '12:00',
          heure_debut_am: '14:00',
          heure_fin_am: '18:00',
          gestionnaire_id: this.$store.state.user.user.id
        },
        {
          jour: 5,
          heure_debut_matin: '08:00',
          heure_fin_matin: '12:00',
          heure_debut_am: '14:00',
          heure_fin_am: '18:00',
          gestionnaire_id: this.$store.state.user.user.id
        }
      ]
      ,
      listeCrnxGest: [],
      initialized: false,
      alertMessage: '',
      alertMessageIndispo: '',
      indispoToAdd: {
        date_debut: '',
        date_fin: '',
        gestionnaire_id: ''
      },
      indispoToEdit: {
        id: 0,
        date_debut: '',
        date_fin: '',
        gestionnaire_id: ''
      },
      listeIndispo: [],
      buttonIndispo: [
        {
          icon: 'pencil-fill',
          variant: 'success',
          eventName: 'editIndispo'
        },
      ],
      optionsDatePicker: {
        locale: 'fr',
        format: 'YYYY-MM-DD HH:mm'
      }
    }
  },
  computed: {
    stateFinIndispo () {
      return this.indispoToAdd.date_fin !== '' && moment(this.indispoToAdd.date_fin).isAfter(this.indispoToAdd.date_debut)
    }
  },
  methods: {
    sendCreneaux () {
      let data = new FormData()
      data.append('creneaux', JSON.stringify(this.creneaux))

      this.alertMessage = param.messages.sending
      ajaxService.postAPI('creneaux', data).then(res => {
        this.alertMessage = param.messages.stored + res
        this.getCreneaux()
      }).catch(res => this.alertMessage = param.messages.problem + res)
    },
    getCreneaux () {
      ajaxService.getSingleApi('gestionnaires', this.$store.state.user.user.id).then(result => {
        this.listeCrnxGest = result.data.creneaux
        this.setCreneaux()
      }).catch(err => this.$bvModal.msgBoxOk(param.messages.problem + err).then(res => this.getCreneaux(res)))
    },
    setCreneaux () {
      if (this.listeCrnxGest.length !== 0) {
        for (let i = 0; i <= 5; i++) {
          //je regarde si il y a un jour dans le tableau qui correspond
          let indexCrnx = this.listeCrnxGest.findIndex(function (crnxS) {
            return crnxS.jour === i
          })
          if (indexCrnx !== -1) {
            //alors je met à jour le créneaux correspondant dans le tableau qui gère les inputs
            this.creneaux[i - 1] = this.listeCrnxGest[indexCrnx]
          }
        }
        // eslint-disable-next-line no-unused-vars
        this.$bvModal.msgBoxOk('Les créneaux ont bien étés initialisés avec vos précédentes entrées').then(res => this.initialized = true)
      } else {
        // eslint-disable-next-line no-unused-vars
        this.$bvModal.msgBoxOk('Vous n\'avez encore aucun créneaux par défault.').then(res => this.initialized = true)
      }
    },
    sendIndispo () {
      let data = utilsServices.getFormData(this.indispoToAdd)
      this.alertMessageIndispo = param.messages.sending
      ajaxService.postAPI('indisponibilites', data).then(result => {
        this.alertMessageIndispo = param.messages.stored + '(' + result + ')'
        this.getIndispo()
      }).catch(err => {
        console.log(err.response)
        this.$bvModal.msgBoxOk(param.messages.problem + err.response.data)
      })
    },
    getIndispo () {
      ajaxService.getSingleApi('gestionnaires', this.$store.state.user.user.id)
          .then(res => {
            this.listeIndispo = res.data.indisponibilites
            let now = moment()
            //filtre pour ne garder que les indispos futures
            this.listeIndispo = this.listeIndispo.filter(function (ind) {
              return moment(ind.date_debut).isAfter(now) || moment(ind.date_fin).isAfter(now)
            })
            //les tries dans le bon ordre
            this.listeIndispo.sort(function (ind1, ind2) {
              return moment(ind1.date_debut).isAfter(ind2.date_debut)
            })
          }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + err.response.statusMessage)
      })
    },
    getDateFormated (date) {
      return moment(date, '', 'fr').format('ddd D MMM')
    },
    editIndispo (payload) {
      this.indispoToEdit = utilsServices.getById(this.listeIndispo, payload.id)
      this.$bvModal.show('edit-indispo-modal')
    },
    modifIndispo () {
      let data = utilsServices.getFormData(this.indispoToEdit)
      console.log('to')
      this.$bvModal.hide('edit-indispo-modal')

      ajaxService.putApi('indisponibilites', this.indispoToEdit.id, data)
          .then(res => {
            this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')')
            this.getIndispo()
          }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + err.response.data)
        this.getIndispo()
      })
    },
    delIndispo () {
      this.$bvModal.hide('edit-indispo-modal')
      ajaxService.delApi('indisponibilites', this.indispoToEdit.id)
          .then(res => {
            this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')')
            this.getIndispo()
          }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + err.response.data)
      })
    },
  },
  mounted () {
    this.getCreneaux()
    this.getIndispo()
    this.indispoToAdd.gestionnaire_id = this.$store.state.user.user.id
  }
}
</script>


<style scoped>

</style>
