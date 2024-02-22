<!--  -->
<template>
  <div class='policy'>
    <Title text="政策兑现公示"></Title>
    <div class="main">
      <!-- 地区部门选择 -->
      <ConditionalSelection ref="ConditionalSelection" :choosedata="choosedata" @choosearea="choosearea" @search="search">
      </ConditionalSelection>
      <el-table :data="datalist" v-if="datalist.length != 0" v-loading="loading" element-loading-text="拼命加载中"
        element-loading-background="rgba(225, 225, 225, 0.3)">
        <el-table-column label="项目名称" prop="projectName" show-overflow-tooltip align="center" width="370">
        </el-table-column>
        <el-table-column label="主管部门" prop="deptName" show-overflow-tooltip align="center" width="166">
        </el-table-column>
        <el-table-column label="兑现金额" prop="amount" show-overflow-tooltip align="center" width="97">
        </el-table-column>
        <el-table-column label="申报单位" prop="declareObject" show-overflow-tooltip align="center" width="173">
        </el-table-column>
        <el-table-column label="公示时间" prop="openBeginDate" align="center"></el-table-column>
        <el-table-column label="兑现时间" prop="cashTime" align="center"></el-table-column>
      </el-table>
      <Empty v-else :description="'无兑现数据'"></Empty>
      <!-- 分页 -->
      <!-- 分页 -->
      <myPagination class="page" v-show="total > 0" :page.sync="queryParam.pageNumber" :limit.sync="queryParam.pageSize"
        :total="total" @pagination="getzck"></myPagination>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ConditionalSelection from "../component/ConditionalSelection.vue"
import { testgetsz } from './api'
import { tongji } from "../self_test/api";

export default {
  name: '',
  //组件接收参数
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: { ConditionalSelection },
  data () {
    //这里存放数据
    return {
      // 省级选择
      deptName: "四川省",
      //条件筛选
      choosedata: {
        area: [{ id: "51", name: "四川省" }],
        // area: [{ id: "51", name: "四川省" }, { id: "50", name: "重庆市" }],
        urban: [],
        dept: []
      },
      total: 0,
      // 查询政策库参数
      queryParam: {
        pageNo: 1,
        pageSize: 10,
        deptName: "四川省",//区域码
        departmentName: null,//部门id
        query: this.$route.query.val || '',//搜索关键字
      },
      loading: true,
      // 列表数据
      datalist: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 数据获取
    async getList () {
      // 获取区域
      this.getNature_quyu()
      // 获取部门
      this.getNature_bumen()
      // 获取政策列表数据
      this.getzck()
    },
    // 获取区域
    async getNature_quyu () {
      let urban = await testgetsz({ deptName: this.queryParam.deptName, type: 2 })
      urban.result.unshift({ id: "全部", region: "全部" })
      this.choosedata.urban = urban.result.map(item => {
        return { id: item.id, name: item.region }
      })
    },
    // 获取部门
    async getNature_bumen () {
      let nature = await testgetsz({ deptName: this.queryParam.deptName, type: 5 })
      nature.result.unshift({ id: "全部", deptAbb: "全部", deptName: "全部" })
      this.choosedata.dept = nature.result.map(item => {
        return { id: item.id, name: item.deptName, nameAbb: item.deptAbb }
      })
    },
    // 获取政策库数据
    async getzck () {
      this.loading = true
      let getzckdata = await testgetsz({ ...this.queryParam, type: 7 })
      this.datalist = getzckdata.result.records
      this.total = getzckdata.result.total
      this.loading = false
    },
    choosearea (value) {
      // 分页重置
      this.resetpage()
      // 赋值当前选中的值
      if (value.type == "deptName") {
        if (value.value == "全部") {
          value.value = '四川省'
        }
        this.deptName = value.value
        this.queryParam[value.type] = value.value
        // 获取区域
        this.getNature_quyu()
        // 县市重置
        this.resetcity()
        // 获取部门
        this.getNature_bumen()
        // 部门资质重置
        this.resetdep()
      } else if (value.type == "deptName2") {
        // 县市选择
        if (value.value != "全部") {
          value.type = "deptName"
          this.queryParam[value.type] = value.value
        } else if (value.value == "全部") {
          value.type = "deptName"
          value.value = this.deptName
          this.queryParam[value.type] = value.value
        }
        // 获取部门
        this.getNature_bumen()
        // 部门资质重置
        this.resetdep()
      } else if (value.type == "nature") {
        if (value.value != "全部") {
          this.nature = value.value
          this.queryParam[value.type] = value.value
        } else {
          this.queryParam[value.type] = null
        }
      } else if (value.type == "departmentName") {
        if (value.value != "全部") {
          this.queryParam[value.type] = value.value
        } else {
          this.queryParam[value.type] = null
        }
      }
      // 政策数据调用
      this.getzck()
    },
    search (key) {
      this.queryParam.query = key
      tongji({ type: "HQZCT_4_2", content: key })
      this.resetpage()
      // 政策数据调用
      this.getzck()
    },
    // 查询重置页码
    resetpage () {
      this.queryParam.pageNo = 1
    },
    // 重置县市
    resetcity () {
      this.queryParam.deptName = this.deptName
      this.$refs.ConditionalSelection.urbanindex = 0
    },
    // 部门重置
    resetdep () {
      this.queryParam.departmentName = null
      this.$refs.ConditionalSelection.deptindex = 0
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    setTimeout(() => {
      tongji({ type: "HQZCT_4_1" })
    }, 1000);
  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.main {
  margin: 18px auto 0 auto;
  width: 1200px;

  /deep/ .el-table thead tr th {
    padding: 11px 0;
    height: 46px;
    color: #000000;
    text-align: center;
    border-bottom: none;
    background-color: #f1f5fa;

    div {
      line-height: 20px;
    }
  }

  /deep/ .el-table td.el-table__cell {
    padding: 19.5px 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;

    div {
      line-height: 20px;
    }
  }

  /deep/ .el-table::before {
    background-color: rgba(0, 0, 0, 0);
  }

  .page {
    margin: 15px 0 49px 0;
  }
}
</style>