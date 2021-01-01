<template>
  <div>
    <div class="toolbox">
      <button @click="updateFirstRow">Update first row</button>
      <button @click="changeZoomLevel">Change zoom level</button>
    </div>
    <div class="gstc-wrapper" ref="gstc"></div>
  </div>
</template>

<script>
import GSTC from 'gantt-schedule-timeline-calendar'
import {Plugin as TimelinePointer} from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js'
import {Plugin as Selection} from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js'
import {Plugin as ItemResizing} from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js'
import {Plugin as ItemMovement} from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js'
import 'gantt-schedule-timeline-calendar/dist/style.css'

let gstc, state
// helper functions
/**
 * @returns { import("gantt-schedule-timeline-calendar").Rows }
 */

/**
 * @returns { import("gantt-schedule-timeline-calendar").Items }
 */


//https://github.com/iamkun/dayjs/blob/dev/src/locale/fr.js
const locale = {
  name: 'fr',
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans'
  },
  ordinal: (n) => {
    const o = n === 1 ? 'er' : ''
    return `${n}${o}`
  }
}

// main component
export default {
  name: 'Scheduler',
  props: {
    materiels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      gtsc: {}
    }
  },
  mounted () {
    this.initGTSC()
  },
  updated () {
    this.initGTSC()
  },
  beforeUnmount () {
    if (gstc) gstc.destroy()
  },
  methods: {
    updateFirstRow () {
      state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, row => {
        row.label = 'Changed dynamically'
        return row
      })
    },
    changeZoomLevel () {
      state.update('config.chart.time.zoom', 21)
    },
    generateRows () {
      const rows = {}
      console.log(this.materiels)
      for (let i = 0; i < this.materiels.length; i++) {
        let mat = this.materiels[i]
        const id = GSTC.api.GSTCID(i.toString())
        rows[id] = {
          id,
          label: mat.nom,
          photo: `<img src="${mat.photo}" class="rounded-circle mx-auto" width="30px"/>`
        }
      }
      return rows
    },
    getConfig () {
      return {
        licenseKey: '====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====',
        plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
        locale: locale,
        list: {
          columns: {
            data: {
              [GSTC.api.GSTCID('id')]: {
                id: GSTC.api.GSTCID('id'),
                width: 40,
                data: ({row}) => GSTC.api.sourceID(row.id),
                header: {
                  content: 'ID'
                }
              },
              [GSTC.api.GSTCID('label')]: {
                id: GSTC.api.GSTCID('label'),
                width: 150,
                data: 'label',

                header: {
                  content: 'Matériel'
                }
              },
              [GSTC.api.GSTCID('photo')]: {
                id: GSTC.api.GSTCID('photo'),
                width: 50,
                isHTML: true,
                data: 'photo',
                header: {
                  content: 'Photo'
                }
              },
            }
          },
          rows: this.generateRows()
        },
        chart: {
          items: this.generateItems()
        }
      }
    },
    initGTSC () {
      /**
       * @type { import("gantt-schedule-timeline-calendar").Config }
       */
      state = GSTC.api.stateFromConfig(this.getConfig())
      gstc = GSTC({
        element: this.$refs.gstc,
        state,
      })
    },
    generateItems () {
      const items = {}

      for (let i = 0; i < this.materiels; i++) {
        let mat = this.materiels[i];
        console.log({mat})
        let estpretes = mat.est_pretes;
        console.log({estpretes})
        for (let i; i < estpretes.lenght; i++) {
          const id = GSTC.api.GSTCID(estpretes[i].id.toString())
          const rowId = GSTC.api.GSTCID(mat.id)
          let start = estpretes.date_debut
          items[id] = {
            id,
            label: `${estpretes.reservation.nom}`,
            rowId,
            time: {
              start: start.valueOf(),
              end: estpretes.date_fin
            }
          }
        }

      }
      console.log({items});
      return items
    }
  }
}
</script>
<style scoped>
.gstc-component {
  margin: 0;
  padding: 0;
}

.toolbox {
  padding: 10px;
}
</style>
