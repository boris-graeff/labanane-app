<template>
  <header class='topbar'>
    <router-link :to="{ name: 'home'}" class='link-home'>
      <img src='/images/labanane-logo.svg' alt="LaBanane logo"/>
    </router-link>
    <h1>{{playlist.name}}</h1>
    <button type='button'>Video</button>
  </header>
</template>

<script>
  export default {
    name: 'topbar',
    vuex: {
      getters: {
        playlist: state => state.playlist
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $topbar-height;
    padding: $space-small;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba($black, 0.5);

    h1 {
      font-size: 4rem;
      display: inline-block;
      vertical-align: middle;
      font-weight: 300;
    }

    .link-home {
      display: inline-block;
      line-height: 0;
      vertical-align: middle;
      transition: transform 300ms ease-in-out;

      img {
        height: 48px;
        width: 48px;
      }

      &:hover {
        transform: rotate(360deg);
      }
    }
  }
</style>
