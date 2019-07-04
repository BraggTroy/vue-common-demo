<template>
<div>
  <vue-core-image-upload
    inputOfFile="file"
    :class="['btn', 'btn-primary']"
    :crop="true"
    @imageuploaded="imageuploaded"
    :max-file-size="5242880"
    url="/api/upload" >
  </vue-core-image-upload>
</div>
</template>

<script>
  /*参考地址：（裁剪未生效） http://www.wheelsfactory.cn/#/detail?id=19*/
  import VueCoreImageUpload  from 'vue-core-image-upload';
  export default {
    name: '',
    components: {VueCoreImageUpload},
    data () {
      return {
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',

      }
    },
    computed: {
      uploadPath () {
        return this.$http.defaults.baseURL + '/api/upload'
      }
    },
    mounted () {
    },
    methods: {
      imageuploaded (res) {
        console.log(res)
      }
    }
  }
</script>

<style scoped>

</style>
