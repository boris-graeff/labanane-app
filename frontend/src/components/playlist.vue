<template>
  <section class='playlist-page'>
    <router-link :to="{ name: 'home'}" class='link-home'>
      <img src='/images/labanane-logo.svg' alt="LaBanane logo"/>
    </router-link>
    <div class='content' v-if='providers.youtube.ready'>
        <search v-if='playlist.canEdit'></search>
        <auth v-else></auth>
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
  import player from './playlist/player.vue'
  import search from './playlist/search.vue'
  import auth from './playlist/auth.vue'
  import youtubePlayer from './playlist/players/youtube-player.vue'
  import soundcloudPlayer from './playlist/players/soundcloud-player.vue'

  export default {
    name: 'playlist',
    components: {
      'tracklist': tracklist,
      'player': player,
      'search': search,
      'auth': auth,
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
        playlist: state => state.playlist
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

    .tracklist {
      width: 70%;
    }

    .search {
      width: 40%;

      + .tracklist {
        width: 60%;
      }
    }

    .link-home {
      position: absolute;
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
