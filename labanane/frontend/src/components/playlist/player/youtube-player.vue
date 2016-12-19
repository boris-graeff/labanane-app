<template>
  <div class='youtube-player' v-bind:class='{"is_active": is_active}'>
    <div  id='youtube-player'></div>
  </div>
</template>

<script>
  import actions from '../../../actions'

  export default {
    name: 'youtube-player',
    sound: null,
    timer: null,
    created () {
      this.loadPlayer()
    },
    watch: {
      track () {
        if (this.track.provider === 'youtube') {
          this.play()
        }
        else {
          this.stop()
        }
      },
      player: {
        handler () {
          if (!this.player.playing) {
            this.stop()
          }
        },
        deep: true
      }
    },
    computed: {
      is_active () {
        return this.track.provider === 'youtube'
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

          that.sound = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: '5EazGCA1ydk',
            events: {
              'onReady': that.onPlayerReady,
              'onStateChange': that.onStateChange
            }
          })

        }
      },

      onPlayerReady (event) {
        this.setYoutubeReady()
      },

      onStateChange (event) {
        var that = this

        if(event.data == 1) { // Playing
          if(! this.timer){
            this.timer = setInterval(function(){
              that.setTrackProgression(that.sound.getCurrentTime() / that.sound.getDuration() * 100)
            }, 1000)
          }
        }
        else {
          clearInterval(this.timer)

          if(event.data == 0){
            this.nextTrack()
          }
        }
      },

      play() {
        this.sound.loadVideoById({'videoId': this.track.id})
      },

      stop () {
        if (!this.sound)
          return;

        this.sound.stopVideo();
      }
    },
    beforeDestroy(){
      this.stop()
    },
    vuex: {
      getters: {
        constants: state => state.constants,
        track: state => state.track,
        player: state => state.player
      },
      actions: {
        nextTrack: actions.nextTrack,
        setYoutubeReady: actions.setYoutubeReady,
        setTrackProgression: actions.setTrackProgression
      }
    }
  }
</script>

<style lang='sass'>
  .youtube-player {
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      filter: grayscale(100%);
      opacity: 0;
      transition: opacity 300ms ease-in-out;
    }

    &.is_active iframe {
      opacity: 0.2;
   }
  }
</style>
