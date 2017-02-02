<template>
  <div class='player'>
    <div class='progress-bar'>
      <input type='range' v-model='progression' :style='{width: progression.toFixed(1) + "%"}' step='0.1' />
    </div>
    <div class='content'></div>
      <div class='track-name'>{{track.name}}</div>
      <div class='controls'>
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
      <div class='volume'>
        <button type='button' class='btn-volume-on' v-if='volume > 0' @click='mute'></button>
        <button type='button' class='btn-volume-off' v-else @click='unmute'></button>
        <div class='volume-bar'>
          <input type='range' v-model='volume' :style='{width: volume + "%"}' step='2'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'player',
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
      unmute() {
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
        setSeekPosition: actions.setSeekPosition,
        toggleShuffle: actions.toggleShuffle,
        setVolume: actions.setVolume
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .player {
    position: fixed;
    height: $player-height;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(white, 0.5);
    padding: $space-small;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .track-name {
      font-size: 2rem;
    }
  }

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
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
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

  .volume {
    width: 200px;
    display: flex;
    align-items: center;

    button {
      width: 40px;
      height: 40px;
      transition: background-color 300ms ease-in-out;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
  }

  .btn-volume-on {
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
