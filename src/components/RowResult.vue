<template>
  <b-card>
    <b-row  align-v="center">
      <b-col cols="1" >
        <b-img rounded="circle" :src="img" width="20px" height="20px"></b-img>
      </b-col>

      <b-col cols="3" >
         <p>{{nom}}</p>
      </b-col>

      <b-col cols="3" >
        <p>{{ref}}</p>
      </b-col>

      <b-col cols="3" >
        <p :class="'text-'+dispo.variant">{{dispo.text}}</p>
      </b-col>

      <b-col cols="2" >
        <b-button v-for="button in buttons" @click="$emit(button.eventName, nom)" :key="button.icon" variant="light" size="sm">
          <b-icon :icon="button.icon" :variant="button.variant"></b-icon>
        </b-button>
      </b-col>

    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'RowResult',
  props: {
    id:{
      type: Number,
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
    ref:{
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
