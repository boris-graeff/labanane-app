<template>
  <div>
    <h1>LaBanane</h1>
    <ul>
      <li v-for='p in playlists'>
        <router-link :to="{ name: 'playlist', params: { id: p}}">{{p}}</router-link>
      </li>
    </ul>
  </div>
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

<style lang='sass' scoped>

</style>
