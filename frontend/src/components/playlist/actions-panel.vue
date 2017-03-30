<template>
  <div class='actions-panel' :class='{"expanded" : expanded}'>
    <button type='button' @click='expanded=!expanded' class='btn-toggle' :class='{"on": expanded}'></button>
    <search v-if='expanded && playlist.canEdit'></search>
    <auth v-if='expanded && !playlist.canEdit'></auth>
    </div>
  </div>
</template>

<script>
  import actions from '../../actions'
  import search from './search.vue'
  import auth from './auth.vue'

  export default {
    name: 'actions-panel',
    components: {
      'search': search,
      'auth': auth
    },
    data: function(){
      return {
        expanded: !this.playlist.tracks.length
      }
    },
    vuex: {
      getters: {
        playlist: state => state.playlist
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .actions-panel {
    width: 20%;
    transition: width 200ms ease-in-out, transform 200ms ease-in-out;
    position: fixed;
    left: 0;
    top: 0;
    padding: 56px 6px 0 6px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    will-change: width;

    .btn-toggle {
      padding: 0;
      height: 48px;
      width: 48px;
      background-color: rgba($wheat, 0.15);
      transition: background-color 200ms ease-in-out;

      &:before {
        background-image: url('/images/icn-edit.svg');
      }

      &:after {
        background-image: url('/images/icn-cross.svg');
      }

      &:hover {
        background-color: rgba($wheat, 0.8);
      }
    }

    .btn-video-mode-on {
      background-image: url('/images/icn-video-mode-on.svg');
    }

    .btn-video-mode-off {
      background-image: url('/images/icn-video-mode-off.svg');
    }

    &.expanded {
      width: 30%;

      + * {
        width: 70%;
      }
    }


    @media screen and (max-width: 800px){
      display: none;
    }
  }
</style>