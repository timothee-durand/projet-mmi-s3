<template>
  <div>
    <CategoriesHeader sidebarVisible :categories="categoriesArray"></CategoriesHeader>
    <SidebarClient></SidebarClient>
    <div class="containerRight" style="background-color: #dcdcdc;">
      <div class="container-fluid">
        <b-row>
          <div class="c-card mt-3 col-6 shadow p-4" style="height: 270px; border-radius: 20px; background-color: #ffffff;">
            <img src="https://placekitten.com/20/20" alt="premimum" class="d-block ml-auto mb-1">
            <div class="d-flex flex-row align-items-center mb-2">
              <b-carousel
                id="carousel-1"
                :interval="4000"
                controls
                indicators
                background="#ababab"
                img-width="1024"
                img-height="480"
                style="height: 100%;"
                class="w-50 mr-4"
              >
                <!-- Text slides with image -->
                <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>

                <!-- Slides with custom text -->
                <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"></b-carousel-slide>

                <!-- Slides with image only -->
                <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

                <!-- Slides with img slot -->
                <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
                <b-carousel-slide>
                  <template #img>
                    <img
                      class="d-block img-fluid w-100"
                      width="1024"
                      height="480"
                      src="https://picsum.photos/1024/480/?image=55"
                      alt="image slot"
                    >
                  </template>
                </b-carousel-slide>
              </b-carousel>
              <div class="w-50" style="overflow: hidden; display: block; text-overflow: ellipsis; height: 170px">
                <h3 class="border-bottom border-dark t">There is some text here</h3>
                <p>description produit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis
                  dicta dolorem eos in officiis provident quasi quidem ratione veritatis. Eveniet impedit in neque
                  possimus voluptate. Accusamus asperiores rem voluptatem?</p>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <p class="d-block mb-0">Disponibilité</p>
              <b-button variant="primary">Button</b-button>
            </div>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesHeader from '@/components/client/CategoriesHeader'
import SidebarClient from '@/components/client/SidebarClient'

export default {
  name: 'Accueil',
  components: {
    'CategoriesHeader': CategoriesHeader,
    'SidebarClient': SidebarClient
  },
  data () {
    return {
      showDismissibleAlert: false,
      categoriesArray: ['Kit', 'Prise de vue', 'Son', 'Eclairage', 'Accessoires']
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .containerRight {
    width: calc(100% - var(--sidebar-width));
    margin-left: var(--sidebar-width);
  }
  h3
  {
    font-size: 1.2rem;
    font-weight: normal;
  }
</style>
