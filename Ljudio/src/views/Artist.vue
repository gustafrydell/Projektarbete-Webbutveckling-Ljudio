<template>
<div>
    <h1>Artist</h1>
    <hr>
    <img :src="getArtist.thumbnails[1].url" alt="">
    <h2>{{getArtist.name}}</h2>
    <p>{{getArtist.description}}</p>
    <hr>
    <div> 
        <table>
            <tr>    
                <th><h2>Songs</h2></th>
            </tr>
            <tr v-for="song in getArtist.products.songs.content" :key="song">
                <td>{{song.name}}</td>
            </tr>
        </table>
        <table>
            <tr>
                <th><h2>Albums</h2></th>
            </tr>
            <tr v-for="album in getArtist.products.albums.content" :key="album">
                <td>{{album.name}}</td>
            </tr>
        </table>
    </div>
    <!-- <p v-for="song in getArtist.products.songs.content" :key="song">{{song.name}}</p> -->
</div>
</template>

<script>
import SongArticle from '../components/SongArticle.vue'
export default {
    components:{
        SongArticle
    },
    created(){
        this.fetchArtist();
    },
    data(){
        return{
            browseId: this.$route.params.browseId
        }
    },
    computed:{
        getBrowseId(){
            return this.$store.state.browseId;
        },
        getArtist(){
            return this.$store.state.artist;
        }
    },
    methods:{
        fetchArtist(){
            this.$store.dispatch('getArtistInfoApi', this.browseId)
        }
    }
}
</script>