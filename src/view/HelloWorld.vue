<template>
  <div class="hello">
    <div id="shareCont">
      <img src="../../static/img/test-img.jpg" alt="">
      <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555783756269&di=7eb8e9e6b4afab031cc54972a86a4bb1&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201804%2F14%2F115228gf92z731fl2slzvv.jpg">-->
      <h1>{{ msg }}</h1>
      <p>{{txt}}</p>
      <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    </div>
    <button @click="createImg">点击分享</button>
    <p><br></p>
    <button @click="getTest">ajax测试</button>

    <transition name="fade">
      <div v-if="imgShow" class="img-wrap">
        <span @click="close" class="close">X</span>
        <div class="img-box">
          <div ref="imgBox"></div>
          <p class="info">请长按保存图片</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgShow: false,
      txt: ''
    }
  },
  mounted () {
//      let this_ = this
//      window.onload = function () {
//        let node = document.getElementById('shareCont')
//        let wid = node.clientWidth
//        let hei = node.clientHeight
//        node.style.width = wid + 'px'
//        node.style.height = hei + 'px'
//       // this_.shareWith()
//      }
  },
  methods: {
    getTest () {
      this.ajax({
        type: 'get',
        url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=dd50c4753418a4e2d41a149e1e9cfa7f&city=110000',
        success: (res) => {
          res = JSON.parse(res)
          console.log(res)
          console.log(res.info)
          console.log(this)
          this.txt = res.info
        }
      });
    }  ,
    shareWith () {
      var pnode = document.getElementById('shareCont')
      var childs = pnode.childNodes
      html2canvas(pnode, {
        allowTaint: true, //允许污染，实现了对跨域图片的绘制
        taintTest: true, //在渲染前测试图片(没整明白有啥用)
        useCORS: true,
      }).then(canvas => {
        childs.forEach(child => {
          pnode.removeChild(child);
        })
        pnode.appendChild(canvas)


//        var url = canvas.toDataURL('image/png')
//        var img = document.createElement('img')
//        img.src = url
//        this.imgShow = true
//        this.$nextTick(() => {
////          this.$refs.imgBox.appendChild(img)
//          this.$refs.imgBox.appendChild(canvas)
//        })

      })
    },
    createImg () {
      var pnode = document.getElementById('shareCont')
      html2canvas(pnode, {
        allowTaint: true, //允许污染，实现了对跨域图片的绘制
        taintTest: true, //在渲染前测试图片(没整明白有啥用)
        useCORS: true
      }).then(canvas2 => {
//        var img = document.createElement('img')
        var img = new Image()
        img.setAttribute("crossOrigin",'')
        var url = canvas2.toDataURL('image/png')
        img.src = url
        this.imgShow = true
        this.$nextTick(() => {
          this.$refs.imgBox.appendChild(img)
        })
      })
    },
    close () {
      this.imgShow = false
    },

  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  #shareCont{
    position: relative;
  }
  #shareCont canvas{
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
  }
  img {
    max-width: 100%;
  }
  .img-wrap{
    position: absolute;
    background: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    text-align: center;
  }
  .img-wrap .close{
    display: inline-block;
    position: absolute;
    top: 15px;
    right: 15px;
    color: #fff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: rgba(0,0,0, .8);
    border-radius: 50%;
  }

  .img-box{
    position: absolute;
    width: 75%;
    right: 12.5%;
    top: 25%;
    box-shadow: 0 0 3px 2px #ccc;
  }
  .img-box *{
    display: block;
    width: 100%!important;
    height: auto!important;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .info{
    margin: 0;
    padding: 10px;
    background: #fff;
    border-top: 1px solid #ccc;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
