<template>
  <div>
    <SidebarClient sidebarWidth="15%">
      <div class="p-2 d-flex flex-column align-items-center">
        <span class="text-white activeStepper">Sélection en cours</span>
        <div class="border-left border-white mt-3 separator"></div>
        <span class="text-white">Motivation</span>
        <div class="border-left border-white mt-3 separator"></div>
        <span class="text-white">Rendez-vous</span>
        <div class="border-left border-white mt-3 separator"></div>
        <span class="text-white">Où récupérer mon matériel ?</span>
        <div class="border-left border-white mt-3 separator"></div>
      </div>
    </SidebarClient>

    <div class="containerRight bg-secondary">
      <div class="container-fluid p-4 bg-secondary ">
      <b-row>

        <div class="c-card p-3 col-12 mt-3 shadow"
             style="border-radius: 20px; background-color: #ffffff; overflow: hidden;">
          <div class="d-flex flex-row align-items-center justify-content-between cardContent">
            <img src="https://picsum.photos/1024/480/?image=52" alt="test" class="mr-4">
            <h3>There is some text here</h3>
            <p class="cardDesc">description produit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis
              dicta dolorem eos in officiis provident quasi quidem ratione veritatis. Eveniet impedit in neque
              possimus voluptate. Accusamus asperiores rem voluptatem?</p>
            <p>x1</p>
              <b-button variant="white" v-b-tooltip.hover title="Tooltip directive content" class="mr-0 ml-auto"><i class="fas fa-trash text-secondary"></i></b-button>
              <img src="https://placekitten.com/20/20" alt="premimum" class="d-block ml-auto mr-0 float-right" style="width: 25px; align-self: start">
          </div>
        </div>
      </b-row>
    </div>
    </div>
  </div>
</template>

<script>
import SidebarClient from '@/components/SidebarClient'

export default {
  name: 'Reservation',
  components: {
    'SidebarClient': SidebarClient
  }
}
</script>

<style scoped>

  .containerRight {
    width: calc(100% - 15%);
    margin-left: 15%;
    height: calc(100vh - var(--header-height));
  }

  .separator:not(:last-of-type) {
    height: 100px;
  }

  .activeStepper {
    border-bottom: white 1px solid;
    font-weight: bold;
  }

  h3 {
    font-size: 1rem;
    font-weight: bold;
  }

  .cardContent *
  {
    margin-right: 10%;
    margin-bottom: 0;
  }
  .cardContent>img
  {
    width: 10%;
  }

  .cardDesc
  {
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    height: 70px;
    width: 30%;
  }
</style>
