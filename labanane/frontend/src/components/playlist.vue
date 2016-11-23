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
  </section>
</template>

<script>
  import actions from '../actions'

  export default {
    name: 'playlist',
    data: () => {
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
