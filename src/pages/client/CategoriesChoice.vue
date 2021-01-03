<template>
  <b-container>
    <h1 class="text-center mt-5">Sélectionnez une catégorie</h1>
    <b-row class="mt-5" align-h="around">
      <b-col cols="2" v-for="type in listCat" :key="type.id">
        <router-link :to="{name:'Search', params:{filter:getCatPath(type.nom)}}">
          <b-card class="d-flex flex-column justify-content-around align-items-center">
            <b-img :src="type.picto" width="100" height="100"/>
            <p class="text-center mt-4 h5">{{ type.nom }}</p>
          </b-card>
        </router-link>

      </b-col>

    </b-row>

  </b-container>
</template>

<script>
import ajaxService from '@/services/ajaxService.js'
import utilsServices from '@/services/utilsServices.js'

export default {
  name: 'CategoriesChoice',
  data () {
    return {
      listCat: []
    }
  },
  methods: {
    getCat () {
      ajaxService.getAllApi('types').then(result => this.listCat = result).catch(err => utilsServices.alertError(err, this))
    },
    getCatPath(nom){
      return nom.split(' ').join('')
    }
  },
  mounted () {
    this.getCat()
  }
}
</script>

<style scoped>

</style>
