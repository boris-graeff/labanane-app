<template>
  <div class='tracks'>
    <div v-show='playlist.tracks.length '>{{ playlist.tracks.length }}</div>
    <ul>
      <li v-for='t in playlist.tracks' @click='setTrack(t)' v-bind:class='{"selected": t.id == track.id, "error": t.error}'>
        {{t.name}} - {{t.provider}}
      </li>
    </ul>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'tracks',
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

<style lang="sass">
  @import 'src/styles/constants.scss';

  .tracks {
    position: relative;
    height: 100%;
    overflow-y: auto;

    ul {
      min-height: 100%;
      background: url("/images/tracks-background.png");
    }

    li {
      height: 25px;
      padding: 0 6px;
      line-height: 25px;
      cursor: pointer;
      transition: background 300ms ease-in-out, color 300ms ease-in-out;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        background: rgba($black, 0.2);
      }

      &.selected {
        background: $black;
        color: $yellow;
      }

      &.error {
        background: $red;
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
