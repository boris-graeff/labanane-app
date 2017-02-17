<template>
  <div class='auth'>

    <button v-if='expanded' type='button' @click='expanded=false' class='btn-close'></button>
    <button v-else type='button' @click='expanded=true' class='btn-edit'></button>
    <form  v-if='expanded' @submit.prevent='do_auth'>
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
    position: fixed;
    right: calc(70% + 6px);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 53px;

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

    .btn-edit, .btn-close {
      padding: 0;
      height: 48px;
      width: 48px;
      background-color: rgba($wheat, 0.15);
      background-repeat: no-repeat;
      background-size: 30px;
      background-position: center center;
    }

    .btn-edit {
      background-image: url('/images/icn-edit.svg');
    }

    .btn-close {
      background-image: url('/images/icn-cross.svg');
    }
  }
</style>
