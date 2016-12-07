<template>
  <div>
    <div class='text-box'>
      <input type='text' id='playlist-filter' />
      <label for='playlist-filter'>Playlist name</label>
    </div>
    <ul class='playlists'>
      <li v-for='p in playlists'>
        <router-link :to="{ name: 'playlist', params: { id: p}}">{{p}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'explore-playlists',
    mounted () {
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
  @import '../../constants';

  .playlists {
    margin-top: $space-medium;
  }
</style>
