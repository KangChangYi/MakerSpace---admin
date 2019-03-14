<style scoped>
  @import "./css/index.css";

  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }

</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    name: 'App',
    components: {},
    methods: {},
    created() {},
  }

</script>
