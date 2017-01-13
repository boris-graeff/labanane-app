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
        <div>
          <div class='text-box'>
            <label for='playlist-name'>Name</label>
            <input type='text' id='playlist-name' v-model='name'>
          </div>
          <div class='text-box'>
            <label for='playlist-password'>Password</label>
            <input type='password' id='playlist-password' v-model='password'>
          </div>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
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
      > div {
        display: flex;
      }

      .text-box + .text-box {
        margin-left: $space-medium;
      }
    }
  }
</style>
