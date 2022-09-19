import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeContent.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import ValidateMail from '../views/ValidateMail'
import EspaceUtilisateur from '../views/EspaceUtilisateur'
import ServiceDetails from '../views/ServiceDetails'
import DatingService from '../views/ServiceViews/DatingService'
import Scheduler from '../views/Scheduler'
import ContentFeed from '../views/ContentFeed'
import Chat from '../components/Chat'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/EspaceUtilisateur',
    name: 'EspaceUtilisateur',
    component: EspaceUtilisateur
  },
  {
    path: '/ServiceDetails/:id',
    name: 'ServiceDetails',
    component: ServiceDetails,
    props:true
  },
  {
    path: '/DatingService/:id',
    name: 'DatingService',
    component: DatingService,
    props:true
  },
  {
    path: '/Scheduler',
    name: 'Scheduler',
    component: Scheduler
  },
  {
    path: '/ValidateMail',
    name: 'ValidateMail',
    component: ValidateMail
  },
  {
    path: '/ContentFeed',
    name: 'ContentFeed',
    component: ContentFeed
  },
  {
    path: '/Chat/:id',
    name: 'Chat',
    props:true,
    component: Chat
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  console.log(process)
  if (to.name !== 'Login' && to.name !== 'Home')
  {
    if(!JSON.parse(localStorage.getItem("userinfo")) || !JSON.parse(localStorage.getItem("userinfo")).jwt)
    {
      next({ name: 'Login' })
    }

    $.ajax({
      type: "Get",
      beforeSend: function(request) {
        request.setRequestHeader('content-type', 'text/plain')
        request.setRequestHeader("Authorization", "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt)
      },
      url: window.GLOBALVARS.VUE_APP_BACKENDURL+"/api/users/me",
      success: function(msg) {
        console.log(msg)
        if (msg) next()
        else next({ name: 'Login' })
       
      },
      error: function(msg) {
        console.log(msg)
        next({ name: 'Login' })
       
      }
    });

  }
  else
  {
    next()
  }
})

export default router
