<template>
  <section class='playlist-page'>
    <router-link :to="{ name: 'home'}" class='link-home'>
      <img src='/static/labanane-logo.svg' alt="LaBanane logo"/>
    </router-link>
    <transition name='video-mode'>
      <template v-if='providers.youtube.ready && !loading'>
        <div class='content' v-show='!player.videoMode'>
          <actions-panel></actions-panel>
          <tracklist></tracklist>
        </div>
      </template>
    </transition>
    <player></player>
    <youtube-player></youtube-player>
    <soundcloud-player></soundcloud-player>
  </section>
</template>

<script>
  import localStoragePassword from '@/helpers/localStoragePassword'
  import { mapState, mapActions } from 'vuex'

  import tracklist from './playlist/tracklist.vue'
  import actionsPanel from './playlist/actions-panel.vue'
  import player from './playlist/player.vue'
  import youtubePlayer from './playlist/players/youtube-player.vue'
  import soundcloudPlayer from './playlist/players/soundcloud-player.vue'

  export default {
    name: 'playlist',
    components: {
      'tracklist': tracklist,
      'actions-panel': actionsPanel,
      'player': player,
      'youtube-player': youtubePlayer,
      'soundcloud-player': soundcloudPlayer
    },

    data () {
      return {
        loading: true
      }
    },

    props: ['playlistId', 'trackId'],

    watch: {
      'track.id' () {
        document.title = this.track.name
      },
      trackId () {
        this.setTrack(this.trackId)
      }
    },

    created () {
      const id = this.playlistId
      const password = localStoragePassword.get(id)

      this.resetVideoMode()
      this.initPlaylist(id)

      const auth = password ? this.playlistAuth({id, password}) : Promise.resolve()
      const content = this.getPlaylist({id})
          .then(() => {
            document.title = this.playlist.name
            if (this.trackId) {
              this.setTrack(this.trackId)
            }
          })

      Promise.all([auth, content]).then(() => {
        this.loading = false
      })
    },

    computed: mapState(['providers', 'player', 'playlist', 'track']),
    methods: mapActions(['getPlaylist', 'playlistAuth', 'initPlaylist', 'resetVideoMode', 'setTrack'])
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/constants';

  .playlist-page {
    display: flex;
    flex-direction: column;

    .content {
      display: flex;
      justify-content: flex-end;
      overflow-x: hidden;
      transition: opacity 200ms ease-in-out;
    }

    .video-mode-enter,
    .video-mode-leave-to {
      opacity: 0;

      .actions-panel {
        transform: translateX(-200px);
      }

      .tracklist {
        transform: translateX(200px);
      }
    }

    .link-home {
      position: fixed;
      top: $space-small;
      left: $space-small;
      width: 40px;
      height: 40px;
      z-index: 1;
      transition: transform 300ms ease-in-out;

      &:hover {
        transform: rotate(360deg);
      }
    }
  }
</style>
