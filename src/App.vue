<script setup>
import { useStore } from 'vuex'
import Table from './components/Table.vue'
import LoadMore from './components/LoadMore.vue'
import Notification from './components/Notification.vue'

const store = useStore()
</script>

<template>
  <div class="app-container pb-6">
    <h1 class="title">Wookipedia</h1>
    <Table />
    <LoadMore v-if="store.state.loadStatus.isLoaded" />
    <Notification />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  max-width: 960px;
  flex-grow: 1;
  margin: 0 auto;
  width: auto;
  padding: 0 20px;

  & > .title {
    color: #9d79f8;
  }
}
</style>
