<template>
  <div style="font-size: 0; line-height: normal">
    <div class="demo-upload-list" v-for="item in uploadList" :key="item.url">
      <template v-if="item.status === 'finished'|| !item.status">
        <img :src="item.url" alt=""/>
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
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg','JPG','jpeg','JPEG','png','PNG','gif','GIF']"
      :on-format-error="handleFormatError"
      type="drag"
      :action="actionImg"
      style="display: inline-block;width: 158px;">
      <div style="width: 158px;height: 58px;line-height: 58px;">
        <Icon type="md-images" size="24"></Icon>
      </div>
    </Upload>
  </div>
</template>

<script>
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
    }
  },
  data () {
    return {
      uploadList: [],
      actionImg: ''
    }
  },
  mounted () {
    this.uploadList = this.images
    this.actionImg = this.$http.defaults.baseURL + this.action
  },
  watch: {
    images () {
      this.uploadList = this.images
    }
  },
  methods: {
    modelImages (val) {
      this.$emit('uploadImage', val)
    },
    handleSuccess (res, file, fileList) {
      if (!res) {
        this.$Message.error('上传失败')
        return false
      }
      this.uploadList = fileList.map(item => {
        item.url = res.data || ''
        return item
      })
      this.modelImages(this.uploadList)
      this.OnSuccess(res, file, this.uploadList)
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
      this.$Message.error('文件格式有误，仅支持：jpg，jpeg，png，gif图片')
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
