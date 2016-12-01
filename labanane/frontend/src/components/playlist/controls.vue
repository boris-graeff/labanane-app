<template>
 <div class='controls'>
    <ul>
      <li>
        <button type='button'>Previous</button>
      </li>
      <li>
        <button type='button'>Play / Pause</button>
      </li>
      <li>
        <button type='button'>Next</button>
      </li>
      <li>
        <button type='button'>Random</button>
      </li>
    </ul>
 </div>
</template>

<script>
  export default {
    name: 'controls',
    vuex: {
      getters: {

      }
    }
  }
</script>

<style lang='sass'>
  .controls {
    ul {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
