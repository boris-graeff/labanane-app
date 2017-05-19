<template>
  <transition-group name='list' tag='ul' class='list'>
    <slot></slot>
  </transition-group>
</template>

<script>
  export default {
    name: 'list'
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
  ul {
    background: url("~@/assets/tracks-background.png");
  }
</style>
