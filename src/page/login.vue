<style scoped>
  @import "../css/layout.css";

  #app {
    overflow: hidden;
    height: 974px;
    background-image: url("../assets/index-top2.jpg");
    background-size: cover;
    color: #363838;
    font-size: 14px;
  }

  .forgetpass {
    color: #343434;
  }

  .forgetpass:hover {
    color: rgb(7, 146, 189)
  }
</style>
<template>

  <div id="app">
    <div class="login-right">

      <div class="login-form-frame">
        <div class="login-font-top">创客空间后台管理 </div>

        <div style="width:100%;margin-bottom:20px;">
          <div class="login-font">邮箱</div>
          <input type="text" placeholder="Email " autofocus class="login-input" v-model="email" />
        </div>

        <div style="width:100%;margin-bottom:40px;">
          <div class="login-font">密码</div>
          <input type="password" placeholder="Passwrod" class="login-input" v-model="password" />
        </div>

        <div style="width:100% ">
          <Button type="success" class="login-button" style="width:100%" @click="login" long>Login</Button>
          <router-link :to="{ name:'forgetPassStep1'}" class="forgetpass">忘记密码？ </router-link>
        </div>
      </div>


    </div>
  </div>

</template>

<script>   
  import Cookies from 'js-cookie'    //  使用Cookies
  // const url = "http://192.168.10.113:8080/";  
  const url = "http://210.32.98.136:8080/"
  export default {
    url,
    data() {
      return {
        email: '',
        password: '',
      }
    },
    name:'login',
    computed: {},
    created() {
      this.email = Cookies.get('uesrname')
    },
    mounted() { },
    methods: {
      login() {
        var that = this
        if (that.email === "") { that.$Message.warning('邮箱不能为空！'); return 0; }
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!reg.test(that.email)) { that.$Message.warning('邮箱格式错误！'); return 0; }
        if (that.password === "") { that.$Message.warning('密码不能为空！'); return 0; }
        // 服务器请求
        this.$http.post(url + "login", { name: that.email, password: that.password }).then(response => {
          if (response.data.msg === "用户名或密码错误") {
            that.$Message.warning(response.data.msg);
          }
          if (response.data.msg === "成功") {
            Cookies.set('uesrname', that.email, { expires: 1 });
            Cookies.set('token', response.data.token, { expires: 1 });
            Cookies.set('power', response.data.permissionsCode, { expires: 1 });
            Cookies.set('teamId', response.data.teamId, { expires: 1 });
            Cookies.set('teamName', response.data.teamName, { expires: 1 });
            // 跳转
            this.$router.push({ name: 'index' })
          }
        }, response => { })
      }
    }
  }

</script>