<template>
  <footer >
    <b-row class="bg-secondary p-3 m-0" align-h="around" align-v="center">
      <b-col cols="8" md="2" class="mt-4 mt-md-0 p-5">
        <b-img fluid :src="require('@/assets/img/logo_ubfc.png')"></b-img>
      </b-col>

      <b-col cols="8" md="2" class="mt-4 mt-md-0 p-5">
        <b-img fluid-grow :src="require('@/assets/img/logo_ufc.png')"></b-img>
      </b-col>

      <b-col cols="8" md="2" align-self="center" class="mt-4 mt-md-0 p-5">
        <b-img  :src="require('@/assets/img/logo_bu.png')" style="max-height: 90px;"></b-img>
      </b-col>

      <b-col cols="8" md="2" class="mt-4 mt-md-0 p-5">
        <b-img fluid-grow :src="require('@/assets/img/logo_iut.png')"></b-img>
      </b-col>

      <b-col cols="8" md="2" class="mt-4 mt-md-0 p-5">
        <b-img fluid-grow :src="require('@/assets/img/mmi_blanc.png')"></b-img>
      </b-col>
    </b-row>

    <b-row class="bg-dark text-primary m-0 pt-5 pb-5">
      <b-col cols="12" md="3" class="ml-0 ml-md-5 mb-3 mb-md-0">
        <h5 class="w-100 pb-2 " style="border-bottom: solid 1px #B37CFF; ">Contact</h5>
        <router-link to="/contact-admin" class="text-underline">Nous contacter</router-link>
      </b-col>

      <b-col cols="12" md="3" offset-md="1" class="mb-3 mb-md-0">
        <h5 class="w-100 pb-2 " style="border-bottom: solid 1px #B37CFF; ">À propos</h5>
        <ul class="list-unstyled">
          <li><router-link to="/pertes-vol" class="text-underline">Pertes ou vols</router-link></li>
          <li><router-link to="/mentions-legales" class="text-underline">Mentions légales</router-link></li>
        </ul>
      </b-col>

      <b-col cols="12" md="3" offset-md="1" class="mb-3 mb-md-0">
        <h5 class="w-100 pb-2 " style="border-bottom: solid 1px #B37CFF; ">Conditions</h5>
        <ul class="list-unstyled">
          <li><router-link to="/conditions-utilisation" class="text-underline">Conditions d'utilisations</router-link></li>
          <li><router-link to="/conditions-location" class="text-underline">Conditions générales de location</router-link></li>
        </ul>
      </b-col>

    </b-row>

  </footer>
</template>

<script>
export default {
name: "Footer-Pictum"
}
</script>

<style scoped>
  .text-underline{
    text-decoration: underline;
  }

</style>
