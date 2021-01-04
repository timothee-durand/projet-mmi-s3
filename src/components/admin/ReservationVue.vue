<template>
  <!--  <scheduler :materiels="listeMateriel"></scheduler>-->
  <div>
    <div class="d-inline-flex justify-content-between w-100 mx-auto mb-3">
      <b-btn-group>
        <b-btn @click="byMat = true" :pressed="byMat" variant="primary">Par Matériel</b-btn>
        <b-btn @click="byMat = false" :pressed="!byMat" variant="primary">Par Réservation</b-btn>
      </b-btn-group>
      <div>
        <b-button type="button" variant="primary" @click="$bvModal.show('add-res-modal')" size="sm" class="mr-2">
          <b-icon-plus variant="light"></b-icon-plus>
        </b-button>
        <b-button type="button" variant="primary" @click="getMat" size="sm">
          <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
        </b-button>
      </div>

    </div>

    <!--Par matériel-->
    <b-row v-if="byMat">
      <b-col cols="12" v-for="materiel in listMatNonRendu" :key="'mat-'+materiel.id">
        <b-card class="mb-3">
          <div class="d-flex align-items-center justify-content-between">
            <b-img rounded="circle" :src="materiel.photo" width="40"></b-img>
            <p class="m-0 ml-3"><strong>{{ materiel.nom }}</strong></p>
            <p>Lieu :<em> {{ materiel.departement.nom }}</em></p>
          </div>
          <div class="d-flex flex-column mt-2">
            <b-row>
              <b-col cols="12" v-for="pret in materiel.est_pretes" :key="'pr-'+pret.id">
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
            <div>
              <b-icon-check-circle variant="danger" v-if=" res.valide === 0"></b-icon-check-circle>
              <b-btn variant="light" @click="editRes(res.id)">
                <b-icon-pencil-fill variant="primary"></b-icon-pencil-fill>
              </b-btn>
            </div>

          </div>
          <div class="d-flex flex-column mt-2">
            <b-row>
              <b-col cols="12" v-for="pret in res.est_pretes" :key="'pr2-'+pret.id">

                <b-card size="sm" body-class="p-2 flex-row d-flex justify-content-between" class=" mb-2">
                  <p class="m-0 w-75 p-0 d-block"><span class="text-primary"
                                                        :class="{'text-black-50':pret.depart !== null}">
                    {{ pret.date_debut | dateFormat }}</span> - <span class="text-danger">{{
                      pret.date_fin | dateFormat
                    }}</span> |
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

    <!--Edition réservation-->
    <b-modal hide-footer title="Edition réservation" ref="edit-res-modal" id="edit-res-modal" size="lg">
      <div class="d-flex justify-content-between w-50">
        <p><strong>Emprunteur : </strong>{{ resToEdit.nom }} {{ resToEdit.prenom }}</p>
        <b-btn variant="primary" to="/mails">
          <b-icon-mailbox></b-icon-mailbox>
        </b-btn>
      </div>
      <hr/>
      <p class="mb-1"><strong>Validation Réservation</strong></p>
      <p><em>L'utilisateur sera notifié.</em></p>
      <p v-if="resToEdit.valide === 0"><em>Raison invoquée pour le prêt :</em><br/>{{ resToEdit.raison_pro }}</p>
      <b-btn @click="validateRes(resToEdit.id)">{{ textValideButton }}</b-btn>
      <hr/>
      <p><strong>Prêts en cours :</strong></p>
      <b-card body-class="p-2 align-items-center" class="pret mb-2" v-for="pret in resToEdit.est_pretes" :key="'pr3-'+pret.id">
        <b-form class="d-flex justify-content-between" @submit.prevent="editPret(pret.id)">
          <b-form-group label="Matériel" class="mr-2">
            <b-select v-model="pret.materiel_id">
              <b-select-option v-for="mat in listeMateriel" :key="'mat2-'+mat.id" :value="mat.id">{{ mat.nom }}
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
          <b-btn @click="openModalRenduPret(pret)" :disabled="pret.rendu !== null || pret.depart === null">Valider
            Arrivée
          </b-btn>
          <b-btn @click="delPret(pret.id)" class="bg-danger">Annuler le prêt</b-btn>
        </div>
      </b-card>
    </b-modal>

    <!--    Ajout réservation -->
    <b-modal hide-footer title="Ajout réservation" id="add-res-modal" size="lg">
      <b-form class="" @submit.prevent="addRes">

        <b-form-group label="Emprunteur">
          <b-select v-model="resToAdd.id">
            <b-select-option v-for="reservation in listeResTotale" :key="reservation.id" :value="reservation.id">
              {{ reservation.nom }} {{ reservation.prenom }}
            </b-select-option>
          </b-select>
        </b-form-group>
        <hr/>
        <b-form-group label="Validation" >
          <p><em>Validée par défault</em></p>
        </b-form-group>
        <hr/>
        <div>
          <div class="d-inline-flex justify-content-between w-100 mb-2">
            <p>Prêts :</p>
            <b-btn  variant="primary" size="sm" @click="resToAdd.est_pretes.push({...estPreteBase})">
              <b-icon-plus></b-icon-plus>
            </b-btn>
          </div>


          <b-card body-class="p-2 align-items-center d-flex justify-content-between" class="pret mb-2" v-for="(pret, index) in resToAdd.est_pretes"
                  :key="index">
            <b-form-group label="Matériel" class="mr-2">
              <b-select v-model="pret.materiel_id">
                <b-select-option v-for="mat in listeMateriel" :key="mat.id" :value="mat.id">{{ mat.nom }}
                </b-select-option>
              </b-select>
            </b-form-group>
            <b-form-group label="Date Début" class="mr-3 w-50">
              <date-picker :config="optionsDatePicker" v-model="pret.date_debut"></date-picker>
            </b-form-group>
            <b-form-group label="Date Fin" class="w-50">
              <date-picker :config="optionsDatePicker" v-model="pret.date_fin"></date-picker>
            </b-form-group>


            <b-btn  variant="danger" size="sm" @click="resToAdd.est_pretes.splice(index, 1)" class="ml-2">
              <b-icon-dash></b-icon-dash>
            </b-btn>

          </b-card>
        </div>
        <b-alert v-if="alertMessage.length > 0">{{alertMessage}}</b-alert>
        <b-btn type="submit" variant="outline-primary">Enregister</b-btn>
      </b-form>
    </b-modal>

    <b-modal hide-footer title="Rendu matériel" id="rendu-mat-modal">
      <p>Êtes-vous sûrs de vouloir rendre ce matériel ?</p>
      <b-form @submit.prevent="setRenduPret(rendu.pret_id)">
        <b-form-group class="border-primary border rounded p-3">
          <p>Quel est l'état du matériel ?</p>
          <b-radio-group :options="rendu.optionsRadio" stacked v-model="rendu.indisp" required>
          </b-radio-group>
          <b-select v-model="rendu.raisonSelect" :options="rendu.optionsSelect" :disabled="rendu.indisp === 0"
                    :required="rendu.indisp === 1"></b-select>
          <b-textarea v-if="rendu.raisonSelect === -1" :required="rendu.indisp === 1 && rendu.raisonSelect === -1"
                      v-model="rendu.raison" placeholder="Quel est le problème ?"
                      :disabled="rendu.indisp === 0"></b-textarea>
        </b-form-group>
        <div class="d-inline-flex justify-content-between w-100 px-3">
          <b-btn variant="outline-danger" class="mx-auto d-block" @click="$bvModal.hide('rendu-mat-modal')">Annuler
          </b-btn>
          <b-btn type="submit" variant="primary" class="mx-auto d-block"> Valider</b-btn>
        </div>

      </b-form>
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

