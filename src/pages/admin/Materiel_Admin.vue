<template>
  <div class="containerRight p-4" >
    <h1>Matériel</h1>
    <search-bar @changeType="changeModeSearch" @search-input="filterString" :types-materiel="typesMateriel" @changeTypeMat="typeSearch"></search-bar>

    <row-result v-for="materiel in listeSearch" :key="materiel.id" :id="materiel.id.toString()" :buttons="buttons" :reference="materiel.ref" :disable-ref="modeSearch==='types'||modeSearch==='departements'" :img="materiel[keyImg]" :nom="materiel.nom" :disable-dispo="modeSearch==='types'||modeSearch==='departements'" @lock-mat="lockMatMeth" class="mt-3"></row-result>

    <modal-pictum title="Test"  :id-modal="idModal" text-cancel-button="Fermer" :callback-ok="modifMatApi">
        <p>Êtes-vous sûrs de vouloir mettre ce matériel en indisponible ?</p>
    </modal-pictum>

  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
import ModalPictum from '@/components/ModalPictum.vue'
import ajaxService from '@/services/ajaxService.js'
//import param from '@/param/param.js'

export default {
  name: 'Materiel_Admin',
  components: {ModalPictum, RowResult, SearchBar},
  data () {
    return {
      buttons: [
        {
          icon:"lock",
          variant:"success",
          eventName:"lock-mat"
        },
        {
          icon: 'pencil-fill',
          variant: 'success',
          eventName: 'editMat'
        },
        {
          icon: 'x',
          variant: 'success',
          eventName: 'deleteMat'
        }
      ],
      idModal:"modal-mat",
      matSelected:'',
      listeMat:[],
      modeSearch:"materiels",
      stringSearch:'',
      typesMateriel: [{text: 'Tous', value: ''}],
      typeMatSearch:""
    }
  },
  computed: {
    listeSearch () {
      return this.listeMat.filter(function (mat) {
        if (this.stringSearch !== '' || this.typeMatSearch !== '') {
          if (this.stringSearch !== '' && this.typeMatSearch !== '') {
            return (mat.nom.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1
                || mat.ref.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1) && (mat.type.nom.toLowerCase().indexOf(this.typeMatSearch.toLowerCase()) !== -1);
          }
          if (this.stringSearch !== '') {
            return mat.nom.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1
                || mat.ref.toLowerCase().indexOf(this.stringSearch.toLowerCase()) !== -1;
          }
          if (this.typeMatSearch !== '') {
            return mat.type.nom.toLowerCase().indexOf(this.typeMatSearch.toLowerCase()) !== -1;
          }

        } else {
          return true;
        }
      }.bind(this));
    },
    keyImg(){

      if(this.modeSearch === "materiels"){
        return "photo";
      } else if (this.modeSearch === "types"){
        return "picto";
      } else if (this.modeSearch === "malettes") {
        return "photo";
      } else {
        return null;
      }
    }
  },
  methods: {
    lockMatMeth (mat) {
      this.$bvModal.show(this.idModal);
      this.matSelected = mat;
    },
    modifMatApi(){
      console.log(this.matSelected);
      this.$bvModal.hide(this.idModal);
    },
    getListe(){
      ajaxService.getApi(this.modeSearch).then(result=> {
        this.listeMat = result;
        console.log(result[0]["picto"]);
      }).catch(error => console.log(error));
    },
    changeModeSearch(mode){
      this.listeMat = [];
      this.modeSearch = mode;
      this.getListe();
    },
    filterString(search){
      this.stringSearch = search;
    },
    setTypesMateriel(){
      ajaxService.getApi("types")
          .then(result => {
        result.forEach(function (type){
          this.typesMateriel.push({text: type.nom, value: type.nom});
        }.bind(this)).catch(error => console.log(error));

      })
    },
    typeSearch(type){
      this.typeMatSearch = type;
    }

  },
  mounted () {
    this.getListe();
    this.setTypesMateriel();
  }
}
</script>

<style scoped>

</style>
