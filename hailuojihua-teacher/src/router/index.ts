import {
    createRouter,
    createWebHistory
} from 'vue-router'
import HomeView from '../views/index.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true
        }
    }

    ]
})


//   router.beforeEach((to, from, next) => {
//     const isAuthenticated = sessionStorage.getItem('token')
//     if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//       next('/login')
//     } else {
//       next()
//     }
//   })

export default router