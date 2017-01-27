<template>
  <div class='tracks'>
    <div v-show='playlist.tracks.length '>{{ playlist.tracks.length }}</div>
    <ul class='list'>
      <li v-for='(t, index) in playlist.tracks'
          @click='setTrack(t)'
          v-bind:class='{"selected": t.id == track.id, "error": t.error, "youtube": t.provider === "youtube", "soundcloud": t.provider === "soundcloud"}'>
        <div>
          <span>{{t.name}}</span>
          <button type='button' @click='removeTrack(index)'>X</button>
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
      removeTrack(index){
        this.playlist.tracks.splice(index, 1)
        // TODO
      }
    },
    vuex: {
      getters: {
        playlist: state => state.playlist,
        track: state => state.track
      },
      actions: {
        setTrack: actions.setTrack
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

    .list {
      min-height: 100%;

      li {
      }
    }

    > div {
      right: 0;
      top: 0;
      padding: $space-small;
      line-height: 1;
      background: $black;
      color: $yellow;
      font-size: 3rem;
      position: fixed;
      min-width: 50px;
      text-align: center;
    }
  }
</style>
