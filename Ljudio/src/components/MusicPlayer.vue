<template>
    <div class="music-player">
        <span class="current-song">
            <h1>Now playing:</h1>
            <h3>{{getCurrentSong.name}} by {{getCurrentSong.artist}}</h3> 
        </span>
        <span class="play-button">
            <i @click="play(MusicArticle.videoId)" class="fas fa-play"></i>
            <i @click="pause()" class="fas fa-pause"></i>
            <input @change="setVolume(volume)" type="range" min="1" max="100" v-model="volume">
        </span>
    </div>
</template>


<script>
export default {

    data() {
        return {
            volume: 50
        }
    },


    computed:{
        getCurrentSong(){
            return this.$store.state.currentSong;
        }
    },


    methods: {
        play(id){
            player.loadVideoById(id);
            player.playVideo();
        },
        pause(){
            player.pauseVideo();
        },
        setVolume(volume){
            player.setVolume(volume);
        }
    },
}
</script>