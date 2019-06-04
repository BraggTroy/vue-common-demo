<template>
  <div class="banner-box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="b in bannerList" :key="b.ID" class="swiper-slide">

          <a v-if="b.Link && b.Link !== ''" :href="b.Link" class="banner-item">
            <div class="img-cover"></div>
            <img :src="b.ImgUrl" :alt="b.Title">
          </a>

          <div v-else class="banner-item">
            <div class="img-cover"></div>
            <img :src="b.ImgUrl" :alt="b.Title">
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    data () {
      return {
        bannerList: [
          {ID: 1, className: 'active', ImgUrl: '/static/img/test-img.jpg', Title: '今天天气真好啊，快来看看吧', Link: ''},
          {ID: 2, className: 'next', ImgUrl: '/static/img/test-img22.jpg', Link: 'https://www.csdn.net'},
          {ID: 3, className: '', ImgUrl: '/static/img/test-img333.jpg', Link: 'https://www.baidu.com'},
        ],
      }
    },
    mounted () {
      var mySwiper = new Swiper('.swiper-container', {
//        autoplay: true,//可选选项，自动滑动
//        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
      })
    },
    methods: {}
  }
</script>

<style>
  .banner-box{
    padding: 0 40px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }
  .swiper-container{
    height: 150px;
    width: 100%;
    padding-bottom: 20px;
    position: relative;
    overflow: visible;
  }
  .banner-item{
    display: block;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    box-shadow: 0 6px 8px 0 #dadada;
    transition: transform 0.65s;
    transform: scale(0.8);
  }
  .swiper-slide.swiper-slide-active .banner-item{
    transform: scale(1);
  }
  .banner-item .img-cover{
    position: absolute;
    z-index: 2;
    left: 0; top: 0; right: 0; bottom: 0;
  }
  .banner-item img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 5px;
  }
  /*点点*/
  .swiper-pagination{
    bottom: 0!important;
  }
  .swiper-pagination-bullet{
    transition: all 0.3s;
  }
  .swiper-pagination-bullet-active{
    background: #00cf00;
    width: 14px;
    border-radius: 5px;
  }
</style>
