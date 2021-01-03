<template>
  <modal-pictum title="Créer/Editer" :id-modal="idPerso" text-cancel-button="Fermer" hide-footer size="lg" :on-show-method="setMat">
    <b-form enctype="multipart/form-data" @submit.prevent="send">
      <b-input-group class="mb-2">
        <b-input placeholder="Nom" v-model="materiel.nom" class="mr-2 border-primary " required
                 :state="materiel.nom.length > 4"></b-input>
        <b-input placeholder="Référence" v-model="materiel.ref" class="border-primary " required
                 :state="materiel.ref.length > 6"></b-input>
      </b-input-group>

      <b-form-group label="Caractéristiques" :description="materiel.caracteristiques.length + '/2000'" :state="materiel.caracteristiques.length<10000" invalid-feedback="Vous ne devez pas dépasser 2000 caractères">
<!--        <b-textarea required placeholder="Caractéristiques" v-model="materiel.caracteristiques"-->
<!--                    class="mb-2 border-primary" :state="materiel.caracteristiques.length < 2000"></b-textarea>-->
        <wysiwyg v-model="materiel.caracteristiques" />
      </b-form-group>
      <b-form-group label="Pour quoi faire ?" :description="materiel.usage.length + '/10 000' " :state="materiel.usage.length<10000" invalid-feedback="Vous ne devez pas dépasser 10000 caractères">
        <wysiwyg v-model="materiel.usage" />
      </b-form-group>

      <b-form-checkbox
          id="checkbox-1"
          v-model="materiel.pro"
          class="mb-2 text-center"
          value="1"
          unchecked-value="0"
      >
        Matériel "pro" (demande controle avant prêt)
      </b-form-checkbox>

      <label class="w-100">Malette : <br/>
        <b-select required v-model="materiel.malette_id" class="mb-2 border-primary">
          <b-select-option value="" disabled> Choissisez une malette</b-select-option>
          <b-select-option value=-1> Pas dans une malette</b-select-option>
          <b-select-option v-for="malette in malettes" :value="malette.id" :key="malette.id">{{ malette.ref }}
          </b-select-option>
        </b-select>
      </label>


      <label class="w-100">
        Département :<br/>
        <b-select required v-model="materiel.departement_id" class="mb-2 border-primary">
          <b-select-option value="" disabled> Choissisez un département</b-select-option>
          <b-select-option v-for="dep in departements" :value="dep.id" :key="dep.id">{{ dep.nom }}</b-select-option>
        </b-select>
      </label>

      <label class="w-100">
        Type :
        <b-select required v-model="materiel.type_id" class="mb-2 border-primary">
          <b-select-option value="" disabled> Choississez le type de matériel</b-select-option>
          <b-select-option v-for="type in types" :value="type.id" :key="type.id">{{ type.nom }}</b-select-option>
        </b-select>
      </label>





      <div class="w-100 d-flex flex-column">
        <div class="w-100 d-inline-flex justify-content-between mb-2 align-items-center">
          <p>Tutos :</p>
          <b-button type="button" @click="addTuto" variant="primary">+</b-button>
        </div>
        <b-input v-for="(tuto, ind) in materiel.tutos" :key="ind" v-model="materiel.tutos[ind]" :value="tuto" type="url"
                 class="mb-1 border-primary" :placeholder="'Entrez l\'url du tuto n°'+ind" ></b-input>
      </div>

      <p class="m-0 mt-2">Image : (Attention n'accepte que les images !)<br/></p>
      <b-img fluid :src="materiel.photo"></b-img>
      <b-form-file id="input-mat-photo" accept="image/*" class="d-block border-primary"
                   placeholder="Choisissez ou glissez-déposez" :required="mode!=='edit'" browse-text="Choisir"
                   drop-placeholder="Glissez-ici"></b-form-file>

      <b-form-group label="Notice">
        <b-input type="url" v-model="materiel.notice"></b-input>
      </b-form-group>


      <b-button type="submit" pill variant="outline-primary" class="m-auto">{{ textSendButton }}</b-button>
      <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>
    </b-form>
  </modal-pictum>
</template>
<script>
import ModalPictum from '@/components/ModalPictum.vue'
import ajaxService from '@/services/ajaxService.js'
import param from '@/param/param.js'
import utilsServices from '@/services/utilsServices.js'

export default {
  name: 'mat-edit',
  components: {ModalPictum},
  props: {
    idPerso: {
      type: String,
      default: 'modif-mat'
    },
    materielToEdit: {
      type: Object,
    },
    mode: {
      type: String,
      required: true
    },
    callbackOk: {
      type: Function,
      required: true
    },
  },
  data () {
    return {
      departements: [],
      malettes: [],
      types: [],
      alertMessage: '',
      materiel: {
        caracteristiques: '',
        departement_id: '',
        indisp_raison: '',
        malette_id: '',
        nom: '',
        notice: '',
        photo: '',
        ref: '',
        pro:'',
        tutos: [
          ''
        ],
        type_id: '',
        usage: '',
      }
    }
  },
  computed: {
    textSendButton () {
      if (this.mode === 'add') {
        return 'Créer'
      } else if (this.mode === 'modif') {
        return 'Modifier'
      } else {
        return 'Envoyer'
      }
    }
  },
  methods: {
    addTuto () {
      this.materiel.tutos.push('')
    },
    show () {
      this.$bvModal.show(this.idPerso)
    },
    setDepartements () {
      ajaxService.getAllApi('departements')
          .then(result => {
            this.departements = result
          })
    },
    setMals () {
      ajaxService.getAllApi('malettes')
          .then(result => {
            this.malettes = result
          })
    },
    setTypes () {
      ajaxService.getAllApi('types')
          .then(result => {
            this.types = result
          })
    },
    send () {

        //console.log("add");
        let data = new FormData()
        if (this.materiel.malette_id === "-1") {
          data.append('malette_id', "")
        } else {
          data.append('malette_id', this.materiel.malette_id)
        }
        data.append('ref', this.materiel.ref)
        data.append('nom', this.materiel.nom)

      if(document.querySelector('#input-mat-photo').files.length !== 0) {
        data.append('photo', document.querySelector('#input-mat-photo').files[0])
      }
        data.append('usage', this.materiel.usage)
        data.append('carac', this.materiel.caracteristiques)

        data.append('notice', this.materiel.notice)

        data.append('type_id', this.materiel.type_id)
        data.append('pro', this.materiel.pro)

        data.append('departement_id', this.materiel.departement_id)
        data.append('tutos', JSON.stringify(this.materiel.tutos))

        //console.log(data.get("ref"));

        this.alertMessage = param.messages.sending

      if (this.mode === 'add') {
        ajaxService.postAPI('materiels', data).then(response => {
          this.alertMessage = param.messages.stored + response
          this.callbackOk

        }).catch(error => {
          this.alertMessage = param.messages.problem + utilsServices.getCoolestError(error)
          this.callbackOk
        })

      } else if (this.mode === 'edit') {
        ajaxService.putApi('materiels', this.materiel.id, data).then(response => {
          this.alertMessage = param.messages.stored + response
          this.callbackOk

        }).catch(error => {
          this.alertMessage = param.messages.problem + utilsServices.getCoolestError(error)
          this.callbackOk
        })
      }
    },
    setMat () {
      this.alertMessage = ''
      if (this.mode === 'edit') {
        this.materiel = this.materielToEdit;
        this.materiel.tutos = JSON.parse(this.materiel.tutos);
        this.materiel.departement_id = this.materiel.departement.id;
        this.materiel.malette_id = this.materiel.malette.id;
        if(this.materiel.malette.id === null) {
          this.materiel.malette_id = -1;
        }
        this.materiel.type_id = this.materiel.type.id;
      } else {
        this.materiel = {
          caracteristiques: '',
          departement_id: '',
          indisp_raison: '',
          malette_id: '',
          nom: '',
          notice: '',
          photo: '',
          ref: '',
          tutos: [
            ''
          ],
          type_id: '',
          usage: '',
        }
      }
    }

  },
  mounted () {
    this.setMals()
    this.setTypes()
    this.setDepartements()
  }
}
</script>


