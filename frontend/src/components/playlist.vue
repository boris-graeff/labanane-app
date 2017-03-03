<template>
  <section class='playlist-page'>
    <router-link :to="{ name: 'home'}" class='link-home'>
      <img src='/images/labanane-logo.svg' alt="LaBanane logo"/>
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
  import actions from '../actions'
  import localStoragePassword from '../helpers/localStoragePassword'

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
    data: function(){
      return {
        loading: true
      }
    },
    created () {
      var id = this.$route.params.id,
          password = localStoragePassword.get(id)

      this.initPlaylist(id)
      this.getPlaylist(id, password)
          .then(() => {
            this.loading = false
          })
    },
    vuex: {
      getters: {
        providers: state => state.providers,
        videoMode: state => state.player.videoMode
      },
      actions: {
        getPlaylist: actions.getPlaylist,
        initPlaylist: actions.initPlaylist
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../styles/constants.scss';

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
