<template>
  <!--        carte recherche  -->
  <div
      class="card row w-100 mx-auto bg-white rounded d-flex justify-content-between flex-row align-items-center p-2 filtre-materiel">
    <!--            Recherche -->
    <b-form inline class=" w-25" @submit.prevent="$emit('search-input', searchInput)">
      <b-input-group>
        <b-input id="search" placeholder="Recherche" type="search" v-model="searchInput"></b-input>
        <b-button variant="primary" type="submit">
          <svg class="bi bi-search" fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                  fill-rule="evenodd"/>
            <path d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  fill-rule="evenodd"/>
          </svg>
        </b-button>
      </b-input-group>
    </b-form>

    <!--Mode-->
    <b-form inline class="flex flex-nowrap" v-if="modes.length !== 0">
      <label for="selectMode" class="mr-2 text-capitalize">{{ libMode }}: </label>
      <b-form-radio-group class="flex w-100" id="selectMode" v-model="mode" buttons size="sm"
                          @change="$emit('changeType', mode)" :options="modes">
      </b-form-radio-group>
    </b-form>

    <b-form inline v-if="typesMateriel.length !== 0" >
      <b-select @change="$emit('changeTypeMat', typesMaterielSelect)" :disabled="mode === 'departements' || mode === 'types' || mode === 'malettes'" :options="typesMateriel" label-field="Types de matériel" v-model="typesMaterielSelect">
        <b-select-option disabled value="default" class="text-capitalize">{{ libType }} :</b-select-option>
      </b-select>
    </b-form>


    <b-button @click="$emit('add', mode)" variant="light">
      <b-icon-plus size="md"></b-icon-plus>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      searchInput: '',
      mode: 'materiels',
      typesMaterielSelect:'default',

    }
  },
  props: {
    modes: {
      type: Array,
      default: function () {
        return [
          {text: 'Matériel', value: 'materiels'},
          {text: 'Type', value: 'types'},
          {text: 'Kit', value: 'malettes'},
          {text: 'Lieu', value: 'departements'},
        ];
      }
    },
  typesMateriel:{
    type:Array,
    default:function () {
      return [
        {text: 'Appareil Photo', value: 'camera'},
        {text: 'Son', value: 'son'},
        {text: 'Lumière', value: 'lumieres'},
      ];
    }
  },
    libMode:{
      type:String,
      default:"Mode"
    },
    libType:{
      type:String,
      default:"Type"
    }
  },
}
</script>

<style scoped>

</style>
