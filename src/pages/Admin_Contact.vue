<template>
  <div class="containerRight p-4">
    <b-card class="mx-auto w-75">
      <slot name="header" >
        <div class="d-inline-flex w-25 justify-content-between ">
          <svg xmlns="http://www.w3.org/2000/svg" width="48.952" height="39.162" viewBox="0 0 48.952 39.162">
            <path id="Icon_material-email" data-name="Icon material-email" d="M47.057,6H7.9a4.889,4.889,0,0,0-4.871,4.9L3,40.267a4.91,4.91,0,0,0,4.9,4.9H47.057a4.91,4.91,0,0,0,4.9-4.9V10.9A4.91,4.91,0,0,0,47.057,6Zm0,9.79L27.476,28.029,7.9,15.79V10.9L27.476,23.133,47.057,10.9Z" transform="translate(-3 -6)" fill="#81cb51"/>
          </svg>
          <h2>Mails</h2>
        </div>
      </slot>
      <p>Ce message va être transmis à la personne chargée d'administrer Pictum.</p>
      <b-form @submit.prevent="sendMail">
        <b-form-input v-model="subject"  placeholder="Sujet du mail"  class="mt-3"></b-form-input>
        <b-textarea placeholder="Entrez votre message" v-model="message" class="mt-3" rows="10"></b-textarea>
        <b-button type="submit" variant="success" pill class="pr-3 pl-3 pt-2 pb-2 mt-3 mx-auto d-block">Envoyer</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
name: "Admin_Contact",
  data () {
    return {
      subject:'',
      message:''
    }
  },
  methods: {
    sendMail () {
      
    }
  },
}
</script>

<style scoped>

</style>
