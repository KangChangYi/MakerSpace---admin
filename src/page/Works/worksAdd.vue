<style scoped>
  @import "../../css/layout.css";
</style>

<template>

  <div id="app">

    <div style="display: flex">
      <!-- mid -->
      <div class="page-mid-form-frame">

        <div class="form-frame">
          <div class="form-title">作品名称</div>
          <Input v-model="workname" placeholder="输入作品名称" style="width: 250px" />
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
          <div class="form-title">工具及技术</div>
          <Input v-model="environment" placeholder="输入使用工具及技术" style="width: 250px" />
        </div>

        <div class="form-frame">
          <div class="form-title">作品简述</div>
          <Input v-model="introduction" :maxlength="150" type="textarea" :autosize="{minRows: 5,maxRows: 7}"
            placeholder="输入作品简述(150个字以内)" style="width: 250px" />
        </div>

        <div class="form-frame">
          <div class="form-title">作品封面</div>
          <Cropper @datafromChild="datafromChild" :width="width" :height="height" :imgtype="imgtype"></Cropper>
        </div>

        <Button style="font-size:14px;width:250px;margin-left:90px;" type="success" @click="submit">提交审核</Button>

      </div>

      <div class="page-mid-markdown-frame">

        <div style="margin-bottom:10px">作品详细介绍(点击编辑器文本区域按F10全屏) </div>
        <!-- markdown -->
        <mavon-editor style="min-height: 450px;" v-model="workintrodection" ref=md @imgAdd="$imgAdd" />
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
        // 技术类别
        technicalType: '',
        // 行业类别 
        industryType: '',
        List: [],
        List2: [],
        teamworks: [],
        info: {},
        // 选中作品的id
        selectid: '',
      }
    },
    name: 'worksAdd',
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
      that.$emit('viewIn', "")
      that.$emit('viewInFather', "作品添加")
    },
    methods: {
      datafromChild(data) {
        this.params = data
      },
      submit() {
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
        if (that.params === "") {
          this.$Message.warning("请选择封面展示图片");
          return 0;
        }
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
        //请求服务器
        that.$http.post(this.global.url + "backstage/work/insert", {
            showPic: that.params,
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
              this.$Message.success("提交审核成功")
            }
            if (response.data.msg === "错误的参数") {
              this.$Message.warning("提交审核失败")
            }
          }, response => {}),
          that.workname = '',
          that.environment = '',
          that.technicalType = '',
          that.industryType = '',
          that.introduction = '',
          that.workintrodection = ''
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
