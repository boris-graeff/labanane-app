<template>
  <section class='playlist-page'>
    <router-link :to="{ name: 'home'}" class='link-home'>
      <img src='/static/labanane-logo.svg' alt="LaBanane logo"/>
    </router-link>
    <transition name='video-mode'>
      <div class='content' v-if='providers.youtube.ready && !loading' v-show='!videoMode'>
        <actions-panel></actions-panel>
        <tracklist></tracklist>
      </div>
    </transition>
    <player></player>
    <youtube-player></youtube-player>
    <soundcloud-player></soundcloud-player>
  </section>
</template>

<script>
  import localStoragePassword from '@/helpers/localStoragePassword'
  import { mapState, mapActions } from 'vuex'

  import tracklist from '@/components/playlist/tracklist.vue'
  import actionsPanel from '@/components/playlist/actions-panel.vue'
  import player from '@/components/playlist/player.vue'
  import youtubePlayer from '@/components/playlist/players/youtube-player.vue'
  import soundcloudPlayer from '@/components/playlist/players/soundcloud-player.vue'

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
    created () {
      const id = this.$route.params.id
      const password = localStoragePassword.get(id)

      this.resetVideoMode()
      this.initPlaylist(id)
      this.getPlaylist(id, password)
          .then(() => {
            this.loading = false
          })
    },
    computed: mapState(['providers', 'videoMode']),
    methods: mapActions(['getPlaylist', 'initPlaylist', 'resetVideoMode'])
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
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
