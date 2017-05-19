<template>
  <list-item :class='track.provider'>
    <span class='index' v-if='index'>{{index}}</span>
    <span class='provider-icon'></span>
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 6px;
      width: 100%;
      height: 100%;
      line-height: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .provider-icon {
    display: inline-block;
    height: 12px;
    min-width: 30px;
    opacity: 0.7;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    margin-right: 6px;
  }

  li.youtube .provider-icon {
    background-image: url('~@/assets/icn-you-tube.svg') // you-tube adblock hack
  }

  li.soundcloud .provider-icon {
    background-image: url('~@/assets/icn-soundcloud.svg')
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
