import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Works from '@/pages/Works.vue'
import WorkDetail from '@/pages/WorkDetail.vue'
import About from '@/pages/About.vue'
import Contact from '@/pages/Contact.vue'

// Admin routes
import Login from '@/pages/admin/Login.vue'
import Dashboard from '@/pages/admin/Dashboard.vue'
import AdminWorks from '@/pages/admin/Works.vue'
import CreateWork from '@/pages/admin/CreateWork.vue'
import EditWork from '@/pages/admin/EditWork.vue'
import Users from '@/pages/admin/Users.vue'
import CreateUser from '@/pages/admin/CreateUser.vue'
import EditUser from '@/pages/admin/EditUser.vue'
import Settings from '@/pages/admin/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/works',
    name: 'Works',
    component: Works
  },
  {
    path: '/works/:id',
    name: 'WorkDetail',
    component: WorkDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  // Admin routes
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/works',
    name: 'AdminWorks',
    component: AdminWorks
  },
  {
    path: '/admin/works/create',
    name: 'CreateWork',
    component: CreateWork
  },
  {
    path: '/admin/works/:id/edit',
    name: 'EditWork',
    component: EditWork
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/admin/users/create',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/admin/users/:id/edit',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/admin/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
