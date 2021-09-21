<template>
    <div class="nav-div">
        <nav>
            <input @keyup.enter="Search()" class="searchbar" type="text" :placeholder="placeholderText" v-model="searchObject.searchString" required>
            <select v-model="searchObject.searchType">
                <option :value="'search'" >All</option>
                <option :value="'songs'">Song</option>
                <!-- <option :value="'albums'">Album</option> requirement removed from assignment -->
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
                searchType: "search",
            },
            placeholderText: "Write a song to search for..."
        }
    },
    computed:{
        getSearchResult(){
            return this.$store.state.searchResults;
        }
    },
    methods: {
        async Search(){
            if(this.searchObject.searchString == ""){
                this.placeholderText = "You need to input a valid search parameter!"
            }else{
                this.$store.commit('setBrowseId', 0)
                await this.$store.dispatch("getSearchResultApi", this.searchObject)
                this.setPlayList();
                this.$router.push('/');
            }
        },

        setPlayList(){
            let newPlayList = [];
            let searchResult = this.getSearchResult;
            for (let i = 0; i < searchResult.length; i++) {
                newPlayList.push(searchResult[i])
            }
            this.$store.commit('setPlayList', newPlayList);
        }
    },
}
</script>