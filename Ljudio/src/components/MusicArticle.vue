<template>
    <div class="spacing-bottom">
        <!------If search type is by song------>
        <article v-if="MusicArticle.type == 'song'" :id="MusicArticle.videoId" class="music-article">
            <span>
                <img :src="MusicArticle.thumbnails[1].url" alt="No thumbnail">
            </span>
            <span>
                <h2 @click="routeTo(MusicArticle.videoId, 'song'); setSongInfo(MusicArticle.videoId)">Song: {{MusicArticle.name}}</h2>
            </span>
            <span>
                <h2 @click="routeTo(MusicArticle.artist.browseId, 'artist')">Artist: {{MusicArticle.artist.name}}</h2>
            </span>
            <span class="play-button">
                <i @click="play(MusicArticle.videoId); playerToggle()" class="fas fa-play" v-if="!togglePlayPause"></i>
                <i @click="pause()" class="fas fa-pause" v-if="togglePlayPause"></i>
            </span>
        </article>

        <!------If search type is by video------>
        <article @click="setSongInfo(MusicArticle.videoId)" v-if="MusicArticle.type == 'video'" :id="MusicArticle.videoId" class="music-article">
            <span>
                <img :src="MusicArticle.thumbnails.url" alt="No thumbnail">
            </span>
            <span>
                <h2>Song: {{MusicArticle.name}}</h2>
            </span>
            <span>
                <h2>Artist: {{MusicArticle.author}}</h2>
            </span>
            <span class="play-button">
                <i @click="play(MusicArticle.videoId); playerToggle()" class="fas fa-play" v-if="!togglePlayPause"></i>
                <i @click="pause()" class="fas fa-pause" v-if="togglePlayPause"></i>
            </span>
        </article>

        <!------If search type is by album:  requirement removed from assignment------>
        <!-- <article @click="routeTo(MusicArticle.browseId, MusicArticle.type)" v-if="MusicArticle.type == 'album'" :id="MusicArticle.browseId" class="music-article">
            <span>
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
        </article> -->

        <!------If search type is by artist------>
        <article @click="routeTo(MusicArticle.browseId, MusicArticle.type)" v-if="MusicArticle.type == 'artist' || MusicArticle.type == 'a'" :id="MusicArticle.browseId" class="music-article">
            <span>
                <img :src="MusicArticle.thumbnails[1].url" alt="No thumbnail">
            </span>
            <span>
                <h2>Artist: {{MusicArticle.name}}</h2>
            </span>
            <span>
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
            isPlaying: false,
            togglePlayPause: false,
        }
    },

    created(){
    },

    computed:{
        getIsPlaying(){
            return this.$store.state.isPlaying;
        }
    },

    methods: {
        playerToggle(){
            if(this.getPlayerDisplay){
                this.$store.commit('setPlayerToggle', false)
            }else if(!this.getPlayerDisplay){
                this.$store.commit('setPlayerToggle', true)
            }
        },

        play(id){
            if(!this.isPlaying){
                player.loadVideoById(id);
                this.isPlaying = true;
                this.togglePlayPause = true;
            }
            this.setCurrentSong();
            player.playVideo();
            let playState = player.getPlayerState();
            this.togglePlayPause = true;
            this.$store.commit('setIsPlaying', true);
            this.$store.commit('setPlayState', playState);
        },
        pause(){
            player.pauseVideo();
            let playState = player.getPlayerState();
            this.togglePlayPause = false;
            this.$store.commit('setIsPlaying', false);
            this.$store.commit('setPlayState', playState);
        },
        
        setVolume(volume){
            player.setVolume(volume);
        },
        setCurrentSong(){
            if(this.MusicArticle.type === 'song'){
                let song = {
                    name: this.MusicArticle.name,
                    artist: this.MusicArticle.artist.name,
                    videoId: this.MusicArticle.videoId,
                };
                this.$store.commit('setCurrentSong', song)
            }else if(this.MusicArticle.type === 'video'){
                    let song = {
                    name: this.MusicArticle.name,
                    artist: this.MusicArticle.author,
                    videoId: this.MusicArticle.videoId
                };
                this.$store.commit('setCurrentSong', song)
            }
        },
        routeTo(browseId, type){
            this.$store.commit('setBrowseId', browseId);
            this.$router.push(`/${type}/${browseId}`)
        },
        setSongInfo(videoId){
            this.$store.dispatch('getSongInfoApi', videoId);
        },
    },
}
</script>