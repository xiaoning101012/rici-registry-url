<template>
  <div class="container">
    <img class="top_img" src="~@/assets/hq_zc_pipei/topD.png" alt="" />

    <div class="content">
      <!-- <div class="Conditions">
        <div class="type">
          <div class="label">选择区划：</div>
          <div class="value" v-for="(item,index) in areaList"></div>
        </div>
      </div> -->
      <ConditionalSelection
        ref="ConditionalSelection"
        :choosedata="choosedata"
        @choosearea="choosearea"
        @search="search"
        :qlfcshow="true"
      >
      </ConditionalSelection>
      <div class="search_box">
        <div class="title">免申即享</div>
        <div class="input_box">
          <el-input
            placeholder="请输入标题或关键字"
            v-model="queryParam.title"
            class="input-with-select"
          >
            <span slot="append" class="search_btn" @click="goPolicyMatching"
              ><span class="search_name">搜 索 </span>
              <el-button icon="el-icon-search"></el-button>
            </span>
          </el-input>
        </div>
      </div>
      <div class="policy_box" v-if="policyList.length > 0">
        <div
          class="policy_item"
          v-for="(item, index) in policyList"
          :key="index"
        >
          <div class="policy_title">
            <el-tooltip :content="item.title" placement="bottom">
              <span @click="goDetail(item)">{{ item.title }}</span>
            </el-tooltip>
            <div class="tag msjx">免申即享</div>
            <!-- <div class="tag sbl">申报类</div> -->
          </div>
          <div class="policy_detp">
            <div>
              <img src="~@/assets/hq_zc_pipei/fwdw.png" alt="" />部门：{{
                item.departmentName ? item.departmentName : "/"
              }}
            </div>
            <!-- <div class="page-view" v-if="item.pageView"><img src="~@/assets/hq_zc_pipei/zcbq.png" alt="">浏览量：{{
              item.pageView }}</div>
            <div class="page-view" v-else><img src="~@/assets/hq_zc_pipei/zcbq.png" alt="">浏览量：0</div> -->
            <div class="publish_text">
              <img src="~@/assets/hq_zc_pipei/fbrq.png" alt="" />发布日期：{{
                item.dataReleaseDate ? item.dataReleaseDate : "/"
              }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="policyList.length == 0" class="policy_box">
        <div class="policy_img">
          <img src="@/assets/wu.png" alt="" />
        </div>
        <div class="policy_title1">暂无数据</div>
      </div>
      <!-- 分页 -->
      <myPagination
        class="page"
        v-show="total > 0"
        :page.sync="queryParam.pageNo"
        :limit.sync="queryParam.pageSize"
        :total="total"
        @pagination="getmsjxList"
      ></myPagination>
    </div>
  </div>
</template>

<script>
import ConditionalSelection from "../component/ConditionalMsjx.vue";
import {
  getNature_quyu,
  getNature_bumen,
  getmsjx,
  getmsjx_xq,
  testgetsz,
  evaluation,
  tongji,
} from "./api";

export default {
  components: { ConditionalSelection },
  data() {
    return {
      // id: this.$route.query.id,
      policyName: "",
      form: {},
      //条件筛选
      choosedata: {
        area: [
          { name: "全部", id: "51" },
          { name: "国家级", id: "100000000000" },
          { name: "省级", id: "5110000000000" },
          { name: "市(州)级", id: "1" },
        ],
        // area: [{ id: "51", name: "四川省" }],
        // area: [{ id: "51", name: "四川省" }, { id: "50", name: "重庆市" }],
        urban: [
          { id: "3", name: "全部" },
          { id: "0", name: "兑现中" },
          { id: "1", name: "已截止" },
          { id: "2", name: "未开始" },
        ],
        qlfc: [],
        dept: [
          // { id: "511", nameAbb: "全部" },
          // { id: "5113", nameAbb: "省发展改革委" },
          // { id: "5114", nameAbb: "教育厅" },
          // { id: "5115", nameAbb: "科技厅" },
          // { id: "5116", nameAbb: "省发展改革委省发展改革委" },
          // { id: "5117", nameAbb: "教育厅" },
          // { id: "5118", nameAbb: "科技厅" },
          // { id: "5119", nameAbb: "省发展改革委" },
          // { id: "51199", nameAbb: "教育厅" },
          // { id: "999", nameAbb: "科技厅" },
        ],
      },
      // 查询政策库参数
      queryParam: {
        pageNo: 1,
        pageSize: 10,
        title: "",
        cashingStatus: null,
        status: null,
        departmentCode: "", //部门编码
        departmentName: "", //部门名称
        addressCode: null, //区划编码
      },
      total: 0,
      //政策列表
      policyList: [
        // {
        //   title: '关于启动2023年遂宁市企业技术中心 认定工作的通知',
        //   dept: '遂宁市经济和信息化局',
        //   num: 6,
        //   time: '2023/06/14'
        // },
        // {
        //   title: '中共遂宁市委组织部 遂宁市人力资源和社会保障局 关于2023年第二批遂宁市“遂州英才” 考核招聘引进高层次人才和急需紧缺 专业技术人才的公告',
        //   dept: '中共遂宁市委组织部',
        //   num: 6,
        //   time: '2023/06/14'
        // },
      ],
    };
  },
  created() {
    // this.getDetail()
    this.getList();
  },
  mounted() {
    // let div = document.getElementById('aside')
    // div.remove()
  },
  methods: {
    goPolicyMatching() {
      this.getmsjxList();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //切换tabs1
    tabs1Click(val) {},
    choosearea(value) {
      // console.log(value);
      if (value.type == "nature") {
        this.getNature_bumen(value.value);
        if (value.value == "全部") {
          this.queryParam.addressCode = null;
        } else {
          this.queryParam.addressCode = value.value;
        }
        this.queryParam.departmentCode = null;
        this.queryParam.departmentName = null;
      } else if (value.type == "departmentName") {
        if (value.departName == "全部") {
          this.queryParam.departmentCode = null;
          this.queryParam.departmentName = null;
        } else {
          this.queryParam.departmentName = value.departName;
          this.queryParam.departmentCode = value.departCode;
        }
      } else if (value.type == "deptName") {
        this.getNature_quyu();
        this.queryParam.addressCode = null;
        if (value.value == "1") {
          this.queryParam.addressCode = "510100000000";
        } else if (value.value == "100000000000") {
          this.queryParam.addressCode = "100000000000";
        } else if (value.value == "5110000000000") {
          this.getNature_bumen("510000000000");
        }
      }
      // else if (value.type == 'deptName2') {
      //   if (value.value == '3') {
      //     this.queryParam.cashingStatus = null
      //   } else {
      //     this.queryParam.cashingStatus = value.value
      //   }
      // }
      this.queryParam.pageNo = 1
      this.getmsjxList();
    },
    search(key) {},
    // 数据获取
    async getList() {
      // 获取区域
      // this.getNature_quyu();
      // // 获取部门
      this.getNature_bumen(1);
      // // 获取政策列表数据
      this.getmsjxList();
    },
    // 获取区域
    async getNature_quyu() {
      let qlfc = await getNature_quyu({ parentId: 81 });
      this.choosedata.qlfc = qlfc.result.map((item) => {
        return { id: item.areaCode, name: item.areaName };
      });
    },
    // 获取部门
    async getNature_bumen(val) {
      if (val == 1) {
        this.choosedata.dept = [
          { id: "511", nameAbb: "全部", departName: "全部" },
        ];
      } else {
        let nature = await getNature_bumen({ areaCode: val });
        console.log(nature);
        nature.result.unshift({
          departCode: "全部",
          departSimpleName: "全部",
          departName: "全部",
        });
        this.choosedata.dept = nature.result.map((item) => {
          return {
            id: item.departCode,
            departName: item.departSimpleName,
            nameAbb: item.departSimpleName,
          };
        });
      }
    },
    //列表
    getmsjxList() {
      getmsjx(this.queryParam).then((res) => {
        // console.log(res);
        this.policyList = res.result.records;
        this.total = res.result.total;
      });
    },
    //详情
    goDetail(item) {
      getmsjx_xq({ id: item.id }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          const { href } = this.$router.resolve({
            path: "/policyDetail",
            query: {
              id: item.id,
              type: "1",
            },
          });
          window.open(href, "_blank");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

  .top_img {
    width: 100%;
  }

  .content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .search_box {
      width: 75rem;
      margin: 1.25rem auto 1.1875rem;
      height: 4.5rem;
      background: #f5f7fa;
      position: relative;
      padding-left: 1.625rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0.375rem;
        height: 100%;
        background: #2055c9;
        border-radius: 0.1875rem;
      }

      .title {
        font-size: 1.25rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 700;
        color: #000;
      }

      .input_box {
        .el-input {
          font-size: 16px;
        }

        ::v-deep .el-input__inner {
          width: 20.875rem;
          max-width: 30vw;
          height: 2.5rem;
          border-radius: 0;
          border: 0;
        }

        ::v-deep .el-input-group__append {
          border: none;
          background: #2055c9;
          border-radius: 0px;
          padding: 0 43px;
          font-size: 14px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }

    .policy_box {
      clear: both;

      .policy_item {
        position: relative;
        padding: 20px 0 0px 16px;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 34px;
          width: 0.1875rem;
          height: 0.1875rem;
          background: #2055c9;
        }

        .policy_title {
          display: flex;

          span {
            font-size: 1.25rem;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 700;
            color: #414143;
            line-height: 1.75rem;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // max-width: calc(100% - 12.5rem);
            max-width: 80%;
            margin-bottom: 20px;
            display: inline-block;
          }
        }

        .tag {
          height: 1.75rem;
          line-height: 1.75rem;
          padding: 0 0.75rem;
          border-radius: 0.3125rem;
          color: #fbfbfc;
          font-size: 0.875rem;
          margin-left: 0.75rem;
          display: inline-block;
        }

        .msjx {
          background: #2458ca;
        }

        .sbl {
          background: #dd6b47;
        }
      }

      .policy_detp {
        display: flex;
        font-size: 1rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #a3a2ad;
        line-height: 1.1875rem;
        padding-bottom: 20px;
        border-bottom: 1px solid #eeeeee;

        img {
          margin-right: 10px;
          vertical-align: middle;
          margin-top: -4px;
        }

        .page-view {
          margin: 0 120px;
        }

        .publish_text {
          margin-left: 120px;
        }
      }
    }

    .page {
      margin: 20px 0;
      text-align: end;
    }
  }
}
.policy_title1 {
  width: 900px;
  margin: auto;
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
  opacity: 0.5;
}
.policy_img {
  width: 900px;
  margin: auto;
  text-align: center;
}
.search_btn {
  font-size: 16px;
}
</style>