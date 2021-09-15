<script setup>
import Navbar from "./components/Navbar.vue";
import MusicPlayer from './components/MusicPlayer.vue'
</script>

<template>
  <div>
    <div class="logo">
      <img @click="goHome()" src="src/assets/gustisljudio.png" alt="">
    </div>
    <Navbar/>
    <router-view class="main-view"></router-view>
    <MusicPlayer v-if="getPlayState != 0 "/>
  </div>
</template>

<script>
export default {
  computed:{
    getPlayState(){
      return this.$store.state.playState;
    }
  },
  methods:{
    goHome(){
      this.$router.push('/');
    }
  }
}
</script>
