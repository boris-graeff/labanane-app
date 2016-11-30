<template>
  <section class='playlist-page'>
    <header>
      <router-link :to="{ name: 'home'}">
        LB
      </router-link>
      <h1>{{playlist.name}}</h1>
      <div>{{track.name}}</div>
    </header>

    <div class='tracks'>
      {{ playlist.tracks.length }} tracks
      <ul>
        <li v-for='t in playlist.tracks' @click='set_track(t)'>
          {{t.name}}
        </li>
      </ul>
    </div>

    <youtube-player></youtube-player>
    <soundcloud-player></soundcloud-player>
  </section>
</template>

<script>
  import actions from '../actions'
  import youtube_player from './playlist/youtube-player.vue'
  import soundcloud_player from './playlist/soundcloud-player.vue'

  export default {
    name: 'playlist',
    components: {
      'youtube-player': youtube_player,
      'soundcloud-player': soundcloud_player
    },
    data: function () {
      return {
        id: ''
      }
    },
    mounted: function () {
      this.id = this.$route.params.id;
      this.get_playlist(this.id);
    },
    vuex: {
      getters: {
        playlist: state => state.playlist,
        track: state => state.track
      },
      actions: {
        get_playlist: actions.get_playlist,
        set_track: actions.set_track
      }
    }
  }
</script>

<style lang='sass'>

</style>
