<template>
    <div v-if="getPlayerDisplay" class="music-player">
        <span class="current-song">
            <p>Now playing: </p>
            <p>{{getCurrentSong.name}} by {{getCurrentSong.artist}}</p> 
        </span>
        <span class="play-button">
            <i @click="previousSong()" class="fas fa-step-backward"></i>
            <i @click="play(getCurrentSong.videoId)" class="fas fa-play" v-if="!togglePlayPause"></i>
            <i @click="pause()" class="fas fa-pause" v-if="togglePlayPause"></i>
            <i @click="nextSong()" class="fas fa-step-forward"></i>
            <input @mousemove="setVolume(volume)" type="range" min="1" max="100" v-model="volume">
            <input type="range" min="0" :max="getCurrentDuration" v-model="currentTime">
        </span>
        <i @click="playerToggle()" class="fas fa-angle-down close-button fa-2x"></i>
    </div>
    <div v-if="!getPlayerDisplay" class="music-player-hidden">
        <p>Maximize player  </p>
        <i @click="playerToggle()" class="fas fa-angle-up close-button fa-2x"></i>
    </div>
</template>

<script>

export default {
    data() {
        return {
            volume: 50,
            isPlaying: false,
            togglePlayPause: false,
            currentTime: 0
        }
    },
    created(){
        // this.getCurrentTime();
    },
    computed:{
        getCurrentSong(){
            return this.$store.state.currentSong;
        },
        getPlayState(){
            return this.$store.state.playState;
        },
        getPlayerDisplay(){
            return this.$store.state.togglePlayer;
        }

    },

    methods: {
        playerToggle(){
            let toggle = this.getPlayerDisplay;
            if(toggle){
                this.$store.commit('setPlayerToggle', false)
            }else if(!toggle){
                this.$store.commit('setPlayerToggle', true)
            }
        },
        // getCurrentTime(){
        //     return this.currentTime = player.getCurrentTime() /2;
        // },
        getCurrentDuration(){
            return player.getDuration()/2;
        },
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