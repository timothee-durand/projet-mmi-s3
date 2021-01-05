<template>
  <b-card ref="rwo-result">
    <b-row align-v="center" align-h="around">
      <b-col cols="auto" md="1">
        <img v-if="!disableImg" :src="img" class="rounded-pill" width="20px"/>
      </b-col>

      <b-col cols="auto" md="6">
        <p>{{ nom }}</p>
        <p v-if="!disableRef">{{ reference }}</p>
      </b-col>


      <b-col cols="auto" md="3">
        <p :class="'text-'+dispo.variant" v-if="!disableDispo">{{ dispo.text }}</p>
      </b-col>

      <b-col cols="auto" md="2">

        <b-button v-for="button in buttons" @click="$emit(button.eventName, {nom, id})" :key="button.icon"
                  variant="light" size="sm" class="mr-2">
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
    id: {
      type: [String, Number],
      required: true
    },
    img: {
      type: String,
      default: './assets/img/person.png'
    },
    nom: {
      type: String,
      required: true,
      default: 'Kit 01'
    },
    reference: {
      type: String,
      default: 'L1-MAL-PHOT-01'
    },
    dispo: {
      type: Object,
      default: function () {
        return {
          text: 'Disponible',
          variant: 'success'
        }
      }
    },
    disableDispo: {
      type: Boolean,
      default: false
    },
    disableImg: {
      type: Boolean,
      default: false
    },
    disableRef: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Array,
      default: function () {
        return [
          {
            icon: 'lock',
            variant: 'success',
            eventName: 'setUnavailable'
          }
        ]
      }
    },
    wDisCols:{
      type:Number,
      default:400
    }
  },
  computed: {
    variableCols(){
      if (this.$refs["rwo-result"].clientWidth < this.wDisCols) {
        return {
          img:"auto",
          txt:"auto",
          dispo:"auto",
          buttons:"auto",
        }
      } else {
        return {
          img:1,
          txt:6,
          dispo:3,
          buttons:2
        }
      }


    }
  ,
  },
}
</script>

<style scoped>
p {
  margin: 0;
}

.card-body {
  padding-top: 0.4rem !important;
  padding-bottom: 0.4rem !important;
}
</style>
