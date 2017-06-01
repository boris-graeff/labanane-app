<template>
  <div class='explore'>
    <label class='filter'>
      <span>Explore</span>
      <input type='text' v-model='input'/>
    </label>
    <div>
      <list class='playlists'>
        <list-item v-for='(playlist, index) in filteredPlaylists' :key='index'>
          <router-link :to="{ name: 'playlist', params: {playlistId: playlist.id}}">
            <span>{{ playlist.name }}</span><span>{{ playlist.length }}</span>
          </router-link>
        </list-item>
      </list>
    </div>
  </div>
</template>

<script>
  import list from '@/components/list'
  import listItem from '@/components/list-item'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'explore-playlists',
    components: {
      'list': list,
      'list-item': listItem
    },
    data () {
      return {
        input: ''
      }
    },
    computed: {
      ...mapState(['playlists']),
      filteredPlaylists () {
        const input = this.input

        return this.playlists.filter((track) => {
          return track.name.indexOf(input) >= 0
        })
      }
    },
    mounted () {
      this.getAllPlaylists()
    },
    methods: mapActions(['getAllPlaylists'])
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/constants';

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

    .playlists {
      min-height: 100%;

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    @media screen and (max-width: 800px){
      width:  100%;
      height: auto;

      .filter {
        position: static;
        padding: $space-medium;
        flex-direction: column;
        height: auto;
        width: auto;

        input {
          margin: 0;
        }
      }
    }
  }
</style>
