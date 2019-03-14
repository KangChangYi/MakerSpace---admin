<style scoped>
  .info-left {
    height: fit-content;
    width: fit-content;
  }

  .wrapper {
    width: 400px;
    height: 300px;
  }

  .test-button {
    display: flex; 
    flex-direction: column; 
  }

  .out-file {
    height: 35px;
    width: 250px;
    float: left;
    cursor: pointer;
    text-align: center;
    margin: 10px 10px 10px 0;
    font-size: 14px;
    color: white;
    line-height: 30px;
    border: 1px solid #DFDFDF;
    border-radius: 5px;
    background: rgb(46, 177, 89);
    transition: all 0.3s;
  }

  .out-file:hover {
    border: 1px rgb(31, 183, 230) solid;
    background: rgb(61, 196, 106);
  }
</style>

<template>

  <div class="info-left">

    <div class="test-button">

      <label class="out-file" for="file1">选择图片</label>
      <input type="file" id="file1" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)">

      <div class="wrapper" v-if="Croppershow">
        <vueCropper ref="cropper" :img="example3.img" :autoCrop="example3.autoCrop" :autoCropWidth="example3.autoCropWidth"
          :autoCropHeight="example3.autoCropHeight" :fixedBox="example3.fixedBox" :canMove="example3.canMove"></vueCropper>
      </div>

      <div v-if="Croppershow" class="out-file" style="width:100px;background:rgb(255, 153, 0)" @click="takeimginfo">确定截取
      </div>

    </div>

  </div>

</template>

<script>
  import Cookies from 'js-cookie' //  使用Cookies
  import vueCropper from 'vue-cropper'
  export default {
    props: {
      width: Number,
      height: Number,
      imgtype: String,
    },
    name: 'Cropper',
    data() {
      return {
        Croppershow: false,
        // previews: {},
        example3: {
          img: '',
          autoCrop: true,
          autoCropWidth: this.width,
          autoCropHeight: this.height,
          fixedBox: true,
          centerBox: true,
        }
      }
    },
    methods: {
      // 截图完成
      takeimginfo() {
        // 获取截图信息Blob  or Data
        if (this.imgtype === "Blob") {
          this.$refs.cropper.getCropBlob((data) => {
            this.$emit('datafromChild', data)
          })
        } else if (this.imgtype === "Base") {
          this.$refs.cropper.getCropData((data) => {
            this.$emit('datafromChild', data)
          })
        }

        // let param = new FormData();             //创建form对象
        // param.append('image', data, '1.jpg');           //通过append向form对象添加数据
        // console.log(param.get('image'));      //FormData私有类对象，访问不到，可以通过get判断值是否传进去

        // this.$emit('datafromChild', param.get('image'))


      },
      //上传图片
      uploadImg(e, num) {
        // this.example3.img    设置默认图片
        var file = e.target.files[0] // 获取input file中的第一个文件属性
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.example3.img = data
        }
        // 显示截图层
        this.Croppershow = true;
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      }
    },
    components: {
      vueCropper
    },
  }

</script>
