<template>
    <div class="nav-div">
        <nav>
            <input @keyup.enter="Search()" class="searchbar" type="text" placeholder="Write a song to search for..." v-model="searchObject.searchString" required>
            <select v-model="searchObject.searchType">
                <option :value="'search'" >All</option>
                <option :value="'songs'">Song</option>
                <option :value="'albums'">Album</option>
                <option :value="'artists'">Artist</option>
            </select>
            <span  @click="Search()" class="search-button"><p>Search</p></span>
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
        Search(){
            this.$store.commit('setBrowseId', 0)
            this.$store.dispatch("getSearchResultApi", this.searchObject)
            .then(this.$router.push("/"));
        }
    },
}
</script>