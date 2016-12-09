<template>
  <section class='home-page'>
    <h1>LaBanane</h1>
    <p>
      Welcome to LaBanane, the application for sharing and listening to your favorite music !<br>
      Join us on Facebook to be informed of last news, share your playlist or report a problem.
    </p>
    <nav>
      <ul>
        <li>
          <input type='radio' id='nav-explore' value=0 v-model.number='nav'/>
          <label for='nav-explore'>Explore</label>
        </li>
        <li>
          <input type='radio' id='nav-create' value=1 v-model.number='nav'/>
          <label for='nav-create'>Create</label>
        </li>
      </ul>
    </nav>
    <explore-playlists v-show='nav === 0'></explore-playlists>
    <create-playlist v-show='nav === 1'></create-playlist>
  </section>
</template>

<script>
  import explorePlaylists from './home/explore_playlists.vue'
  import createPlaylist from './home/create_playlist.vue'

  export default {
    name: 'home',
    components: {
      'explore-playlists': explorePlaylists,
      'create-playlist': createPlaylist
    },
    data: function () {
      return {
        nav: 0
      }
    }
  }
</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';

  .home-page {
      max-width: 600px;
      margin: auto;
      padding: $space-big $space-small;

    h1 {
      font-size: 4rem;
    }

    nav {
      border-bottom: 1px solid $black;
      font-style: italic;
      font-size: 3rem;
      font-weight: bold;
      margin-top: $space-big;

    ul {
      display: flex;
    }

    li {
      width: 100%;
    }

    label {
      width: 100%;
      padding: $space-small $space-medium;
      background: rgba($black, 0.1);
      text-align: center;
    }

    input:checked + label {
      background: $black;
      color: $yellow;
    }

    }
  }
</style>
