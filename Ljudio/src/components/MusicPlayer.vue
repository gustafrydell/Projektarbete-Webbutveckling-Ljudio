<template>
    <div class="music-player">
        <span class="current-song">
            <p>Now playing: </p>
            <p>{{getCurrentSong.name}} by {{getCurrentSong.artist}}</p> 
        </span>
        <span class="play-button">
            <i @click="previousSong()" class="fas fa-step-backward"></i>
            <i @click="play(getCurrentSong.videoId)" class="fas fa-play" v-if="!togglePlayPause"></i>
            <i @click="pause()" class="fas fa-pause" v-if="togglePlayPause"></i>
            <i @click="nextSong()" class="fas fa-step-forward"></i>
            <input @change="setVolume(volume)" type="range" min="1" max="100" v-model="volume">
        </span>
    </div>
</template>

<script>
export default {

    data() {
        return {
            volume: 50,
            isPlaying: false,
            togglePlayPause: false
        }
    },

    computed:{
        getCurrentSong(){
            return this.$store.state.currentSong;
        },
        getPlayState(){
            return this.$store.state.playState;
        }
    },

    methods: {
        play(id){
            if(!this.isPlaying){
                player.loadVideoById(id);
                this.isPlaying = true;
            }
            this.togglePlayPause = true;
            player.playVideo();
        },
        pause(){
            player.pauseVideo();
            this.togglePlayPause = false;
        },
        setVolume(volume){
            player.setVolume(volume);
        },
        nextSong(){
            player.nextVideo();
        },
        previousSong(){
            player.previousVideo();
        }
    },
}
</script>