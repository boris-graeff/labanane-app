<template>
  <div>
    <div class='tips'>
      Tips: please note that you will not be able to reset your password
    </div>
    <form>
      <div class='text-box'>
        <label for='playlist-name'>Name</label>
        <input type='text' id='playlist-name'>
      </div>
      <div class='text-box'>
        <label for='playlist-password'>Password</label>
        <input type='password' id='playlist-password'>
      </div>
      <button type='submit'>Create</button>
    </form>
  </div>
</template>

<script>

  export default {
    name: 'create-playlist',

  }
</script>

<style lang='sass'>
  @import 'src/styles/constants.scss';
</style>
