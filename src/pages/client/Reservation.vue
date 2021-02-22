<template>
  <div>
    <SidebarClient sidebarWidth="15%">
      <div class="p-2 d-flex flex-column align-items-center">
        <span v-bind:class="{'text-white': true, activeStepper: checkifStateIs('selection')}">Sélection en cours</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
        <span v-if="contientMaterielPro"
              v-bind:class="{'text-white': true, activeStepper: checkifStateIs('motivation')}">Motivation</span>
        <div v-if="contientMaterielPro" class="border-left border-white mt-2 mb-2 separator"></div>
        <span v-bind:class="{'text-white': true, activeStepper: checkifStateIs('date-emprunt')}">Date d'emprunt</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
        <span v-bind:class="{'text-white': true, activeStepper: checkifStateIs('date-rendu')}">Date de rendu</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
        <span
            v-bind:class="{'text-white': true, activeStepper: checkifStateIs('lieu')}">Où récupérer mon matériel ?</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
      </div>
    </SidebarClient>

    <div v-if="checkState === 'selection'" class="containerRight">
      <div class="container-fluid p-4 selectionContainer">
        <b-row v-if="this.selectedMateriel" class="mb-5">

          <!-- Materiel -->
          <div v-for="materiel in this.selectedMateriel" :key="materiel.id" class="c-card p-3 col-12 mt-3 shadow"
               style="border-radius: 20px; background-color: #ffffff; overflow: hidden; height: 40%">
            <div class="d-flex flex-row align-items-center justify-content-between cardContent">
              <img :src="materiel.photo" alt="test" class="mr-4">
              <h3 style="width: 35%">{{ materiel.nom }}</h3>
              <div class="cardDesc usageView" style="overflow: scroll" v-html="materiel.usage"></div>
              <b-button v-on:click="deleteItemFromReservation(materiel.id)" variant="white" v-b-tooltip.hover.left
                        title="Retirer de la réservation" class="mr-0 ml-auto p-0"><i
                  class="fas fa-trash text-secondary"></i></b-button>
              <img v-if="materiel.pro === 1" v-b-tooltip.hover
                   title="Ce materiel sera soumis à une potentielle verification de compétences"
                   src="../../assets/img/ico_pro.png" alt="premimum" class="d-block ml-auto mr-0 float-right"
                   style="width: 25px; align-self: start">
              <div v-else class="d-block ml-auto mr-0 float-right" style="width: 25px; align-self: start"></div>
            </div>
          </div>

          <!-- Malettes -->
          <div v-for="malette in this.selectedMalette" :key="malette.id" class="c-card p-3 col-12 mt-3 shadow"
               style="border-radius: 20px; background-color: #ffffff; overflow: hidden; height: 40%">
            <div class="d-flex flex-row align-items-center justify-content-between cardContent">
              <img :src="malette.photo" alt="test" class="mr-4">
              <h3 style="width: 35%">{{ malette.nom }}</h3>
              <div class="cardDesc usageView" style="overflow: scroll"></div>
              <b-button v-on:click="deleteMaletteFromReservation(malette.id)" variant="white" v-b-tooltip.hover.left
                        title="Retirer de la réservation" class="mr-0 ml-auto p-0"><i
                  class="fas fa-trash text-secondary"></i></b-button>
              <div class="d-block ml-auto mr-0 float-right" style="width: 25px; align-self: start"></div>
            </div>
          </div>

        </b-row>
        <div class="position-fixed" style="right:40px; bottom: 40px">
          <b-button v-if="this.selectedMateriel !== null && this.selectedMateriel.length > 0 && contientMaterielPro"
                    pill variant="primary" @click="$router.push('motivation')">Continuer
          </b-button>
          <b-button v-if="this.selectedMateriel !== null && this.selectedMateriel.length > 0 && !contientMaterielPro"
                    pill variant="primary" @click="$router.push('rendez-vous')">Continuer
          </b-button>
        </div>
        <div v-if="this.selectedMateriel === null || this.selectedMateriel.length <= 0" style="height: 65vh;"
             class="w-100 d-flex align-items-center justify-content-center text-center">
          <p>Vous n'avez ajouté aucun contenu à votre réservation.<br>Vous pouvez en ajouter depuis la
            <router-link to="/search/Tous" style="text-decoration: underline" class="text-dark">recherche.</router-link>
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="checkState === 'motivation'"
         class="containerRight p-5 d-flex justify-content-center align-items-center">
      <div class="c-card windowCard shadow p-5">
        <h2>Emprunt de matériel professionnel</h2>

        <p>Afin d'emprunter du matériel professionnel, merci de présenter votre motivation ou une brève explication du
          projet.</p>
        <b-textarea placeholder="Motivation" v-model="motivation" class="mt-3 mb-3"
                    rows="8"></b-textarea>
        <p>Merci de décrire également vos connaissances et compétences (celles-ci seront soumises à un test
          potentiel).</p>
        <b-textarea placeholder="Compétences" v-model="competences" class="mt-3"
                    rows="8"></b-textarea>

        <b-button variant="primary" pill class="position-fixed" style="right:150px; bottom: 40px"
                  @click="$router.push('selection')">
          Retour
        </b-button>
        <b-button variant="primary" pill class="position-fixed" style="right:40px; bottom: 40px"
                  @click="$router.push('date-emprunt')">
          Continuer
        </b-button>
      </div>
    </div>

    <div v-else-if="checkState === 'date-emprunt' || checkState === 'date-rendu' "
         class="containerRight p-5 d-flex justify-content-center align-items-center">
      <RdvSelector v-for="res in resOrderByDep"
                   :key="res.dep.id"
                   :departement="res.dep.nom"
                   :contient-materiel-pro="contientMaterielPro"
                   :day-radio="resRdvOk"
                   :get-next-days="getNextDays()"
                   :motivation="motivation"
                   :sorted-mat="resOrderByDep"
                   class="mr-2"
                   @rdvOK = "addRdvOk()"
                   @updateSidebar = "updateSidebar()"
      />
      <b-button v-if="contientMaterielPro" variant="primary" pill class="position-fixed"
                style="right:150px; bottom: 40px"
                @click="$router.push('motivation')">
        Retour
      </b-button>
      <b-button v-else variant="primary" pill class="position-fixed" style="right:150px; bottom: 40px"
                @click="$router.push('selection')">
        Retour
      </b-button>
      <b-button v-if="resRdvOk >= Object.keys(resOrderByDep).length" variant="primary" pill class="position-fixed"
                style="right:40px; bottom: 40px"
                @click="$router.push('lieu')">
        Continuer
      </b-button>
      <b-button v-b-tooltip.hover title="Merci de selectionner une date de retour et des horaires appropriés" v-else
                disable pill class="position-fixed" style="right:40px; bottom: 40px">
        Continuer
      </b-button>
    </div>

    <div v-else-if="checkState === 'lieu'" class="containerRight  p-5 d-flex justify-content-center align-items-center">
      <div class="windowCard">
        <div class="d-flex">
          <div class="w-75 c-card shadow p-5" style="min-height: 70vh;">
            carte
          </div>
          <div class="ml-2 w-25 d-flex flex-column">
            <div class="c-card shadow p-5 w-100" style="flex-grow: 1; overflow-scrolling: auto">
              carte
            </div>
            <div class="c-card shadow p-5 mt-2 w-100" style="flex-grow: 1;">
              carte
            </div>
            <div class="c-card shadow p-5 mt-2 w-100" style="flex-grow: 1;">
              carte
            </div>
          </div>
        </div>
      </div>
      <b-button variant="primary" pill class="position-fixed" style="right:150px; bottom: 40px"
                @click="$router.push('date-emprunt')">
        Retour
      </b-button>
      <b-button variant="primary" pill class="position-fixed" style="right:40px; bottom: 40px"
                @click="envoyerFormulaire">
        Terminer
      </b-button>
    </div>

    <div v-else-if="checkState === 'Envoyé'"
         class="containerRight  p-5 d-flex justify-content-center align-items-center">
      <div class="c-card windowCard shadow p-5 d-flex flex-column align-items-center justify-content-center">
        <p>
          Votre requête a été prise en compte, merci !
        </p>
        <router-link to="/">
          <span class="text-center" style="text-decoration: underline">Retour au site</span>
        </router-link>
      </div>
      <b-button variant="primary" pill class="position-fixed" style="right:150px; bottom: 40px"
                @click="$router.push('lieu')">
        Retour
      </b-button>
    </div>

    <div v-else class="containerRight">
      <div class="w-100 h-100 d-flex justify-content-center align-items-center">Oh non ! Cette page n'existe pas (ou
        plus).
      </div>
      <b-modal visible centered title="Ho non !" id="Modal-NF" header-border-variant="light"
               footer-border-variant="light">
        <p>Ho non ! il semble que la page soit introuvable ou inexistante. :(</p>
        <template #modal-footer>
          <footer class="d-flex justify-content-around w-75 mx-auto">
            <b-button pill variant="primary ml-4" @click="sendOnSite">Retour au site</b-button>
          </footer>
        </template>
      </b-modal>
    </div>

  </div>
</template>

<script>
import SidebarClient from '@/components/SidebarClient'
import ajaxService from '@/services/ajaxService.js'
import utilsServices from '@/services/utilsServices.js'
//import param from '@/param/param.js'
import moment from 'moment'
import RdvSelector from '@/pages/client/RdvSelector.vue'

export default {
  name: 'Reservation',
  components: {
    RdvSelector,
    'SidebarClient': SidebarClient
  },
  data () {
    return {
      currentState: '',
      motivation: '',
      competences: '',
      allMateriels: [],
      allMalettes: [],
      selectedMateriel: [],
      selectedMalette: [],
      resRdvOk: 0,
    }
  },
  computed:
      {
        checkState () {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.currentState = this.$route.params.state
          return this.$route.params.state
        },
        contientMaterielPro () {
          if (this.selectedMateriel) {
            for (let i = 0; i < this.selectedMateriel.length; i++) {
              if (this.selectedMateriel[i].pro === 1) {
                return true
              }
            }
          }
          return false
        },
        resOrderByDep(){
          let reponse = {};
          // on s'occupe déjà des matériels
          this.selectedMateriel.forEach(function (mat) {
            // si le département est déjà dans le tableau
            if (mat.departement.id in reponse) {
              //on lui ajoute le matériel
              reponse[mat.departement.id]['mats'].push(mat)
            } else {
              //sinon on ajoute le département
              reponse[mat.departement.id] = {
                dep: mat.departement,
                mats: [
                  mat
                ],
                mals:[]
              }
            }
          });
          //ensuite on s'occupe des malettes
          this.selectedMalette.forEach(function (mat) {
            let key = mat.materiels[0].departement_id;
            console.log("key", key);

            // si le département est déjà dans le tableau
            if (key in reponse) {
              //on lui ajoute le matériel
              reponse[key]['mals'].push(mat)
            } else {
              //sinon on ajoute le département
              reponse[key] = {
                dep: mat.materiels[0].departement,
                mals: [
                  mat
                ]
              }
            }
          });

          return reponse

        }
      },
  methods:
      {
        sendOnSite () {
          //this.$router.go({ name: 'Reservation', params : { state:'selection'}});
          this.$router.push('selection')
        },
        getMateriel () {
          ajaxService.getAllApi('materiels').then(result => {
            this.allMateriels = result

            console.log(this.allMateriels)

            this.fetchMaterielInReservation()

          }).catch(error => console.log(error))
        },
        getMalette () {
          ajaxService.getAllApi('malettes').then(result => {
            this.allMalettes = result

            console.log(this.allMalettes)

            this.fetchMalettesInReservation()

          }).catch(error => console.log(error))
        },
        fetchMaterielInReservation () {
          this.selectedMateriel = []
          let reservationIdsMaterial = this.$store.getters.getCurrentMaterielsId

          //Rechercher le materiel dans la réservation grace a l'id
          for (let i = 0; i < reservationIdsMaterial.length; i++) {
            this.selectedMateriel.push(utilsServices.getById(this.allMateriels, reservationIdsMaterial[i]))
          }
        },
        fetchMalettesInReservation () {
          this.selectedMalette = []
          let reservationIdsMalette = this.$store.getters.getCurrentMalettesId

          //Rechercher le materiel dans la réservation grace a l'id
          for (let i = 0; i < reservationIdsMalette.length; i++) {
            this.selectedMalette.push(utilsServices.getById(this.allMalettes, reservationIdsMalette[i]))
          }
        },

        deleteItemFromReservation (id) {
          console.log('Retiré de la réservation')
          this.$store.commit('supprMaterielId', id)

          //mettre à jour
          this.fetchMaterielInReservation()
        },
        deleteMaletteFromReservation (id) {
          console.log('Retiré de la réservation')
          this.$store.commit('supprMaletteId', id)

          //mettre à jour
          this.fetchMalettesInReservation()
        },
        checkifStateIs (name) {
          return this.checkState === name
        },
        getNextDays () {
          console.log('debut')
          let result = []
          let reservdate = this.$store.getters.getReservdateDebut

          let i = 0
          for (let x = 0; x < 3; x++) {
            while (utilsServices.addDays(reservdate, x + i + 1) === 0) {
              i++
            }
            result.push(utilsServices.addDays(reservdate, i + x + 1))
          }
          console.log(result)
          return result
        },
        getFormatedDate(date){
          return moment(date).format("DD MMMM YYYY")
        },
        envoyerFormulaire () {
          this.$router.push('Envoyé')

          //Envoyer la requete
          //date = getNextDays()[dayRadio] (heure au pif, pas eu le temps pour recup les gestionnaires)
          //motivation
          //competence
          //liste materiel = selectedMateriel
          //liste malettes = selectedMalette
          if (!this.$store.getters.isGest) {
            let data = new FormData()
            data.append('action', 'one')
            data.append('id_materiels', JSON.stringify(this.$store.getters.getCurrentMaterielsId))
            data.append('id_malettes', JSON.stringify(this.$store.getters.getCurrentMalettesFromId))
            data.append('reservation_id', this.$store.getters.getUser.id)
            let dateDebut = this.$store.getters.getReservdateDebut;
            dateDebut = dateDebut + " 12:34:00";
            data.append('date_debut', dateDebut )
            let dateFin = moment(this.resRdvOk, "").format("YYYY-MM-DD");
            dateFin = dateFin  + " 12:34:00"
            data.append('date_fin', dateFin);

            console.log(dateDebut, dateFin);

            this.$bvModal.msgBoxOk('Êtes-vous sûrs de vouloir envoyer votre réservation ?').then(() => {
              ajaxService.postAPI('estpretes', data)
                  .then(result => {
                    utilsServices.alertResult(result, this, 'Réservation crée')
                    this.getMat()
                    //cleaner la reservation
                    this.$store.commit('cleanReserv')
                  }).catch(err => {
                utilsServices.alertError(err, this)                         //cleaner la reservation
              }
            )
            })
          } else {
            //on vérifie si une réservation est déjà crée
            let data = new FormData()
            data.append('username', this.$store.getters.getUser.id_univ)
            ajaxService.postAPI('verifyRes', data).then(result => {
              console.log(result);
              let data = new FormData()
              data.append('action', 'one')
              console.log('dlkjgljdfg' + this.$store.getters.getCurrentMaterielsId)
              data.append('id_materiels', JSON.stringify(this.$store.getters.getCurrentMaterielsId))
              data.append('id_malettes', JSON.stringify(this.$store.getters.getCurrentMalettesId))
              data.append('reservation_id', result.data.id)
              let dateDebut = this.$store.getters.getReservdateDebut;
              dateDebut = dateDebut + " 12:34:00";
              data.append('date_debut', dateDebut )
              let dateFin = moment(this.resRdvOk, "").format("YYYY-MM-DD");
              dateFin = dateFin  + " 12:34:00"
              data.append('date_fin', dateFin);

              this.$bvModal.msgBoxConfirm('Êtes-vous sûrs de vouloir envoyer votre réservation ?').then((value) => {
                if (value) {
                  ajaxService.postAPI('estpretes', data)
                      .then(result => {
                        utilsServices.alertResult(result, this, 'Réservation crée')
                        this.getMat()
                        //cleaner la reservation
                        this.$store.commit('cleanReserv')
                      }).catch(err => {
                    utilsServices.alertError(err, this) //cleaner la reservation
                  })
                }

              }).catch(err => utilsServices.alertError(err, this))

            })

          }
        },
        addRdvOk(){
          this.resRdvOk++;
          if(this.resRdvOk >= this.resOrderByDep.length) {
            //si on a tout validé on avance à lieu
            this.$router.push("lieu");
          }
          console.log("resorderbydep", this.resOrderByDep.length)
        },

        updateSidebar()
        {
          this.$router.push('date-rendu');
          console.log("hello update sidebar");
        }
      },
  mounted () {
    this.getMateriel()
    this.getMalette()
    console.log(this.resOrderByDep.length)
  }

}
</script>

<style scoped>

.containerRight {
  width: calc(100% - 15%);
  margin-left: 15%;
  min-height: calc(100vh - var(--header-height));
}

.separator:not(:last-of-type) {
  height: 100px;
}

.activeStepper {
  border-bottom: white 1px solid;
  font-weight: bold;
}

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

.cardDesc {
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  height: 70px;
  width: 30%;
}

.selectionContainer {
  min-height: calc(100vh - var(--header-height));
}

.windowCard {
  min-height: 70vh;
  width: 95%;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.usageView::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.usageView {
  text-overflow: unset;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  height: 40px;
}
</style>
