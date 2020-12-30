<template>
  <div>
    <sidebar-admin></sidebar-admin>

    <div class="rdv containerRightAdmin p-4">
      <b-card class="mx-auto w-75">
        <slot name="header">
          <div class="d-inline-flex w-50 justify-content-between ">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
                 viewBox="0 0 121.013 138.301" class="d-block ">
              <path id="Icon_awesome-calendar-alt" data-name="Icon awesome-calendar-alt"
                    d="M0,125.335A12.969,12.969,0,0,0,12.966,138.3h95.082a12.969,12.969,0,0,0,12.966-12.966V51.863H0ZM86.438,72.392a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241h-10.8A3.251,3.251,0,0,1,86.438,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241h-10.8a3.251,3.251,0,0,1-3.241-3.241ZM51.863,72.392A3.251,3.251,0,0,1,55.1,69.15h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241H55.1A3.251,3.251,0,0,1,51.863,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241H55.1a3.251,3.251,0,0,1-3.241-3.241ZM17.288,72.392a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241h-10.8A3.251,3.251,0,0,1,17.288,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241h-10.8a3.251,3.251,0,0,1-3.241-3.241Zm90.76-89.679H95.082V4.322A4.335,4.335,0,0,0,90.76,0H82.116a4.335,4.335,0,0,0-4.322,4.322V17.288H43.219V4.322A4.335,4.335,0,0,0,38.9,0H30.253a4.335,4.335,0,0,0-4.322,4.322V17.288H12.966A12.969,12.969,0,0,0,0,30.253V43.219H121.013V30.253A12.969,12.969,0,0,0,108.047,17.288Z"
                    fill="#81cb51"/>
            </svg>
            <h2>Créneaux</h2>
            <b-button type="button" variant="primary" @click="getCreneaux" size="sm">
              <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
            </b-button>
          </div>
        </slot>

        <b-row>
          <b-col cols="12" sm="6">
            <h5>Disponibilités :</h5>
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
//import utilsServices from '@/services/utilsServices.js'

export default {
  name: 'CreneauxParam_Admin',
  components: {SidebarAdmin},
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
      alertMessage:'',
    }
  },
  methods: {
    sendCreneaux () {
      let data = new FormData();
      data.append("creneaux", JSON.stringify(this.creneaux))

      this.alertMessage = param.messages.sending;
      ajaxService.postAPI("creneaux", data).then(res => {this.alertMessage = param.messages.stored + res; this.getCreneaux()}).catch(res => this.alertMessage = param.messages.problem + res)
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
            this.creneaux[i-1] = this.listeCrnxGest[indexCrnx]
          }
        }
        // eslint-disable-next-line no-unused-vars
        this.$bvModal.msgBoxOk("Les créneaux ont bien étés initialisés avec vos précédentes entrées").then(res =>  this.initialized = true);
      } else {
        // eslint-disable-next-line no-unused-vars
        this.$bvModal.msgBoxOk("Vous n'avez encore aucun créneaux par défault.").then(res =>  this.initialized = true);
      }
    }
  },
  mounted () {
    this.getCreneaux()
  }
}
</script>

<style scoped>

</style>
