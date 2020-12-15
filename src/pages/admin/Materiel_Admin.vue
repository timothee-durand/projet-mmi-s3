<template>
  <div class="containerRight p-4" >
    <h1>Matériel</h1>
    <search-bar></search-bar>

    <row-result id="0" :buttons="buttons" reference="L1-MAL-PHOT-01" @lock-mat="lockMatMeth" class="mt-3"></row-result>

    <modal-pictum title="Test"  :id-modal="idModal" text-cancel-button="Fermer" :callback-ok="modifMatApi">
        <p>Êtes-vous sûrs de vouloir mettre ce matériel en indisponible ?</p>

    </modal-pictum>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
import ModalPictum from '@/components/ModalPictum.vue'

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
    }

  },
}
</script>

<style scoped>

</style>
