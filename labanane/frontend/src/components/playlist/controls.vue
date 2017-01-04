<template>
  <div class='controls'>
    <div class='progress bar'>
      <input type='range' v-model='progression' />
    </div>
    <ul>
      <li>
        <button type='button' class='btn-previous' @click='prev'></button>
      </li>
      <li v-show='player.state !== "playing"'>
        <button type='button' class='btn-play' @click='play'></button>
      </li>
      <li v-show='player.state === "playing"'>
        <button type='button' class='btn-pause' @click='pause'></button>
      </li>
      <li>
        <button type='button' class='btn-next' @click='next'></button>
      </li>
      <li>
        <button type='button' class='btn-shuffle'></button>
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

      li {
        width: 20%;
      }
    }

    button {
      width: 100%;
      height: 60px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
  }

  .btn-next {
    background-image: url('/images/icn-next.svg');
  }

  .btn-previous {
    background-image: url('/images/icn-previous.svg');
  }

  .btn-play {
    background-image: url('/images/icn-play.svg');
  }

  .btn-pause {
    background-image: url('/images/icn-pause.svg');
  }

  .btn-shuffle {
    background-image: url('/images/icn-shuffle.svg');
  }
</style>
