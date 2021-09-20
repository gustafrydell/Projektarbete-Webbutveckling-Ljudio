<template>
    <div v-if="getPlayerDisplay" class="music-player">
        <span class="current-song">
            <p>Now playing: </p>
            <p>{{getCurrentSong.name}} by {{getCurrentSong.artist}}</p> 
        </span>
        <span class="play-button">
            <i @click="previousSong()" class="fas fa-step-backward"></i>
            <i @click="play(getCurrentSong.videoId)" class="fas fa-play" v-if="!getIsPlaying"></i>
            <i @click="pause()" class="fas fa-pause" v-if="getIsPlaying"></i>
            <i @click="nextSong()" class="fas fa-step-forward"></i>
            <input @mousemove="setVolume(volume)" type="range" min="1" max="100" v-model="volume">
            <i @click="mute()" class="fas fa-volume-up" v-if="!muted"></i>
            <i @click="mute()" class="fas fa-volume-mute" v-if="muted"></i>
            <!-- <input type="range" min="0" :max="getCurrentDuration" v-model="currentTime"> -->
        </span>
        <i @click="playerToggle()" class="fas fa-angle-down close-button fa-2x"></i>
    </div>
    <div v-if="!getPlayerDisplay" class="music-player-hidden">
        <p @click="playerToggle()" >Maximize player  </p>
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
            currentTime: 0,
            muted: false
        }
    },
    created(){
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
        },
        getIsPlaying(){
            return this.$store.state.isPlaying;
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
        getCurrentDuration(){
            return player.getDuration()/2;
        },
        play(id){
            if(!this.isPlaying){
                player.loadVideoById(id);
                this.isPlaying = true;
            }
            this.togglePlayPause = true;
            this.$store.commit('setIsPlaying', true);
            player.playVideo();
        },
        pause(){
            player.pauseVideo();
            this.$store.commit('setIsPlaying', false);
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
        },
        mute(){
            if(this.muted){
                player.unMute();
                this.muted = false;
            }else if(!this.muted){
                player.mute();
                this.muted = true;
            }
        }
    },
}
</script>