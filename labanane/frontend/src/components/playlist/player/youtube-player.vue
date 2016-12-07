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
      this.load_player()
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
      load_player () {
        var that = this,
            tag = document.createElement('script'),
            first_script_tag = document.getElementsByTagName('script')[0];

        tag.src = "https://www.youtube.com/iframe_api";
        first_script_tag.parentNode.insertBefore(tag, first_script_tag);

        window.onYouTubeIframeAPIReady = function () {

          that.player = new YT.Player('youtube-player', {
            height: '100vh',
            width: '100vw',
            videoId: '5EazGCA1ydk',
            events: {
              'onReady':  that.on_player_ready,
              'onStateChange': that.on_state_change
            }
          })

        }
      },

      on_player_ready (event) {
        this.set_youtube_ready()
      },

      on_state_change (event) {
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
        set_youtube_ready: actions.set_youtube_ready
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
