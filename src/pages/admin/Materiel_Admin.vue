<template>
  <div class="containerRight p-4">
    <h1>Matériel</h1>
    <search-bar></search-bar>

    <row-result id=0 :buttons="buttons" reference="L1-MAL-PHOT-01"></row-result>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'

export default {
  name: 'Materiel_Admin',
  components: {RowResult, SearchBar},
  data () {
    return {
      buttons: [
        {
          icon:"lock",
          variant:"success",
          eventName:"editRole"
        },
        {
          icon: 'pencil-fill',
          variant: 'success',
          eventName: 'editRole'
        },
        {
          icon: 'x',
          variant: 'success',
          eventName: 'deleteBlacklist'
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
