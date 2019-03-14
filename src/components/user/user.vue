<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick" style="position: relative;z-index:9999">
      <!-- <Avatar :src="userAvator"/> -->
      <img src="../../assets/user.png" style="width:40px;height:40px;cursor: pointer" />
      <Icon :size="18" type="md-arrow-dropdown" style="padding-bottom:30px;cursor: pointer"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="changePass">修改密码</DropdownItem>
        <DropdownItem name="logOut" style="color:rgb(255, 38, 0)">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import './user.css'
  export default {
    name: 'User',
    props: {
      userAvator: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick(name) {
        switch (name) {
          case 'logOut':
            this.$router.push({
              name: 'login'
            })
            break
          case 'changePass':
            this.$router.push({
              name: 'teamAccount'
            })
            break
        }
      }
    }
  }

</script>
