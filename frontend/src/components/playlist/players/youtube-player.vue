<template>
  <div class='youtube-player' :class='{"is-active": isActive, "video-mode-on": videoMode}'>
    <div id='youtube-player'></div>
  </div>
</template>

<script>
  import YtbPlayer from 'youtube-player'
  import actions from '../../../actions'

  export default {
    name: 'youtube-player',
    ytbPlayer: null,
    timer: null,
    data: function(){
      return {
        isActive: false
      }
    },
    mounted () {
      this.loadPlayer()
    },
    watch: {
      state(){
        if (this.provider === 'youtube') {
          this.isActive = true
          if(this.state === 'loading'){
            this.load()
          }
          else if(this.state === 'playing'){
            this.play()
            this.setVolume(this.volume)
          }
          else if(this.state === 'paused'){
            this.pause()
          }
        }
      },
      volume(){
        this.setVolume(this.volume)
      },
      seekPosition(){
        if (this.provider === 'youtube') {
          this.seekTo(this.seekPosition)
        }
      },
      provider(){
        if(this.provider !== 'youtube') {
          this.isActive = false
          this.stop()
        }
      }
    },
    methods: {
      loadPlayer () {
        this.ytbPlayer = YtbPlayer('youtube-player', {
          height: '100%',
          width: '100%'
        })
        this.ytbPlayer.on('stateChange', this.onStateChange)
        this.ytbPlayer.on('ready', this.onPlayerReady)
        this.ytbPlayer.on('error', this.onError)
      },

      onPlayerReady () {
        this.setYoutubeReady()
      },

      onStateChange (event) {
        if(this.track.provider !== 'youtube'){
          this.resetTimer()
        }

        var that = this

        if(event.data === YT.PlayerState.PLAYING) { // Playing
          this.setPlay()

          this.timer = setInterval(function(){
            Promise.all([that.ytbPlayer.getCurrentTime(), that.ytbPlayer.getDuration()])
                .then((values) => {
                  that.setProgression(values[0] / values[1] * 100)
                })
          }, 1000)
        }
        else {
          this.resetTimer()

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
        this.ytbPlayer.loadVideoById({'videoId': this.track.providerId})
      },

      play () {
        this.ytbPlayer.playVideo()
      },

      pause () {
        this.ytbPlayer.pauseVideo()
      },

      stop () {
        if (!this.ytbPlayer)
          return;

        this.ytbPlayer.stopVideo()
      },

      setVolume (volume) {
        this.ytbPlayer.setVolume(volume)
      },

      seekTo (percent) {
        var allowSeekAhead = true
        this.ytbPlayer.getDuration()
            .then(duration => {
              this.ytbPlayer.seekTo(percent * duration / 100, allowSeekAhead)
            })
      },

      resetTimer () {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    beforeDestroy () {
      this.resetTimer()
    },

    vuex: {
      getters: {
        constants: state => state.constants,
        track: state => state.track,
        provider: state => state.track.provider,
        seekPosition: state => state.player.seekPosition,
        state: state => state.player.state,
        volume: state => state.player.volume,
        videoMode: state => state.player.videoMode
      },
      actions: {
        setPlay: actions.setPlay,
        nextTrack: actions.nextTrack,
        setYoutubeReady: actions.setYoutubeReady,
        setProgression: actions.setProgression,
        setTrackError: actions.setTrackError
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import "../../../styles/base.scss";

  .youtube-player {
    iframe {
      position: fixed;
      top: 0;
      left: 0;
      height: calc(100% - #{$player-height});
      z-index: -1;
      opacity: 0;
      filter: blur(30px);
      transition: opacity 300ms ease-in-out, filter 300ms ease-in-out;
    }

    &.is-active {
      iframe {
        opacity: 0.2;
      }

      &.video-mode-on iframe {
        filter: none;
        opacity: 0.8;
      }
    }
  }
</style>
