<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="background-form">
    <Navbar />
    <router-view class="main-view"></router-view>
  </div>
</template>
