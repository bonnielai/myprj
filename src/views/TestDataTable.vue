<template>
  <div class="dt-outer">
    <data-table></data-table>
  </div>
</template>
<script>
    import DataTable from './components/DataTable.vue'
    export default {
      name: 'TestDataTable',
      data () {
        return {
        //表格的头部部分数据
        gridColumns: ['name', 'power'],
        //表格的主体部分数据
        gridData: [
             { name: 'Chuck Norris', power: Infinity },
             { name: 'Bruce Lee', power: 9000 },
             { name: 'Jackie Chan', power: 7000 },
             { name: 'Jet Li', power: 8000 }
        ],
        //input组件中v-model双向绑定的数据值
        searchQuery : ''
        }
      },
      components: {
        DataTable: DataTable
      }
    }
</script>