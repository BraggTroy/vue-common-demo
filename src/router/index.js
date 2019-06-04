import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'
import Banners from '@/view/banners'
import BannersSwiper from '@/view/bannersSwiper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/banners',
      name: 'Banners',
      component: Banners
    },
    {
      path: '/swiper',
      name: 'BannersSwiper',
      component: BannersSwiper
    }
  ]
})
