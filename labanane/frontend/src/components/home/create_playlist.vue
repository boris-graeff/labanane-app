<template>
    <div>
        <div class='tips'>
            Tips: please note that you will not be able to reset your password
        </div>
        <form>
            <div class='text-box'>
                <input type='text' id='playlist-name'>
                <label for='playlist-name'>Name</label>
            </div>
            <div class='text-box'>
                <input type='password' id='playlist-password'>
                <label for='playlist-password'>Password</label>
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
