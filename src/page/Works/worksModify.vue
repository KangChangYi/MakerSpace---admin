<style scoped>
  @import "../../css/layout.css";
</style>

<template>
  <div id="app">
    <div style="display: flex">
      <!-- mid -->
      <div class="page-mid-form-frame">

        <div class="form-frame">
          <div class="form-title">选择作品</div>
          <Select v-model="selectwork" style="width:250px" @on-change="workchange">
            <Option v-for="item in teamworks" :value="item.name" :key="item.pkId">{{ item.name }}</Option>
          </Select>
        </div>

        <div class="form-frame">
          <div class="form-title">作品名称</div>
          <Input v-model="workname" placeholder="输入作品名称" style="width: 250px" />
        </div>

        <div class="form-frame">
          <div class="form-title">工具及技术</div>
          <Input v-model="environment" placeholder="输入使用工具及技术" style="width: 250px" />
        </div>


        <div class="form-frame">
          <div class="form-title">技术类别</div>
          <Select v-model="technicalType" clearable style="width:250px">
            <Option v-for="item in List" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>


        <div class="form-frame">
          <div class="form-title">行业类别</div>
          <Select v-model="industryType" clearable style="width:250px">
            <Option v-for="item in List2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>


        <div class="form-frame">
          <div class="form-title">作品简述</div>
          <Input v-model="introduction" :maxlength=150 type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="输入作品简述(150个字以内)"
            style="width: 250px" />
        </div>

        <div class="form-frame" v-if="base64">
          <div class="form-title">作品封面图片</div>
          <img :src="base64" style="width:290px;height:210px;" />
        </div>

        <div class="form-frame">
          <div class="form-title">作品封面</div>
          <Cropper @datafromChild="datafromChild" :width="width" :height="height" :imgtype="imgtype"></Cropper>
        </div>

        <Button style="font-size:14px;width:250px;margin:0 0 30px 90px;" type="warning" @click="changeworksinfo" long>修改</Button>
        <Button style="font-size:14px;width:250px;margin-left:90px;" type="error" @click="remove" long>删除</Button>

      </div>

      <div class="page-mid-markdown-frame">

        <div style="margin-bottom:10px">作品详细介绍(点击编辑器文本区域按F10全屏) </div>
        <!-- markdown -->
        <mavon-editor v-model="workintrodection" style="min-height: 450px" ref=md @imgAdd="$imgAdd" />
        <!-- @imgDel="$imgDel" -->

      </div>

    </div>

  </div>
</template>

