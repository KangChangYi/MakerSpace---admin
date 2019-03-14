<style scoped>
  @import "../css/layout.css";
  #app {
    background-image: url("../assets/forgetpass22.jpg");
    background-size: cover;
    overflow-x:auto;
  }
</style>
<template>

  <div id="app">
    <!-- <div class="forget-form-frame" style="margin:auto"> -->

    <div class="forget-page-form-frame">

      <div class="forget-page-font-top">输入你的账号名称 </div>

      <input type="text" placeholder="账号(电子邮箱地址)" autofocus class="forget-page-input" v-model="email" />

      <Button type="success" class="forget-page-button" @click="login">下一步</Button>
      <Button type="text" class="forget-page-button2" @click="center">取消</Button>

    </div>

    <!-- </div> -->
  </div>

</template>

<script>
  import Cookies from 'js-cookie' //  使用Cookies
  export default {
    data() {
      return {
        email: '',
      }
    },
    name: 'forgetPassStep1',
    computed: {},
    created() {},
    methods: {
      login() {
        var that = this
        if (that.email === "") {
          that.$Message.warning('邮箱不能为空！');
          return 0;
        }
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!reg.test(that.email)) {
          that.$Message.warning('邮箱格式错误！');
          return 0;
        }

        this.$http.get(this.global.url + "/login/forget", {
          params: {
            email: that.email
          },
          emulateJSON: true,
          withCredentials: true
        }).then(response => {
          if (response.data.msg === "该邮箱不存在" || response.data.msg === "参数不正确") {
            that.$Message.warning(response.data.msg);
            return 0;
          } else {
            that.$Message.success(response.data.msg);
            this.$router.push({
              name: 'forgetPassStep2',
              params: {
                email: that.email
              }
            })
          }
        }, response => {})
      },
      center() {
        this.$router.go(-1)
      }
    },
    watch: {}
  }

</script>
