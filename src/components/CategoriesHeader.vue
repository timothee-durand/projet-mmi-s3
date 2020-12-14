<template>
  <div>
    <b-navbar type="secondary" style="margin-top: 70px" fixed="top" variant="secondary" :class="adaptToSidebar">
      <b-navbar-nav class="ml-auto mr-auto" style="min-width: 75%" justified>
        <b-nav-item class="active-nav" v-for="categorie in verifiedCategories" :key="categorie" href="#" link-classes="text-light">{{categorie}}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesHeader',
  data () {
    return {
      nbCategorie: 0
    }
  },
  props:
            {
              sidebarVisible: {
                type: Boolean,
                default: false
              },
              categories: {
                type: Array,
                default: () => ['Error : No category found']
              }
            },
  computed:
            {
              adaptToSidebar () {
                if (this.sidebarVisible) {
                  return 'adaptSidebar ml-auto'
                } else {
                  return 'classic ml-auto'
                }
              },
              verifiedCategories () {
                if (this.categories.length === 0 || this.categories === null) {
                  return ['Error : No category found']
                } else {
                  return this.categories
                }
              }
            }
}
</script>

<style scoped lang="scss">

  @import "../styles/custom-bootstrap.scss";

  .adaptSidebar{
    width: calc(100vw - var(--sidebar-width));
  }

  .classic{
    width: 100%;
  }

  .navbar {
    height: var(--navbar-height);
    border-bottom: solid 4px $secondary;
    border-top: solid 6px $secondary;
  }

  .navbar-nav{
    height: calc(var(--navbar-height) - 2px);
  }

  .spacer {
    margin-top: var(--navbar-height);
  }

  .active-nav {
    border-bottom: solid 4px $primary;
  }

  .inactive-nav {
    border-bottom: solid 4px var(--secondary);
  }
</style>
