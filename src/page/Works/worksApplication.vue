<style scoped>
  @import "../../css/layout.css";
</style>

<template>
  <!--  团队管理表 -->

  <div id="app">

    <div class="application-title">
      <span>作品审核</span>
      <Icon type="md-document" />
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
            title: '作品名称',
            key: 'name',
            tooltip: 'true',
            align: 'center',
          },
          {
            title: '技术类别',
            key: 'typeTechnology',
            align: 'center',
            tooltip: 'true',
          },
          {
            title: '行业类别',
            key: 'typeIndustry',
            align: 'center',
            tooltip: 'true',
          },
          {
            title: '工具及技术',
            key: 'environment',
            align: 'center',
            tooltip: 'true',
          },
          {
            title: '所属团队',
            key: 'teamName',
            align: 'center',
            tooltip: 'true',
          },
          {
            title: '点击量',
            key: 'hits',
            align: 'center',
            tooltip: 'true',
          },
          {
            title: '申请时间',
            key: 'gmtCreate',
            align: 'center',
            tooltip: 'true',
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
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看详细'), //  查看详细
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
        // 作品介绍
        workContext: {},
      }
    },
    name: 'worksApplication',
    components: {},
    // 初始页码和数据
    created: function () {
      // 改变父组件面包屑
      this.$emit('viewIn', "作品")
      this.$emit('viewInFather', "审核")

      let config = {
        headers: {
          'X-Token': Cookies.get('token')
        },
        params: {
          limit: 10,
          page: 1
        },
        // emulateJSON: true,
        // withCredentials: true
      }; //添加请求头 
      //请求服务器
      this.$http.get(this.global.url + "backstage/work/check/list", config).then(response => {
        // 获取总条数
        this.totalCount = response.data.data.totalCount
        // 获取data
        this.info = response.data.data.list;
      }, response => {})
    },
    methods: {
      // 跳转至详细界面
      show(index) {
        this.$router.push({
          name: 'worksApplicationDetail',
          params: {
            pkId: this.info[index].pkId,
            // name: this.info[index].name,
            // environment: this.info[index].environment,
            // profile: this.info[index].profile,
            showPic: this.info[index].showPic,
            // type: this.info[index].type,
            // context: this.workContext,
            // teamName: this.info[index].teamName,
          }
        })
      },
      // 作品审核通过
      success(index) {
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          }
        }; //添加请求头 
        // 弹出框
        this.$Modal.confirm({
          title: '<font size=4 >确定审核通过？</font>',
          onOk: () => {
            //请求服务器      
            this.$http.patch(this.global.url + "backstage/work/check/" + this.info[index].pkId + "?passCode=1", {},
              config).then(response => {
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
      // 作品审核删除
      remove(index) {
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          },
        }; //添加请求头 

        // 弹出框
        this.$Modal.confirm({
          title: '<font size=4 >该作品不通过审核？</font>',
          onOk: () => {
            //请求服务器
            this.$http.patch(this.global.url + "backstage/work/check/" + this.info[index].pkId + "?passCode=0", {},
              config).then(response => {
              if (response.data.msg === "成功") {
                this.$Message.success("审核不通过")
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
        this.$http.get(this.global.url + "backstage/work/check/list", {
          params: {
            limit: 10,
            page: this.page
          }
        }).then(response => {
          // 获取总条数
          this.totalCount = response.data.data.totalCount
          // 获取data
          this.info = response.data.data.list;
        }, response => {})
      }
    }
  }

</script>
