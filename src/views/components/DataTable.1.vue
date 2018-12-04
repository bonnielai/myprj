<template>
<div class="dt-container">
    <table class="dt-table">
        <thead>
            <tr>
                <th class="check-col"><input type="checkbox" class="checkbox" v-model='checked'  @click='checkedAll()'/></th>
                <th >id</th>
                <th >name</th>
                <th >department</th>
                <th >no</th>
                <th >tel</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in lists">
                <td ><input type="checkbox" v-model='checkList'/></td>
                <td v-text="data.id"></td>
                <td v-text="data.name"></td>
                <td v-text="data.department"></td>
                <td v-text="data.no"></td>
                <td v-text="data.tel"></td>
            </tr>
        </tbody>
    </table>
    <div class="pagination-outer">
      <pagination ref:page :async="false" :data="lists" :lens="lenArr" :page-len="pageLen" :param="param" @lenChange(lenChange)></pagination>
    </div>
</div>
</template>

<script>
import pagination from "./Pagination.vue";

export default {
  data() {
    return {
      lenArr: [5, 10, 20], // 每页显示长度设置
      pageLen: 5, // 可显示的分页数
      // url: '/bootpage/', // 请求路径
      param: {}, // 传递参数
      lists: [
        { id: 1, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 2, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 3, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 4, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 5, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 6, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 7, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 8, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 9, name: "luozh", department: "caiwu", no: "001", tel: "123" },
        { id: 10, name: "luozh", department: "caiwu", no: "001", tel: "123" }
      ], // 表格原始数据
      tableList: [], // 分页组件传回的分页后数据
      checked: false,
      checkList: [],
      async: false,
      url: ''
    };
  },
  props: {
    
  },
  components: {
    pagination
  },
  methods: {
    refresh() {
      this.$refs.page.refresh();
    },
    checkedAll() {
      var _this = this;
      console.log(_this.checkList);
      console.log(_this.checked);
      if (!_this.checked) {
        //实现反选
        _this.checkList = [];
      } else {
        //实现全选
        _this.checkList = [];
        this.tableList.forEach(function(item, index) {
          _this.checkList.push(item.id);
        });
      }
    },
    lenChange(newLen) {
      this.pageLen = newLen;
      this.refresh();
    },
    getData() {
      if (!this.async) {
        let len = this.len,
          pageNum = this.pages[this.activeNum] - 1,
          newData = [];

        for (let i = pageNum * len; i < pageNum * len + len; i++) {
          this.data[i] !== undefined ? newData.push(this.data[i]) : "";
        }
        this.dataTotal = this.data.length;
        this.$dispatch("data", newData);
      } else {
        this.param.active = this.pages[this.activeNum];
        this.param.len = this.len;

        this.$http({
          url: this.url,
          method: "POST",
          data: this.param
        }).then(function(response) {
          this.pageTotal = response.data.page_num;
          this.dataTotal = response.data.length;
          if (
            this.pages.length !== this.pageLen ||
            this.pageTotal < this.pageLen
          ) {
            this.getPages();
          }

          if (!response.data.data.length) {
            this.activeNum = this.pageTotal - 1;
          }

          this.$dispatch("data", response.data.data);
        });
      }
    }
  },
  events: {
    // 分页组件传回的表格数据
    data(data) {
      this.tableList = data;
      this.lists = this.tableList;
    },

    // 刷新数据
    refresh() {
      this.refresh();
    }
  },
  watch: {
    checkList: {
      handler: function(val, oldVal) {
        if (val.length === this.tableList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  }
};
</script>
