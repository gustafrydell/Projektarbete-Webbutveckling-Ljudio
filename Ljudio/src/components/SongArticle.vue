<template>
    <div class="spacing-bottom">
        <article  class="song-article">
            <span>
                <h2>{{SongArticle.name}}</h2>
            </span>
        </article>
    </div>
</template>


<script>
export default {
    props:{
        SongArticle: Object
    },
    data(){
        return{

            togglePlayPause: false
        }
    },

    created(){
        console.log(this.SongArticle);
    },

    methods: {
        play(id){
            if(!this.isPlaying){
                player.loadVideoById(id);
                this.isPlaying = true;
                this.togglePlayPause = true;
            }
            player.playVideo();
            this.togglePlayPause = true;
            let playState = player.getPlayerState();
            this.$store.commit('setPlayState', playState);
        },
        pause(){
            player.pauseVideo();
            let playState = player.getPlayerState();
            this.togglePlayPause = false;
            this.$store.commit('setPlayState', playState);
        },

        setSongInfo(videoId){
            this.$store.dispatch('getSongInfoApi', videoId);
        }
    },
}
</script>