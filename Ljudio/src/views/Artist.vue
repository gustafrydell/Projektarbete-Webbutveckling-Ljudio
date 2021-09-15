<template>
<div>
    <h1>Artist</h1>
    <p>{{getArtist.name}}</p>
    <p>{{getArtist.description}}</p>
    <p>{{getArtist.products.songs}}</p>
    <p>{{getArtist.products.singles}}</p>
</div>
</template>

<script>
export default {
    created(){
        this.fetchArtist(this.getBrowseId)
    },
    data(){
        return{
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
        fetchArtist(browseId){
            this.$store.dispatch('getArtistInfoApi', browseId)
        }
    }
}
</script>