<template>
  <div class="dt-outer">
    <data-table :isAsync="isAsync" 
                :searchIsPagination="searchIsPagination"
                :searchUrl="searchUrl"
                :searchParam="searchParam"
                :isPaginatin="isPaginatin"
                :tableColumn="tableColumn" 
                :tableData="tableData" 
                :options="options">

    </data-table>
  </div>
</template>
<script>
    import DataTable from './components/DataTable.vue'
    export default {
      name: 'TestDataTable',
      data () {
        return {
        isAsync: true,
        searchIsPagination: true,
        searchUrl: 'http://localhost:8899/',
        searchParam: {},
        isPaginatin: true,
        //表格的头部部分数据
        tableColumn: ["id", "name", "department", "no", "tel", "sex"],
        //表格的主体部分数据
        tableData: [
          {id: 1,name: "luozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozh",department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu",no: "001",tel: "123",sex: "0"},
          {id: 2,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 3,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 4,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 5,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 6,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 7,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 8,name: "luozh",department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",no: "001",tel: "123",sex: "0"}
        ],
        options: [
          {
            colname: "sex",
            colwidth: "100px",
            specOper: function(val) {
              return val == "0" ? "女" : "男";
            }
          },
          {
            colname: "name",
            colwidth: "200px"
          },
          {colname: "tel",
            colwidth: "500px"},
          {colname: "no",
            colwidth: "500px"}
        ],

        }
        
      },
      components: {
        DataTable: DataTable
      }
    }
</script>