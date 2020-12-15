<template>
  <div>
    <b-sidebar :width="this.sidebarWidth" id="sidebar-1" title="Sidebar" fixed="top" shadow no-close-on-route-change visible no-header class="d-flex justify-content-center position-relative">
      <slot></slot>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SidebarClient',
  props:
  {
    sidebarWidth: {
      type: String,
      default: 'var(--sidebar-width)'
    },

  }
}
</script>

<style>
  #sidebar-1
  {
    top: var(--header-height);

    background-image: url("../assets/img/bg_left_menu.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    min-width: 150px;
    max-width: 600px;
  }

  .b-sidebar-body
  {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding-top: 10vh;
    padding-left: 8%;
    padding-right: 8%;
  }

  </style>
