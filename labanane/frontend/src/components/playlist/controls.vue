<template>
  <div class='controls'>
    {{ player.state }}
    <div class='progress bar'>
      <input type='range' v-model='progression' />
    </div>
    <ul>
      <li>
        <button type='button' @click='prev'>Previous</button>
      </li>
      <li v-show='player.state !== "playing"'>
        <button type='button' @click='play'>Play</button>
      </li>
      <li v-show='player.state === "playing"'>
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
    computed: {
      progression: {
        get() {
          return this.track.progression
        },
        set(value) {
          // fixme
        }
      }
    },
    vuex: {
      getters: {
        player: state => state.player,
        track: state => state.track
      },
      actions: {
        next: actions.nextTrack,
        prev: actions.prevTrack,
        play: actions.setPlay,
        pause: actions.setPause
      }
    }
  }
</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';

  .controls {
    padding: $space-medium;

    ul {
      display: flex;
      justify-content: space-around;
    }

  }
</style>
