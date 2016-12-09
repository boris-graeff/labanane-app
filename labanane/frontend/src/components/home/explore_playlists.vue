<template>
  <div>
    <div class='text-box'>
      <label for='playlist-filter'>Playlist name</label>
      <input type='text' id='playlist-filter' v-model='input'/>
    </div>
    <ul class='playlists'>
      <li v-for='p in filtered_playlists'>
        <router-link :to="{ name: 'playlist', params: { id: p}}">{{p}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'explore-playlists',
    data: function () {
      return {
        input: ''
      }
    },
    computed: {
      filtered_playlists () {
        var input = this.input

        return this.playlists.filter( track => {
          return track.indexOf(input) >= 0
        })
      }
    },
    mounted () {
      this.getAllPlaylists()
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
