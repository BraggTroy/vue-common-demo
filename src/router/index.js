import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Banners from '@/components/banners'
import BannersSwiper from '@/components/bannersSwiper'

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
