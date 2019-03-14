<style scoped>
  @import "../../css/layout.css";
</style>

<template>
  <div id="app">

    <div class="page-mid-form-frame">

      <div class="form-frame" style="margin-bottom:50px;">
        <div class="form-title">邮箱:</div>
        <Input placeholder="输入邮箱" style="width: 250px" v-model="email" />
      </div>

      <div class="form-frame" style="margin-bottom:50px;">
        <div class="form-title">新密码:</div>
        <Input placeholder="输入密码" style="width: 250px" v-model="password" />
      </div>


      <div class="form-frame" style="margin-bottom:50px;"> 
        <div class="form-title">确认密码:</div>
        <Input placeholder="输入确认密码" style="width: 250px" v-model="password2" />
      </div>

      <Button type="success" style="font-size:14px;width:250px;margin-left:90px;" @click="change" long>修改密码</Button>


    </div>

  </div>
</template>


<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'teamAccount',
    data() {
      return {
        email: '',
        password: '',
        password2: ''
      }
    },
    created() {
      // 修改父组件面包屑
      this.$emit('viewInFather', "修改密码")
      this.$emit('viewIn', "")
    },
    methods: {
      change() {
        var that = this
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!reg.test(that.email)) {
          that.$Message.warning('请输入正确的邮箱格式');
          return 0;
        }
        if (that.password === "") {
          that.$Message.warning("请输入密码");
          return 0;
        }
        if (that.password2 === "") {
          that.$Message.warning("请输入确认密码");
          return 0;
        }
        if (that.password !== that.password2) {
          that.$Message.warning("两次密码不一致");
          return 0;
        }
        // 更改密码

        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          }
        }; //添加请求头 

        this.$http.patch(this.global.url + "backstage/team/repassword", {
          name: that.email,
          password: that.password
        }, config).then(response => {
          if (response.data.msg === "修改成功") {
            this.$Message.success("密码修改成功")
          }
          this.$router.push({
            name: "login"
          })
        }, response => {})

        that.email = ""
        that.password = ""
        that.password2 = ""
      }
    }
  }

</script>
