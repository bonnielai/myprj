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

        }
      },
      components: {
        DataTable: DataTable
      }
    }
</script>