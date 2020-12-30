<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="rdv containerRightAdmin p-4">
      <b-card class="mx-auto w-75">
        <slot name="header">
          <div class="d-inline-flex w-50 justify-content-between ">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 122 122"
                 class="d-block">
              <path id="Icon_material-schedule" data-name="Icon material-schedule"
                    d="M63.939,3A61,61,0,1,0,125,64,60.97,60.97,0,0,0,63.939,3ZM64,112.8A48.8,48.8,0,1,1,112.8,64,48.787,48.787,0,0,1,64,112.8Zm3.05-79.3H57.9V70.1L89.925,89.315l4.575-7.5L67.05,65.525Z"
                    transform="translate(-3 -3)" fill="#81cb51"/>
            </svg>
            <h2>Rendez-vous</h2>
            <b-button type="button" variant="primary"  @click="getRDV" size="sm">
              <b-icon-arrow-counterclockwise variant="light"></b-icon-arrow-counterclockwise>
            </b-button>
          </div>

        </slot>

        <row-result class="mt-2" v-for="rdv in listeRDV" :key="rdv.id" :id="rdv.id" :reference="rdv.mat_emp.slice(0, 30) + '...' "
                    :nom="getDate(rdv.date)" :dispo="rdv.emp" :buttons="rdv.buttons" @valideRdv="validateRdv"
        ></row-result>

      </b-card>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import RowResult from '@/components/RowResult.vue'
import ajaxService from '@/services/ajaxService.js'
import moment from 'moment'
import utilsServices from '@/services/utilsServices.js'
import param from '@/param/param.js'



export default {
  name: 'RDV_Admin',
  components:{
    RowResult,
    SidebarAdmin
  },
  data () {
    return {
      listeRes:[],
      listeRDV:[],
    }
  },
  methods: {
    getRDV () {
      //console.log(this.$store.state.user.user.id);
      this.listeRDV = [];
      this.listeRes = [];
      ajaxService.getSingleApi("gestionnaires", this.$store.state.user.user.id).then(result => {
        this.listeRes = result.data.rdv;
        let idRDV  = 0;

        this.listeRes.forEach(function (res){
          let estPrete = res.est_pretes[0];
          let now = moment();
         // console.log(now.format());
          //console.log(moment(estPrete.date_debut,["YYYY-MM-DD HH:mm:SS"] ).isSameOrAfter(now), estPrete.date_debut)

          //si il y a des rendez-vous
          if(estPrete !== undefined && moment(estPrete.date_debut,["YYYY-MM-DD HH:mm:SS"] ).isSameOrAfter(now)) {
            console.log(estPrete.date_debut)
            //j'ajoute le rdv de début et de fin au tableau de rdv
            let rdvDebut = {
              id:idRDV,
              date:estPrete.date_debut,
              emp: {text: res.prenom + " "+ res.nom, variant:'primary'},
              mat_emp:this.getMatRes(res),
              buttons:this.getButtons(res),
              estPrete:estPrete,
              reservation: res,
            }
            idRDV++;
            let rdvFin = {
              id:idRDV,
              date:estPrete.date_fin,
              emp: {text: res.prenom + " "+ res.nom, variant:'primary'},
              mat_emp:this.getMatRes(res),
              buttons:this.getButtons(res),
              estPrete:estPrete,
              reservation: res,
            }
            idRDV++;
            this.listeRDV.push(rdvDebut);
            this.listeRDV.push(rdvFin);
          }
        }.bind(this));

        this.listeRDV.sort(function (rdv1, rdv2){
          return moment(rdv1.date).isAfter(rdv2.date);
        })
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
    },
    getButtons(res){

      if(res.valide === 0){
        //si la réservation n'est pas validée
        return [
          {
            icon: 'check2',
            variant: 'success',
            eventName: 'valideRdv'
          },
          {
            icon: 'x',
            variant: 'success',
            eventName: 'deleteRdv'
          }
        ]
      } else {
        return [
          {
            icon: 'x',
            variant: 'success',
            eventName: 'deleteRdv'
          }
        ]
      }
    },
    // delRdv(payload){
    //
    // },

    validateRdv(payload){
      this.$bvModal.msgBoxConfirm('Êtes-vous sûrs de vouloir valider ce rendez-vous ?', {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        okTitle: 'Oui',
        cancelTitle: 'Non',
        footerClass: 'p-2',
        hideHeaderClose: false,
      })
          .then(value => {
            if(value){
              let rdv = utilsServices.getById(this.listeRDV, payload.id);
              console.log(rdv.reservation.id);
              let data = new FormData();
              data.append("valide", 1);
              ajaxService.putApi("reservations", rdv.reservation.id, data)
                  .then(result => this.$bvModal.msgBoxOk(param.messages.success + result).then(test=>{this.getRDV(test)}))
                  .catch(err => this.$bvModal.msgBoxOk(param.messages.problem + err));
            }
          })
          .catch(err => {
            // An error occurred
            console.log(err)
          })



    }
  },
  mounted () {
    this.getRDV();
  }
}
</script>

<style scoped>

</style>
