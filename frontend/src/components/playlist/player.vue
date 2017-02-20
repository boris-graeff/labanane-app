<template>
  <div class='player'>
    <div class='progress-bar'>
      <input type='range' v-model='progression' :style='{width: progression.toFixed(1) + "%"}' step='0.1' />
    </div>
    <div class='content'>
      <div class='track-name'>{{track.name}}</div>
      <ul class='controls'>
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
      </ul>
      <div class='volume'>
        <button type='button' class='btn-shuffle' @click='toggleShuffle' :class='{"enabled": player.shuffle}'></button>
        <button v-show='player.videoMode' type='button' @click='toggleVideoMode' class='btn-video-mode-off'></button>
        <button v-show='!player.videoMode' type='button' @click='toggleVideoMode' class='btn-video-mode-on'></button>
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
        toggleVideoMode: actions.toggleVideoMode,
        setVolume: actions.setVolume
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .player {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 $space-small;
    height: $player-height;
    background: $wheat;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    button {
      width: 48px;
      height: 48px;
      padding: 0;
      transition: background-color 300ms ease-in-out;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: 40px;
      background-position: center center;
      border-radius: 100%;

      &:hover {
        background-color: rgba($black, 0.1);
      }
    }

    .track-name {
      flex: 1;
      font-size: 2rem;
    }

    .controls {
      display: flex;
      flex: 0;
      justify-content: center;

      > li {
        margin: 0 $space-small;
      }
    }

    .volume {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
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

    &.enabled {
      background-color: rgba($black, 0.1);
    }
  }

  .btn-video-mode-on {
    background-image: url('/images/icn-video-mode-on.svg');
  }

  .btn-video-mode-off {
    background-image: url('/images/icn-video-mode-off.svg');
  }

  .btn-volume-on {
    background-image: url('/images/icn-volume-on.svg');
  }

  .btn-volume-off {
    background-image: url('/images/icn-volume-off.svg');
  }

  .volume-bar {
    width: 200px;

    [type=range] {
      background-image: url('/images/volume-step-op50.svg');
      background-size: 100% 100%;
      height: 16px;

      &:before, &:after {
        background: url('/images/volume-bar.svg') repeat-x;
        border-radius: 0;
        height: 100%;
      }

      &:before {
        opacity: 0.3;
      }
    }
  }
</style>
