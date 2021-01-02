<template>
  <b-form @submit.prevent="modifyPswd" class="w-50 mx-auto mt-3">
    <h3>Mot de passe</h3>
    <p>Entrez votre nouveau mot de passe</p>
    <b-form-group
        :state="passwordStrengthState"
        valid-feedback="Votre mot de passe est fort !"
        invalid-feedback="Votre mot de passe doit contenir entre 6 et 20 caractères, un chiffre, une majuscule et une minuscule"
        label="Mot de passe"
    >
      <b-input v-model="userToSignIn.password" type="password" placeholder="motdepasse"
               :state="passwordStrengthState"></b-input>
    </b-form-group>

    <b-form-group
        :state="passwordVerificationState"
        invalid-feedback="Les deux mots de passe ne correspondent pas !"
        label="Confirmez votre mot de passe"
    >
      <b-input v-model="userToSignIn.passwordConfirm" type="password" placeholder="motdepasse"
               :state="passwordVerificationState"></b-input>
    </b-form-group>
    <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>

    <b-btn :disabled="!passwordVerificationState || !passwordStrengthState" type="submit" variant="outline-primary">
      Modifier
    </b-btn>

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
        passwordConfirm: '',
      },
      alertMessage: ''
    }
  },
  methods: {
    modifyPswd () {
      let params = new FormData()
      params.append('password', this.userToSignIn.password)
      params.append('id_univ', this.$store.getters.getUser.id_univ)

      this.alertMessage = param.messages.sending
      // eslint-disable-next-line no-unused-vars
      ajaxService.postAPI('passwordChange',  params).then(result => {
        this.$bvModal.msgBoxOk('Votre mot de passe a bien été mis à jour !')
      }).catch(err => {
        this.$bvModal.msgBoxOk('Il y a eu un problème à la mise à jour de votre mot de passe :' + err.response.data)
      })

    },
  },

  computed: {
    passwordStrengthState () {
      if (this.userToSignIn.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
        return true
      } else {
        return false
      }
    },
    passwordVerificationState () {
      if (this.userToSignIn.password === this.userToSignIn.passwordConfirm) {
        return true
      } else {
        return false
      }
    }
  },

}
</script>

<style scoped>

</style>
