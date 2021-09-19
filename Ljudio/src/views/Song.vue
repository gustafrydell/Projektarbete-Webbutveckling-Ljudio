<template>
<div>
    <h1>Song</h1>
    <p>{{videoId}}</p>
    <p>Name: {{getSongInfo.name}}</p>
    <p>Artist: {{getSongInfo.artist.name}}</p>
    <p>Album: {{getSongInfo.album.name}}</p>
    <img :src="getSongInfo.thumbnails[1].url" alt="thumbnail">
    <span class="play-button">
        <i @click="play(MusicArticle.videoId); setCurrentSong(); playerToggle()" class="fas fa-play" v-if="!togglePlayPause"></i>
        <i @click="pause()" class="fas fa-pause" v-if="togglePlayPause"></i>
    </span>
</div>
</template>

<script>
export default {
    data(){
        return{
            videoId: this.$route.params.videoId
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

    }
    
}
</script>