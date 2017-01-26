<template>
  <div class='explore'>
    <label class='filter'>
      <span>Explore</span>
      <input type='text' v-model='input'/>
    </label>
    <div>
      <ul class='list'>
        <li v-for='p in filtered_playlists'>
          <router-link :to="{ name: 'playlist', params: { id: p.name}}">
            <div>
              <span>{{ p.name }}</span><span>{{ p.length }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import actions from '../../actions'

  export default {
    name: 'explore-playlists',
    data: function () {
      return {
        input: ''
      }
    },
    computed: {
      filtered_playlists () {
        var input = this.input

        return this.playlists.filter( track => {
          return track.name.indexOf(input) >= 0
        })
      }
    },
    mounted () {
      this.getAllPlaylists()
    },
    vuex: {
      getters: {
        playlists: state => state.playlists
      },
      actions: {
        getAllPlaylists: actions.getAllPlaylists
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '../../styles/constants.scss';

  .explore {
    height: 100vh;
    width:  40%;
    position: relative;

    > div {
      height: 100%;
      overflow-y: visible;
      overflow-x: hidden;
    }

    .filter {
      position: absolute;
      top: 0;
      width: 400px;
      right: 100%;
      display: flex;
      height: 60px;
      padding: $space-small $space-small $space-small 0;

      label {
        border-bottom: 1px solid $black;
      }

      input {
        width: 100%;
        margin-left: $space-small;
      }

      span {
        font-size: 3rem;
        font-style: italic;
        font-weight: bold;
      }
    }

    .list {
      min-height: 100%;
    }
  }
</style>
