<template>
  <b-card>
    <b-row  align-v="center" align-h="around">
      <div >
        <img  :src="img" class="rounded-pill" width="20px"  />
      </div>
         <p>{{nom}}</p>
        <p v-if="!disableRef">{{reference}}</p>
        <p :class="'text-'+dispo.variant" v-if="!disableDispo">{{dispo.text}}</p>

        <div class="buttons">
          <b-button v-for="button in buttons" @click="$emit(button.eventName, nom)" :key="button.icon" variant="light" size="sm" class="mr-2">
            <b-icon :icon="button.icon" :variant="button.variant"></b-icon>
          </b-button>
        </div>



    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'RowResult',
  props: {
    id:{
      type: String,
      required:true
    },
    img: {
      type: String,
      default: "http://via.placeholder.com/100x100"
    },
    nom:{
      type: String,
      default:"Kit 01"
    },
    reference:{
      type: String,
      default:"L1-MAL-PHOT-01"
    },
    dispo:{
      type: Object,
      default: function () {
        return {
          text:"Disponible",
          variant:"success"
        }
      }
    },
    disableDispo:{
      type:Boolean,
      default:false
    },
    disableRef:{
      type:Boolean,
      default:false
    },
    buttons:{
      type:Array,
      default:function () {
        return [
          {
            icon:"lock",
            variant:"success",
            eventName:"setUnavailable"
          }
        ]
      }
    }
  },
}
</script>

<style scoped>
  p{
    margin: 0;
  }

  .card-body{
    padding-top: 0.4rem !important;
    padding-bottom: 0.4rem !important;
  }
</style>
