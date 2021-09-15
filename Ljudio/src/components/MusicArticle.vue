<template>
    <div class="spacing-bottom">
        <!------If search type is by song------>
        <article v-if="MusicArticle.type == 'song'" :id="MusicArticle.videoId" class="music-article">
            <span class="title-image">
                <img :src="MusicArticle.thumbnails[1].url" alt="No thumbnail">
            </span>
            <span>
                <h2>Song: {{MusicArticle.name}}</h2>
            </span>
            <span>
                <h2>Artist: {{MusicArticle.artist.name}}</h2>
            </span>
            <span class="play-button">
                <i @click="play(MusicArticle.videoId); setCurrentSong()" class="fas fa-play"></i>
                <i @click="pause()" class="fas fa-pause"></i>
            </span>
        </article>

        <!------If search type is by album------>
        <article @click="routeTo(MusicArticle.browseId, MusicArticle.type)" v-if="MusicArticle.type == 'album'" :id="MusicArticle.browseId" class="music-article">
            <span class="title-image">
                <img :src="MusicArticle.thumbnails[1].url" alt="No thumbnail">
            </span>
            <span>
                <h2>Album: {{MusicArticle.name}}</h2>
            </span>
            <span>
                <h2>Artist: {{MusicArticle.artist}}</h2>
            </span>
            <span class="play-button">
                <i class="fas fa-chevron-right"></i>
            </span>
        </article>
        <!------If search type is by artist------>
        <article @click="routeTo(MusicArticle.browseId, MusicArticle.type)" v-if="MusicArticle.type == 'artist'" :id="MusicArticle.browseId" class="music-article">
            <span class="title-image">
                <img :src="MusicArticle.thumbnails[1].url" alt="No thumbnail">
            </span>
            <span>
                <h2>Artist: {{MusicArticle.name}}</h2>
            </span>
            <span class="play-button">
                <i class="fas fa-chevron-right"></i>
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
            volume: 50,
            isPlaying: false
        }
    },

    computed:{
    },

    methods: {
        play(id){
            if(!this.isPlaying){
                player.loadVideoById(id);
                this.isPlaying = true;
            }
            player.playVideo();
            let playState = player.getPlayerState();
            this.$store.commit('setPlayState', playState);
        },
        pause(){
            player.pauseVideo();
            let playState = player.getPlayerState();
            this.$store.commit('setPlayState', playState);
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
        },
        routeTo(browseId, type){
            this.$store.commit('setBrowseId', browseId);
            this.$router.push(`/${type}/${browseId}`)
        },

    },
}
</script>