<template>
  <div>
    <div class="banner-box">
      <!--banners-->
      <div class="inner">
        <div v-for="b in bannerList" :key="b.ID" class="b-wrap" :class="b.className">

          <a v-if="b.Link && b.Link !== ''" :href="b.Link" class="b-link">
            <div class="img-cover"></div>
            <img :src="b.ImgUrl" :alt="b.Title">
          </a>

          <div v-else>
            <div class="img-cover"></div>
            <img :src="b.ImgUrl" :alt="b.Title">
          </div>
        </div>

      </div>

      <!--点-->
      <div class="dots-wrap">
        <div class="dot active"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

    <p>{{touchData.start}}</p>
    <p>{{touchData.end}}</p>
    <p>{{touchData.move}}</p>
    <p>{{pageWidth}}</p>

  </div>
</template>

<script>
  export default {
    name: 'Banners',
    data () {
      return {
          bannerList: [
            {ID: 1, className: 'active', ImgUrl: '/static/img/test-img.jpg', Title: '今天天气真好啊，快来看看吧', Link: ''},
            {ID: 2, className: 'next', ImgUrl: '/static/img/test-img22.jpg', Link: 'https://www.csdn.net'},
            {ID: 3, className: '', ImgUrl: '/static/img/test-img333.jpg', Link: 'https://www.baidu.com'},
          ],
        touchData: {
          start: { x: 0, y: 0},
          end: {x: 0, y: 0},
          move: {x: 0, y: 0}
        },
        pageWidth: 0,
        speed: 0,
        width: 0,
      }
    },
    mounted () {
        // 计算初始值
      this.pageWidth = window.screen.width




      // 事件监听
      let this_ = this
      let dom = document.querySelector('.banner-box .inner')
      dom.addEventListener('touchstart', function (e) {
        this_.touchData.start.x = parseInt(e.changedTouches[0].pageX);
        this_.touchData.start.y  = parseInt(e.changedTouches[0].pageY);
      })
      dom.addEventListener('touchend', function (e) {
        this_.touchData.end.x = parseInt(e.changedTouches[0].pageX);
        this_.touchData.end.y  = parseInt(e.changedTouches[0].pageY);
      })
      dom.addEventListener('touchmove', function (e) {
        this_.touchData.move.x = parseInt(e.changedTouches[0].pageX);
        this_.touchData.move.y  = parseInt(e.changedTouches[0].pageY);
      })
    },
    methods: {
      slide () {

      },
      // 向左滑
      slideLeft () {

      },
      // 向右滑
      slideRight () {

      }
    }
  }
</script>

<style scoped>
.banner-box{
  position: relative;
  padding: 10px 0 24px;
  width: 100%;
  height: 40vw;
  overflow: hidden;
}
.banner-box .inner{
  height: 100%;
}
.banner-box .b-wrap{
  width: 90%;
  height: 40vw;
  overflow: hidden;
  position: absolute;
  left: 5%;
  transform: scale(0.8);
  z-index: 8;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 6px 8px 0 #dadada;
}
.banner-box .b-wrap.active {
  transform: scale(1);
  z-index: 10;
}
.banner-box .b-wrap.prev {
  left: -88%;
  z-index: 9;
}
.banner-box .b-wrap.next {
  left: 88%;
  z-index: 9;
}
.banner-box .b-wrap .img-cover{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.banner-box img{
  display: block;
  width: 100%;
  min-height: 100%;
}
.banner-box .dots-wrap {
  text-align: center;
  width: 100%;
  font-size: 0;
  padding: 8px 0;
  position: absolute;
  bottom: 0;
}
.banner-box .dots-wrap .dot{
  display: inline-block;
  border-radius: 3px;
  width: 6px;
  height: 6px;
  background: rgba(0,128,0, .2);
  transition: all 0.3s;
}
.banner-box .dots-wrap .dot.active {
  background: #00cf00;
  width: 12px;
}
.banner-box .dots-wrap .dot + .dot{
  margin-left: 5px;
}
</style>
