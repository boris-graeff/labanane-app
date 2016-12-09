<template>
  <div class='tracks'>
    <div v-show='playlist.tracks.length '>{{ playlist.tracks.length }}</div>
    <ul>
      <li v-for='t in playlist.tracks' @click='setTrack(t)' v-bind:class='{"selected": t.id == track.id}'>
        {{t.name}}
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

    li {
      padding: 3px 6px;
      cursor: pointer;
      transition: background 300ms ease-in-out, color 300ms ease-in-out;

      &:nth-child(even) {
        background: rgba($black, 0.1);
      }

      &:hover {
        background: rgba($black, 0.4);
      }

      &.selected {
        background: $black;
        color: $yellow;
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
    }

  }
</style>
