<template>
  <!--  <scheduler :materiels="listeMateriel"></scheduler>-->
  <div>
    <div class="d-inline-flex justify-content-between w-100 mx-auto mb-3">
      <b-btn-group>
        <b-btn @click="byMat = true" :pressed="byMat" variant="primary">Par Matériel</b-btn>
        <b-btn @click="byMat = false" :pressed="!byMat" variant="primary">Par Réservation</b-btn>
      </b-btn-group>
      <b-button type="button" variant="primary" @click="getMat" size="sm">
        <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
      </b-button>
    </div>

    <!--Par matériel-->
    <b-row v-if="byMat">
      <b-col cols="12" v-for="materiel in listMatNonRendu" :key="materiel.id">
        <b-card class="mb-3">
          <div class="d-flex align-items-center justify-content-between">
            <b-img rounded="circle" :src="materiel.photo" width="40"></b-img>
            <p class="m-0 ml-3"><strong>{{ materiel.nom }}</strong></p>
            <p>Lieu :<em> {{ materiel.departement.nom }}</em></p>
          </div>
          <div class="d-flex flex-column mt-2">
            <b-row>
              <b-col cols="12" v-for="pret in materiel.est_pretes" :key="pret.id">
                <b-card size="sm" body-class="p-2 flex-row d-flex justify-content-between" class=" mb-2">
                  <p class="m-0 w-75 p-0 d-block"><span class="text-primary "
                                                        :class="{'text-black-50':pret.depart !== null}">{{
                      pret.date_debut | dateFormat
                    }}</span> - <span class="text-danger">{{ pret.date_fin | dateFormat }}</span> |
                    {{ pret.reservation.nom }} {{ pret.reservation.prenom }} </p>
                  <b-icon-exclamation-circle variant="danger"
                                             v-if="pret.rendu === null && pret.depart !== null && isNotRegivenInTime(pret)"></b-icon-exclamation-circle>
                  <b-btn variant="light" @click="editRes(pret.reservation.id)">
                    <b-icon-pencil-fill variant="primary"></b-icon-pencil-fill>
                  </b-btn>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="!byMat">
      <b-col cols="12" v-for="(res, ind) in listeResNonRendu" :key="ind">
        <b-card class="mb-3">
          <div class="d-flex align-items-center justify-content-between">
            <p class="m-0 ml-3"><strong>{{ res.nom }} {{ res.prenom }} {{ res.mail }}</strong></p>
            <b-btn variant="light" @click="editRes(res.id)">
              <b-icon-pencil-fill variant="primary"></b-icon-pencil-fill>
            </b-btn>
          </div>
          <div class="d-flex flex-column mt-2">
            <b-row>
              <b-col cols="12" v-for="pret in res.est_pretes" :key="pret.id">

                <b-card size="sm" body-class="p-2 flex-row d-flex justify-content-between" class=" mb-2">
                  <p class="m-0 w-75 p-0 d-block"><span class="text-primary"
                                                        :class="{'text-black-50':pret.depart !== null}">
                    {{pret.date_debut | dateFormat}}</span> - <span class="text-danger">{{ pret.date_fin | dateFormat }}</span> |
                    {{ pret.materiel.nom }} - {{ pret.materiel.ref }} - {{ pret.materiel.departement.nom }} </p>
                  <b-icon-exclamation-circle variant="danger"
                                             v-if="pret.rendu === null && pret.depart !== null && isNotRegivenInTime(pret)"></b-icon-exclamation-circle>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>


    <b-modal hide-footer title="Edition réservation" ref="edit-res-modal" id="edit-res-modal" size="lg">
      <div class="d-flex justify-content-between w-50">
        <p><strong>Emprunteur : </strong>{{ resToEdit.nom }} {{ resToEdit.prenom }}</p>
        <b-btn variant="primary" to="/mails">
          <b-icon-mailbox></b-icon-mailbox>
        </b-btn>
      </div>

      <hr/>
      <p><strong>Prêts en cours :</strong></p>
      <b-card body-class="p-2 align-items-center" class="pret mb-2" v-for="pret in resToEdit.est_pretes" :key="pret.id">
        <b-form class="d-flex justify-content-between" @submit.prevent="editPret(pret.id)">
          <b-form-group label="Matériel" class="mr-2">
            <b-select v-model="pret.materiel_id">
              <b-select-option v-for="mat in listeMateriel" :key="mat.id" :value="mat.id">{{ mat.nom }}
              </b-select-option>
            </b-select>
          </b-form-group>

          <b-form-group label="Date Début" class="mr-3">
            <date-picker :config="optionsDatePicker" v-model="pret.date_debut"></date-picker>
          </b-form-group>
          <b-form-group label="Date Fin">
            <date-picker :config="optionsDatePicker" v-model="pret.date_fin"></date-picker>
          </b-form-group>
          <b-btn type="submit" variant="primary" size="sm">
            <b-icon-check-2></b-icon-check-2>
          </b-btn>
        </b-form>
        <div class="d-flex justify-content-between w-50">
          <p>Autres actions :</p>
          <b-btn @click="setDepartPret(pret.id)" :disabled="pret.depart !== null">Valider départ</b-btn>
          <b-btn @click="setRenduPret(pret.id)" :disabled="pret.rendu !== null">Valider Arrivée</b-btn>
        </div>
      </b-card>


    </b-modal>

  </div>

