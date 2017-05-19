<template>
  <div class='search'>
    <h2>Add tracks</h2>
    <div class='text-box'>
      <label for='search-input'>Search by name</label>
      <input type='text' v-model='input' id='search-input' />
    </div>
    <div class='search-results'>
      <list>
        <track-list-item v-for='(track, index) in results'
            :key='index'
            :track='track'
            draggable=true
            @dragstart.native='onDragStart(track, $event)'
            @click.native='add(track)'>
          {{track.name}}
        </track-list-item>
      </list>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import SC from 'soundcloud'
  import _ from 'lodash'
  import levenshtein from 'levenshtein'
  import moment from 'moment'
  import list from '@/components/list'
  import trackListItem from '@/components/track-list-item'

  export default {
    name: 'search',
    components: {
      'list': list,
      'track-list-item': trackListItem
    },
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
      ...mapActions(['getYoutubeList', 'addTrack', 'getYoutubeVideoDetails']),
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
        if (track.provider === 'youtube') {
          // Go fetch track duration
          this.getYoutubeVideoDetails(track.providerId)
            .then(({data}) => {
              const duration = data.items[0].contentDetails.duration
              track.duration = moment.duration(duration).asMilliseconds()
              this.addTrack(_.cloneDeep(track))
            })
        }
        else {
          this.addTrack(_.cloneDeep(track))
        }
      },

      onDragStart (track, event) {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('track', JSON.stringify(track))
      }
    }
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
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
