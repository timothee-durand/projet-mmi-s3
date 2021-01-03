<template>
  <b-container>
    <h2 class="mt-4">Mes réservations</h2>
    <row-result v-for="(pret,key) in listeEstPrete" :id="key" :key="pret.pret.id" disable-img
                :nom="`${getDateFormated(pret.pret.date_debut)} -  ${getDateFormated(pret.pret.date_fin)}`"
                :reference="getStringMatListe(pret.listeMat)" :dispo="getState(pret.pret.rendu)" :buttons="button"
                @seePret="showEstPrete"
    ></row-result>

    <modal-pictum :title="`Réservation du ${getDateFormated(dateEstPreteToShow)}`" id-modal="modal-show-prete" hide-footer>
      <div v-if="dateEstPreteToShow !== ''">
        <row-result  v-for="mat in listeEstPrete[dateEstPreteToShow].listeMat" :key="'mat-'+mat.id" :img="mat.photo"
                     :nom="mat.nom" :id="mat.id" :buttons="button" :reference="mat.ref" disable-dispo class="mb-2"
                     @seePret="showMat"
        ></row-result>
      </div>
      <b-btn @click="$bvModal.hide('modal-show-prete')" variant="primary" class="d-block w-50 mx-auto">Ok</b-btn>
    </modal-pictum>
  </b-container>
</template>

<script>
import ajaxService from '@/services/ajaxService.js'
import utilsServices from '@/services/utilsServices.js'
import RowResult from '@/components/RowResult.vue'
import ModalPictum from '@/components/ModalPictum.vue'

export default {
  name: 'OldReservation',
  components: {ModalPictum, RowResult},
  data () {
    return {
      listeEstPreteBase: [],
      button: [
        {
          icon: 'eye',
          variant: 'success',
          eventName: 'seePret'
        }
      ],
      dateEstPreteToShow:"",
    }
  },
  computed: {
    listeEstPrete () {
      let date = {}
      this.listeEstPreteBase.forEach(function (pret) {
        // si la date est déjà dans le tableau
        if (pret.date_debut in date) {
          date[pret.date_debut]['listeMat'].push(pret.materiel)
        } else {
          //sinon on l'ajoute
          date[pret.date_debut] = {
            pret: pret,
            listeMat: [
              pret.materiel
            ]
          }
        }
      })

      return date
    }
  },
  methods: {
    getEstPretes () {
      //si gestionnaire
      if (this.$store.getters.isGest) {
        ajaxService.getAllApi('reservations').then(result => {
          let user = this.$store.getters.getUser
          let res = result.filter(function (res) {
            return res.nom === user.nom && res.prenom === user.prenom
          }.bind(this))
          //console.log(res)
          this.listeEstPreteBase = res[0].est_pretes
        }).catch(err => utilsServices.alertError(err, this))
      } else {
        ajaxService.getSingleApi('reservations', this.$store.getters.getUser.id).then(result => {
          this.listeEstPrete = result.est_pretes
        }).catch(err => utilsServices.alertError(err, this))
      }
    },
    getDateFormated (date) {
      return utilsServices.getOnlyDate(date)
    },
    getStringMatListe (listeMat) {
      let result = ''
      listeMat.forEach(function (mat) {

        result = result + `${mat.nom}, `
      })
      if (result.length < 30) {
        result = result.slice(0, result.length - 2)
      } else {
        result = result.slice(0, 30) + '...'
      }
      return result
    },
    getState (rendu) {
      if (rendu) {
        return {
          text: 'Passée',
          variant: 'primary'
        }
      } else {
        return {
          text: 'En cours...',
          variant: 'danger'
        }
      }
    },
    showEstPrete(payload){
      this.dateEstPreteToShow = payload.id;
      this.$bvModal.show("modal-show-prete");
    },
    showMat(payload){
      this.$router.push("/article/"+payload.id+"_Mat");
    }
  },
  mounted () {
    this.getEstPretes()
  }
}
</script>

<style scoped>

</style>
