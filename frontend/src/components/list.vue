<template>
  <ul class='list'>
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'list'
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
  ul {
    background: url("~@/assets/tracks-background.svg");
  }
</style>
