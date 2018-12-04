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
      <nav class="pagination-nav ">
      <div class="pg-con flex">
        <div class="data-total">
            共 <span v-text="totalcount"></span> 条
        </div>
        <ul class="pagination-page">
            <li>
                <a href="javascript:void(0)" aria-label="Next" :class="{'disabled':activeNum==1}" @click="onPrevClick()">
                    <span aria-hidden="true">‹</span>
                </a>
            </li>
            <li class="active">
                <a href="javascript:void(0)" v-text="activeNum" @click="onPageClick(activeNum)"></a>
            </li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" :class="{'disabled':activeNum==pageTotal}" @click="onNextClick()">
                    <span aria-hidden="true">›</span>
                </a>
            </li>
        </ul>
        <select v-model="pageLen">
          <option v-for="(arr ,index) in lens" :value="arr" v-text="arr" :selected="index === 0 ? true : false"></option>
        </select>
        <div class="page-total">
            共 <span v-text="pageTotal"></span> 页
        </div>
      </div>
    </nav>
    </div>
</div>
</template>

<script>
//import pagination from "./Pagination.vue";

export default {
  data() {
    return {
      lists: [], // 表格原始数据
      //tableList: [], // 分页后的数据
      checked: false,
      checkList: [],
      pages: [1],
      activeNum: 1,
      pageLen: 5, //显示条数
      pageTotal: 1, //总页数
      totalcount: 0
    };
  },
  props: {
    // 显示个数数组
    lens: {
      type: Array,
      default: function() {
        return [5, 10, 20];
      }
    },

    // 表格数据（数组）
    data: {
      type: Array,
      default: function() {
        return [
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
      ];
      }
    },
    //总条数
    dataTotal: {
      type: Number,
      default: 0
    },
    // 是否请求服务器端数据
    async: {
      type: Boolean,
      default: false
    },
    // AJAX地址
    url: {
      type: String,
      default: ""
    },
    // 参数内容
    param: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  /*components: {
    pagination
  },*/
  created: function() {
    if(this.dataTotal){
      this.totalcount = this.dataTotal;
    }
    if(!this.async && this.data && this.data.length > 0){
      this.lists = this.data.slice(0+(this.activeNum-1)*this.pageLen, (this.activeNum)*this.pageLen);
      this.totalcount = this.data.length;
    }
  },
  methods: {
    refresh() {
      this.page.refresh();
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
        this.lists.forEach(function(item, index) {
          _this.checkList.push(item.id);
        });
      }
    },
    // 点击页码刷新数据
    onPageClick(index) {
      this.activeNum = index;
    },

    // 上一页
    onPrevClick() {
      // 当前页是否为当前最小页码
      if (this.activeNum > 1) {
        this.activeNum = this.activeNum - 1;
        this.getData();
      }
    },

    // 下一页
    onNextClick() {
      // 当前页是否为当前最大页码
      if (this.activeNum < this.pageTotal) {
        this.activeNum = this.activeNum + 1;
        this.getData();
      }
    },

    // 获取页码
  /*getPages() {
      this.pages = [];

      if (!this.async) {
        this.pageTotal = Math.ceil(this.data.length / this.pageLen);
        this.totalcount = this.lists.length;
      }

      // 比较总页码和显示页数
      if (this.pageTotal <= this.pageLen) {
        for (let i = 1; i <= this.pageTotal; i++) {
          this.pages.push(i);
        }
      } else {
        for (let i = 1; i <= this.pageLen; i++) {
          this.pages.push(i);
        }
      }
    },*/

    // 页码变化获取数据
    getData() {
      if (!this.async) {
        let len = this.pageLen,
          pageNum = this.activeNum - 1,
          newData = [];

        for (let i = pageNum * len; i < pageNum * len + len; i++) {
          this.data[i] !== undefined ? newData.push(this.data[i]) : "";
        }
        this.totalcount = this.data.length;
        this.pageTotal = Math.ceil(this.data.length / this.pageLen);
        this.lists = newData;
      } else {
        this.param.active = this.activeNum;
        this.param.len = this.pageLen;

        this.$http({
          url: this.url,
          method: "POST",
          data: this.param
        }).then(function(response) {
          this.pageTotal = response.data.page_num;
          this.totalcount = response.data.data.length;
          this.lists = response.data.data;
        });
      }
    },

    // 刷新表格
    refresh() {
      this.getData();
    }
  },
  events: {
    // 分页组件传回的表格数据
    /*data(data) {
      this.tableList = data;
      this.lists = this.tableList;
    },*/

    // 刷新数据
    refresh() {
      this.refresh();
    }
  },
  watch: {
    checkList: {
      handler: function(val, oldVal) {
        if (val.length === this.lists.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    },
    // 监听显示数量
    pageLen(newVal, oldVal) {
      console.log("pageLen newVal:"+newVal+";oldVal:"+oldVal);
      this.refresh();
    },

    // 监测当前页变化
    activeNum(newVal, oldVal) {
      console.log("activeNum newVal:"+newVal+";oldVal:"+oldVal);
      this.refresh();
    }
  }
};
</script>
