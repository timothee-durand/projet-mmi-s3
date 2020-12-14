<template>
  <b-modal :ref="idModal" centered  :title="title" :id="idModal" header-border-variant="light" footer-border-variant="light">
    <slot ></slot>
    <template #modal-footer>
      <footer class="d-flex justify-content-between w-75 mx-auto">
        <b-button pill variant="outline-success" @click="callBackCancelDef">{{ textCancelButton }}</b-button>
        <b-button pill variant="success ml-4" @click="callbackOk">{{ textOkButton }}</b-button>
      </footer>
    </template>
  </b-modal>
</template>

<script>
export default {
name: "ModalPictum",
  props: {
    title: {
      type: String,
      default:""
    },
    idModal: {
      type: String,
      default:"modal-pictum"
    },
    textOkButton: {
      type: String,
      default:"Valider"
    },
    textCancelButton: {
      type: String,
      default:"Annuler"
    },
    callbackOk: {
      type: Function,
      required:true
    },


  },
  methods: {
    callBackCancelDef () {
      this.$bvModal.hide(this.idModal);
    }
  },
}
</script>

<style scoped>

</style>
