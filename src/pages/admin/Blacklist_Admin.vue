<template>
  <div class="blacklist containerRight p-4">
    <search-bar :modes="[]" :types-materiel="[]"></search-bar>
    <row-result nom="Martin Baumner" disable-dispo disable-ref img="../assets/img/person.png" :buttons="button" id="0" class="mt-2"></row-result>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import RowResult from '@/components/RowResult.vue'
export default {
name: "Blacklist_Admin",
  components: {RowResult, SearchBar},
  data () {
    return {
      button: [
        {
          icon:"x",
          variant:"success",
          eventName:"deleteBlacklist"
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
