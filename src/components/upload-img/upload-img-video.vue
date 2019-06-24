<template>
  <div style="font-size: 0; line-height: normal">
    <div class="demo-upload-list" v-for="item in uploadList" :key="item.url">
      <template v-if="item.status === 'finished'|| !item.status">
        <img v-if="type === 'img'" :src="item.url" alt=""/>

        <p v-if="type === 'video'">上传成功：{{item.url}}</p>

        <div class="demo-upload-list-cover">
          <!--<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>-->
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      name="file"
      v-show="uploadList.length < max"
      ref="upload"
      :show-upload-list="showuplist"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :format="format"
      :on-format-error="handleFormatError"
      type="drag"
      :action="actionImg"
      style="display: inline-block;width: 158px;">
      <div style="width: 158px;height: 58px;line-height: 58px;">
        <Icon v-if="type === 'img'" type="md-images" size="24"></Icon>
        <Icon v-if="type === 'video'" type="logo-youtube" size="24"></Icon>
      </div>
    </Upload>
  </div>
</template>

<script>
  /*当max为1时，单数据，当》1时为数组数据*/
export default {
  name: 'UploadImg',
  model: { // 默认返回数据为数组
    prop: 'images',
    event: 'uploadImage'
  },
  props: {
    images: null,
    // 上传地址
    action: {
      type: String,
      default: 'api/upload'
    },
    // 最大上传数量
    max: {
      type: Number,
      default: 1
    },
    OnSuccess: {
      type: Function,
      default: function () {}
    },
    OnRemove: {
      type: Function,
      default: function () {}
    },
    type: {
      type: String,
      default: 'img' // 默认为img，可选，img video
    }
  },
  data () {
    return {
      uploadList: [],
      actionImg: '',
      // format: [],
      // showuplist: false
    }
  },
  created () {
    this.initConfig()
  },
  mounted () {
    this.uploadList = () => {
      if (this.max === 1) {
        return [{url: this.images}]
      }
      return this.images
    }
    this.actionImg = this.$http.defaults.baseURL + this.action
  },
  watch: {
    images () {
      if (this.max === 1) {
        if (this.images){
          this.uploadList = [{url: this.images}]
        } else {
          this.uploadList = []
        }
      } else {
        this.uploadList = this.images
      }
    }
  },
  computed: {
    format () {
      if (this.type === 'video') {
        return ['wmv','avi','mpeg','mpg', 'rm','rmvb','flv', 'mp4']
      } else if (this.type === 'img') {
        return ['jpg','JPG','jpeg','JPEG','png','PNG','gif','GIF']
      }
    },
    showuplist () {
      if (this.type === 'video') {
        return true
      } else if (this.type === 'img') {
        return false
      }
    }
  },
  methods: {
    initConfig () {
      // if (this.type === 'video') {
      //   // this.format = ['wmv','avi','mpeg','mpg', 'rm','rmvb','flv', 'mp4']
      //   this.showuplist = true
      // } else if (this.type === 'img') {
      //   // this.format = ['jpg','JPG','jpeg','JPEG','png','PNG','gif','GIF']
      //   this.showuplist = false
      // }
    },
    modelImages (val) {
      if (this.max === 1) {
        this.$emit('uploadImage', (val[0] && val[0].url) || '')
      } else {
        this.$emit('uploadImage', val)
      }
    },
    handleSuccess (res, file, fileList) {
      if (!res) {
        this.$Message.error('上传失败')
        return false
      }
      this.uploadList = fileList.map(item => {
        item.url = res.Data || ''
        return item
      })
      this.modelImages(this.uploadList)
      this.OnSuccess(res, file, this.uploadList)
    },
    beforeUpload (file) {
      console.log(file)
    },
    handleRemove (file) {
      // console.log(file)
      const list = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(list.indexOf(file), 1)
      this.uploadList = this.$refs.upload.fileList
      this.modelImages(this.uploadList)
      this.OnRemove(file, this.uploadList)
    },
    handleView (file) {

    },
    handleFormatError () {
      if (this.type === 'img') {
        this.$Message.error('文件格式有误，仅支持：jpg，jpeg，png，gif图片')
      }
      if (this.type === 'video') {
        this.$Message.error('文件格式有误，仅支持：'+ ['wmv','avi','mpeg','mpg', 'rm','rmvb','flv', 'mp4'].join(',') +'视频')
      }
    }
  }
}
</script>

<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 160px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list p{
    font-size: 12px;
    color: #333;
    text-align: left;
    padding: 0 5px;
    line-height: normal;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
