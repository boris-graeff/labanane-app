<template>
  <div class='controls'>
    <div class='progress-bar'>
      <input type='range' v-model='progression' v-bind:style='{width: progression.toFixed(1) + "%"}' step='0.1' />
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
        <button type='button' class='btn-shuffle' @click='toggleShuffle' :class='{"enabled": player.shuffle}'></button>
      </li>
      <li>
        <button type='button' class='btn-next' @click='next'></button>
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
          return this.player.progression
        },
        set(value) {
          this.setSeekPosition(value)
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
        pause: actions.setPause,
        setSeekPosition: actions.setSeekPosition,
        toggleShuffle: actions.toggleShuffle
      }
    }
  }
</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';

  .controls {
    padding: 0 $space-medium;

    ul {
      display: flex;
      justify-content: space-between;

      li {
        width: 20%;
      }
    }

    button {
      width: 100%;
      height: 60px;
      transition: background-color 300ms ease-in-out;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;

      &:hover {
        background-color: rgba($black, 0.1);
      }
    }
  }

  .progress-bar {
    margin-bottom: $space-small;
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

    &.enabled {
       background-color: rgba($black, 0.1);
    }
  }
</style>
