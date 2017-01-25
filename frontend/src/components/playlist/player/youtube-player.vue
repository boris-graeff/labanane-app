<template>
  <div class='youtube-player' v-bind:class='{"is_active": is_active}'>
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
        is_active: false
      }
    },
    mounted () {
      this.loadPlayer()
    },
    watch: {
      state(){
        if (this.provider === 'youtube') {
          this.is_active = true
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
          this.is_active = false
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
        this.ytbPlayer.loadVideoById({'videoId': this.track.id})
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
        volume: state => state.player.volume
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
