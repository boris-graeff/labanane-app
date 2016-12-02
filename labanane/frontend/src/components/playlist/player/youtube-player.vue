<template>
  <div id='youtube-player'>

  </div>
</template>

<script>

  export default {
    name: 'youtube-player',
    data: function () {
      return {
        player: ''
      }
    },
    created () {
      this.load_player()
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
            height: '100%',
            width: '100%',
            videoId: '5EazGCA1ydk',
            events: {
              'onReady':  that.on_player_ready,
              'onStateChange': that.on_state_change
            }
          })
        }
      },

      on_player_ready (event) {
        //this.ready = true;
        //event.target.playVideo();
      },

      on_state_change (event) {
      },

      stop_video () {
        this.player.stopVideo();
      }
    }
  }
</script>

<style lang='sass'>
  #youtube-player {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0.1;
  }

</style>
