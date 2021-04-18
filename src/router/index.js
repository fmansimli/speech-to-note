import { createRouter, createWebHistory } from 'vue-router'
import user from '@/store/user'

import Home from '@/views/Home'
import About from '@/views/About'
import Contact from '@/views/Contact'
import Notes from '@/components/note/Notes'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import NotFound from '@/components/NotFound'
import ServerError from '@/components/ServerError'

const routes = [
  {
      path:'/',component:Home,name:'home'
  },
  {
      path:'/about',component:About,name:'about'
  },
  {
      path:'/contact',component:Contact,name:'contact'
  },
  {
      path:'/notes',component:Notes,name:'notes',
      beforeEnter:((to,from,next)=>{
          if(user.state.activeUser){
              next();
          }else{
              next('/login');
          }
      })
  },
  {
      path:'/login',component:Login,name:'login'
  },
  {
      path:'/register',component:Register,name:'register'
  },
  {
      path:'/notfound',component:NotFound,name:'404'
  },
  {
      path:'/500',component:ServerError,name:'500'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
