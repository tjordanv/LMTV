import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Details from '../views/Details.vue'
import Builder from '../views/Builder.vue'
import Plans from '../views/Plans.vue'
import Card from '../views/Card.vue'
import CostBreakdown from "../views/CostBreakdown.vue"
import RoomDesign from "../views/Design.vue"
import AboutTeam from "../views/About.vue"
import ContactInfo from "../views/Contact.vue"

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/details",
      name: "details",
      component: Details,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/plans",
      name: "plans",
      component: Plans,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/plans/:id",
      name: "plans-by-id",
      component: Card,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/plan-builder",
      name: "plan-builder",
      component: Builder,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/cost-breakdown",
      name: "cost-breakdown",
      component: CostBreakdown,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:"/room-design",
      name:"room-design",
      component: RoomDesign,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path:"/about",
      name:"about",
      component: AboutTeam,
      meta: {
        requiresAuth: false
     }
  },
  {
      path:"/contact",
      name:"contact",
      component: ContactInfo,
      meta: {
        requiresAuth: false
      }
  }
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
