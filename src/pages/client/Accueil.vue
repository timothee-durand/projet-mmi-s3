<template>
  <div>
    <CategoriesHeader v-if="this.$store.getters.isAuthenticated"></CategoriesHeader>
    <div class="bg-white">

      <b-row class="vh-100 pr-5 pl-5 m-0">
        <b-col cols="12" md="6" class="d-flex flex-column justify-content-center">
          <div>
            <h1 class="text-uppercase mb-4">Prêt de <br/> matériel audiovisuel</h1>
            <p class="mb-4">Empruntez votre matériel sur le site des Portes du Jura. <br/>
              Vidéo, photo, éclairages et accessoires de toutes sortes à votre disposition.
            </p>
            <b-btn to="categories" variant="primary" pill size="lg">Emprunter</b-btn>
          </div>
        </b-col>
        <b-col offset="1" cols="12" md="5" class="d-flex flex-column justify-content-center">
          <b-img fluid :src="require('@/assets/img/hero_img.jpg')"></b-img>
        </b-col>
      </b-row>

      <b-row class="bg-dark pt-3 pb-3 pr-5 pl-5 text-white m-0">
        <b-col cols="12">
          <h2 class="text-center mt-4">Empruntez votre matériel en quelques étapes !</h2>
        </b-col>
        <b-col cols="12" md="4" class="mt-4 px-md-5">
          <div class="carre-accueil mx-auto" :style="'background-image:url('+require('@/assets/img/choisissez.jpg')+')'"></div>
          <p class="h4 text-center mt-3">Choisissez</p>
        </b-col>
        <b-col cols="12" md="4" class="mt-4 px-md-5">
          <div class="carre-accueil mx-auto" :style="'background-image:url('+require('@/assets/img/reservez.jpg')+')'"></div>
          <p class="h4 text-center mt-3">Réservez aux dates disponibles</p>
        </b-col>
        <b-col cols="12" md="4" class="mt-4 px-md-5">
          <div class="carre-accueil mx-auto" :style="'background-image:url('+require('@/assets/img/recuperez.jpg')+')'"></div>
          <p class="h4 text-center mt-3">Récupérez le matériel au point de rendez-vous</p>
        </b-col>
      </b-row>

      <h2 class="text-center mt-4">Comment ça marche ?</h2>

      <b-row class="pt-3 pb-3 pr-5 pl-5 m-0 mr-md-5 ml-md-5">
        <b-col cols="12" md="5" >
          <div class="carre-accueil " :style="'background-image:url('+require('@/assets/img/materiel_pro.jpg')+')'"></div>
        </b-col>
        <b-col cols="12" md="6" align-self="center">
          <h3>Classique et Professionnel</h3>
          <p>Deux catégories de matériel sont mises à votre disposition : Le matériel classique et le matériel de
            confirmé <br>
            Le matériel classique est disponible pour tout le monde, il ne nécessite pas de savoir-faire particulier
            pour être utilisé, vous pouvez l’emprunter directement sur notre site web. <br>
            Le matériel de confirmé est soumis à un contrôle de compétences. Vous serez contacté après avoir réservé ce
            type de matériel par une personne chargée de la gestion et du suivi.
            Le matériel de confirmé est marqué d’une étiquette.
          </p>
        </b-col>
      </b-row>

      <b-row class="pt-3 pb-3 pr-5 pl-5 m-0 mr-md-5 ml-md-5">
        <b-col cols="12" md="6" align-self="center"  order="2" order-md="1">
          <h3>Où récupérer mon matériel ?</h3>
          <p>Il vous faudra vous rendre à la Bibliothèque Universitaire, à l’horaires de rendez-vous prévu. Le
            gestionnaire du matériel en permanence vous attendra pour vous remettre le matériel réservé et vérifier avec
            vous l’état du matériel.
          </p>
        </b-col>
        <b-col cols="12" md="5" order="1" order-md="2" >
          <div class="carre-accueil ml-auto" :style="'background-image:url('+require('@/assets/img/bu_montbe.jpg')+')'"></div>
        </b-col>
      </b-row>

      <b-row class="pt-3 pb-3 pr-5 pl-5 m-0 mr-md-5 ml-md-5">
        <b-col cols="12" md="5" >
          <div class="carre-accueil " :style="'background-image:url('+require('@/assets/img/jours_ouvres.jpg')+')'"></div>
        </b-col>
        <b-col cols="12" md="6" align-self="center">
          <h3>Combien de temps ?</h3>
          <p>Vous aurez 3 jours ouvrables d’utilisation avant de devoir rendre le matériel emprunté. Il ne sera pas
            possible de rallonger la période d’emprunt. En cas de retard récurrents vous serez interdit d’emprunt de
            matériel.</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import CategoriesHeader from '@/components/CategoriesHeader'

export default {
  name: 'Accueil',
  components: {
    'CategoriesHeader': CategoriesHeader
  },
  data () {
    return {}
  },
  methods: {},
  computed:
      {},

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.containerRight {
  width: calc(100% - var(--sidebar-width));
  margin-left: var(--sidebar-width);
}

h3 {
  font-size: 1.2rem;
  font-weight: normal;
}

.carre-accueil {
  width: 287px;
  height: 287px;
  background: no-repeat center;
  background-size: cover;
}
</style>
