<template>
  <modal-pictum title="Créer/Editer" :id-modal="idPerso" text-cancel-button="Fermer" :callback-ok="send">
    <b-form>
      <b-input-group>
        <b-input placeholder="Nom" v-model="materiel.nom"></b-input>
        <b-input placeholder="Référence" v-model="materiel.ref"></b-input>
      </b-input-group>
      <b-textarea placeholder="Caractéristiques" v-model="materiel.caracteristiques"></b-textarea>
      <b-textarea placeholder="Pour quoi faire ?" v-model="materiel.usage"></b-textarea>

      <b-input-group>
        <label>Malette :</label>
        <b-select v-model="materiel.malette_id">
          <b-select-option value=""> Pas dans une malette</b-select-option>
          <b-select-option v-for="malette in malettes" :value="malette.id" :key="malette.id">{{malette.ref }}</b-select-option>
        </b-select>
      </b-input-group>

      <b-input-group>
        <label>Département :</label>
        <b-select v-model="materiel.departement_id">
          <b-select-option value="" disabled > Choissisez un département</b-select-option>
          <b-select-option v-for="dep in departements" :value="dep.id" :key="dep.id">{{dep.nom }}</b-select-option>
        </b-select>
      </b-input-group>

      <b-input-group>
        <label>Type :</label>
        <b-select v-model="materiel.type_id">
          <b-select-option value="" disabled> Choississez le type de matériel</b-select-option>
          <b-select-option v-for="type in types" :value="type.id" :key="type.id">{{type.text }}</b-select-option>
        </b-select>
      </b-input-group>

      <b-form-group>
        <b-input-group><p>Tutos :</p> <b-button type="button" @click="addTuto">+</b-button></b-input-group>
        <b-input v-for="(tuto, ind) in materiel.tutos" :key="ind" v-model="materiel.tutos[ind]" :value="tuto" type="url" ></b-input>
      </b-form-group>

    </b-form>
  </modal-pictum>
</template>
<script>
import ModalPictum from '@/components/ModalPictum.vue'
import ajaxService from '@/services/ajaxService.js'
import utilsServices from '@/services/utilsServices.js'

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
          departement_id: 0,
          indisp_raison: '',
          malette_id: '',
          nom: '',
          notice: '',
          photo: '',
          ref: '',
          tutos: [
            ""
          ],
          type_id: 0,
          usage: ''
        }
      }
    },
    types: {
      type: Array,
      required:true
    },
    departements: {
      type:Array,
      required:true
    },
    malettes: {
      type:Array,
      required:true
    },
    mode:{
      type:String,
      required:true
    }
  },
  methods: {
    addTuto () {
      this.materiel.tutos.push("");
    },
    show(){
      this.$bvModal.show(this.idPerso)
    },
    send(){
      if(this.mode==="add"){
        console.log("add");
        let params = utilsServices.getFormData(this.materiel);

        ajaxService.postAPI("materiels", params).then(response => console.log(response)).catch(error => console.log(error));
      }
      else if (this.mode==="modif"){
        console.log("modif")
      }
    }
  },
}
</script>
