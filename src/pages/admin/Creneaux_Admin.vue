<template>
  <div class="containerRight p-4">
    <b-container>
      <b-row>
        <b-col cols="6">
          <b-card>
            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="122" viewBox="0 0 122 122" class="mx-auto d-block">
              <path id="Icon_material-schedule" data-name="Icon material-schedule" d="M63.939,3A61,61,0,1,0,125,64,60.97,60.97,0,0,0,63.939,3ZM64,112.8A48.8,48.8,0,1,1,112.8,64,48.787,48.787,0,0,1,64,112.8Zm3.05-79.3H57.9V70.1L89.925,89.315l4.575-7.5L67.05,65.525Z" transform="translate(-3 -3)" fill="#81cb51"/>
            </svg>
            <h2 class="text-center">Rendez-vous</h2>
            <p>Prochains rendez-vous :</p>

            <row-result id="0" :ref="'Grégoire DURAND'" nom="Jeu 12 Sept"  :buttons="buttonsRdv" disable-dispo></row-result>

            <router-link to="" class="btn rounded-pill bg-success text-light p-2 mx-auto d-block mt-4"  style="max-width: 15rem;">Voir tous mes rendez-vous</router-link>
          </b-card>
        </b-col>

        <b-col cols="6">

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>


import RowResult from '@/components/RowResult.vue'
export default {
name: "Creneaux_Admin",
  components: {RowResult},
  computed: {
    buttonsRdv () {
      return [
        {
          icon:"check2",
          variant:"success",
          eventName:"validateRDV"
        },
        {
          icon:"trash-fill",
          variant:"success",
          eventName:"deleteRDV"
        },
      ]
    }
  },
}
</script>

<style scoped>

</style>
