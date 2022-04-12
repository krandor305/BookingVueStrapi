import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeContent.vue'
import Login from '../views/Login'
import EspaceUtilisateur from '../views/EspaceUtilisateur'

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
    path: '/EspaceUtilisateur',
    name: 'EspaceUtilisateur',
    component: EspaceUtilisateur
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
  history: createWebHistory(process.env.BASE_URL),
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
      url: "http://localhost:8010/api/users/me",
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
