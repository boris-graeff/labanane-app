<template>
  <div class='search'>
    <h2></h2>
    <div class='text-box'>
      <label for='search-input'>Track name</label>
      <input type='text' v-model='input' id='search-input' />
    </div>
    <ul class='tracks list'>
      <li v-for='track in results' :class='{"youtube": track.provider === "youtube", "soundcloud": track.provider === "soundcloud"}'>
        <div><span>{{track.name}}</span><span></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import actions from '../../actions'
  import SC from 'soundcloud'
  import _ from 'lodash'
  import levenshtein from 'levenshtein'

  export default {
    name: 'search',
    data: function(){
      return {
        input: '',
        results: []
      }
    },
    watch: {
      input() {
        if(this.input.length){
          this.search()
        }
        else {
          this.results.length = 0
        }
      }
    },
    methods: {
      search: _.debounce(function(){
        var that = this

        // fixme : reject pending promise if necessary

        Promise.all([this.soundcloudSearch(), this.youtubeSearch()])
            .then(results => {
              that.results = _.flatten(results).sort((a,b) => a.leven - b.leven)
            })
      }, 240),

      youtubeSearch() {
        var that = this
        return this.getYoutubeList(this.input)
          .then(results => {
            return  results.data.items.map(track => {
              return {
                id: track.id,
                name: track.snippet.title,
                provider: 'youtube',
                artwork: track.artwork_url,
                duration: 0,
                leven: levenshtein(track.snippet.title, that.input)
              }
            })
          })
      },

      soundcloudSearch() {
        var that = this
        return SC.get('/tracks', {q: this.input, limit: this.$store.state.constants.MAX_RESULTS})
            .then(results => {
              return results.map(track => {
                return {
                  id: track.id,
                  name: track.title,
                  provider: 'soundcloud',
                  artwork: track.artwork_url,
                  duration: track.duration,
                  leven: levenshtein(track.title, that.input)
                }
              })
            })
      }
    },
    vuex: {
      actions: {
        getYoutubeList: actions.getYoutubeList
      }
    }
  }
</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';

  .search {
    padding: $space-medium;

    .tracks {
      overflow: hidden;
    }
  }
</style>
