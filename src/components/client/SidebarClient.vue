<template>
  <div>
    <b-sidebar id="sidebar-1" title="Sidebar" fixed="top" shadow visible no-header class="d-flex justify-content-center">
        <!--            Recherche -->
        <form class="form-inline w-100" ref="widthSidebar">
          <div class="input-group w-100">
            <input class="form-control input-group-append" id="search" placeholder="Recherche" type="search">
            <button class="btn-dark text-light input-group-prepend btn" type="submit">
              <svg class="bi bi-search" fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                      fill-rule="evenodd"/>
                <path d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                      fill-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </form>

        <!--    Filtres-->
        <div class="border-bottom border-light d-inline-flex w-100 align-items-center mt-4 justify-content-center mb-4">
          <svg class="bi bi-funnel text-light" fill="currentColor" height="1.5rem" viewBox="0 0 16 16" width="1.5rem"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"
                  fill-rule="evenodd"/>
          </svg>
          <h4 class="ml-1 text-light" >Filtres</h4>
        </div>

        <!--    Form-->
        <form class="d-flex flex-column w-100 align-items-center justify-content-center" id="filtres">

          <div class="d-inline-flex w-100 justify-content-between align-items-center my-1">
            <label class="text-light" for="byDate">Par date</label>
            <input class="form-check-inline m-0" id="byDate" type="checkbox" v-model="v_disableDatePicker">
          </div>

          <b-form-datepicker v-if="adaptCalendar" id="datepicker" v-model="dateFilter" :disabled="disableDatePicker" class="mb-4"></b-form-datepicker>
          <b-calendar v-else v-model="dateFilter" locale="fr" :disabled="disableDatePicker" block class="w-100 mb-4"></b-calendar>

          <div class="d-inline-flex w-100 justify-content-between align-items-center my-1">
            <label class="text-light" for="byPrem">Matériel pro</label>
            <input class="form-check-inline m-0" id="byPrem" type="checkbox">
          </div>

        </form>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SidebarClient',

  data () {
    return {
      dateFilter: null,
      v_disableDatePicker: true,
      sidebarInnerWidth: 0
    }
  },

  computed:
    {
      disableDatePicker () {
        return !this.v_disableDatePicker
      },
      adaptCalendar () {
        if (this.sidebarInnerWidth < 250) {
          console.log(this.sidebarInnerWidth)
          return true
        } else {
          console.log(this.sidebarInnerWidth)
          console.log('Big One')
          return false
        }
      }

    },
  mounted () {
    this.sidebarInnerWidth = this.$refs.widthSidebar.clientWidth
  }
}
</script>

<style>
  #sidebar-1
  {
    top: var(--header-height);
    width: var(--sidebar-width);

    background-image: url("../../assets/img/bg_left_menu.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    min-width: 150px;
    max-width: 600px;
  }

  .b-sidebar-body
  {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding-top: 10vh;
    padding-left: 8%;
    padding-right: 8%;
  }

  </style>
