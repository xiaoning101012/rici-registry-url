<!--  -->
<template>
    <div class='policy'>
        <Title text="政策兑现公示"></Title>
        <div class="main">
            <!-- 地区部门选择 -->
            <ConditionalSelection ref="ConditionalSelection" :choosedata="choosedata" @choosearea="choosearea" @search="search">
            </ConditionalSelection>
            <el-table :data="datalist" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-background="rgba(225, 225, 225, 0.3)">
                <el-table-column label="项目名称" prop="name" show-overflow-tooltip align="center" width="370">
                </el-table-column>
                <el-table-column label="主管部门" prop="zgdept" show-overflow-tooltip align="center" width="166">
                </el-table-column>
                <el-table-column label="兑现金额" prop="money" show-overflow-tooltip align="center" width="97">
                </el-table-column>
                <el-table-column label="申报单位" prop="sbdw" show-overflow-tooltip align="center" width="173">
                </el-table-column>
                <el-table-column label="公示时间" prop="gstime" align="center"></el-table-column>
                <el-table-column label="兑现时间" prop="dxtime" align="center"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- 分页 -->
            <myPagination class="page" v-show="total > 0" :page.sync="queryParam.pageNumber"
                :limit.sync="queryParam.pageSize" :total="total" @pagination="getzck"></myPagination>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ConditionalSelection from "../component/ConditionalSelection.vue"
import { getNature, getNature_quyu, getNature_bumen } from './api'

export default {
    name: '',
    //组件接收参数
    props: {},
    //import引入的组件需要注入到对象中才能使用
    components: { ConditionalSelection },
    data() {
        //这里存放数据
        return {
            // 省级选择
            addressCode: "510000",
            //条件筛选
            choosedata: {
                area: [{ id: "全部", name: "全部" }, { id: "510000", name: "四川省" }, { id: "500000", name: "重庆市" }],
                urban: [],
                dept: []
            },
            total: 200,
            // 查询政策库参数
            queryParam: {
                pageNumber: 1,
                pageSize: 10,
                addressCode: 510000,//区域码
                listType: 3, //区域为全部时，等于0,否则为3
                departmentId: null,//部门id
                title: this.$route.query.val || '',//搜索关键字
                sort: 'releaseDate'
            },
            loading: true,
            // 列表数据
            datalist: [{
                name: "四川省制造业企业“贡嘎培优”行动企业快速成长奖补",
                zgdept: "四川省经济和信息化厅",
                money: "100万元",
                sbdw: "开普云****有限公司",
                gstime: "2022/10/10 10:00:01",
                dxtime: "2022/10/10 10:00:01"
            }, {
                name: "四川省制造业企业“贡嘎培优”行动企业快速成长奖补",
                zgdept: "四川省经济和信息化厅",
                money: "100万元",
                sbdw: "开普云****有限公司",
                gstime: "2022/10/10 10:00:01",
                dxtime: "2022/10/10 10:00:01"
            }]
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 数据获取
        async getList() {
            // 获取区域
            this.getNature_quyu()
            // 获取部门
            this.getNature_bumen()
            // 获取政策列表数据
            this.getzck()
        },
        // 获取区域
        async getNature_quyu() {
            let urban = await getNature_quyu(this.queryParam.addressCode)
            urban.result.unshift({ id: "全部", name: "全部" })
            this.choosedata.urban = urban.result.map(item => {
                return { id: item.id, name: item.name }
            })
        },
        // 获取部门
        async getNature_bumen() {
            let nature = await getNature_bumen(this.queryParam.addressCode)
            nature.result.unshift({ id: "全部", departmentName: "全部" })
            this.choosedata.dept = nature.result.map(item => {
                return { id: item.id, name: item.departmentName }
            })
        },
        // 获取政策库数据
        async getzck() {
            this.loading = true
            console.log("获取数据");
            this.loading = false
        },
        choosearea(value) {
            // 分页重置
            this.resetpage()
            // 赋值当前选中的值
            if (value.type == "addressCode") {
                if(value.value =="全部" ){
                    value.value = 510000
                }
                this.addressCode = value.value
                this.queryParam[value.type] = value.value
                // 获取区域
                this.getNature_quyu()
                // 县市重置
                this.resetcity()
                // 获取部门
                this.getNature_bumen()
                // 部门资质重置
                this.resetdep()
            } else if (value.type == "addressCode2") {
                // 县市选择
                if (value.value != "全部") {
                    value.type = "addressCode"
                    this.queryParam[value.type] = value.value
                } else if (value.value == "全部") {
                    value.type = "addressCode"
                    value.value = this.addressCode
                    this.queryParam[value.type] = value.value
                }
                // 获取部门
                this.getNature_bumen()
                // 部门资质重置
                this.resetdep()
            } else if (value.type == "departmentId") {
                if (value.value != "全部") {
                    this.departmentId = value.value
                    this.queryParam[value.type] = value.value
                } else {
                    this.queryParam[value.type] = null
                }
            }
            // 政策数据调用
            this.getzck()
        },
        search(key) {
            this.queryParam.title = key
            this.resetpage()
            // 政策数据调用
            this.getzck()
        },
        // 查询重置页码
        resetpage() {
            this.queryParam.pageNumber = 1
        },
        // 重置县市
        resetcity() {
            this.queryParam.addressCode = this.addressCode
            this.$refs.ConditionalSelection.urbanindex = 0
        },
        // 部门重置
        resetdep() {
            this.queryParam.departmentId = null
            this.$refs.ConditionalSelection.deptindex = 0
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getList()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
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
        background-color: #F1F5FA;

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