//https://stackoverflow.com/a/840812
//pour retirer les doublons
Array.prototype.unique = function () {
  var r = new Array();
  o:for(var i = 0, n = this.length; i < n; i++)
  {
    for(var x = 0, y = r.length; x < y; x++)
    {
      if(r[x].id==this[i].id)
      {
        continue o;
      }
    }
    r[r.length] = this[i];
  }
  return r;
}


export default {
  components: {datePicker},
  data () {
    return {
      listeMateriel: [],
      listeResTotale:[],
      resToAdd: {
        valide:false,
        id: 0,
        nom:'',
        prenom:'',
        est_pretes:[
          {
            materiel_id:0,
            date_debut:'',
            date_fin:''
          }
        ]
      },
      alertMessage:'',
      resToEdit: {
        date_debut: '',
        date_fin: '',
        id: 0,
        raison_pro:'',
        rendu: false,
        reservation: {
          nom: '',
          prenom: ''
        },
      },
      estPreteBase: {
        materiel_id:0,
        date_debut:'',
        date_fin:''
      },
      byMat: true,
      listeRes: [],
      optionsDatePicker: {
        locale: 'fr',
        format: 'YYYY-MM-DD HH:mm'
      },
      rendu: {
        indisp: 0,
        mat_id: 0,
        pret_id: 0,
        raison: '',
        raisonSelect: 0,
        optionsRadio: [
          {text: 'Bon état', value: 0},
          {text: 'Problèmes', value: 1}
        ],
        optionsSelect: [
          {text: 'Sélectionnez votre problème', value: 0, disabled: true},
          {text: 'Casse', value: 1},
          {text: 'Batterie non chargée', value: 2},
          {text: 'Manque accessoire', value: 3},
          {text: 'Déterioration', value: 3},
          {text: 'Autre', value: -1},
        ]
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

      listeMat = listeMat.unique();

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

      listeRes = listeRes.unique()
      return listeRes
    },
    selectIndispRaisonText () {
      let text = this.rendu.optionsSelect.find(function (opt) {
        console.log(opt.value === this.rendu.raisonSelect, opt.value, this.rendu.raisonSelect)
        return opt.value === this.rendu.raisonSelect
      }.bind(this))
      return text.text
    },
    indispRaison () {
      if (this.rendu.raisonSelect !== -1) {
        //si c'est pas autre
        return this.selectIndispRaisonText
      } else {
        return this.rendu.raison
      }
    },
    textValideButton () {
      if (this.resToEdit.valide === 0) {
        return 'Valider réservation'
      } else {
        return 'Invalider réservation'
      }
    }
  },
  methods: {
    getMat () {
      this.listeMateriel = []
      this.listeRes = []
      this.listeResTotale = [];
      ajaxService.getAllApi("reservations").then(result => {
        this.listeResTotale = result;
      }).catch(err => utilsServices.alertError(err, this));

      ajaxService.getSingleApi('gestionnaires', this.$store.getters.getUser.id).then(result => {
        //console.log(result)
        this.listeMateriel = result.data.materiels.unique()
        this.listeRes = result.data.rdv.unique()
        if (this.listeMateriel.length === 0) {
          this.$bvModal.msgBoxOk('Vous n\'avez pas de matériel à gérer... soit parce que vous n\'avez pas de département assigné ou parce qu\'il n\'y a pas de matériel assigné à votre département.')
        }
      })
    },
    isNotRegivenInTime (estprete) {
      let now = moment()
      let reponse = moment(estprete.date_fin).isBefore(now)
      // console.log({estprete}, reponse)
      return reponse

    },
    editRes (payload) {
      this.resToEdit = utilsServices.getById(this.listeRes, payload)

      this.resToEdit.est_pretes.forEach(function (pret) {
        pret.edit = false
      })

      this.$bvModal.show('edit-res-modal')
    },
    setDepartPret (id) {
      this.$bvModal.msgBoxConfirm('Êtes-vous surs de vouloir valider le départ ce de matériel ?').then(value => {
        if (value) {
          let data = new FormData()
          data.append('action', 'depart')
          data.append('id_estprete', JSON.stringify([id]))

          ajaxService.putApi('estpretes', id, data).then(res => {
            this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(this.$bvModal.hide('edit-res-modal'))
            this.getMat()
          }).catch(err => {
            this.$bvModal.msgBoxOk(param.messages.problem + utilsServices.getCoolestError(err)).then(this.$bvModal.hide('edit-res-modal'))
            this.getMat()
          })
        }
      })

    },
    openModalRenduPret (pret) {
      this.rendu.mat_id = pret.materiel.id
      this.rendu.pret_id = pret.id
      this.$bvModal.show('rendu-mat-modal')
    },
    setRenduPret (id) {
      let data = new FormData()
      data.append('action', 'rendu')
      data.append('id_estprete', JSON.stringify([id]))

      ajaxService.putApi('estpretes', id, data).then(res => {
        this.$bvModal.msgBoxOk('Le prêt a bien été signalé comme rendu' + '(' + res + ')').then(value => {
          console.log(value)
          this.$bvModal.hide('edit-res-modal')
          if (this.rendu.indisp === 1) {
            let data = new FormData()
            data.append('indisp', 1)
            data.append('indisp_raison', this.indispRaison)

            console.log('id', this.rendu.mat_id)
            ajaxService.putApi('materiels', this.rendu.mat_id, data).then(res => {
              // eslint-disable-next-line no-unused-vars
              this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(value => {
                this.$bvModal.hide('edit-res-modal')
                this.$bvModal.hide('rendu-mat-modal')
              })
            }).catch(err => {
              // eslint-disable-next-line no-unused-vars
              this.$bvModal.msgBoxOk(param.messages.problem + utilsServices.getCoolestError(err)).then(value => {
                this.$bvModal.hide('edit-res-modal')
                this.$bvModal.hide('rendu-mat-modal')
              })

            })
          }
        })
        this.getMat()
        //si il faut mettre le matériel en indisponible

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
        this.$bvModal.msgBoxOk(param.messages.problem + utilsServices.getCoolestError(err)).then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      })
    },
    delPret (id) {

      ajaxService.delApi('estpretes', id).then(res => {
        this.$bvModal.msgBoxOk('Ce prêt a bien été annulé !' + '(' + res + ')').then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      }).catch(err => {
        this.$bvModal.msgBoxOk('Il y a eu un problème :' + utilsServices.getCoolestError(err)).then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      })
    },
    validateRes () {
      let data = new FormData()
      if (this.resToEdit.valide === 0) {
        data.append('valide', 1)
      } else {
        data.append('valide', 0)
      }

      ajaxService.putApi('reservations', this.resToEdit.id, data).then(res => {
        this.$bvModal.msgBoxOk(param.messages.success + '(' + res + ')').then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      }).catch(err => {
        this.$bvModal.msgBoxOk(param.messages.problem + utilsServices.getCoolestError(err)).then(this.$bvModal.hide('edit-res-modal'))
        this.getMat()
      })
    },
    addRes(){
      let data = new FormData();
      data.append("action", "few")
      data.append("materiels", JSON.stringify(this.resToAdd.est_pretes))
      data.append("reservation_id", this.resToAdd.id)


      this.alertMessage = param.messages.sending;
      ajaxService.postAPI("estpretes", data)
          .then(result => {
            utilsServices.alertResult(result, this, 'Réservation crée')
            this.$bvModal.hide("add-res-modal");
            this.getMat()
          }).catch(err => utilsServices.alertError(err, this));

    }


  },
  mounted () {
    this.getMat()

  }
}
</script>
