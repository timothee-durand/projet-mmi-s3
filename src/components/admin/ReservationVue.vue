<template>
  <scheduler :materiels="listeMateriel"></scheduler>
</template>
<script>
import Scheduler from '@/components/admin/Scheduler.vue'
import ajaxService from '@/services/ajaxService.js'
export default {
  components: {Scheduler},
  data () {
    return {
      listeMateriel: []
    }
  },
  mounted () {
    ajaxService.getSingleApi("gestionnaires", this.$store.getters.getUser.id).then(result => {
      console.log(result)
      this.listeMateriel = result.data.materiels;
    });

  }
}
</script>
