<template>
 <div class='controls'>
    <ul>
      <li>
        <button type='button' @click='prev'>Previous</button>
      </li>
      <li>
        <button type='button'>Play / Pause</button>
      </li>
      <li>
        <button type='button' @click='next'>Next</button>
      </li>
      <li>
        <button type='button'>Random</button>
      </li>
    </ul>
 </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'controls',
    vuex: {
      getters: {

      },
      actions: {
        next: actions.nextTrack,
        prev: actions.prevTrack
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
