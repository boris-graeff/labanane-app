<template>
  <section class='playlist-page'>
    <header>
      <router-link :to="{ name: 'home'}">
        LB
      </router-link>
      <h1>{{playlist.name}}</h1>
    </header>

    <div class='tracks'>
      {{ playlist.tracks.length }} tracks
      <ul>
        <li v-for='track in playlist.tracks'>{{track.name}}</li>
      </ul>
    </div>

    <youtube-player :ready.sync='ytb_player_ready'></youtube-player>
  </section>
</template>

<script>
  import actions from '../actions'
  import youtube_player from './playlist/youtube-player.vue'

  export default {
    name: 'playlist',
    components: {
      'youtube-player': youtube_player
    },
    data: function () {
      return {
        id: '',
        ytb_player_ready: false
      }
    },
    mounted: function () {
      this.id = this.$route.params.id;
      this.get_playlist(this.id);
    },
    vuex: {
      getters: {
        playlist: state => state.playlist
      },
      actions: {
        get_playlist: actions.get_playlist
      }
    }
  }
</script>

<style lang='sass'>

</style>
