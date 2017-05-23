<template>
  <div class='tracklist'>
    <h1><span v-show='playlist.tracks.length > 1'>{{ playlist.tracks.length }} tracks</span>{{ playlist.name }}</h1>
    <div @dragover.prevent @drop='onDropEnd'>
      <list kind='div' class='track-list'>
        <track-list-item v-for='(t, index) in playlist.tracks'
            :key='index'
            :track='t'
            :index='index+1'
            :draggable='playlist.canEdit'
            @dragover.native.prevent
            @drop.native.stop='onDrop(index, $event)'
            @dragstart.native='onDragStart(t, index, $event)'
            @click.native='changeTrack(t)'
            class='track'
            :class='{"selected": t.id == track.id, "error": t.error}'>
              <span>{{t.name}}</span>
              <div>
                <div class='error-message' v-if='t.error'>
                  Track not available.
                  <span v-if='playlist.canEdit' @click.stop='remove(index)'>Click here to remove</span>
                </div>
                <span class='duration'>{{ t.duration | formatDuration }}</span>
                <button v-if='playlist.canEdit' type='button' @click.stop='remove(index)'></button>
              </div>
        </track-list-item>
      </list>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import list from '@/components/list'
  import trackListItem from '@/components/track-list-item'

  export default {
    name: 'tracklist',
    components: {
      'list': list,
      'track-list-item': trackListItem
    },
    watch: {
      'playlist.tracks' () {
        this.savePlaylist()
      }
    },
    computed: mapState(['track', 'playlist']),
    methods: {
      ...mapActions(['removeTrack', 'addTrack', 'moveTrack', 'savePlaylist', 'nextTrack']),

      changeTrack (track) {
        this.$router.replace({name: 'playlist', params: {trackId: track.id}})
      },

      remove (index) {
        this.removeTrack(index)
      },
      onDrop (index, event) {
        const track = JSON.parse(event.dataTransfer.getData('track'))
        track.id ? this.moveTrack({track, index}) : this.addTrack({track, index: index + 1})
      },
      onDropEnd (event) {
        // todo investigate
        const track = JSON.parse(event.dataTransfer.getData('track'))
        track.id ? this.moveTrack({track}) : this.addTrack({track})
      },
      onDragStart (track, index, event) {
        track.index = index
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('track', JSON.stringify(track))
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/constants';

  .tracklist {
    position: relative;
    padding-top: $topbar-height;
    padding-left: $space-big*2;
    background-color: rgba($wheat, 0.15);
    min-height: 100vh;
    width: 80%;
    transition: width 200ms ease-in-out, transform 200ms ease-in-out;

    h1 {
      font-size: 4rem;
      font-weight: 300;
      padding: $space-small 0;
      position: relative;

      span {
        background: rgba($black, 0.1);
        font-size: 1.6rem;
        position: absolute;
        vertical-align: top;
        padding: 2px 4px;
        font-weight: normal;
        position: absolute;
        bottom: 100%;
        left: 0;
      }
    }

    button {
      height: 25px;
      width: 30px;
      min-width: 30px;
      padding: 0;
      background: url('~@/assets/icn-cross.svg') no-repeat;
      background-size: contain;
      background-position: center center;
      transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }

    .track-list {
      min-height: 100vh;
      padding-bottom: 30vh;

      li {
        &:hover button {
          transform: scale(1) rotate(90deg);
          opacity: 1;
        }
      }

      .track {

        &.error {
          background-color: rgba($black, 0.5);
        }

        .error-message {
          color: $wheat;
          font-size: 1.4rem;
          font-weight: bold;
          min-width: 224px;
        }

        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;

          > span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          > div {
            display: flex;
            align-items: center;
          }
        }
      }

      .duration {
        display: inline-block;
        font-size: 1.4rem;
        padding: 0 6px;
        min-width: 54px;
        text-align: right;
      }
    }

    @media screen and (max-width: 800px){
      width: 100% !important;
      padding-left: $space-big;

      .track-list .track > div > div {
        display: none;
      }
    }
  }
</style>
