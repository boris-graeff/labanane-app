<template>
  <div class='app' id='snow'>
    <transition name='page' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted () {
      window.particlesJS('snow', {
        'particles': {
          'number': {
            'value': 100,
            'density': {
              'enable': true,
              'value_area': 800
            }
          },
          'color': {
            'value': '#ffffff'
          },
          'shape': {
            'type': 'circle',
            'stroke': {
              'width': 0,
              'color': '#000000'
            },
            'image': {
              'src': 'img/github.svg',
              'width': 100,
              'height': 100
            }
          },
          'opacity': {
            'value': 1,
            'random': true,
            'anim': {
              'enable': true,
              'speed': 1,
              'opacity_min': 0.1,
              'sync': false
            }
          },
          'size': {
            'value': 5,
            'random': true,
            'anim': {
              'enable': true,
              'speed': 2,
              'size_min': 0.1,
              'sync': false
            }
          },
          'line_linked': {
            'enable': false
          },
          'move': {
            'enable': true,
            'speed': 2,
            'direction': 'bottom',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'bounce': false,
            'attract': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 1200
            }
          }
        },
        'interactivity': {
          'detect_on': 'canvas',
          'events': {
            'onhover': {
              'enable': false
            },
            'onclick': {
              'enable': false
            },
            'resize': false
          }
        },
        'retina_detect': true
      })
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/base.scss';
</style>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>

  .page-enter-active, .page-leave-active {
    transition: opacity 200ms ease-in-out;
  }

  .page-enter, .page-leave-to {
    opacity: 0;
  }
</style>

<style>
  #snow > canvas {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh !important;
    width: 100vw !important;
    pointer-events: none;
    z-index: 1;
  }
</style>
