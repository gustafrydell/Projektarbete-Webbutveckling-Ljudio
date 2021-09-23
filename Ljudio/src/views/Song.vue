<template>
<div>
    <h1>Song</h1>
     <span class="play-button">
        <i @click="play(videoId); setCurrentSong(); playerToggle()" class="fas fa-play play-button-song"></i>
        <img :src="getSongInfo.thumbnails[1].url" alt="thumbnail">
    </span>
    <h2>Name: {{getSongInfo.name}}</h2>
    <h2>Artist: {{getSongInfo.artist.name}}</h2>
    <h2>Album: {{getSongInfo.album.name}}</h2>
</div>
</template>

<script>
export default {
    data(){
        return{
            videoId: this.$route.params.videoId,
            isPlaying: false,
            togglePlayPause: false
        }
    },

    created() {
        this.setSongInfo;
    },

    computed:{
        getSongInfo(){
            return this.$store.state.song;
        },
        setSongInfo(){
            this.$store.dispatch('getSongInfoApi', this.videoId);
        }
    },
    methods:{
         play(id){
            player.loadVideoById(id);
            this.$store.commit('setIsPlaying', true);
            this.$store.commit('setTogglePlayPause', true)
            this.setCurrentSong();
        },
         pause(){
            this.$store.commit('setTogglePlayPause', false);
            player.pauseVideo();
        },
        setCurrentSong(){
            if(this.getSongInfo.type === 'song'){
                let song = {
                    name: this.getSongInfo.name,
                    artist: this.getSongInfo.artist.name,
                    videoId: this.getSongInfo.videoId
                };
                this.$store.commit('setCurrentSong', song)
            }else if(this.getSongInfo.type === 'video'){
                    let song = {
                    name: this.getSongInfo.name,
                    artist: this.getSongInfo.author,
                    videoId: this.getSongInfo.videoId
                };
                this.$store.commit('setCurrentSong', song)
            }
        },
        playerToggle(){
            if(this.getPlayerDisplay){
                this.$store.commit('setPlayerToggle', false)
             }else if(!this.getPlayerDisplay){
                this.$store.commit('setPlayerToggle', true)
            }
        },
    }
    
}
</script>