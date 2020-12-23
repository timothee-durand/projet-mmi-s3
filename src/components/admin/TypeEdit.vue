<template>
  <modal-pictum title="Créer/Editer" :id-modal="idPerso" text-cancel-button="Fermer" :callback-ok="send" hide-footer >
    <b-form enctype="multipart/form-data" @submit.prevent="send">

        <b-input placeholder="Nom" v-model="type.nom" class="mr-2 border-primary " required :state="type.nom.length > 4"></b-input>

        <p class="m-0 mt-2">Pictogramme : (Attention n'accepte que les images !)<br/> </p>
        <b-form-file id="input-mat-photo" accept="image/*" class="d-block border-primary"  placeholder="Choisissez ou glissez-déposez"  required browse-text="Choisir" drop-placeholder="Glissez-ici"></b-form-file>

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
  name: 'type-edit',
  components: {ModalPictum},
  props: {
    idPerso:{
      type:String,
      default:"modif-mat"
    },
    type: {
      type: Object,
      default: function () {
        return {
          nom:"",
          picto:""
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
  data () {
    return {
      alertMessage: ''
    }
  },
  methods: {
    send(){
      if(this.mode==="add"){
        //console.log("add");
        let data = new FormData();
        data.append("nom", this.type.nom);
        data.append("picto", document.querySelector('#input-mat-photo').files[0]);


        this.alertMessage = param.messages.sending;
        ajaxService.postAPI("types", data).then(response => {
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

}
</script>
