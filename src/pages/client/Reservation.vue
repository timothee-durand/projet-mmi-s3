<template>
  <div>
    <SidebarClient sidebarWidth="15%">
      <div class="p-2 d-flex flex-column align-items-center">
        <span class="text-white activeStepper">Sélection en cours</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
        <span class="text-white">Motivation</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
        <span class="text-white">Rendez-vous</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
        <span class="text-white">Où récupérer mon matériel ?</span>
        <div class="border-left border-white mt-2 mb-2 separator"></div>
      </div>
    </SidebarClient>

    <div v-if="checkState === 'selection'" class="containerRight">
      <div class="container-fluid p-4 selectionContainer">
      <b-row v-if="this.selectedMateriel" class="mb-5">

        <div v-for="materiel in this.selectedMateriel" :key="materiel.id" class="c-card p-3 col-12 mt-3 shadow"
             style="border-radius: 20px; background-color: #ffffff; overflow: hidden; height: 40%">
          <div class="d-flex flex-row align-items-center justify-content-between cardContent">
            <img :src="materiel.photo" alt="test" class="mr-4">
            <h3>{{materiel.nom}}</h3>
            <div class="cardDesc h-auto usageView" style="overflow: scroll" v-html="materiel.usage"></div>
              <b-button variant="white" v-b-tooltip.hover.left title="Retirer de la réservation" class="mr-0 ml-auto p-0"><i class="fas fa-trash text-secondary"></i></b-button>
              <img src="https://placekitten.com/20/20" alt="premimum" class="d-block ml-auto mr-0 float-right" style="width: 25px; align-self: start">
          </div>

        </div>


      </b-row>
      <div class="position-fixed" style="right:40px; bottom: 40px">
        <b-button pill variant="primary" @click="$router.push('motivation')">Continuer</b-button>
      </div>
    </div>
    </div>

    <div v-else-if="checkState === 'motivation'" class="containerRight p-5 d-flex justify-content-center align-items-center">
      <div class="c-card windowCard shadow p-5">
        <h2>Emprunt de matériel professionnel</h2>

          <p>Afin d'emprunter du matériel professionnel, merci de présenter votre motivation ou une brève explication du projet.</p>
          <b-textarea placeholder="Motivation" v-model="motivation" class="mt-3 mb-3"
                      rows="8"></b-textarea>
          <p>Merci de décrire également vos connaissances et compétences (celles-ci seront soumises à un test potentiel).</p>
          <b-textarea placeholder="Compétences" v-model="competences" class="mt-3"
                      rows="8"></b-textarea>

          <b-button variant="primary" pill class="position-fixed" style="right:150px; bottom: 40px"
                    @click="$router.push('selection')">
            Retour
          </b-button>
          <b-button variant="primary" pill class="position-fixed" style="right:40px; bottom: 40px"
                    @click="$router.push('rendez-vous')">
            Continuer
          </b-button>
      </div>
    </div>

    <div v-else-if="checkState === 'rendez-vous'" class="containerRight p-5 d-flex justify-content-center align-items-center">
      <div class="c-card windowCard shadow p-5">
        <h2>Date de retrait du matériel</h2>

        <p>Choisissez le créneaux à partir duquel vous pouvez récupérer votre matériel.</p>
        <label class="mr-2" >Mardi 12 octobre --</label>
        <b-form-select
                id="inline-form-time-picker"
                class="mb-2 mr-sm-2 mb-sm-0"
                style="width: min-content"
                :options="[{ text: 'Heure', value: null }, '12h', '13h', '14h']"
                :value="null"
        ></b-form-select>
        <b-form-select
                id="inline-form-time-picker2"
                class="mb-2 mr-sm-2 mb-sm-0"
                style="width: min-content"
                :options="[{ text: 'Minutes', value: null }, '00', '15', '30']"
                :value="null"
        ></b-form-select>

        <h2 class="mt-5">Date de rendu du matériel</h2>
        <p>Choisissez le créneaux à partir duquel vous souhaitez rendre votre matériel.</p>

        <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">
          <label class="mr-2" >Mardi 12 octobre --</label>
          <b-form-select
                  id="inline-form-time-picker"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  style="width: min-content"
                  :options="[{ text: 'Heure', value: null }, '12h', '13h', '14h']"
                  :value="null"
          ></b-form-select>
          <b-form-select
                  id="inline-form-time-picker2"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  style="width: min-content"
                  :options="[{ text: 'Minutes', value: null }, '00', '15', '30']"
                  :value="null"
          ></b-form-select>
        </b-form-checkbox>
        <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">
          <label class="mr-2" >Mardi 12 octobre --</label>
          <b-form-select
                  id="inline-form-time-picker"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  style="width: min-content"
                  :options="[{ text: 'Heure', value: null }, '12h', '13h', '14h']"
                  :value="null"
          ></b-form-select>
          <b-form-select
                  id="inline-form-time-picker2"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  style="width: min-content"
                  :options="[{ text: 'Minutes', value: null }, '00', '15', '30']"
                  :value="null"
          ></b-form-select>
        </b-form-checkbox>
        <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0 m-auto d-flex align-items-center">
          <label class="mr-2" >Mardi 12 octobre --</label>
          <b-form-select
                  id="inline-form-time-picker"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  style="width: min-content"
                  :options="[{ text: 'Heure', value: null }, '12h', '13h', '14h']"
                  :value="null"
          ></b-form-select>
          <b-form-select
                  id="inline-form-time-picker2"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  style="width: min-content"
                  :options="[{ text: 'Minutes', value: null }, '00', '15', '30']"
                  :value="null"
          ></b-form-select>
        </b-form-checkbox>

        <b-button variant="primary" pill class="position-fixed" style="right:150px; bottom: 40px"
                  @click="$router.push('motivation')">
          Retour
        </b-button>
        <b-button variant="primary" pill class="position-fixed" style="right:40px; bottom: 40px"
                  @click="$router.push('lieu')">
          Envoyer
        </b-button>
      </div>
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
                @click="$router.push('rendez-vous')">
        Retour
      </b-button>
      <b-button variant="primary" pill class="position-fixed" style="right:40px; bottom: 40px"
                @click="$router.push('Envoyé')">
        Terminer
      </b-button>
    </div>

    <div v-else class="containerRight">
      <div class="w-100 h-100 d-flex justify-content-center align-items-center">Oh non ! Cette page n'existe pas (ou plus).</div>
      <b-modal visible centered title="Ho non !" id="Modal-NF" header-border-variant="light" footer-border-variant="light">
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

