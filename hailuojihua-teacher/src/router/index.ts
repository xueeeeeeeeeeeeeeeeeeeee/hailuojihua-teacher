import {
    createRouter,
    createWebHistory
} from 'vue-router'
import mainlayout from '../layouts/mainlayout.vue'
import HomeView from '../views/index.vue'
import loginView from '../views/login.vue'
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        component: mainlayout,
        children: [
            {
                path: '',
                name: 'home',
                component: HomeView
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: loginView,
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