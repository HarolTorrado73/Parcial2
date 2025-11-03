import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    children: [
      { path: 'productos', name: 'Productos', component: ProductView },
      { path: '', redirect: { name: 'Productos' } },
    ],
  },
]

const router = createRouter({ history: createWebHistory(), routes })

export default router
// Router mínimo con rutas para el Dashboard y sus vistas hijas.
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import ClientsView from '../views/ClientsView.vue'

const routes = [
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      { path: 'productos', component: ProductView },
      { path: 'clientes', component: ClientsView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
