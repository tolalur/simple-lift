<script setup lang="ts">
import  Building from './components/Building.vue';
</script>

<template>
  <div class="app">
    <Building 
  :floor-num="4"
  :id="1"
  />
   <Building 
  :floor-num="4"
  :id="2"
  />
  </div>
</template>

<style>
.app {
  display: flex;
}
</style>
