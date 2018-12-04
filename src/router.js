import Vue from 'vue'
import Router from 'vue-router'
import TestDataTable from '@/views/TestDataTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestDataTable',
      component: TestDataTable
    }
  ]
})
