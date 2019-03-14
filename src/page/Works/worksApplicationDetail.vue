<style scoped>
  @import "../../css/layout.css";
  .form-frame {
    margin-bottom: 25px;
  }

  .out-frame {
    float: left;
    height: 100%;
    width: 300px;
  }

  .button-frame {
    float: left;
    padding-top: 40px;
    width: 100%;
    display: flex;
  }

  .input {
    width: 250px;
    /* pointer-events: none; */
  }

</style>

<template>
  <!--  作品管理表 -->

  <div id="app">

    <div style="display: flex">
      <!-- mid -->

      <div class="page-mid-form-frame">

        <div class="form-frame">
          <div class="form-title">作品名称</div>
          <Input v-model="worksdetail.name" readonly="readonly" class="input" />
        </div>

        <div class="form-frame">
          <div class="form-title">工具及技术</div>
          <Input v-model="worksdetail.environment" readonly="readonly" class="input" value="123123" />
        </div>


        <div class="form-frame">
          <div class="form-title">技术类别</div>
          <Input v-model="worksdetail.typeTechnology" class="input" readonly="readonly" />
        </div>

        <div class="form-frame">
          <div class="form-title">行业类别</div>
          <Input v-model="worksdetail.typeIndustry" class="input" readonly="readonly" />
        </div>

        <div class="form-frame">
          <div class="form-title">所属团队</div>
          <Input v-model="worksdetail.teamName" class="input" readonly="readonly" />
        </div>

        <div class="form-frame">
          <div class="form-title">作品简述</div>
          <Input v-model="worksdetail.profile" type="textarea" :autosize="{minRows: 5,maxRows: 5}" class="input"
            readonly="readonly" />
        </div>

        <div class="form-frame">
          <div class="form-title">作品封面图片</div>
          <img :src="base64" style="width:290px;height:210px;" />
        </div>

        <Button style="font-size:14px;width:250px;margin-left:90px;" @click="back" type="info" long>返回</Button>

      </div>


      <div class="page-mid-markdown-frame">

        <div style="margin-bottom:10px">作品详细介绍(点击编辑器文本区域按F10全屏): </div>
        <!-- markdown -->
        <mavon-editor  style="min-height: 450px;" v-model="workintrodection" ref=md />
        <!-- @imgDel="$imgDel" -->

      </div>

    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie' //  使用Cookies
  export default {
    data() {
      return {
        worksdetail: [],
        // 显示图片base64
        base64: '',
        // 绑定信息
        pkId: '',
        // 作品介绍
        workintrodection: '',

      }
    },
    name: 'worksApplicationDetail',
    components: {},
    created() {
      // 改变父组件面包屑
      this.$emit('viewIn', "作品审核详细页")
      this.$emit('viewInFather', "审核")

      var that = this
      that.pkId = that.$route.params.pkId
      that.$http.get(this.global.url + "work/list/" + that.pkId).then(res => {
        that.worksdetail = res.data.data
        that.workintrodection = that.worksdetail.workContext.context
      }, err => {})
      that.base64 = that.$route.params.showPic
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }

</script>
