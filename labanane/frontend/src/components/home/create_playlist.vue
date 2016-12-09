<template>
  <div>
    <div class='tips'>
      Tips: please note that you will not be able to reset your password
    </div>
    <form @submit='create'>
      <div class='text-box'>
        <label for='playlist-name'>Name</label>
        <input type='text' id='playlist-name' v-model='name'>
      </div>
      <div class='text-box'>
        <label for='playlist-password'>Password</label>
        <input type='password' id='playlist-password' v-model='password'>
      </div>
      <button type='submit'>Create</button>
    </form>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'create-playlist',
    data: function () {
      return {
        name: '',
        password: ''
      }
    },
    methods : {
      create(event) {
        event.preventDefault()

        if(this.name && this.password){

          this.createPlaylist(this.name, this.password)
        }
      }
    },
    vuex: {
      actions: {
        createPlaylist: actions.createPlaylist
      }
    }
  }

</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';
</style>
