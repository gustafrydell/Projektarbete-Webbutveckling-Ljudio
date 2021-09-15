<template>
<div>
    <h1>Album</h1>
    <p>{{getAlbum}}</p>
</div>
</template>

<script>
export default {
    created(){
        this.fetchAlbum(this.getBrowseId)
    },
    data(){
        return{
        }
    },
    computed:{
        getBrowseId(){
            return this.$store.state.browseId;
        },
        getAlbum(){
            return this.$store.state.album;
        }
    },
    methods:{
        fetchAlbum(browseId){
            this.$store.dispatch('getAlbumInfoApi', browseId)
        }
    }
}
</script>