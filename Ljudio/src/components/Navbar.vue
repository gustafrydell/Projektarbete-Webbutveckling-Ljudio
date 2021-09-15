<template>
    <div class="nav-div">
        <nav>
            <input class="searchbar" type="text" placeholder="Write a song to search for..." v-model="searchObject.searchString">
            <select v-model="searchObject.searchType">
                <option :value="'search'" >All</option>
                <option :value="'songs'">Song</option>
                <option :value="'albums'">Album</option>
                <option :value="'artists'">Artist</option>
            </select>
            <span @click="Search(searchObject)" class="search-button"><p>Search</p></span>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchObject:{
                searchString: "",
                searchType: "search"
            }
        }
    },

    computed:{
    },

    methods: {
        Search(searchObject){
            this.$store.commit('setBrowseId', 0)
            this.$store.dispatch("getSearchResultApi", searchObject);
            this.$router.push("/");
        }
    },
}
</script>