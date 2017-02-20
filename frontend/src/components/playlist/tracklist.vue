<template>
  <div class='tracklist'>
    <h1>{{ playlist.name }}</h1>
    <transition-group name='tracklist' tag='ul' class='tracks list'>
      <li v-for='(t, index) in playlist.tracks'
          key='index'
          @click='setTrack(t)'
          :class='{"selected": t.id == track.id, "error": t.error, "youtube": t.provider === "youtube", "soundcloud": t.provider === "soundcloud"}'>
        <span>{{index+1}}</span>
        <div>
          <span>{{t.name}}</span>
          <button type='button' @click.prevent='remove(index)'></button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'tracklist',
    methods: {
      remove(index){
        this.removeTrack(index)
        this.savePlaylist()
      }
    },
    vuex: {
      getters: {
        playlist: state => state.playlist,
        track: state => state.track
      },
      actions: {
        setTrack: actions.setTrack,
        removeTrack: actions.removeTrack,
        savePlaylist: actions.savePlaylist
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .tracklist {
    position: relative;
    padding-top: $topbar-height;
    padding-left: $space-big*2;
    background-color: rgba($wheat, 0.15);
    min-height: 100vh;
    width: 80%;
    transition: width 300ms ease-in-out;


    h1 {
      font-size: 4rem;
      font-weight: 300;
      padding: $space-small 0;
    }

    button {
      height: 25px;
      width: 30px;
      padding: 0;
      background: url('/images/icn-cross.svg') no-repeat;
      background-size: contain;
      background-position: center center;
      transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }

    .tracks {
      min-height: calc(100% - 68px);
      padding-bottom: 50vh;

      li {
        &:hover button {
          transform: scale(1) rotate(90deg);
          opacity: 1;
        }

        > span {
          position: absolute;
          font-size: 10px;
          transform: translate(-$space-small, -50%);
          top: 50%;
          right: 100%;
          text-align: right;
          width: $space-big;
        }
      }
    }
  }
</style>
