<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import frLocale from '@fullcalendar/core/locales/fr';

export default {
  name:"FullCalendarWrapper",
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    eventsPerso: {
      type: Array,
      required:true
    }
  },
  computed: {
      calendarOptions (){
        return {
          plugins: [ dayGridPlugin ],
          initialView: 'dayGridWeek',
          locale:frLocale,
          events:this.eventsPerso,
          weekends:false,
          eventClick: (info) => {
            console.log(info.event.start, "-" , info.event.end)
            this.$emit("selectRdv", info.event);
          }
        }
      },
  },
  methods: {

  },
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