<script>
  import Cropper from '@/components/Cropper'
  import Cookies from 'js-cookie' //  使用Cookies
  export default {
    data() {
      return {
        // 截图子组件传值
        width: 345,
        height: 250,
        imgtype: "Base",
        params: '',
        // 显示图片base64
        base64: '',
        // 绑定信息
        selectwork: '',
        workname: '',
        environment: '',
        // 作品简介
        introduction: '',
        // 作品介绍
        workintrodection: '',
        // 所属团队
        affiliateTeam: '',
        //类别
        technicalType: '',
        industryType: '',
        // 类别数组
        List: [],
        List2: [],
        teamworks: [],
        info: {},
        // 选中作品的id
        selectid: '',
        var: '',
      }
    },
    name: 'worksModify',
    components: {
      Cropper
    },
    created() {
      var that = this;
      // 获取作品类别 type
      that.$http.get(that.global.url + "type").then(res => {
        let WorkType = res.data.data;
        for (let x of WorkType) {
          if (x.group === "技术类") {
            that.List.push({
              value: x.name,
              label: x.name
            })
          }
          if (x.group === "行业类") {
            that.List2.push({
              value: x.name,
              label: x.name
            })
          }
        }
      }, err => {})
      // 修改父组件面包屑
      this.$emit('viewInFather', "作品修改")
      this.$emit('viewIn', "")

      this.$http.get(this.global.url + "work/list/team/" + Cookies.get('teamId')).then(response => {
        that.teamworks = response.data.data
        // that.api = " backstage/work/image?workId=" + that.teamworks.pkId
      }, response => {})
    },
    methods: {
      // 截图子组件传值
      datafromChild(data) {
        this.params = data
      },
      // 改变选中的作品时读出数据
      workchange() {
        var that = this
        for (var i = 0; i < that.teamworks.length; i++) {
          if (that.teamworks[i].name === that.selectwork) {
            that.selectid = that.teamworks[i].pkId
          }
        }
        this.$http.get(this.global.url + "work/list/" + that.selectid).then(response => {
          that.workintrodection = response.data.data.workContext.context
          that.info = response.data.data
          //  绑定数据 
          that.workname = that.info.name;
          that.environment = that.info.environment;
          that.technicalType = that.info.typeTechnology;
          that.industryType = that.info.typeIndustry;
          that.introduction = that.info.profile;
        }, response => {})

        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          }
        }; //添加请求头 

        this.$http.get(this.global.url + "backstage/work/getImage/" + that.selectid, config).then(response => {
          that.base64 = response.data.data
        }, response => {})

      },
      // 修改作品信息
      changeworksinfo() {
        var that = this
        if (that.workname === "") {
          this.$Message.warning("请输入作品名");
          return 0;
        }
        if (that.technicalType === "") {
          this.$Message.warning("请选择技术类型");
          return 0;
        }
        if (that.industryType === "") {
          this.$Message.warning("请选择行业类型");
          return 0;
        }
        if (that.environment === "") {
          this.$Message.warning("使用工具及技术");
          return 0;
        }
        // if (that.params === "") { this.$Message.warning("请选择封面展示图片"); return 0; } 
        if (that.introduction === "") {
          this.$Message.warning("请输入作品简介");
          return 0;
        }
        if (that.workintrodection === "") {
          this.$Message.warning("请输入作品详细介绍");
          return 0;
        }

        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          }
        }; //添加请求头 

        that.$http.put(this.global.url + "backstage/work/update/" + that.selectid, {
          name: that.workname,
          environment: that.environment,
          typeTechnology: that.technicalType,
          typeIndustry: that.industryType,
          profile: that.introduction,
          workContext: {
            context: that.workintrodection
          }
        }, config).then(response => {
          if (response.data.msg === "成功") {
            this.$Message.success("修改成功")
          }
          if (response.data.msg === "错误的参数") {
            this.$Message.warning("修改失败")
          }
        }, response => {})

        this.$http.post(this.global.url + "backstage/work/image", {
          pkId: that.selectid,
          showPic: that.params
        }, config).then(response => {
          if (response.data.msg === "上传成功") {
            this.$Message.success("上传封面图片成功")
          }
        }, response => {})
        this.$router.push({
          name: 'index'
        })
      },
      //删除作品
      remove() {
        var that = this
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          }
        }; //添加请求头 

        // 弹出框
        this.$Modal.confirm({
          content: '<font size=5 >确定删除？</font>',
          onOk: () => {
            //请求服务器
            this.$http.delete(this.global.url + "backstage/work/delete/" + that.info.pkId, config).then(
              response => {
                if (response.data.msg === "成功") {
                  this.$Message.success("删除成功")
                  this.$router.push({
                    name: 'index'
                  })
                }
                if (response.data.msg === "错误的参数") {
                  this.$Message.warning("删除失败")
                }
              }, err => {})
          },
          onCancel: () => {
            this.$Message.warning('取消');
          }
        });
      },

      // markdown插入图片
      $imgAdd(pos, $file) {
        var that = this
        // 第一步.将图片上传到服务器 base64格式
        var reader = new FileReader();
        reader.onload = (e) => {
          that.image = e.target.result
          // console.log(that.image) // console.log(reader.result);  //或者 e.target.result都是一样的，都是base64码
        }
        reader.readAsDataURL($file)

        setTimeout(() => {
          // 修改图片请求
          let config = {
            headers: {
              'X-Token': Cookies.get('token')
            }
          }; //添加请求头
          that.$http.post(that.global.url + "backstage/work/upload", {
            image: that.image
          }, config).then(res => {
            if (res.data.msg === "上传成功") {
              that.$Message.success("图片插入成功")
            }
            that.url = res.data.url
            this.$refs.md.$img2Url(pos, that.url);
          }, err => {})
        }, 1000);

      }

    }
  }

</script>
