<template>
  <div class='auth'>
    <form @submit.prevent='do_auth'>
      <h2>Authentication</h2>
      <p>Please enter playlist password</p>
      <div>
        <div class='text-box'>
          <label for='playlist-password'>Password</label>
          <input type='password' id='playlist-password' v-model='password'>
          <div class='error-message' v-show='show_error'>
            Bad password :(
          </div>
        </div>
        <button type='submit'>Go</button>
      </div>
    </form>
  </div>
</template>

<script>
  import actions from '../../actions'
  import localStoragePassword from '../../helpers/localStoragePassword'

  export default {
    name: 'auth',
    data: function(){
      return {
        expanded: false,
        password: '',
        show_error: false
      }
    },
    watch: {
      password() {
        this.show_error = false
      }
    },
    methods: {
      do_auth() {
        if(this.password.length){
          this.getPlaylist(this.playlist.name, this.password)
              .then(response => {
                if(! response.isAuth){
                  this.show_error = true
                }
                else {
                  localStoragePassword.add(this.playlist.name, this.password)
                }
              })
        }
      }
    },
    vuex: {
      getters: {
        playlist: state => state.playlist
      },
      actions: {
        getPlaylist: actions.getPlaylist
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .auth {
    padding-left: $space-medium;

    h2 {
      font-weight: 300;
      font-size: 3rem;
      margin-bottom: $space-small;
    }

    form {
      background-color: rgba($wheat, 0.15);
      padding: $space-medium $space-small;
      margin-top: 6px;

      p + div {
        display: flex;
        align-items: flex-start;
      }

      button {
        height: 41px;
        margin-top: 27px;
        margin-left: $space-small;
      }
    }

  }
</style>
