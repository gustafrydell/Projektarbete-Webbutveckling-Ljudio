<template>
    <div>
        <h1>Search results</h1>
        <MusicArticle v-for="result in getSearchResult" :key="result.videoId" :MusicArticle="result"/>
    </div>
</template>

<script>
import MusicArticle from '../components/MusicArticle.vue'
export default {
    components:{
        MusicArticle
    },
    computed:{
        getSearchResult(){
            return this.$store.state.searchResults;
        }
    },
    methods:{
        RouteToSong(videoId){
            this.$router.push(`/song/${videoId}`)
        }
    }
}
</script>