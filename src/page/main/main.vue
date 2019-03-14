<style scoped>
  .bg-img-MakerSpace {
    display: flex;
    margin: auto;
    width: 800px;
    margin-top:100px;
  }

  .bg-img-studio {
    display: flex;
    margin: auto;
    /* position: absolute;
    right: 20px;
    bottom: 20px; */
    margin-top:300px;
    width: 400px;
  }

</style>

<template>
  <div id="app">


    <img src="./../../assets/MakerSpace.png" class="bg-img-MakerSpace" />



    <img src="./../../assets/fearLess-logo.png" class="bg-img-studio" />


  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    created() {
      // 改变父路由面包屑
      this.$emit('viewIn', "");
      this.$emit('viewInFather', "");
    }

  }

</script>
