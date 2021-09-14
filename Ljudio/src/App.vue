<script setup>
import Navbar from "./components/Navbar.vue";
import MusicPlayer from './components/MusicPlayer.vue'
</script>

<template>
  <div>
    <Navbar />
    <router-view class="main-view"></router-view>
    <MusicPlayer/>
  </div>
</template>


<script>
export default {

}
</script>
