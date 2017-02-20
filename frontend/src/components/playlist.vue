<template>
  <section class='playlist-page'>
    <router-link :to="{ name: 'home'}" class='link-home'>
      <img src='/images/labanane-logo.svg' alt="LaBanane logo"/>
    </router-link>
    <div class='content' v-if='providers.youtube.ready' v-show='!videoMode'>
      <actions-panel></actions-panel>
      <tracklist></tracklist>
    </div>
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
    mounted () {
      var name = this.$route.params.name,
          password = localStoragePassword.get(name)

      this.getPlaylist(name, password)
    },
    vuex: {
      getters: {
        providers: state => state.providers,
        videoMode: state => state.player.videoMode
      },
      actions: {
        getPlaylist: actions.getPlaylist
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
