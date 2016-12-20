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
    data: function(){
      return {
        is_active: false
      }
    },
    created () {
      this.loadPlayer()
    },
    watch: {
      player: {
        handler: function(){
          if(this.track.provider === 'youtube'){
            this.is_active = true
            if(this.player.state === 'loading'){
              this.load()
            }
            else if(this.player.state === 'playing'){
              this.play()
            }
            else if(this.player.state === 'paused'){
              this.pause()
            }
          }
          else {
            this.is_active = false
            this.stop()
          }
        },
        deep: true
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
            events: {
              'onReady': that.onPlayerReady,
              'onStateChange': that.onStateChange,
              'onError': that.onError
            }
          })

        }
      },

      onPlayerReady () {
        this.setYoutubeReady()
      },

      onStateChange (event) {
        if(this.track.provider !== 'youtube')
          return

        var that = this

        if(event.data === YT.PlayerState.PLAYING) { // Playing
          this.setPlay()
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

      onError() {
        this.setTrackError()
      },

      load() {
        this.stop()
        this.sound.loadVideoById({'videoId': this.track.id})
      },

      play () {
        this.sound.playVideo()
      },

      pause () {
        this.sound.pauseVideo()
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
        setPlay: actions.setPlay,
        nextTrack: actions.nextTrack,
        setYoutubeReady: actions.setYoutubeReady,
        setTrackProgression: actions.setTrackProgression,
        setTrackError: actions.setTrackError
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
      filter: blur(30px);
      opacity: 0;
      transition: opacity 300ms ease-in-out;
    }

    &.is_active iframe {
      opacity: 0.2;
   }
  }
</style>
