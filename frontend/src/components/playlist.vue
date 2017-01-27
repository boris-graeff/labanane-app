<template>
  <section class='playlist-page'>
    <div class='content' v-if='providers.youtube.ready'>
      <div>
        <header>
          <div>
            <div>
              <router-link :to="{ name: 'home'}" class='link-home'>
                <img src='/images/labanane-logo.svg' alt="LaBanane logo"/>
              </router-link>
              <h1>{{playlist.name}}</h1>
            </div>
            <div class='volume'>
              <button type='button' class='btn-volume-on' v-if='volume > 0' @click='mute'></button>
              <button type='button' class='btn-volume-off' v-else @click='unmute'></button>
              <div class='volume-bar'>
                <input type='range' v-model='volume' :style='{width: volume + "%"}' step='2'/>
              </div>
            </div>
          </div>
          <div class='track-name'>{{track.name}}</div>
        </header>

        <controls></controls>
        <search v-if='playlist.canEdit'></search>
      </div>
      <div>
        <tracks></tracks>
      </div>
    </div>
    <player></player>
  </section>
</template>

<script>
  import actions from '../actions'
  import localStoragePassword from '../helpers/localStoragePassword'
  import tracks from './playlist/tracks.vue'
  import controls from './playlist/controls.vue'
  import player from './playlist/player.vue'
  import search from './playlist/search.vue'

  export default {
    name: 'playlist',
    components: {
      'controls': controls,
      'tracks': tracks,
      'player': player,
      'search': search
    },
    data: function () {
      return {
        name: '',
        lastVolumeValue: 100
      }
    },
    computed: {
      volume: {
        get() {
          return this.player.volume
        },
        set(value) {
          this.setVolume(value)
        }
      }
    },
    mounted () {
      var name = this.$route.params.name,
        password = localStoragePassword.get(name)

      this.getPlaylist(name, password)
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
        playlist: state => state.playlist,
        player: state => state.player,
        track: state => state.track,
        providers: state => state.providers
      },
      actions: {
        getPlaylist: actions.getPlaylist,
        setVolume: actions.setVolume,
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../styles/constants.scss';

  .playlist-page {

    header {
      padding: $space-medium $space-medium $space-small;

      > div:first-child {
        display: flex;
        justify-content: space-between;
      }

      a {
        transition: transform 300ms ease-in-out;

        &:hover {
          transform: rotate(360deg);
        }

      }
    }

    h1 {
      font-size: 4rem;
      display: inline-block;
      vertical-align: middle;
      font-weight: 300;
    }

    .content {
      display: flex;
      height: 100vh;
      width: 100vw;

      > div {
        width: 50%;
        height: 100%;
        position: relative;
        overflow: hidden
      }

    }

    .track-name {
      font-size: 2.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 600;
      font-style: italic;
      margin-top: $space-big;
    }

    .link-home {
      display: inline-block;
      line-height: 0;
      vertical-align: middle;

      img {
        height: 48px;
        width: 48px;
      }
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
