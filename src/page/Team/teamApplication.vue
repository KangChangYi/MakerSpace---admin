<style scoped>
  @import "../../css/layout.css";
</style>

<template>

  <div id="app">

    <div class="application-title">
      <span> 团队审核 </span>
      <Icon type="md-person-add" />
    </div>
    <!-- mid -->
    <div class="application-table-frame">
      <Table border stripe :columns="columns7" :data="info"></Table>
    </div>

    <div class="application-paging">
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
            title: '团队名称',
            key: 'teamName',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '邮箱',
            key: 'name',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '团队负责人',
            key: 'manager',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '负责人联系电话',
            key: 'mTelephone',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '指导老师',
            key: 'teacher',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '指导老师电话',
            key: 'tTelephone',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '所属学院',
            key: 'affiliationCollege',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '创建时间',
            key: 'gmtCreate',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            width: 240,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '注册目的'), //   注册目的
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.success(params.index)
                    }
                  }
                }, '通过审核'),
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
                }, '不通过')
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
      }
    },
    name: 'teamApplication',
    components: {},
    // 初始页码和数据 
    created: function () {
      // 改变父组件面包屑
      this.$emit('viewIn', "团队")
      this.$emit('viewInFather', "审核")

      var that = this

      let config = {
        headers: {
          'X-Token': Cookies.get('token')
        },
        params: {
          limit: 10,
          page: 1
        }
      }; //添加请求头 
      this.$http.get(this.global.url + "backstage/team/check/list", config).then(response => {
        // 获取总条数
        that.totalCount = response.data.data.totalCount
        // 获取data
        that.info = response.data.data.list;
      }, response => {
        // error callback
      })

    },
    methods: {
      // 弹出框注册目的
      show(index) {
        this.$Modal.info({
          title: '<font size=4 >注册目的</font>',
          content: `注册目的：${this.info[index].purpose}`
        })
      },
      // 审核通过
      success(index) {
        var that = this
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          },
        }; //添加请求头 

        // 弹出框
        this.$Modal.confirm({
          title: '<font size=4 >确定审核通过？</font>',
          onOk: () => {
            //请求服务器      
            this.$http.post(this.global.url + "backstage/team/check", {
              teamName: that.info[index].teamName,
              name: that.info[index].name,
              manager: that.info[index].manager,
              mTelephone: that.info[index].mTelephone,
              teacher: that.info[index].teacher,
              tTelephone: that.info[index].tTelephone,
              affiliationCollege: that.info[index].affiliationCollege,
            }, config).then(response => {
              if (response.data.msg === "成功") {
                this.$Message.success("审核通过成功")
              }
            }, response => {})
            this.info.splice(index, 1);
          },
          onCancel: () => {
            this.$Message.warning('取消');
          }
        });


      },
      // 审核不通过
      remove(index) {
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          },
        }; //添加请求头 

        // 弹出框
        this.$Modal.confirm({
          title: '<font size=4 >该团队不通过审核？</font>',
          onOk: () => {
            //请求服务器
            this.$http.delete(this.global.url + "backstage/team/check/delete/" + this.info[index].pkId, config).then(
              response => {
                if (response.data.msg === "成功") {
                  this.$Message.success("审核通过成功")
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
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          },
          params: {
            limit: 10,
            page: this.page
          }
        }; //添加请求头 
        this.$http.get(this.global.url + "check/team/list", config).then(response => {
          this.info = response.data.data.list;
        }, response => {})
      }
    }
  }

</script>
