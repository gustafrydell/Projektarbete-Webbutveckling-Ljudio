import { createStore } from "vuex"


const store = createStore({
    state:{
        searchResults: [],
        currentSong:{
            name: "",
            artist: "",
            videoId: 0
        },
        playState: 0,
        browseId: "",
        artist: [],
        album: [],
        song: {
            name: "",
            album:{
                name: ""
            },
            artist:{
                name: ""
            }
        },
        togglePlayer: false,
        isPlaying: false,
        togglePlayPause: false,
        playList: []
    },
    mutations:{
        setSearchResult(state, result){
            state.searchResults = result.content;
        },
        setCurrentSong(state, song){
            state.currentSong = song;
        },
        setPlayState(state, playState){
            state.playState = playState;
        },
        setBrowseId(state, browseId){
            state.browseId = browseId;
        },
        setArtistInfo(state, artist){
            state.artist = artist;
        },
        setAlbumInfo(state, album){
            state.album = album;
        },
        setSongInfo(state, song){
            state.song = song.content[0];
        },
        setPlayerToggle(state, bool){
            state.togglePlayer = bool;
        },
        setIsPlaying(state, bool){
            state.isPlaying = bool;
        },
        setPlayList(state, playList){
            state.playList = playList;
        },
        setTogglePlayPause(state, bool){
            state.togglePlayPause = bool;
        }
    },
    actions:{
        async getSearchResultApi({commit}, searchObject){
            let response = await fetch(`https://yt-music-api.herokuapp.com/api/yt/${searchObject.searchType}/${searchObject.searchString}`);
            let searchResult = await response.json();
            commit('setSearchResult', searchResult);
            if(searchObject.type == 'song'){
                commit('setPlayList', searchResult)
            }
        },
        async getSongInfoApi({commit}, videoId){
            let response = await fetch(`https://yt-music-api.herokuapp.com/api/yt/songs/${videoId}`)
            let result = await response.json();
            commit('setSongInfo', result);
        },
        async getArtistInfoApi({commit}, browseId){
            let response = await fetch(`https://yt-music-api.herokuapp.com/api/yt/artist/${browseId}`);
            let result = await response.json();
            commit('setArtistInfo', result);
        },
        async getAlbumInfoApi({commit}, browseId){
            let response = await fetch(`https://yt-music-api.herokuapp.com/api/yt/album/${browseId}`);
            let result = await response.json();
            commit('setAlbumInfo', result);
        }
    },
})

export default store