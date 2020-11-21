<template>
  <div id="app">
    <header class="bg-dark text-light w-100 sticky-top d-inline-flex align-items-center justify-content-between p-3">
      <img alt="Logo Pictum" class="logo w-auto h-75" src="./assets/img/fond_sombre_st_logo.svg">

      <div class="dropdown">
        <button aria-expanded="false" aria-haspopup="true" id="accountButton" class="rounded-circle bg-primary border-0"
                data-toggle="dropdown"
                type="button">AM
        </button>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down text-light" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>

        <div class="dropdown-menu" aria-labelledby="accountButton">
          <a class="dropdown-item" href="#">Voir vue étudiant</a>
          <a class="dropdown-item text-danger" href="#">Se déconnecter</a>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
// lang="scss"
<style >
  header {
    height: 100px;
  }
  #accountButton {
    width: 45px;
    height: 45px;
  }
</style>
