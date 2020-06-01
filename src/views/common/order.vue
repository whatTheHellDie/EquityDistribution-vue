<template>
  <div>
    <h2 class="el-card__body-title">我的订单</h2>
    <div class="el-card__body-cont">
      <my-table :head="tableHead" :data="tableData"></my-table>
      <el-pagination
        background
        layout="prev, pager, next, sizes, jumper"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        :total="totalPage"
        @size-change="pageSizeChangeHandle"
        @current-change="currentPageChangeHandle"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import MyTable from '@/components/common/table'
export default {
  data() {
    return {
      tableHead: [
        {
          prop: 'orderNumber',
          label: '订单编号'
        },
        {
          prop: 'chargeType',
          label: '充值类型'
        },
        {
          prop: 'amountRmb',
          label: '充值金额（元）'
        },
        {
          prop: 'coinType',
          label: '支付币种'
        },
        {
          prop: 'amountCoin',
          label: '支付币数额'
        },
        {
          prop: 'biliexOrderId',
          label: '支付订单编号'
        },
        {
          prop: 'status',
          label: '状态'
        },
        {
          prop: 'createTime',
          label: '时间'
        },
      ],
      tableData: [],
      currentPage: 1,         // 当前页
      pageSize: 10,           // 每页记录数
      totalPage: 0,           // 总记录数
      dataListLoading :false  // 是否正在加载
    };
  },
  components: {
    MyTable
  },
  created(){
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList () {
      if(!this.dataListLoading) {
        this.dataListLoading = true;

        this.$http({
          url: this.$http.adornUrl('/app/order/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.currentPage,
            'limit': this.pageSize
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.tableData = data.page.list;
            this.totalPage = data.page.totalCount;
          } else {
            this.tableData = [];
            this.totalPage = 0;
          }
          this.dataListLoading = false;
        })
      }   
    },

    // 每页显示记录数
    pageSizeChangeHandle(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDataList();
    },

    // 上一页或下一页
    currentPageChangeHandle(val) {
      this.currentPage = val;
      this.getDataList();
    }
  }
};
</script>