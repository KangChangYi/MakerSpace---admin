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


    <div class="forget-page-form-frame" style="height:500px;">

      <div class="forget-page-font-top" style="margin-bottom:5px;">我们已将验证码发送至: </div>

      <div class="forget-page-font-top" style="color:#4da009">{{this.$route.params.email}}</div>

      <input type="text" placeholder="验证码" autofocus class="forget-page-input" v-model="verification" />

      <input type="password" placeholder="新密码" class="forget-page-input" v-model="password" />

      <input type="password" placeholder="确认密码" class="forget-page-input" v-model="password2" />

      <Button type="success" class="forget-page-button" style="width:100%" @click="login">下一步</Button>

    </div>

  </div>

</template>

<script>
  import Cookies from 'js-cookie' //  使用Cookies
  import axios from 'axios'
  export default {
    data() {
      return {
        password: '',
        password2: '',
        verification: '',
      }
    },
    name: 'forgetPassStep2',
    computed: {},
    created() {  },
    methods: {
      login() {
        var that = this
        if (that.verification === "") {
          that.$Message.warning('请输入验证码!');
          return 0;
        }
        if (that.password === "") {
          that.$Message.warning('请输入新密码!');
          return 0;
        }
        if (that.password2 === "") {
          that.$Message.warning('请输入确认密码!');
          return 0;
        }
        // 请求
        this.$http.get(this.global.url + "login/forget/repassword", {
          params: {
            code: that.verification,
            email: this.$route.params.email,
            password: that.password
          },
          emulateJSON: true,
          withCredentials: true
        }).then(response => {
          if (response.data.msg === "验证码错误") {
            that.$Message.warning(response.data.msg);
            return 0;
          } else if (response.data.msg === "修改成功") {
            that.$Message.success(response.data.msg);
            this.$router.push({
              name: "login"
            })
          }
        }, err => {})
      }
    },
    watch: {}
  }

</script>
