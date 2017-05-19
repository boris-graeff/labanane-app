<template>
  <div class='player'>
    <div class='slider progress-bar'>
      <input type='range' v-model='progression' :style='{width: progression.toFixed(1) + "%"}' step='0.1' />
      <span :style='{width: progression.toFixed(1) + "%"}'></span>
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
        <div class='slider volume-bar'>
          <input type='range' v-model='volume' step='2'/>
          <span :style='{width: volume + "%"}'></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'player',
    data () {
      return {
        lastVolumeValue: 100
      }
    },
    computed: {
      ...mapState(['player', 'track']),
      progression: {
        get () {
          return this.player.progression
        },
        set (value) {
          this.setSeekPosition(value)
        }
      },
      volume: {
        get () {
          return this.player.volume
        },
        set (value) {
          this.setVolume(value)
        }
      }
    },
    methods: {
      ...mapActions({
        next: 'nextTrack',
        prev: 'prevTrack',
        play: 'setPlay',
        pause: 'setPause',
        setSeekPosition: 'setSeekPosition',
        toggleShuffle: 'toggleShuffle',
        toggleVideoMode: 'toggleVideoMode',
        setVolume: 'setVolume'
      }),
      mute () {
        this.lastVolumeValue = this.player.volume
        this.setVolume(0)
      },
      unmute () {
        this.setVolume(this.lastVolumeValue)
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/constants';

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
      overflow: hidden;
    }

    button {
      width: 48px;
      height: 48px;
      display: block;
      padding: 0;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: 40px;
      background-position: center center;
      position: relative;

      &:before {
        content: '';
        background-color: rgba($black, 0.1);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        transform: scale(0);
        transition: transform 200ms cubic-bezier(0.64, 0.57, 0.67, 1.53), opacity 200ms ease-in-out;
        border-radius: 100%;
      }

      &:hover:before,  &.enabled:before {
        transform: scale(1);
        opacity: 1;
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
      min-width: 204px;

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

    .btn-shuffle, .btn-video-mode-on, .btn-video-mode-off, .btn-volume-on, .btn-volume-off {
      background-size: 35px;
    }

    .btn-video-mode-on, .btn-video-mode-off {
      background-position: top 5px center;
    }
  }

  .btn-next {
    background-image: url('~@/assets/icn-next.svg');
  }

  .btn-previous {
    background-image: url('~@/assets/icn-previous.svg');
  }

  .btn-play {
    background-image: url('~@/assets/icn-play.svg');
  }

  .btn-pause {
    background-image: url('~@/assets/icn-pause.svg');
  }

  .btn-shuffle {
    background-image: url('~@/assets/icn-shuffle.svg');
  }

  .btn-video-mode-on {
    background-image: url('~@/assets/icn-video-mode-on.svg');
  }

  .btn-video-mode-off {
    background-image: url('~@/assets/icn-video-mode-off.svg');
  }

  .btn-volume-on {
    background-image: url('~@/assets/icn-volume-on.svg');
  }

  .btn-volume-off {
    background-image: url('~@/assets/icn-volume-off.svg');
  }

  .slider.volume-bar {
    width: 200px;

    &:before, span:after {
      background-color: transparent;
      background-image: url('~@/assets/volume-bar.svg');
      background-repeat: repeat-x;
      background-position: left center;
      border-radius: 0;
      height: 100%;
    }
  }

  @media screen and (max-width: 800px){
    .player {
      height: 100px;

      .content {
        flex-wrap: wrap;
      }

      .track-name {
        flex: initial;
        width: 100%;
      }

      .btn-volume-on, .btn-volume-off, .slider.volume-bar {
        display: none;
      }
    }
  }
</style>
