<style scoped>
  @import "../../css/layout.css";
</style>

<template>
  <!--  作品管理表 -->

  <div id="app">
    <div class="application-title">
      <span>作品管理</span>
      <Icon type="md-document" />
    </div>

    <div class="application-search">
      <!--   搜索和筛选部分 -->
      <Input suffix="ios-search" placeholder="作品名" v-model="worksname" style="width:200px" />
      <!-- <Input suffix="ios-search" placeholder="团队名" v-model="teamname" style="width: auto" /> -->
      <Select v-model="type" placeholder="类别" clearable style="width:200px">
        <Option v-for="item in List" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" @click="search" shape="circle" icon="ios-search"></Button>
      <!--   搜索和筛选部分 -->
    </div>

    <div class="application-table-frame">
      <Table border stripe :columns="columns7" :data="info"></Table>
    </div>

    <div  class="application-paging">
      <page :total="this.totalCount" :page-size="10" show-elevator @on-change="changePage" />
    </div>

  </div>
</template>

<script>
  import Cookies from 'js-cookie' //  使用Cookies
  export default {
    data() {
      return {
        columns7: [{
            title: '作品名称',
            key: 'name',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '技术类别',
            key: 'typeTechnology',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '行业类别',
            key: 'typeIndustry',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '所属团队',
            key: 'teamName',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '使用工具及技术',
            key: 'environment',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width:150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '详细'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            },
          }
        ],
        // 总条数
        totalCount: 0,
        // 返回数组
        info: [],
        // 当前页数
        page: 1,
        // 搜索
        worksname: '',
        type: '',

        List: [{
            value: '移动开发',
            label: '移动开发'
          },
          {
            value: '网站开发',
            label: '网站开发'
          },
          {
            value: 'PC开发',
            label: 'PC开发'
          },
          {
            value: '大数据',
            label: '大数据'
          },
          {
            value: '云计算',
            label: '云计算'
          },
          {
            value: '人工智能',
            label: '人工智能'
          },
          {
            value: '区块链',
            label: '区块链'
          },
          {
            value: 'VR/AR',
            label: 'VR/AR'
          },
          {
            value: '教育',
            label: '教育'
          },
          {
            value: '电子商务',
            label: '电子商务'
          },
          {
            value: '食品',
            label: '食品'
          },
          {
            value: '服装',
            label: '服装'
          }
        ],
        teamId: '',
      }
    },
    name: 'worksManage',
    components: {},
    // 载入事件
    created: function () {
      // 改变父组件面包屑
      this.$emit('viewIn',"作品")
      this.$emit('viewInFather',"管理")

      // if (Cookies.get("power") === '1') {
      //   this.$http.get(this.global.url + "work/list", { params: { limit: 10, page: 1, teamName: Cookies.get("teamName") } }).then(response => {
      //     console.log(response.data);
      //     // 获取总条数
      //     this.totalCount = response.data.data.totalCount
      //     console.log(this.totalCount);
      //     this.info = response.data.data.list;
      //     console.log(this.info);
      //   }, response => { })
      // } else {
      this.$http.get(this.global.url + "work/list", {
        params: {
          limit: 10,
          page: 1
        }
      }).then(response => {
        // 获取总条数
        this.totalCount = response.data.data.totalCount
        this.info = response.data.data.list;
      }, response => {})
      // }
    },
    methods: {
      // 搜索事件
      search() {
        var that = this
        if (that.worksname !== '' || that.type !== undefined) { //按查询内容搜索
          // 服务器请求
          this.$http.get(this.global.url + "work/list", {
            params: {
              limit: 10,
              page: 1,
              name: that.worksname,
              type: that.type,
              // teamName: Cookies.get("teamName")
            }
          }).then(response => {
            if (response.data.data === null) {
              this.info = '';
            } else {
              // 获取总条数
              this.totalCount = response.data.data.totalCount
              // 获取data
              this.info = response.data.data.list;
            }
          }, err => {})
        } else { //搜索全部
          this.$http.get(this.global.url + "work/list", {
            params: {
              limit: 10,
              page: 1
            }
          }).then(response => {
            // 获取总条数
            this.totalCount = response.data.data.totalCount
            // 获取data
            this.info = response.data.data.list;
          }, err => {})

        }
      },
      // 弹出框
      show(index) {
        this.$Modal.info({
          title: '<font size=4 >详细信息</font>',
          content: `作品简述：${this.info[index].profile}` //<br>展示图片：${this.info[index].showPic}
        })
      },
      remove(index) {
        var that = this
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          }
        }; //添加请求头 

        // 弹出确认框
        this.$Modal.confirm({
          title:'<font size=4 >确定删除？</font>',
          onOk: () => {
            //请求服务器
            this.$http.delete(this.global.url + "backstage/work/delete/" + that.info[index].pkId, config).then(
              response => {
                if (response.data.msg === "成功") {
                  this.$Message.success("删除成功")
                }
                if (response.data.msg === "错误的参数") {
                  this.$Message.warning("删除失败")
                }
              }, response => {})
            this.info.splice(index, 1);
          },
          onCancel: () => {
            this.$Message.warning('取消');
          }
        });
      },
      // 切换页码
      changePage(page) {
        this.page = page;
        if (Cookies.get("power") === '1') {
          this.$http.get(this.global.url + "work/list", {
            params: {
              limit: 10,
              page: this.page,
              teamName: Cookies.get("teamName")
            }
          }).then(response => {
            this.info = response.data.data.list;
          }, response => {})
        } else {
          this.$http.get(this.global.url + "work/list", {
            params: {
              limit: 10,
              page: this.page
            }
          }).then(response => {
            this.info = response.data.data.list;
          }, response => {})
        }
      }
    }

  }

</script>
