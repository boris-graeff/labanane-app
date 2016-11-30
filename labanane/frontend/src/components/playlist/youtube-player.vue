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
    created: function () {
      this.load_player()
    },
    methods: {
      load_player: function () {
        var that = this,
            tag = document.createElement('script'),
            first_script_tag = document.getElementsByTagName('script')[0];

        tag.src = "https://www.youtube.com/iframe_api";
        first_script_tag.parentNode.insertBefore(tag, first_script_tag);

        window.onYouTubeIframeAPIReady = function () {
          that.player = new YT.Player('youtube-player', {
            height: '360',
            width: '640',
            videoId: '5EazGCA1ydk',
            events: {
              'onReady':  that.on_player_ready,
              'onStateChange': that.on_state_change
            }
          })
        }
      },

      on_player_ready: function (event) {
        //this.ready = true;
        //event.target.playVideo();
      },

      on_state_change: function (event) {
      },

      stop_video: function () {
        this.player.stopVideo();
      }
    }
  }
</script>

<style lang='sass'>

</style>
