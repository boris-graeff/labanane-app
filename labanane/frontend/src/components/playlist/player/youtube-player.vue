<template>
  <div id='youtube-player'>

  </div>
</template>

<script>
  import actions from '../../../actions'
  
  export default {
    name: 'youtube-player',
    player: null,
    created () {
      this.loadPlayer()
    },
    watch: {
      track () {
        if(this.track.provider === 'youtube'){
          this.play()
        }
        else {
          this.stop()
        }
      }
    },
    methods: {
      loadPlayer () {
        var that = this,
            tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function () {

          that.player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: '5EazGCA1ydk',
            events: {
              'onReady':  that.onPlayerReady,
              'onStateChange': that.onStateChange
            }
          })

        }
      },

      onPlayerReady (event) {
        this.setYoutubeReady()
      },

      onStateChange (event) {
      },

      play() {
        this.player.loadVideoById({'videoId': this.track.id})
      },

      stop () {
        this.player.stopVideo();
      }
    },
    vuex: {
      getters: {
        constants: state => state.constants,
        track: state => state.track
      },
      actions: {
        setYoutubeReady: actions.setYoutubeReady
      }
    }
  }
</script>

<style lang='sass'>
  #youtube-player {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }
</style>
