<template>
<div>

    <div v-if="getPlayerDisplay" class="music-player">
        <span class="current-song">
            <p>Now playing: </p>
            <p>{{getCurrentSong.name}} by {{getCurrentSong.artist}}</p> 
        </span>
        <span class="play-button">
            <i @click="previousSong()" class="fas fa-step-backward"></i>
            <i @click="play(getCurrentSong.videoId)" class="fas fa-play" v-if="!getTogglePlayPause"></i>
            <i @click="pause()" class="fas fa-pause" v-if="getTogglePlayPause"></i>
            <i @click="nextSong()" class="fas fa-step-forward"></i>
            <input class="volume-slider" @change="setVolume(volume)" @mousemove="setVolume(volume)" type="range" min="1" max="100" v-model="volume">
            <i @click="mute()" class="fas fa-volume-up" v-if="!muted"></i>
            <i @click="mute()" class="fas fa-volume-mute" v-if="muted"></i>
        </span>
        <i @click="playerToggle()" class="fas fa-angle-down close-button fa-2x"></i>
        <input @change="seekTo(currentTime)" class="time-duration" type="range" min="0" :max="duration" v-model="currentTime" step="0.01">
    </div>
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
            currentTime: 0,
            muted: false,
            duration: 0
        }
    },
    mounted: function () {
        window.setInterval(() => {
            if(this.getIsPlaying){
                this.setCurrentTime();
                this.setCurrentDuration();
                // console.log(this.duration)
                // console.log(this.currentTime);
                // console.log(this.getIsPlaying);
                // console.log(this.getTogglePlayPause);
            }
        }, 1000)
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
        },
        getPlayList(){
            return this.$store.state.playList;
        },
        getTogglePlayPause(){
            return this.$store.state.togglePlayPause;
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
        setCurrentDuration(){
            this.duration = player.getDuration();
        },
        seekTo(time){
            player.seekTo(time);
        },

        setCurrentTime(){
            this.currentTime = player.getCurrentTime();
        },
        play(id){
            if(!this.getIsPlaying){
                player.loadVideoById(id);
                this.$store.commit('setIsPlaying', true);
                this.$store.commit('setTogglePlayPause', true)
            }
            this.$store.commit('setIsPlaying', true);
            this.$store.commit('setTogglePlayPause', true);
            player.playVideo();
        },
        pause(){
            this.$store.commit('setTogglePlayPause', false);
            player.pauseVideo();
        },
        setVolume(volume){
            player.setVolume(volume);
        },
        nextSong(){
            let playList = this.getPlayList;
            let nextSong = 0;
            for (let i = 0; i < playList.length; i++) {
                if(playList[i].videoId === this.getCurrentSong.videoId){
                    if(i < playList.length - 1){
                        nextSong = playList[i + 1].videoId;
                        let currentSong = {name: playList[i + 1].name, artist: playList[i + 1].artist.name, videoId: playList[i + 1].videoId}
                        this.setCurrentSong(currentSong);
                        break
                    }else{
                        nextSong = playList[0].videoId;
                        let currentSong = {name: playList[0].name, artist: playList[0].artist.name, videoId: playList[0].videoId}
                        this.setCurrentSong(currentSong);
                        break
                    }
                }
            }
            player.loadVideoById(nextSong);
            this.$store.commit('setIsPlaying', true);
            this.$store.commit('setTogglePlayPause', true)
        },
        previousSong(){
            let playList = this.getPlayList;
            let nextSong = 0;
            for (let i = 0; i < playList.length; i++) {
                if(playList[i].videoId === this.getCurrentSong.videoId){
                    if(i > 0){
                        nextSong = playList[i - 1].videoId;
                        let currentSong = {name: playList[i - 1].name, artist: playList[i - 1].artist.name, videoId: playList[i - 1].videoId}
                        this.setCurrentSong(currentSong);
                        break;
                    }else{
                        nextSong = playList[playList.length - 1].videoId;
                        let currentSong = {name: playList[playList.length - 1].name, artist: playList[playList.length - 1].artist.name, videoId: playList[playList.length - 1].videoId}
                        this.setCurrentSong(currentSong);
                        break;
                    }
                }
            }
            player.loadVideoById(nextSong);
            this.$store.commit('setIsPlaying', true);
            this.$store.commit('setTogglePlayPause', true)
        },
        mute(){
            if(this.muted){
                player.unMute();
                this.muted = false;
            }else if(!this.muted){
                player.mute();
                this.muted = true;
            }
        },
        setCurrentSong(song){
            this.$store.commit('setCurrentSong', song)
        }
    },
}
</script>