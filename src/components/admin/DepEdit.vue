<template>
  <modal-pictum title="Créer/Editer" :id-modal="idPerso" text-cancel-button="Fermer" :callback-ok="send" hide-footer >
    <b-form enctype="multipart/form-data" @submit.prevent="send">
      <b-input-group class="mb-2">
        <b-input placeholder="Nom" v-model="departement.nom" class="mr-2 border-primary " required :state="departement.nom.length > 1"></b-input>
      </b-input-group>

      <p>Sélectionnez le lieu de votre département en cliquant au bon endroit sur la carte :</p>
      <GmapMap
          :center="{lat:47.494859010132586, lng:6.803594665683859}"
          :zoom="17"
          style="height: 300px"
          class="w-100"
          @click="getCoordinate"
      >
      </GmapMap>
      <p >Coordonnées : <br/> <strong>Latitude = </strong>{{departement.lat}}, <br/> <strong>Longitude = </strong>{{departement.long}}</p>


      <label class="w-100">
        Gestionnaire :
        <b-select required v-model="departement.gestionnaire_id" class="mb-2 border-primary">
          <b-select-option value="" disabled> Choississez le gestionnaire associé</b-select-option>
          <b-select-option v-for="gest in gestionnaires" :value="gest.id" :key="gest.id" class="text-capitalize">{{ gest.nom }} {{ gest.prenom }}</b-select-option>
        </b-select>
      </label>

        <b-button type="submit" pill variant="outline-primary" class="m-auto" >{{ textSendButton }}</b-button>
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
    idPerso:{
      type:String,
      default:"modif-mat"
    },
    departement: {
      type: Object,
      default: function () {
        return {
          gestionnaire_id: '',
          nom: '',
          lat:0,
          long:0
        }
      }
    },
    mode:{
      type:String,
      required:true
    },
    callbackOk: {
      type: Function,
      required:true
    },
  },
  data () {
    return {
      gestionnaires:[],
      alertMessage:''
    }
  },
  computed: {
    textSendButton () {
      if(this.mode === "add"){
        return "Créer";
      } else if (this.mode==="modif"){
        return "Modifier";
      } else {
        return "Envoyer";
      }
    }
  },
  methods: {
    getCoordinate(event){
      let coord =  event.latLng.toJSON();
      console.log(coord)
      this.departement.lat = coord.lat;
      this.departement.long = coord.lng;
    },
    setGestionnaires () {
      ajaxService.getApi('gestionnaires')
          .then(result => {
            this.gestionnaires = result
          })
    },
    send(){
      if(this.mode==="add"){
        //console.log("add");
        let data = new FormData();
        data.append("lat",  this.departement.lat);
        data.append("nom", this.departement.nom);
        data.append("long", this.departement.long);
        data.append("gestionnaire_id", this.departement.gestionnaire_id);

        //console.log(data.get("ref"));

        this.alertMessage = param.messages.sending;

        ajaxService.postAPI("departements", data).then(response => {
          this.alertMessage = param.messages.stored + response;
          this.callbackOk;

        }).catch(error => {
          this.alertMessage = param.messages.problem + error;
          this.callbackOk;
        });

      }
      else if (this.mode==="modif"){
        console.log("modif")
      }
    },

  },
  mounted () {
    this.setGestionnaires();
  }
}
</script>
