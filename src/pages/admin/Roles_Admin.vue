<template>
  <div class="containerRight p-4">
    <search-bar :modes="roles" :types-materiel="lieux" lib-mode="Rôle" lib-type="Lieux"></search-bar>
    <row-result nom="Martin Baumner" disable-dispo disable-ref img="../assets/img/person.png" :buttons="button" id="0" class="mt-2"></row-result>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'

export default {
name: "Roles_Admin",
  components:{
    SearchBar,
    RowResult
  },
  data () {
    return {
      roles: [{text: 'Administrateur', value: 'ADM'},  {text: 'Gestionnaire', value: 'GEST'}],
      lieux:[{text: 'MMI', value: 'mmi'}, {text: 'BU', value: 'bu'},]
    }
  },
}
</script>

<style scoped>

</style>
