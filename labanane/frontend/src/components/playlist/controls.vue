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
        <button type='button' class='btn-next' @click='next'></button>
      </li>
      <li>
        <button type='button' class='btn-shuffle'></button>
      </li>
    </ul>
    <div class='volume'>
      <button type='button' class='btn-volume-on' v-if='volume > 0' @click='mute'></button>
      <button type='button' class='btn-volume-off' v-else @click='unmute'></button>
      <div class='volume-bar'>
        <input type='range' v-model='volume' v-bind:style='{width: volume + "%"}' step='2' />
      </div>
    </div>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'controls',
    data: function(){
      return {
        lastVolumeValue: 100
      }
    },
    computed: {
      progression: {
        get() {
          return this.player.progression
        },
        set(value) {
          this.setSeekPosition(value)
        }
      },
      volume: {
        get() {
          return this.player.volume
        },
        set(value) {
          this.setVolume(value)
        }
      }
    },
    methods: {
      mute() {
        this.lastVolumeValue = this.player.volume
        this.setVolume(0)
      },
      unmute() {
        this.setVolume(this.lastVolumeValue)
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
        setVolume: actions.setVolume,
        setSeekPosition: actions.setSeekPosition
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

    .volume {
      display: flex;
      align-items: center;

      button {
        width: 20%;
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
  }

  .btn-volume-on{
    background-image: url('/images/icn-volume-on.svg');
  }

  .btn-volume-off {
    background-image: url('/images/icn-volume-off.svg');
  }

  .volume-bar {
    width: 100%;
    max-width: 400px;

    [type=range] {
      background: url('/images/volume-step-op50.svg') repeat-x;

      &::-ms-thumb {
        width: 0;
      }

      &::-moz-range-thumb {
         width: 0;
      }

      &::-webkit-slider-thumb {
         width: 0;
      }

      &::-webkit-slider-runnable-track {
        border-bottom: 0;
      }

      &::-moz-range-track {
        border-bottom: 0;
      }

      &:after {
         background: url('/images/volume-step-op100.svg') repeat-x;
      }
    }
  }
</style>
