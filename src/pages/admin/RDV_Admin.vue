<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="rdv containerRightAdmin p-4">
      <b-card class="mx-auto w-75">
        <slot name="header">
          <div class="d-inline-flex w-25 justify-content-between ">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 122 122"
                 class="mx-auto d-block">
              <path id="Icon_material-schedule" data-name="Icon material-schedule"
                    d="M63.939,3A61,61,0,1,0,125,64,60.97,60.97,0,0,0,63.939,3ZM64,112.8A48.8,48.8,0,1,1,112.8,64,48.787,48.787,0,0,1,64,112.8Zm3.05-79.3H57.9V70.1L89.925,89.315l4.575-7.5L67.05,65.525Z"
                    transform="translate(-3 -3)" fill="#81cb51"/>
            </svg>
            <h2>Rendez-vous</h2>
          </div>
        </slot>

        <row-result v-for="rdv in listeRDV" :key="rdv.id" :id="rdv.idRdv" :reference="rdv.mat_emp.slice(0, 30) + '...' " :nom="getDate(rdv.date)" :dispo="rdv.emp"  ></row-result>

      </b-card>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import RowResult from '@/components/RowResult.vue'
import ajaxService from '@/services/ajaxService.js'
import moment from 'moment'

export default {
  name: 'RDV_Admin',
  components:{
    RowResult,
    SidebarAdmin
  },
  data () {
    return {
      listeRes:[],
      listeRDV:[]
    }
  },
  methods: {
    getRDV () {
      ajaxService.getAllApi("reservations").then(result => {
        this.listeRes = result;
        let idRDV  = 0;

        this.listeRes.forEach(function (res){
          let estPrete = res.est_pretes[0];
          console.log(estPrete)
          //si il y a des rendez-vous
          if(estPrete !== undefined) {
            //j'ajoute le rdv de début et de fin au tableau de rdv
            let rdvDebut = {
              idRdv:idRDV,
              date:estPrete.date_debut,
              emp: {text: res.prenom + " "+ res.nom, variant:'primary'},
              mat_emp:this.getMatRes(res),
            }
            idRDV++;
            let rdvFin = {
              idRdv:idRDV,
              date:estPrete.date_fin,
              emp: {text: res.prenom + " "+ res.nom, variant:'primary'},
              mat_emp:this.getMatRes(res),
            }
            idRDV++;
            this.listeRDV.push(rdvDebut);
            this.listeRDV.push(rdvFin);
          }
        }.bind(this))
      } ).catch(error => console.log(error));
    },
    getDate(date){
      return moment(date, ["YYYY-MM-DD HH:mm:SS"], 'fr').format("DD MMM YYYY - HH:mm");
    },
    getMatRes(res){
      let estPretes = res.est_pretes;
      let listeMat = "";

      estPretes.forEach(function (estPrete){
        listeMat = listeMat + estPrete.materiel.ref + ", \n";
      })
      return listeMat;
    }
  },
  mounted () {
    this.getRDV();
  }
}
</script>

<style scoped>

</style>
