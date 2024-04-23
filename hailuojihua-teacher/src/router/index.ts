import {
    createRouter,
    createWebHistory
} from 'vue-router'
import mainlayout from '../layouts/mainlayout.vue'
import HomeView from '../views/index.vue'
import loginView from '../views/login.vue'
import StudentManageView from '../views/student_manage.vue'
import DangerousWordsWarningView from '../views/dangerousWordsWarning.vue'

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
                component: HomeView,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: '/student',
                name: 'student',
                component: StudentManageView,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: '/dangerouswords',
                name: 'dangerouswords',
                component: DangerousWordsWarningView, 
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: loginView,
        // meta: {
        //     requiresAuth: true
        // }
    }

    ]
})


router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router