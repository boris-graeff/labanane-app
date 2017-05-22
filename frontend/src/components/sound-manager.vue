<template>
  <div>
    <app-player
      @seekTo='value => seekTo(value)'
      @play='play'
      @pause='pause'>
    </app-player>

    <div class='provider-players' :class='{"video-mode-on": player.videoMode}'>

      <youtube-player
        ref='youtubePlayer'
        @trackEnd='nextTrack'
        @trackDuration='value => setTrackDuration(value)'
        @currentTime='value => setPlayerCurrentTime(value)'
        @error='setTrackError'
        @ready='setPlayerReady("youtube")'
        :class='{"is-active": track.provider === "youtube"}'>
      </youtube-player>

      <soundcloud-player
        ref='soundcloudPlayer'
        :apiKey='constants.SOUNDCLOUD_KEY'
        @trackEnd='nextTrack'
        @trackDuration='value => setTrackDuration(value)'
        @currentTime='value => setPlayerCurrentTime(value)'
        @error='setTrackError'
        @ready='setPlayerReady("soundcloud")'
        :class='{"is-active": track.provider === "soundcloud"}'
        :style="{backgroundImage: 'url(' + track.artwork + ')'}">
      </soundcloud-player>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import appPlayer from './app-player.vue'
  import youtubePlayer from './players/youtube-player.vue'
  import soundcloudPlayer from './players/soundcloud-player.vue'

  export default {
    name: 'sound-manager',
    data () {
      return {
        currentPlayer: null
      }
    },
    computed: mapState(['constants', 'track', 'player']),
    watch: {
      track: {
        handler () {
          const {provider} = this.track

          if (this.currentPlayer) {
            this.currentPlayer.stop()
          }

          if (provider === 'youtube') {
            this.currentPlayer = this.$refs.youtubePlayer
          }
          else if (provider === 'soundcloud') {
            this.currentPlayer = this.$refs.soundcloudPlayer
          }

          this.setPlayerState('playing')
          this.currentPlayer.loadAndPlay(this.track.providerId, this.player.volume)
        },
        deep: true
      },
      'player.volume' () {
        this.currentPlayer.setVolume(this.player.volume)
      }
    },
    methods: {
      ...mapActions(['setPlayerState', 'nextTrack', 'setTrackDuration', 'setTrackError', 'setPlayerCurrentTime', 'setPlayerReady']),
      play () {
        const {currentPlayer} = this
        if (!currentPlayer) {
          this.nextTrack()
        }
        else {
          this.currentPlayer.play()
          this.setPlayerState('playing')
        }
      },
      pause () {
        this.currentPlayer.pause()
        this.setPlayerState('paused')
      },
      stop () {
        this.currentPlayer.stop()
        this.setPlayerState('stopped')
      },
      seekTo (time) {
        this.currentPlayer && this.currentPlayer.seekTo(time)
      }
    },
    components: {
      'app-player': appPlayer,
      'youtube-player': youtubePlayer,
      'soundcloud-player': soundcloudPlayer
    }
  }
</script>
