<style scoped>
  @import "../../css/index.css";

  .layout {
    height: 100%;
    width: 100%;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .layout-header-bar{
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .width {
    position: fixed;
    left: 0;
    top: 0;
    width: 256px;
  }  
  /* 改变menu的点击态 */
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover{
    background:#000c17;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
    background:#000c17;
  }


</style>
<template>

  <Layout :style="{minHeight: '100vh'}">
    <!-- 导航栏部分 -->
    <Sider :width="256" :style="{overflow: 'hidden',background :'#001529'}">
      <Menu theme="dark" :accordion=true>
        <div class="width">
          <Submenu name="1" v-if="open">
            <template slot="title">
                <Icon type="md-notifications-outline" />
              审核
            </template>

            <router-link :to="{ name: 'teamApplication'}" style="color:#cdcdcd">
              <MenuItem name="1-1">
              <Icon type="md-person-add" />
              <span> 团队</span>
              </MenuItem>
            </router-link>

            <router-link :to="{ name: 'worksApplication'}" style="color:#cdcdcd">
              <MenuItem name="1-2">
                <Icon type="md-document" />
              <span> 作品</span>
              </MenuItem>
            </router-link>
          </Submenu>

          <Submenu name="2" v-if="open">
            <template slot="title">
                <Icon type="md-list" />
              管理
            </template>

            <router-link :to="{ name: 'teamManage'}" style="color:#DFDFDF">
              <MenuItem name="2-1">
                <Icon type="md-person" />
              <span>团队 </span>
              </MenuItem>
            </router-link>

            <router-link :to="{ name: 'worksManage'}" style="color:#cdcdcd">
              <MenuItem name="2-2">
                <Icon type="md-document" />
              <span> 作品</span>
              </MenuItem>
            </router-link>
          </Submenu>

          <router-link :to="{ name: 'worksAdd'}" style="color:#DFDFDF">
            <MenuItem name="3-1">
              <Icon type="md-add" />
            <span>作品添加 </span>
            </MenuItem>
          </router-link>

          <router-link :to="{ name: 'worksModify'}" style="color:#DFDFDF">
            <MenuItem name="3-2">
              <Icon type="md-brush" />
            <span>作品修改 </span>
            </MenuItem>
          </router-link>

          <router-link :to="{ name: 'teamInfo'}" style="color:#DFDFDF">
            <MenuItem name="3-3">
              <Icon type="md-person" />
            <span>团队资料 </span>
            </MenuItem>
          </router-link>

        </div>
      </Menu>
    </Sider>
    <Layout>
      <Header :style="{padding: '0'}" class="layout-header-bar">
        <div>
          <Breadcrumb :style="{marginLeft: '20px',float:'left'}">
            <BreadcrumbItem>
              <router-link :to="{ name: 'main'}">首页</router-link>
            </BreadcrumbItem>
            <BreadcrumbItem v-if="BreadcrumbFather">{{BreadcrumbFather}}</BreadcrumbItem>
            <BreadcrumbItem v-if="BreadcrumbSon">{{BreadcrumbSon}}</BreadcrumbItem>
          </Breadcrumb>
          <user style="float:right;margin:10px 30px 0 0" />
        </div>
      </Header>
      <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
        <!-- 路由 -->
        <router-view v-on:viewIn="changeBreadcrumbSon" v-on:viewInFather="changeBreadcrumbFather"> </router-view>
      </Content>
    </Layout>
  </Layout>


</template>

<script>
  import User from './../../components/user'
  import Cookies from 'js-cookie' //  使用Cookies
  export default {
    data() {
      return {
        BreadcrumbFather: '',
        BreadcrumbSon: '',
        open: true,
      }
    },
    name: 'index',
    created: function () {
      if (Cookies.get('power') === '1') {
        this.open = false
      }
    },
    components: {
      User
    },
    computed: {},
    methods: {
      // 改变面包屑
      changeBreadcrumbFather(value) {
        this.BreadcrumbFather = value
      },
      changeBreadcrumbSon(value) {
        this.BreadcrumbSon = value
      }
    }
  }

</script>
