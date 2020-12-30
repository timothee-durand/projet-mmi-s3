<template>
  <b-form  @submit.prevent="signIn" class="w-50 mx-auto mt-3">
    <h3>Mot de passe</h3>
    <p>Entrez votre nouveau mot de passe</p>
    <b-form-group
        :state="passwordStrengthState"
        valid-feedback="Votre mot de passe est fort !"
        invalid-feedback="Votre mot de passe doit contenir entre 6 et 20 caractères, un chiffre, une majuscule et une minuscule"
        label="Mot de passe"
    >
      <b-input v-model="userToSignIn.password" type="password" placeholder="motdepasse" :state="passwordStrengthState"></b-input>
    </b-form-group>

    <b-form-group
        :state="passwordVerificationState"
        invalid-feedback="Les deux mots de passe ne correspondent pas !"
        label="Confirmez votre mot de passe"
    >
      <b-input v-model="userToSignIn.passwordConfirm" type="password" placeholder="motdepasse" :state="passwordVerificationState"></b-input>
    </b-form-group>
    <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>

    <b-btn :disabled="!passwordVerificationState || !passwordStrengthState" type="submit" variant="outline-primary">S'inscrire</b-btn>

  </b-form>
</template>

<script>
import param from '@/param/param.js'
import ajaxService from '@/services/ajaxService.js'

export default {
  name: 'PasswordModification',
  data () {
    return {
      userToSignIn: {
        password: '',
        passwordConfirm:'',
      },
      alertMessage:''
    }
  },

  signIn(){
    let params = new FormData()
    params.append('password', this.userToConnect.password)

    this.alertMessage = param.messages.sending;
    // eslint-disable-next-line no-unused-vars
    ajaxService.putApi('reservations', this.$store.getters.getUser.id, params).then(result => {
      this.$bvModal.msgBoxOk("Votre mot de passe a bien été mis à jour !" );
    }).catch(err => {
      this.$bvModal.msgBoxOk("Il y a eu un problème à l'inscription :" + err.response.data);
    })

  },
  computed: {
    passwordStrengthState () {
      if( this.userToSignIn.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
        return true;
      } else {
        return false;
      }
    },
    passwordVerificationState(){
      if(this.userToSignIn.password === this.userToSignIn.passwordConfirm) {
        return true;
      } else {
        return false
      }
    }
  },

}
</script>

<style scoped>

</style>
