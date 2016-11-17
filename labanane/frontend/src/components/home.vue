<template>
  <div>
    <h1>LaBanane</h1>
    <ul>
      <li v-for='p in playlists'>
        {{ p }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'home',
    vuex: {
      getters: {
        playlists: function(state) {
          return state.playlists
        }
      }
    }
  }
</script>

<style>

</style>
