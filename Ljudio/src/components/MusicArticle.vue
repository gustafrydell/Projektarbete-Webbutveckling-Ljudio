<template>
    <div class="spacing-bottom">
        <article :id="MusicArticle.videoId" class="music-article">
            <span class="title-image">
                <img :src="MusicArticle.thumbnails[1].url" alt="No thumbnail">
            </span>
            <span>
                <h2>{{MusicArticle.name}}</h2>
            </span>
            <span>
                <h2>{{MusicArticle.artist.name}}</h2>
            </span>
            <span class="play-button">
                <i @click="play(MusicArticle.videoId); setCurrentSong()" class="fas fa-play"></i>
                <i @click="pause()" class="fas fa-pause"></i>
            </span>
        </article>
    </div>
</template>

<script>
export default {
    props:{
        MusicArticle: Object
    },
    data(){
        return{
            volume: 50
        }
    },

    computed:{
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
        },
        setCurrentSong(){
            let song = {
                name: this.MusicArticle.name,
                artist: this.MusicArticle.artist.name,
                videoId: this.MusicArticle.videoId
            };
            this.$store.commit('setCurrentSong', song)
            console.log(song)
        }
    },
}
</script>