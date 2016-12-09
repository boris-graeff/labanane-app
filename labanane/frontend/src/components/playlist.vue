<template>
  <section class='playlist-page'>
    <div class='content' v-if='providers.youtube.ready'>
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
    <player></player>
  </section>
</template>

<script>
  import actions from '../actions'
  import tracks from './playlist/tracks.vue'
  import controls from './playlist/controls.vue'
  import player from './playlist/player.vue'

  export default {
    name: 'playlist',
    components: {
      'controls': controls,
      'tracks': tracks,
      'player': player
    },
    data: function () {
      return {
        id: ''
      }
    },
    mounted () {
      this.id = this.$route.params.id;
      this.getPlaylist(this.id);
    },
    vuex: {
      getters: {
        playlist: state => state.playlist,
        track: state => state.track,
        providers: state => state.providers
      },
      actions: {
        getPlaylist: actions.getPlaylist
      }
    }
  }
</script>

<style lang='sass'>
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