export default {
  name: 'Reservation',
  components: {
    'SidebarClient': SidebarClient
  },
  data(){
    return{
      currentState: "",
      motivation: "",
      competences: "",
      allMateriels : [],
      selectedMateriel: [],
    }
  },
  computed:
  {
    checkState()
    {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentState = this.$route.params.state;
      return this.$route.params.state;
    }
  },
  methods:
  {
    sendOnSite(){
      //this.$router.go({ name: 'Reservation', params : { state:'selection'}});
      this.$router.push('selection')
    },
    getMateriel() {
        ajaxService.getAllApi("materiels").then(result => {
            this.allMateriels = result;

          console.log(this.allMateriels);
          let reservationIdsMaterial = this.$store.getters.getCurrentMaterielsId;

            //Rechercher le materiel dans la réservation grace a l'id
            for(let i = 0; i < reservationIdsMaterial.length; i++ )
            {
              this.selectedMateriel.push(utilsServices.getById(this.allMateriels, reservationIdsMaterial[i]));
            }
        }).catch(error => console.log(error))
    },
  },
  mounted() {
    this.getMateriel();
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

  .cardContent *
  {
    margin-right: 10%;
    margin-bottom: 0;
  }
  .cardContent>img
  {
    width: 10%;
  }

  .cardDesc
  {
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    height: 70px;
    width: 30%;
  }

  .selectionContainer
  {
    min-height: calc( 100vh - var(--header-height));
  }

  .windowCard
  {
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
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
