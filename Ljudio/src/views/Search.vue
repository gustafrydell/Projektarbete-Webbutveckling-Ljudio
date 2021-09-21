<template>
    <div style="margin-bottom: 5%">
        <h1>Search results</h1>
        <MusicArticle v-for="result in getSearchResult" :key="result" :MusicArticle="result"/>
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
        },
    },
}
</script>