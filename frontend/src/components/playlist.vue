<template>
  <section class='playlist-page'>
    <div class='content' v-if='providers.youtube.ready'>
      <topbar></topbar>
      <div class='content'>
        <!--search v-if='playlist.canEdit'></search>-->
        <tracks></tracks>
      </div>
      <player></player>
    </div>
    <youtube-player></youtube-player>
    <soundcloud-player></soundcloud-player>
  </section>
</template>

<script>
  import actions from '../actions'
  import localStoragePassword from '../helpers/localStoragePassword'

  import topbar from './playlist/topbar.vue'
  import tracks from './playlist/tracks.vue'
  import player from './playlist/player.vue'
  import search from './playlist/search.vue'
  import youtubePlayer from './playlist/players/youtube-player.vue'
  import soundcloudPlayer from './playlist/players/soundcloud-player.vue'

  export default {
    name: 'playlist',
    components: {
      'topbar': topbar,
      'tracks': tracks,
      'player': player,
      'search': search,
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
        providers: state => state.providers
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
  }

</style>
