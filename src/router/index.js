import { createRouter, createWebHistory } from 'vue-router'
import ListPage from '../views/ListPage.vue'
import DetailPage from '../views/DetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListPage,
  },
  {
    path: '/pokemon/:id',
    name: 'detail',
    component: DetailPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
