import { createStore } from "vuex"


const store = createStore({
    state:{
        searchResults: [],
        currentSong:{
            name: "",
            artist: "",
            videoId: 0
        }
    },
    mutations:{
        setSearchResult(state, result){
            state.searchResults = result.content;
        },
        setCurrentSong(state, song){
            state.currentSong = song;
        }
    },
    actions:{
        async getSearchResultApi({commit}, searchObject){
            console.log(searchObject.searchType);
            let response = await fetch(`https://yt-music-api.herokuapp.com/api/yt/${searchObject.searchType}/${searchObject.searchString}`);
            let searchResult = await response.json();
            commit('setSearchResult', searchResult);
        }
    },
})

export default store