<template>
  <div class="containerRight p-4">
    <b-card class="mx-auto w-75">
      <slot name="header">
        <svg xmlns="http://www.w3.org/2000/svg" width="48.952" height="39.162" viewBox="0 0 48.952 39.162">
          <path id="Icon_material-email" data-name="Icon material-email" d="M47.057,6H7.9a4.889,4.889,0,0,0-4.871,4.9L3,40.267a4.91,4.91,0,0,0,4.9,4.9H47.057a4.91,4.91,0,0,0,4.9-4.9V10.9A4.91,4.91,0,0,0,47.057,6Zm0,9.79L27.476,28.029,7.9,15.79V10.9L27.476,23.133,47.057,10.9Z" transform="translate(-3 -6)" fill="#81cb51"/>
        </svg>
        <h2>Mails</h2>
      </slot>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Mail_Admin'
}
</script>

<style scoped>

</style>
