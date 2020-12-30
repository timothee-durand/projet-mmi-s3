<template>
  <div class="p-4">
    <h1>Bienvenue sur Pictum</h1>
    <p>Le service de gestion de prêt matériel vidéo du Campus des Portes du Jura</p>
    <div class="w-50 mx-auto">
      <b-btn-group class="mx-auto w-100 mb-2">
        <b-btn variant="outline-primary" @click="inscription = false" :pressed="!inscription">Se connecter</b-btn>
        <b-btn variant="outline-primary" @click="inscription = true" :pressed="inscription">S'inscrire</b-btn>
      </b-btn-group>
      <b-form v-if="inscription" @submit.prevent="signIn">
        <h3>Inscription</h3>

            <b-form-group
                valid-feedback="Votre identifiant est correct"
                invalid-feedback="Vous devez entrez un identifiant universitaire valide !"
                :state="userVerificationState"
                label="Identifiant universitaire"
            >
              <b-input-group>
                <b-input v-model="userToSignIn.username" placeholder="mdupont" :state="userVerificationState" @change="verifyLDAP"></b-input>
                <b-btn size="sm" variant="primary" @click="verifyLDAP" >Vérifier ID universitaire</b-btn>
              </b-input-group>
            </b-form-group>
            <p v-if="userToSignIn.nomLDAP.length > 0 ">Vous êtes {{userToSignIn.nomLDAP}} {{userToSignIn.prenomLDAP}}</p>

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

            <p>Avant de pouvoir vous connecter il vous faudra aller sur votre boite mail universitaire pour valider votre identité.</p>
            <b-btn :disabled="!userVerificationState || !passwordVerificationState || !passwordStrengthState" type="submit" variant="outline-primary">S'inscrire</b-btn>

      </b-form>

      <b-form v-if="!inscription" class="d-flex flex-column " @submit="login">
        <h3>Connexion</h3>
        <b-row>
          <b-col cols="4">
            <p class="mr-2">Identifiant universitaire :</p>
          </b-col>
          <b-col cols="8">
            <b-input v-model="userToConnect.username" placeholder="mdupont" class="flex"></b-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="4"><p class="mr-2">Mot de passe :</p></b-col>
          <b-col cols="8">
            <b-input v-model="userToConnect.password" type="password" placeholder="motdepasse"></b-input>
          </b-col>
        </b-row>

        <b-btn type="submit" variant="primary">Se connecter</b-btn>

        <b-btn v-b-modal.modal-psw-forgot size="sm" variant="outline-light" class="text-black-50 mt-4">Mot de passe oublié</b-btn>
      </b-form>
    </div>

    <modal-pictum title="Mot de passe oublié" id-modal="modal-psw-forgot" :callback-ok="{event:'sendPasswd'}" @sendPasswd="passwordForgot">
      <p>Un nouveau mot de passe va vous être enoyé par mail. Vous pourrez ensuite le changer dans l'espace "Mot de passe".</p>
      <b-form-group
      label="Entrez votre identifiant universitaire">
        <b-input v-model="mailToNewMdp" placeholder="mdpont" ></b-input>
      </b-form-group>
    </modal-pictum>

  </div>
</template>

<script>
import ajaxService from '@/services/ajaxService.js'
import appService from '@/services/appService.js'
import param from '@/param/param.js'
import ModalPictum from '@/components/ModalPictum.vue'

export default {
  name: 'Login',
  components: {ModalPictum},
  data () {
    return {
      inscription: false,
      userToConnect: {
        username: '',
        password: ''
      },
      userToSignIn: {
        username: '',
        password: '',
        passwordConfirm:'',
        nomLDAP:'',
        prenomLDAP:''
      },
      userVerificationState: false,
      isVerifiying:false,
      alertMessage:'',
      mailToNewMdp:''
    }
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
  methods: {
    login () {

      let params = new FormData()
      params.append('username', this.userToConnect.username)
      params.append('password', this.userToConnect.password)
      ajaxService.postAPI('login', params).then(result => {
        //stocke le token dans le localStorage
        appService.setLocal(result.token)

        //stocke l'utilisateur dans le store
        this.$store.commit('setuser', result.user)
        this.$store.commit('setusertype', result.user_type)

        this.$router.push('/')
      }).catch(err => {
        if(err.response.status === 418) {
          //si le mail n'est pas vérifié
          this.$bvModal.msgBoxConfirm("Votre email universitaire n'a pas été validé, voulez-vous que le mail de confirmation du mail vous soit renvoyé ?")
              .then(value => {
                if(value){
                  ajaxService.getSingleApi("mailVerifiationResend", this.userToConnect.username).then(res=>{
                    this.mailToNewMdp = "";
                    this.$bvModal.msgBoxOk("Un nouveau mail de confirmation vous a été envoyé ! (" + res +")");
                  }).catch(res=>{
                    this.$bvModal.msgBoxOk("Il y a eu un problème ! (" + res.response.data+")");
                  })
                }
              })
        } else {
          this.$bvModal.msgBoxOk("Il y a eu un problème pendant votre connexion : " + err.response.data)
        }

      })
    },

    signIn(){
      let params = new FormData()
      params.append('id_univ', this.userToSignIn.username)
      params.append('password', this.userToSignIn.password)
      //par défault
      params.append('valide', 1)

      //GRt5mlte
      this.alertMessage = param.messages.sending;
      // eslint-disable-next-line no-unused-vars
      ajaxService.postAPI('reservations', params).then(result => {
          this.userToConnect.username = this.userToSignIn.username;
          this.userToConnect.password = this.userToSignIn.password;

          this.login();
      }).catch(err => {
          this.$bvModal.msgBoxOk("Il y a eu un problème à l'inscription :" + err.response.data);
      })

    },

    verifyLDAP () {
      let params = new FormData()
      params.append('id_univ', this.userToSignIn.username)
      this.isVerifiying = true;
      this.userVerificationState = false;
      // eslint-disable-next-line no-unused-vars
      ajaxService.postAPI('getLDAP', params).then(result => {
        this.userVerificationState = true;
        console.log(result, this.userVerificationState)
        this.isVerifiying = false;

        this.userToSignIn.nomLDAP = result.nom;
        this.userToSignIn.prenomLDAP = result.prenom;

      }).catch(error => {
        console.log(error.response)
        this.isVerifiying = false;
        if (error.response.status === 404) {
          console.log("yo")
          this.userVerificationState = false
        } else {
          this.$bvModal.msgBoxOk('Problème à la vérification de votre identifiant :' + error.response.data)
        }
      })
    },
    passwordForgot(){
      ajaxService.getSingleApi("passwordForgot", this.mailToNewMdp).then(res=>{
        this.$bvModal.hide("modal-psw-forgot");
        this.mailToNewMdp = "";
        this.$bvModal.msgBoxOk("Un nouveau mot de passe vous a été envoyé par mail ! (" + res +")");
      }).catch(res=>{
        this.$bvModal.hide("modal-psw-forgot");
        this.mailToNewMdp = "";
        this.$bvModal.msgBoxOk("Il y a eu un problème ! (" + res.response.data+")");
      })
    }
  },
}
</script>

<style scoped>

</style>
