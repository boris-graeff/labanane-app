<template>
  <div class='search'>
    <h2>Add tracks</h2>
    <div class='text-box'>
      <label for='search-input'>Search by name</label>
      <input type='text' v-model='input' id='search-input' />
    </div>
    <div class='search-results'>
      <ul class='tracks list'>
        <li v-for='track in results'
            draggable=true
            @dragstart='onDragStart(track, $event)'
            :class='{"youtube": track.provider === "youtube", "soundcloud": track.provider === "soundcloud"}'
            @click='add(track)'>
          <div><span>{{track.name}}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import SC from 'soundcloud'
  import _ from 'lodash'
  import levenshtein from 'levenshtein'

  export default {
    name: 'search',
    data () {
      return {
        input: '',
        results: []
      }
    },
    watch: {
      input () {
        if (this.input.length) {
          this.search()
        }
        else {
          this.results.length = 0
        }
      }
    },
    methods: {
      ...mapActions(['getYoutubeList', 'addTrack']),
      search: _.debounce(function () {
        const that = this

        // fixme : reject pending promise if necessary

        Promise.all([this.soundcloudSearch(), this.youtubeSearch()])
            .then(results => {
              that.results = _.flatten(results).sort((a, b) => a.leven - b.leven)
            })
      }, 240),

      youtubeSearch () {
        const that = this
        return this.getYoutubeList(this.input)
          .then(results => {
            return results.data.items.map(track => {
              return {
                providerId: track.id.videoId,
                name: track.snippet.title,
                provider: 'youtube',
                duration: 0,
                leven: levenshtein(track.snippet.title, that.input)
              }
            })
          })
      },

      soundcloudSearch () {
        const that = this
        return SC.get('/tracks', {q: this.input, limit: this.$store.state.constants.MAX_RESULTS})
            .then(results => {
              return results.map(track => {
                return {
                  providerId: track.id,
                  name: track.title,
                  provider: 'soundcloud',
                  artwork: track.artwork_url,
                  duration: track.duration,
                  leven: levenshtein(track.title, that.input)
                }
              })
            })
      },

      add (track) {
        this.addTrack(_.cloneDeep(track))
      },

      onDragStart (track, event) {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('track', JSON.stringify(track))
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/constants';

  .search {
    width: 100%;
    padding-left: $space-medium;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    h2 {
      font-weight: 300;
      font-size: 3rem;
    }

    .search-results {
      overflow-y: auto;
      overflow-x: hidden;
      flex: 1;
      margin-right: -21px;
    }

    .tracks {
      padding-bottom: 140px;
      min-height: 100%;
    }
  }
</style>
