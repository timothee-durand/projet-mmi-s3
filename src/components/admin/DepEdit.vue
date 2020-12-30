<template>
  <modal-pictum title="Créer/Editer" :id-modal="idPerso" text-cancel-button="Fermer" :callback-ok="send" :on-show-method="setDepartement" hide-footer :on-close-method="onClose">
    <b-form  @submit.prevent="send">
      <b-input-group class="mb-2">
        <b-input placeholder="Nom" v-model="departement.nom" class="mr-2 border-primary " required
                 :state="departement.nom.length > 1"></b-input>
      </b-input-group>

      <p>Sélectionnez le lieu de votre département en cliquant au bon endroit sur la carte :</p>
      <GmapMap
          :center="centerMap"
          :zoom="17"
          style="height: 300px"
          class="w-100"
          @click="getCoordinate"
          ref="mapDep"
      >
        <gmap-marker  :position="{lat:this.departement.lat, lng:this.departement.long}" :clickable="true" :draggable="false" >
          <gmap-info-window :options="{content: this.departement.nom}" :position="{lat:this.departement.lat, lng:this.departement.long}" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
          </gmap-info-window>
        </gmap-marker>
      </GmapMap>
      <p>Coordonnées : <br/> <strong>Latitude = </strong>{{ departement.lat }}, <br/> <strong>Longitude
        = </strong>{{ departement.long }}</p>


      <label class="w-100">
        Gestionnaire :
        <b-select required v-model="departement.gestionnaire_id" class="mb-2 border-primary">
          <b-select-option value="" disabled> Choississez le gestionnaire associé</b-select-option>
          <b-select-option v-for="gest in gestionnaires" :value="gest.id" :key="gest.id" class="text-capitalize">
            {{ gest.nom }} {{ gest.prenom }}
          </b-select-option>
        </b-select>
      </label>

      <b-button type="submit" pill variant="outline-primary" class="m-auto">{{ textSendButton }}</b-button>
      <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>
    </b-form>
  </modal-pictum>
</template>
<script>
import ModalPictum from '@/components/ModalPictum.vue'
import ajaxService from '@/services/ajaxService.js'
import param from '@/param/param.js'

export default {
  name: 'dep-edit',
  components: {ModalPictum},
  props: {
    idPerso: {
      type: String,
      default: 'modif-mat'
    },
    mode: {
      type: String,
      required: true
    },
    callbackOk: {
      type: Function,
      required: true
    },
    idToEdit: {
      type: String
    },
    departementToEdit:{
      type:Object
    }
  },
  data () {
    return {
      gestionnaires: [],
      alertMessage: '',
      departement: {
        gestionnaire_id: '',
        nom: '',
        lat: 0,
        long: 0
      },
      centerMap:{lat:47.494859010132586, lng:6.803594665683859},
      infoWinOpen:true,
    }
  },
  computed: {
    textSendButton () {
      if (this.mode === 'add') {
        return 'Créer'
      } else if (this.mode === 'edit') {
        return 'Modifier'
      } else {
        return 'Envoyer'
      }
    },
  },
  methods: {
    getCoordinate (event) {
      let coord = event.latLng.toJSON()
      console.log(coord)
      this.departement.lat = coord.lat
      this.departement.long = coord.lng
    },
    setGestionnaires () {
      ajaxService.getAllApi('gestionnaires')
          .then(result => {
            this.gestionnaires = result
          })
    },
    send () {

      //console.log("add");
      let data = new FormData()
      data.append('lat', this.departement.lat)
      data.append('nom', this.departement.nom)
      data.append('long', this.departement.long)
      data.append('gestionnaire_id', this.departement.gestionnaire_id)

      console.log(data.values());

      this.alertMessage = param.messages.sending
      if (this.mode === 'add') {
        ajaxService.postAPI('departements', data).then(response => {
          this.alertMessage = param.messages.stored + response
          this.callbackOk

        }).catch(error => {
          this.alertMessage = param.messages.problem + error
          this.callbackOk
        })

      } else if (this.mode === 'edit') {
        data.append("_method", "PUT");
        console.log(JSON.stringify(data));
        ajaxService.putApi('departements', this.departement.id, data).then(response => {
          this.alertMessage = param.messages.stored + response
          this.callbackOk

        }).catch(error => {
          this.alertMessage = param.messages.problem + error
          this.callbackOk
        })
      }
    },
    setDepartement () {
      this.alertMessage = ''
      if (this.mode === 'edit') {
        this.departement = this.departementToEdit;
        this.centerMap.lat = this.departement.lat;
        this.centerMap.lng = this.departement.long;
      } else {
        this.departement ={
          gestionnaire_id: '',
          nom: '',
          lat: 0,
          long: 0
        }
      }

    },
    onClose(){
      console.log("zo")
      this.departement = null;
    },

  },
  mounted () {
    this.setGestionnaires()

  }

}
</script>
