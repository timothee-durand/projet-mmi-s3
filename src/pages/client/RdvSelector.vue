<template>
  <div class="c-card windowCard shadow p-5">
    <h2>{{titleText}}</h2>
    <p>{{ indicationText }}</p>
    <div v-if="stateOfSelection === 2">
      <p><strong>Rendez-vous de retrait du matériel :</strong> {{rdvRetrait | moment("DD/MM à HH:mm")}}</p>
      <p><strong>Rendez-vous de rendu du matériel :</strong> {{rdvRendu | moment("DD/MM à HH:mm")}}</p>
      <b-button-group v-if="stateOfSelection !==3">
        <b-button @click="tryAgain" variant="outline-danger" class="w-50">
          Sélectionner d'autres horaires
        </b-button>
        <b-button @click="validateRDV" variant="primary" class="w-50">
          Valider
        </b-button>
      </b-button-group>
    </div>
    <full-calendar-wrapper :events-perso="listeRdv" @selectRdv="selectEvent" v-if="stateOfSelection !== 2"></full-calendar-wrapper>
  </div>
</template>
<script>
import FullCalendarWrapper from '@/components/FullCalendarWrapper.vue'
import ajaxService from '@/services/ajaxService.js'
import moment from 'moment'
import utilsServices from '@/services/utilsServices.js'



export default {
  name: 'RdvSelector',
  components: {FullCalendarWrapper},
  props: {
    contientMaterielPro: {},
    dayRadio: {},
    getFormatedDate: {},
    getNextDays: {},
    motivation: {},
    sortedMat: {
      type: Object
    },
    departement:{}
  },
  data () {
    return {
      idRdv: 0,
      listeRdv:[],
      stateOfSelection:0,//0:retrait, 1:rendu, 2:fini
      rdvRetrait:"",
      rdvRendu:""
    }
  },
  computed: {
    indicationText () {
      let reponse = ""
      switch(this.stateOfSelection) {
        case 0:
          reponse = "Sélectionnez la date de retrait pour les objets du département : "+this.departement;
          break;
        case 1:
          reponse ="Sélectionnez la date de rendu pour les objets du département : "+this.departement;
          break;
        case 2:
          reponse = "Vous avez fini votre séletion pour "+this.departement
          break;
        default:
          reponse = "ERROR WITH STATE OF SELECTION"
      }
      return reponse;
    },
    titleText(){
      let reponse = ""
      switch(this.stateOfSelection) {
        case 0:
          reponse = "Date de retrait ";
          break;
        case 1:
          reponse ="Date de rendu "+this.departement;
          break;
        case 2:
          reponse = "Vérification"
          break;
        default:
          reponse = "ERROR WITH STATE OF SELECTION"
      }
      return reponse;
    }
  },
  methods: {
    getRdvFromMat () {
      let rdvDep = {}
      let reponse = []
      for (let [key, value] of Object.entries(this.sortedMat)) {
        console.log(key, value)
        //on  récupère les rendez-vous du gestionnaire du département correspondant

        ajaxService.getRdvGest(value.dep.gestionnaire_id, moment(this.$store.getters.getReservdateDebut).format('YYYY-MM-DD')).then(result => {
         // console.log({result})
          rdvDep[this.departement] = result;

          if(this.stateOfSelection === 0) {
            //on prend le jour de début
            let dayStart =  rdvDep[this.departement][0];
            dayStart.rdvMatin.forEach(function (rdv) {
              reponse.push(this.getEvent(dayStart.date_jour, rdv, dayStart.duree))
            }.bind(this))
            dayStart.rdvAm.forEach(function (rdv) {
              reponse.push(this.getEvent(dayStart.date_jour, rdv, dayStart.duree))
            }.bind(this))

          } else if(this.stateOfSelection === 1) {
           // console.log("Ajout RDV Rendu");
            //on itère sur le tableau des jours, puis des rdv pour les transformer et les ajouter à liste rdv si ils sont après le rdv de prise
            rdvDep[this.departement].forEach(function (day) {
              day.rdvMatin.forEach(function (rdv) {
                let event = this.getEvent(day.date_jour, rdv, day.duree);

                if(moment(this.rdvRetrait).isBefore(event.start))
                reponse.push(event)

              }.bind(this))
              day.rdvAm.forEach(function (rdv) {
                let event = this.getEvent(day.date_jour, rdv, day.duree);
                if(moment(this.rdvRetrait).isBefore(event.start))
                  reponse.push(event)
              }.bind(this))
            }.bind(this))
          }

         // console.log(reponse)
          this.listeRdv = reponse;

        }).catch(err => utilsServices.alertError(err, this))
      }

    },
    getEvent (day, hour, duree) {
      return {
        id: this.idRdv++,
        start: moment(`${day} ${hour}`, 'YYYY-MM-DD HH:mm').toDate(),
        end: moment(`${day} ${hour}`, 'YYYY-MM-DD HH:mm').add('minutes', duree).toDate(),
        editable: false,
      }
    },
    selectEvent(payload){
      if(this.stateOfSelection === 0) {
        this.$bvModal.msgBoxConfirm(`Êtes-vous sûrs de vouloir retirer votre matériel le ${this.$moment(payload.start).format("DD/MM/YYYY à HH:mm")} ?`, {
          okTitle:"Oui",
          cancelTitle:"Non"
        }).then(value=> {
          if(value) {
            this.addRdvDebut(payload.start)
          }
        })
      } else if (this.stateOfSelection === 1) {
        this.$bvModal.msgBoxConfirm(`Êtes-vous sûrs de vouloir rendre votre matériel le ${this.$moment(payload.start).format("DD/MM/YYYY à HH:mm")} ?`, {
          okTitle:"Oui",
          cancelTitle:"Non"
        }).then(value=> {
          if(value) {
            this.addRdvFin(payload.start, payload.end)
          }
        })
      }

    },
    addRdvDebut (start) {
      //on le stocke dans le store
      this.rdvRetrait = start
      //on passe en mode sélection rdv rendu
      this.stateOfSelection = 1;

      //on met a jour la liste des rdv
      this.getRdvFromMat();
    },

    addRdvFin(start) {
      //on le stocke dans le store
      this.rdvRendu = start
      //on passe en mode sélection rdv rendu
      this.stateOfSelection = 2;
    },
    tryAgain(){
      this.stateOfSelection = 0;
    },
    validateRDV(){
      this.$bvModal.msgBoxConfirm("Êtes-vous sûrs de vos rendez-vous ?", {
        okTitle:"Oui",
        cancelTitle:"Non"
      }).then(value=> {
        if(value) {
          this.$emit('rdvOK');
          this.stateOfSelection = 3;
          this.$store.commit("setRdvByDep", {
            dep:this.departement,
            rdvs:{
              date_debut:this.rdvRetrait,
              date_fin:this.rdvRendu
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getRdvFromMat();
  }
}
</script>
<style scoped>

h3 {
  font-size: 1rem;
  font-weight: bold;
}

.cardContent * {
  margin-right: 3%;
  margin-bottom: 0;
}

.cardContent > img {
  width: 10%;
}

.windowCard {
  min-height: 70vh;
  width: 95%;
}

/* Hide scrollbar for Chrome, Safari and Opera */

/* Hide scrollbar for IE, Edge and Firefox */
</style>
