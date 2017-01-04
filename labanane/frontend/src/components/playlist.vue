<template>
  <section class='playlist-page'>
    <div class='content' v-if='providers.youtube.ready'>
      <div>
        <header>
          <router-link :to="{ name: 'home'}" class='link-home'>
            <img src='/images/labanane-logo.svg' alt="LaBanane logo" />
          </router-link>
          <h1>{{playlist.name}}</h1>
          <div class='track-name'>{{track.name}}</div>
        </header>
        <controls></controls>
      </div>
      <div>
        <tracks></tracks>
      </div>
    </div>
    <player></player>
  </section>
</template>

<script>
  import actions from '../actions'
  import tracks from './playlist/tracks.vue'
  import controls from './playlist/controls.vue'
  import player from './playlist/player.vue'

  export default {
    name: 'playlist',
    components: {
      'controls': controls,
      'tracks': tracks,
      'player': player
    },
    data: function () {
      return {
        id: ''
      }
    },
    mounted () {
      this.id = this.$route.params.id;
      this.getPlaylist(this.id);
    },
    vuex: {
      getters: {
        playlist: state => state.playlist,
        track: state => state.track,
        providers: state => state.providers
      },
      actions: {
        getPlaylist: actions.getPlaylist
      }
    }
  }
</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';

  .playlist-page {

    header {
      padding: $space-medium;
    }

    h1 {
      font-size: 4rem;
      display: inline-block;
      vertical-align: middle;
    }

    .content {
      display: flex;
      height: 100vh;
      width: 100vw;

      > div {
        width: 50%;
        height: 100%;
        position: relative;
      }

    }

    .track-name {
      font-size: 3rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .link-home  {
      display: inline-block;
      line-height: 0;
      vertical-align: middle;

      img {
        height: 48px;
        width: 48px;
      }
    }
  }
</style>
