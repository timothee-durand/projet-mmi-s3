<template>
  <modal-pictum title="Créer/Editer" :id-modal="idPerso" text-cancel-button="Fermer" :callback-ok="send" hide-footer :on-show-method="setMalette">
    <b-form enctype="multipart/form-data" @submit.prevent="send">

      <b-input-group class="mb-2">
        <b-input placeholder="Nom" v-model="kit.nom" class="mr-2 border-primary " required :state="kit.nom.length > 6"></b-input>
        <b-input placeholder="Référence" v-model="kit.ref" class="border-primary " required :state="kit.ref.length > 6"></b-input>
      </b-input-group>

        <p class="m-0 mt-2">Photo : (Attention n'accepte que les images !)<br/> </p>
        <b-img :src="kit.photo" fluid></b-img>
        <b-form-file id="input-mat-photo" accept="image/*" class="d-block border-primary"  placeholder="Choisissez ou glissez-déposez"  :required="mode!=='edit'" browse-text="Choisir" drop-placeholder="Glissez-ici"></b-form-file>

        <b-button type="submit" pill variant="outline-primary" class="m-auto" >{{ textSendButton }}</b-button>

        <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>
    </b-form>
  </modal-pictum>
</template>
<script>
import ModalPictum from '@/components/ModalPictum.vue'
import ajaxService from '@/services/ajaxService.js'
import param from '@/param/param.js'
import utilsServices from '@/services/utilsServices.js'


export default {
  name: 'kit-edit',
  components: {ModalPictum},
  props: {
    idPerso:{
      type:String,
      default:"modif-mat"
    },
    mode:{
      type:String,
      required:true
    },
    callbackOk: {
      type: Function,
      required:true
    },
    kitToEdit:{
      type:Object
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
  data () {
    return {
      alertMessage: '',
      kit:{
        nom:"",
        photo:"",
        ref:""
      }
    }
  },
  methods: {
    send(){
      let data = new FormData();
      data.append("nom", this.kit.nom);
      data.append("ref", this.kit.ref);
      if(document.querySelector('#input-mat-photo').files.length !== 0) {
        data.append("photo", document.querySelector('#input-mat-photo').files[0]);
      }

      if(this.mode==="add"){
        //console.log("add");



        this.alertMessage = param.messages.sending;
        ajaxService.postAPI("malettes", data).then(response => {
          this.alertMessage = param.messages.stored + response;
          this.callbackOk;

        }).catch(error => {
          this.alertMessage = param.messages.problem + utilsServices.getCoolestError(error);
          this.callbackOk;
        });

      }
      else if (this.mode==="edit"){
        ajaxService.putApi("malettes", this.kit.id, data).then(response => {
          this.alertMessage = param.messages.stored + response;
          this.callbackOk;

        }).catch(error => {
          this.alertMessage = param.messages.problem + utilsServices.getCoolestError(error);
          this.callbackOk;
        });
      }
    },
    setMalette(){
      this.alertMessage = '';
      if(this.mode=== "edit"){
        this.kit = this.kitToEdit;
      } else {
        this.kit = {
          nom:"",
          photo:"",
          ref:""
        };
      }

    }

  },

}
</script>
