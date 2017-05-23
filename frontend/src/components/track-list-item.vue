<template>
  <list-item :class='track.provider'>
    <span class='index' v-if='index'>{{index}}</span>
    <div>
      <slot></slot>
    </div>
  </list-item>
</template>

<script>
  import listItem from '@/components/list-item'

  export default {
    name: 'track-list-item',
    props: {
      track: {
        required: true
      },
      index: {
        required: false,
        type: Number
      }
    },
    components: {
      'list-item': listItem
    }
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
  @import '~@/styles/constants';

  li {
    display: flex;
    align-items: center;

    &.selected {
      background-color: $wheat;
    }

    div {
      padding-right: 6px;
      padding-left: 36px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 6px;
      transform: translateY(-50%);
      height: 12px;
      width: 30px;
      opacity: 0.7;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }

  li.youtube:before {
    background-image: url('~@/assets/icn-you-tube.svg') // you-tube adblock hack
  }

  li.soundcloud:before {
    background-image: url('~@/assets/icn-soundcloud.svg')
  }

  li.bandcamp:before {
    background-image: url('~@/assets/icn-bandcamp.svg')
  }

  .index {
    position: absolute;
    font-size: 10px;
    transform: translate(-$space-small, -50%);
    top: 50%;
    right: 100%;
    text-align: right;
    width: $space-big;
  }
</style>
