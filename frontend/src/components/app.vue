<template>
  <div class='app'>
    <transition name='page'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import "../styles/base.scss";

  .page-enter-active, .page-leave-active {
    transition: opacity 200ms ease-in-out;
  }

  .page-enter, .page-leave-to {
    opacity: 0;
  }
</style>