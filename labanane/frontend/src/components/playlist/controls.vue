<template>
  <div class='controls'>
    {{ player.playing }}
    <ul>
      <li>
        <button type='button' @click='prev'>Previous</button>
      </li>
      <li v-show='!player.playing'>
        <button type='button' @click='play'>Play</button>
      </li>
      <li v-show='player.playing'>
        <button type='button' @click='pause'>Pause</button>
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
        player: state => state.player
      },
      actions: {
        next: actions.nextTrack,
        prev: actions.prevTrack,
        play: actions.setPlay,
        pause: actions.setPause,
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
