<template>
  <div class="my_pagination">
    <!-- <el-pagination @size-change="changePage"
                   @current-change="changeNum"
                   :current-page.sync="queryParams.pageNum"
                   :page-size.sync="queryParams.pageSize"
                   :page-sizes="pageSizesArr"
                   :background="background"
                   :layout="layout"
                   :total="total"> -->
    <!-- <el-pagination ref="elpagination"
                   @size-change="changePage"
                   @current-change="changeNum"
                   :current-page.sync="currentPage"
                   :page-size.sync="pageSize"
             
                   :background="background"
                   :layout="layout"
                   :total="total">
      <el-button class="btn-sure"
                 size="mini">确定</el-button>
    </el-pagination> -->
    <el-pagination background @current-change="changeNum" :current-page.sync="currentPage" :page-size="pageSize"
      layout="total, prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    // 分页参数
    // queryParams: {
    //   type: Object,
    //   default: {
    //     pageNum: 1,
    //     pageSize: 10,
    //   }
    // },
    // 分页参数
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizesArr: {
      type: Array,
      default () {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper, slot ,total, sizes'
    },
    background: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    changeNum (val) {
      // this.$emit('pagination')
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    changePage (val) {
      // this.$emit('pagination')
      this.$emit('pagination', { page: val, limit: this.pageSize })
    },
  }
}
</script>

<style lang="less" scoped>
.my_pagination {
  display: flex;
  justify-content: end;
  // padding-right: 18px;

  ::v-deep .el-pagination.is-background .el-pager li {
    margin: 0;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #D1DCE5;
    border-left: none;
    border-radius: 0;
  }

  ::v-deep .el-pagination.is-background .btn-prev {
    margin: 0;
    height: 30px;
    line-height: 30px;
    // padding: 0 10px;
    border: 1px solid #D1DCE5;
    border-radius: 0;

    .el-icon {
      font-size: 16px;

    }
  }

  ::v-deep .el-pagination.is-background .btn-next {
    margin: 0;
    height: 30px;
    line-height: 30px;
    // padding: 0 10px;
    border: 1px solid #D1DCE5;
    border-radius: 0;
    border-left: none;

    .el-icon {
      font-size: 16px;
    }
  }

  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #2055C9;
    border-color: #2055C9;
    color: #fff !important;
  }

  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #2055C9;
  }

  ::v-deep .el-pagination__total {
    height: 32px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #48576A;
    line-height: 32px;
  }
}
</style>