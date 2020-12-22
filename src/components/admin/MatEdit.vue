<template>
  <modal-pictum title="Créer/Editer" :id-modal="idPerso" text-cancel-button="Fermer" :callback-ok="send" hide-footer >
    <b-form enctype="multipart/form-data" @submit.prevent="send">
      <b-input-group class="mb-2">
        <b-input placeholder="Nom" v-model="materiel.nom" class="mr-2 border-primary " required :state="materiel.nom.length > 6"></b-input>
        <b-input placeholder="Référence" v-model="materiel.ref" class="border-primary " required :state="materiel.ref.length > 6"></b-input>
      </b-input-group>

      <b-textarea required  placeholder="Caractéristiques" v-model="materiel.caracteristiques" class="mb-2 border-primary"></b-textarea>
      <b-textarea required placeholder="Pour quoi faire ?" v-model="materiel.usage" class="mb-2 border-primary"></b-textarea>

      <label class="w-100">Malette : <br/>
        <b-select required  v-model="materiel.malette_id" class="mb-2 border-primary">
          <b-select-option value="" disabled > Choissisez une malette</b-select-option>
        <b-select-option value=-1> Pas dans une malette</b-select-option>
        <b-select-option v-for="malette in malettes" :value="malette.id" :key="malette.id">{{malette.ref }}</b-select-option>
      </b-select>
      </label>



      <label class="w-100">
        Département :<br/>
        <b-select required v-model="materiel.departement_id" class="mb-2 border-primary">
          <b-select-option value="" disabled > Choissisez un département</b-select-option>
          <b-select-option v-for="dep in departements" :value="dep.id" :key="dep.id">{{dep.nom }}</b-select-option>
        </b-select>
      </label>

      <label class="w-100">
        Type :
        <b-select required v-model="materiel.type_id" class="mb-2 border-primary">
          <b-select-option value="" disabled> Choississez le type de matériel</b-select-option>
          <b-select-option v-for="type in types" :value="type.id" :key="type.id">{{type.nom }}</b-select-option>
        </b-select>
      </label>

      <div class="w-100 d-flex flex-column">
        <div class="w-100 d-inline-flex justify-content-between mb-2 align-items-center">
          <p>Tutos :</p><b-button type="button" @click="addTuto" variant="primary">+</b-button>
        </div>
        <b-input  v-for="(tuto, ind) in materiel.tutos" :key="ind" v-model="materiel.tutos[ind]" :value="tuto" type="url" class="mb-1 border-primary" :placeholder="'Entrez l\'url du tuto n°'+ind" ></b-input>
      </div>

        <p class="m-0 mt-2">Image : (Attention n'accepte que les images !)<br/> </p>
        <b-form-file id="input-mat-photo" accept="image/*" class="d-block border-primary"  placeholder="Choisissez ou glissez-déposez"  required browse-text="Choisir" drop-placeholder="Glissez-ici"></b-form-file>

        <p  class="m-0 mt-2">Notice : (en PDF)<br/> </p>
        <b-form-file id="input-mat-notice" accept="application/pdf" class="d-block" placeholder="Choisissez ou glissez-déposez"   required browse-text="Choisir" drop-placeholder="Glissez-ici"></b-form-file>
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
  name: 'mat-edit',
  components: {ModalPictum},
  props: {
    idPerso:{
      type:String,
      default:"modif-mat"
    },
    materiel: {
      type: Object,
      default: function () {
        return {
          caracteristiques: '',
          departement_id: '',
          indisp_raison: '',
          malette_id: '',
          nom: '',
          notice: '',
          photo: '',
          ref: '',
          tutos: [
            ""
          ],
          type_id:'',
          usage: '',
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
      departements: [],
      malettes:[],
      types:[],
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
    addTuto () {
      this.materiel.tutos.push("");
    },
    show(){
      this.$bvModal.show(this.idPerso)
    },
    setDepartements () {
      ajaxService.getApi('departements')
          .then(result => {
            this.departements = result
          })
    },
    setMals () {
      ajaxService.getApi('malettes')
          .then(result => {
            this.malettes = result
          })
    },
    setTypes () {
      ajaxService.getApi('types')
          .then(result => {
            this.types = result
          })
    },
    send(){
      if(this.mode==="add"){
        //console.log("add");
        let data = new FormData();
        if(this.materiel.ref === -1) {
          data.append("malette_id", null);
        }
        data.append("ref",  this.materiel.ref);
        data.append("nom", this.materiel.nom);
        data.append("photo", document.querySelector('#input-mat-photo').files[0]);
        data.append("usage", this.materiel.usage);
        data.append("carac", this.materiel.caracteristiques);
        data.append("notice", document.querySelector('#input-mat-notice').files[0]);
        data.append("type_id", this.materiel.type_id);

        data.append("departement_id", this.materiel.departement_id);
        data.append("tutos", JSON.stringify(this.materiel.tutos));

        //console.log(data.get("ref"));

        this.alertMessage = param.messages.sending;
        ajaxService.postAPI("materiels", data).then(response => {
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
    this.setMals();
    this.setTypes();
    this.setDepartements();
  }
}
</script>
