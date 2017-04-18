import Vue from 'vue'
import Router from 'vue-router'
import MyBody from '@/components/MyBody'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Top', component: MyBody },
    { path: '/*', name: 'MyBody', component: MyBody }
  ]
})
