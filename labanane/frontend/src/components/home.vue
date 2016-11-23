<template>
  <section class='home-page'>
    <h1>LaBanane</h1>
    <p>
      Welcome to LaBanane, the application for sharing and listening to your favorite music !<br>
      Join us on Facebook to be informed of last news, share your playlist or report a problem.
    </p>
    <ul class='playlists'>
      <li v-for='p in playlists'>
        <router-link :to="{ name: 'playlist', params: { id: p}}">{{p}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import actions from '../actions'

  export default {
    name: 'home',
    mounted: function() {
      this.get_playlists();
    },
    vuex: {
      getters: {
        playlists: state => state.playlists
      },
      actions: {
        get_playlists: actions.get_playlists
      }
    }
  }
</script>

<style lang='sass'>
  @import '../constants';

  .home-page {
    max-width: 600px;
    margin: auto;
    padding: $space-big $space-small;

    h1 {
      font-size: 4rem;
    }

    .playlists {
      margin-top: $space-medium;
    }
  }
</style>
