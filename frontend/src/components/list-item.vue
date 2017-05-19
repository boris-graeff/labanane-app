<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'list-item'
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/constants';

  li {
    position: relative;
    height: 25px;
    padding: 0 6px;
    line-height: 25px;
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: rgba($wheat, 0.5);
    }
  }
</style>
