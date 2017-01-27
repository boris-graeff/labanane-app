<template>
  <div class='create'>
    <div>
      <header>
        <h1>
          <img src='/images/labanane-title.svg' alt="LaBanane" title="LaBanane" />
        </h1>
        <p>
          Welcome to LaBanane, the application for sharing and listening to your favorite music !<br>
          Join us on Facebook to be informed of last news, share your playlist or report a problem.
        </p>
      </header>

      <h2>Create your playlist now !</h2>
      <div class='tips'>
        Tips: please note that you will not be able to reset your password
      </div>
      <form @submit='create'>
        <div class='text-box'>
          <label for='playlist-name'>Name</label>
          <input type='text' id='playlist-name' v-model='name'>
          <div class='error-message' v-show='show_error'>
            Sorry, this name is already taken :(
          </div>
        </div>
        <div>
          <div class='text-box'>
            <label for='playlist-password'>Password</label>
            <input type='password' id='playlist-password' v-model='password'>
          </div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import actions from '../../actions'
  import localStoragePassword from '../../helpers/localStoragePassword'

  export default {
    name: 'create-playlist',
    data: function () {
      return {
        name: '',
        password: '',
        show_error: false
      }
    },
    watch: {
      name() {
        this.show_error = false
      }
    },
    methods : {
      create(event) {
        event.preventDefault()

        if(this.name && this.password){
          this.createPlaylist(this.name, this.password)
            .then(() => {
              localStoragePassword.add(this.name, this.password)
              this.$router.push({name: 'playlist', params: {name: this.name}})
            })
          .catch((response) => {
            this.show_error = true
          })
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

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .create {
    height: 100vh;
    width:  60%;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      max-width: 565px;
    }

    h1 {
      margin-bottom: $space-big;
      transform: translateX(-$space-big);
    }

    h2 {
      font-size: 3rem;
      font-style: italic;
      font-weight: bold;
      margin-top: $space-medium;
      margin-bottom: $space-small;
    }

    form {
      max-width: 410px;

      > div:nth-child(2){
        display: flex;
        align-items: flex-end;
      }

      button {
        min-width: 200px;
        height: 40px;
        margin-left: $space-medium;
      }
    }
  }
</style>
