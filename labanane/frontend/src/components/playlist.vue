<template>
  <section class='playlist-page'>
    <div class='content'>
      <div>
        <header>
          <router-link :to="{ name: 'home'}">
            LB
          </router-link>
          <h1>{{playlist.name}}</h1>
          <div>{{track.name}}</div>
        </header>
        <controls></controls>
      </div>
      <div>
        <tracks></tracks>
      </div>
    </div>
    <youtube-player></youtube-player>
    <soundcloud-player></soundcloud-player>
  </section>
</template>

<script>
  import actions from '../actions'
  import youtube_player from './playlist/youtube-player.vue'
  import soundcloud_player from './playlist/soundcloud-player.vue'
  import tracks from './playlist/tracks.vue'
  import controls from './playlist/controls.vue'

  export default {
    name: 'playlist',
    components: {
      'controls': controls,
      'tracks': tracks,
      'youtube-player': youtube_player,
      'soundcloud-player': soundcloud_player
    },
    data: function () {
      return {
        id: ''
      }
    },
    mounted () {
      this.id = this.$route.params.id;
      this.get_playlist(this.id);
    },
    vuex: {
      getters: {
        playlist: state => state.playlist,
        track: state => state.track
      },
      actions: {
        get_playlist: actions.get_playlist
      }
    }
  }
</script>

<style lang='sass'>
  @import '../constants';

  .playlist-page {

    .content {
      display: flex;
      height: 100vh;
      width: 100vw;

      > div {
        width: 50%;
        height: 100%;
        position: relative;
      }
    }

    h1 {
      font-size: 4rem;
    }
  }
</style>
