<template>
  <div>
    <div class='text-box'>
      <label for='playlist-filter'>Playlist name</label>
      <input type='text' id='playlist-filter'/>
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
      this.getAllPlaylists();
    },
    vuex: {
      getters: {
        playlists: state => state.playlists
      },
      actions: {
        getAllPlaylists: actions.getAllPlaylists
      }
    }
  }
</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';

  .playlists {
    margin-top: $space-medium;
  }
</style>
