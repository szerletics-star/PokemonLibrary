<template>
  <div id="app">
    <List />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    List
  }
}
</script>

<style>
  @import './assets/styles/global.css';
</style>
