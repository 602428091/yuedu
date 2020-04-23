import Vue from 'vue'
import VueRouter from 'vue-router'
import ContentLeft from "../views/ContentLeft"
import ContentRight from "../views/ContentRight"
import ListLeft from '../views/ListLeft'
import ListRight from '../views/ListRight'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/article/10',
    components:{
        left:ContentLeft,
        right:ContentRight
    },
    
  },
  {
    path:'/channel/:tab/:page',
    components:{
      left:ListLeft,
      right:ListRight
    }
  },
  {
    path:'/article/:id',
    components:{
      left:ContentLeft,
      right:ContentRight
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


