<template>
  <div class='tracks'>
    <ul class='list'>
      <li v-for='(t, index) in playlist.tracks'
          @click='setTrack(t)'
          :class='{"selected": t.id == track.id, "error": t.error, "youtube": t.provider === "youtube", "soundcloud": t.provider === "soundcloud"}'>
        <div>
          <span>{{t.name}}</span>
          <button type='button' @click='remove(index, $event)'></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'tracks',
    methods: {
      remove(index, event){
        event.stopPropagation()
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

  .tracks {
    position: relative;
    height: 100%;
    overflow-y: auto;
    padding-top: $topbar-height;

    .list {
      min-height: 100%;
      max-width: 800px;
      margin: auto;
    }

    button {
      height: 100%;
      width: 30px;
      padding: 0;
      background: url('/images/icn-cross.svg') no-repeat;
      background-size: contain;
      background-position: center center;
      transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }

    li:hover button {
      transform: scale(1) rotate(90deg);
      opacity: 1;
    }
  }
</style>