</template>
<script>

import ajaxService from '@/services/ajaxService.js'
import moment from 'moment'
import utilsServices from '@/services/utilsServices.js'
//import ModalPictum from '@/components/ModalPictum.vue'
// Import this component
import datePicker from 'vue-bootstrap-datetimepicker'

// Import date picker css
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import param from '@/param/param.js'

export default {
  components: {datePicker},
  data () {
    return {
      listeMateriel: [],
      resToEdit: {
        date_debut: '',
        date_fin: '',
        id: 0,
        rendu: false,
        reservation: {
          nom: '',
          prenom: ''
        },
      },
      byMat: true,
      listeRes: [],
      optionsDatePicker: {
        locale: 'fr',
        format: 'YYYY-MM-DD HH:mm'
      }
    }
  },
  computed: {
    listMatNonRendu () {
      let listeMat = this.listeMateriel

      listeMat.forEach(function (mat) {
        mat.est_pretes = mat.est_pretes.filter(function (pret) {
          return pret.rendu === null
        })
      })

      //on enlève les materiels sans prêts
      listeMat = listeMat.filter(function (mat) {
        //console.log(res.est_pretes.length !== 0, res.est_pretes.length, res.est_pretes)
        return mat.est_pretes.length !== 0
      })

      return listeMat
    },
    listeResNonRendu () {
      let listeRes = this.listeRes

      //on enlève les prèts rendus
      listeRes.forEach(function (res) {
        res.est_pretes = res.est_pretes.filter(function (pret) {
          return pret.rendu === null
        })
      })

      //on enlève les réservations sans prêts
      listeRes = listeRes.filter(function (res) {
        //console.log(res.est_pretes.length !== 0, res.est_pretes.length, res.est_pretes)
        return res.est_pretes.length !== 0
      })

      return listeRes
    },
    now () {
      return moment()
    }
  },
  methods: {
    getMat () {
      this.listeMateriel = []
      this.listeRes = []
      ajaxService.getSingleApi('gestionnaires', this.$store.getters.getUser.id).then(result => {
        console.log(result)
        this.listeMateriel = result.data.materiels
        this.listeRes = result.data.rdv
        if (this.listeMateriel.length === 0) {
          this.$bvModal('Vous n\'avez pas de matériel à gérer... soit parce que vous n\'avez pas de département assigné ou parce qu\'il n\'y a pas de matériel assigné à votre département.')
        }
      })
    },
    isNotRegivenInTime (estprete) {
      let now = moment()
      let reponse =  moment(estprete.date_fin).isBefore(now);
      console.log({estprete}, reponse);
      return reponse;

    },
    editRes (payload) {
      this.resToEdit = utilsServices.getById(this.listeRes, payload)

      this.resToEdit.est_pretes.forEach(function (pret) {
        pret.edit = false
      })

      this.$bvModal.show('edit-res-modal')
    },
    setDepartPret (id) {
      let data = new FormData()
      data.append('action', 'depart')
      data.append('id_estprete', JSON.stringify([id]))

      ajaxService.putApi('estpretes', id, data).then(res => {
        this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + err.response.data).then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      })
    },
    setRenduPret (id) {
      let data = new FormData()
      data.append('action', 'rendu')
      data.append('id_estprete', JSON.stringify([id]))

      ajaxService.putApi('estpretes', id, data).then(res => {
        this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + err.response.data).then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      })
    },
    editPret (id) {
      let pret = utilsServices.getById(this.resToEdit.est_pretes, id)
      let data = new FormData()
      data.append('action', 'edit')
      data.append('id_estprete', JSON.stringify([id]))
      data.append('date_debut', pret.date_debut)
      data.append('date_fin', pret.date_fin)
      data.append('materiel_id', pret.materiel_id)

      ajaxService.putApi('estpretes', id, data).then(res => {
        this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + err.response.data).then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      })
    }
  },
  mounted () {
    this.getMat()

  }
}
</script>
