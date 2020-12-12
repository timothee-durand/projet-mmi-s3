<template>
  <div class="containerRight p-4">
    <h1>Matériel</h1>
    <search-bar></search-bar>

    <row-result></row-result>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
export default {
name: "Materiel_Admin",
  components: {RowResult, SearchBar},
}
</script>

<style scoped>

</style>
