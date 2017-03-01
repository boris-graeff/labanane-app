<template>
  <div class='actions-panel' :class='{"expanded" : expanded}'>
    <div class='buttons'>
      <button v-show='expanded' type='button' @click='expanded=false' class='btn-close'></button>
      <button v-show='!expanded' type='button' @click='expanded=true' class='btn-edit'></button>
    </div>
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
      'auth': auth,
    },
    data: function(){
      return {
        expanded: false
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
    top: 56px;
    left: 0;
    padding: 0 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    will-change: width;

    .buttons {
      display: flex;

      button {
        padding: 0;
        height: 48px;
        width: 48px;
        background-color: rgba($wheat, 0.15);
        background-repeat: no-repeat;
        background-size: 30px;
        background-position: center center;
        transition: background-color 200ms ease-in-out;

        &:hover {
          background-color: rgba($wheat, 0.8);
        }

        + button {
          margin-left: 6px;
        }
      }
    }

    .btn-edit {
      background-image: url('/images/icn-edit.svg');
    }

    .btn-close {
      background-image: url('/images/icn-cross.svg');
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