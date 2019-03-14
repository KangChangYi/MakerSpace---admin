<style scoped>
  @import "../../css/layout.css";
</style>

<template>
  <div id="app">

    <div style="display: flex">
      <!-- mid -->
      <div class="page-mid-form-frame">

        <div class="form-frame">
          <div class="form-title">团队名称</div>
          <Input placeholder="输入团队名称" style="width: 250px" v-model="teamname" />
        </div>

        <div class="form-frame">
          <div class="form-title">所属学院</div>
          <Select style="width:250px" v-model="collect">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

        <div class="form-frame">
          <div class="form-title">团队负责人</div>
          <Input placeholder="输入团队负责人" style="width: 250px" v-model="teammana" />
        </div>


        <div class="form-frame">
          <div class="form-title">负责人Tel</div>
          <Input placeholder="输入负责人联系电话" style="width: 250px" v-model="manaphone" />
        </div>

        <div class="form-frame">
          <div class="form-title">指导老师</div>
          <Input placeholder="输入指导老师" style="width: 250px" v-model="teacher" />
        </div>

        <div class="form-frame">
          <div class="form-title">指导老师Tel</div>
          <Input placeholder="输入指导老师联系电话" style="width: 250px" v-model="teacherphone" />
        </div>

        <div class="form-frame">
          <div class="form-title">团队成员<br>(逗号分割)</div>
          <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="输入团队成员" style="width: 250px" v-model="menber" />
        </div>

        <div class="form-frame">
          <div class="form-title">团队封面上传:</div>
          <Cropper @datafromChild="datafromChild" :width="width" :height="height" :imgtype="imgtype"></Cropper>
        </div>


        <div class="form-frame">
          <div class="form-title">团队封面图片:</div>
          <img :src="base64" style="width:290px;height:180px;" />
        </div>

        <Button style="font-size:14px;width:250px;margin:30px 0 0 90px;" type="warning" @click="change" long>修改</Button>
        
      </div>

      <div class="page-mid-markdown-frame">

        <div style="margin-bottom:10px">团队介绍编辑(点击编辑器文本区域按F10全屏): </div>
        <!-- markdown -->
        <mavon-editor style="min-height: 450px" v-model="teamintrodece" ref=md @imgAdd="$imgAdd" />
        <!-- @imgDel="$imgDel" -->

      </div>
    </div>

  </div>
</template>

<script>
  import Cookies from 'js-cookie' //  使用Cookies
  import Cropper from '@/components/Cropper'
  export default {
    data() {
      return {
        // 截图子组件传值
        width: 300,
        height: 180,
        imgtype: "Blob",
        params: {},
        // 显示图片base64
        base64: '',
        image: '',
        url: '',
        // 绑定数据
        pkId: '',
        teamname: '',
        teammana: '',
        manaphone: '',
        teacher: '',
        teacherphone: '',
        collect: '',
        menber: '',
        showpic: '',
        teamintrodece: '',
        cityList: [{
            value: '机械与电气工程学院',
            label: '机械与电气工程学院'
          },
          {
            value: '土木工程学院',
            label: '土木工程学院'
          },
          {
            value: '化学化工学院',
            label: '化学化工学院'
          },
          {
            value: '纺织服装学院',
            label: '纺织服装学院'
          },
          {
            value: '美术学院',
            label: '美术学院'
          },
          {
            value: '商学院',
            label: '商学院'
          }
        ],
      }
    },
    name: 'teamInfo',
    info: [],
    components: {
      Cropper
    },
    created() {
      // 修改父组件面包屑
      this.$emit('viewInFather',"团队资料")
      this.$emit('viewIn',"")
      
      var that = this
      that.$http.get(this.global.url + "team/list/" + Cookies.set("teamId")).then(response => {
        that.info = response.data.data
        // 绑定数据
        that.teamname = that.info.teamName;
        that.teammana = that.info.manager;
        that.manaphone = that.info.mTelephone;
        that.teacher = that.info.teacher;
        that.teacherphone = that.info.tTelephone;
        that.collect = that.info.affiliationCollege;
        that.menber = that.info.member; // that.showpic = that.info.coverPic;
        that.pkId = that.info.pkId;
        that.teamintrodece = response.data.data.teamIntroduction.introduction;
        that.teamintrodece = "1";
      }, response => {})

      // 显示团队封面图片
      let config = {
        headers: {
          'X-Token': Cookies.get('token')
        }
      }; //添加请求头
      that.$http.get(this.global.url + "backstage/team/getImage", config).then(response => {
        that.base64 = response.data.data
      }, response => {})

    },
    methods: {
      datafromChild(data) {
        this.params = data
      },
      // 修改团队信息
      change() {
        var that = this
        if (that.teamname === "") {
          this.$Message.warning("请输入团队名称");
          return 0;
        }
        if (that.teammana === "") {
          this.$Message.warning("请输入负责人姓名");
          return 0;
        }
        if (that.manaphone === "") {
          this.$Message.warning("请输入负责人电话");
          return 0;
        }
        if (that.collect === "") {
          this.$Message.warning("请选择学院");
          return 0;
        }

        // 修改图片请求
        let config = {
          headers: {
            'X-Token': Cookies.get('token')
          }
        }; //添加请求头

        let param = new FormData(); //创建form对象
        param.append('image', that.params, '1.jpg'); //通过append向form对象添加数据
        // console.log(param.get('image')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去

        this.$http.post(this.global.url + "backstage/team/image", param, config).then(response => {
          if (response.data.msg === "上传成功") {
            this.$Message.success("上传封面图片成功")
          }
        }, err => {})

        // 修改数据请求
        that.$http.put(this.global.url + "backstage/team/update", {
          teamName: that.teamname,
          manager: that.teammana,
          mTelephone: that.manaphone,
          teacher: that.teacher,
          tTelephone: that.teacherphone,
          affiliationCollege: that.collect,
          member: that.menber,
          teamIntroduction: {
            pkId: Cookies.set("teamId"),
            introduction: that.teamintrodece,
          }
        }, config).then(response => {
          if (response.data.msg === "成功") {
            this.$Message.success("修改成功")
          }
          if (response.data.msg === "错误的参数") {
            this.$Message.warning("修改失败")
          }
        }, response => {})
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

      },

    }
  }

</script>
