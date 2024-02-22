<template>
  <div class="container">
    <img src="~@/assets/hq_zc_pipei/topC.png" alt="" />

    <div class="content">
      <!-- <div class="Conditions">
        <div class="type">
          <div class="label">选择区划：</div>
          <div class="value" v-for="(item,index) in areaList"></div>
        </div>
      </div> -->
      <ConditionalSelection
        ref="ConditionalSelection"
        :loading="loadingBm"
        :choosedata="choosedata"
        @choosearea="choosearea"
        @search="search"
        :qlfcshow="true"
      >
      </ConditionalSelection>
      <div class="search_box">
        <div class="title">政策解读</div>
        <div class="input_box">
          <el-input
            placeholder="请输入标题或关键字"
            v-model="queryParam.likeParam"
            class="input-with-select"
          >
            <span slot="append" class="search_btn" @click="goPolicyMatching"
              ><span class="search_name">搜 索 </span>
              <el-button icon="el-icon-search"></el-button>
            </span>
          </el-input>
        </div>
      </div>
      <div class="policy_box">
        <div
          class="policy_item"
          v-for="(item, index) in policyList"
          :key="index"
        >
          <div class="policy_title">
            <el-tooltip :content="item.title" placement="bottom">
              <span @click="goDetail(item, index)">{{ item.title }}</span>
            </el-tooltip>
            <!-- <div
              class="tag"
              style="background: #dd6b47"
              v-if="item.izTopping == 1"
            >
              置顶
            </div> -->
          </div>
          <!-- <div class="policy_detp">
            <div>
              <img src="~@/assets/hq_zc_pipei/zcbq.png" alt="" />区划：{{
                item.addressName ? item.addressName : "/"
              }}
            </div>
            <div class="page-view">
              <img src="~@/assets/hq_zc_pipei/fwdw.png" alt="" />部门：{{
                item.departmentName ? item.departmentName : "/"
              }}
            </div>
            <div>
              <img src="~@/assets/hq_zc_pipei/fbrq.png" alt="" />发布日期：{{
                item.publishDate ? item.publishDate.slice(0, 10) : "/"
              }}
            </div>
          </div> -->
        </div>
      </div>
      <!-- 分页 -->
      <myPagination
        class="page"
        v-show="total > 0"
        :page.sync="queryParam.pageNo"
        :limit.sync="queryParam.pageSize"
        :total="total"
        @pagination="getzck"
      ></myPagination>
    </div>
  </div>
</template>

<script>
import ConditionalSelection from "../component/ConditionalSelection1.vue";
import { getNature, getzck, evaluation, tongji } from "./api";
import { getNature_quyu, getNature_bumen } from "../msjx/api";

export default {
  components: { ConditionalSelection },
  data() {
    return {
      // id: this.$route.query.id,
      policyName: "",
      form: {},
      loadingBm: false,
      //条件筛选
      choosedata: {
        area: [
          { name: "全部", id: "51" },
          // { name: "国家级", id: "100000000000" },
          { name: "省级", id: "510000000000" },
          { name: "市(州)级", id: "1" },
        ],
        urban: [],
        qlfc: [],
        dept: [],
      },
      // 查询政策库参数
      queryParam: {
        pageNo: 1,
        pageSize: 10,
        addressCode: 51,
        // deptName: "四川省",//区域码
        departmentCode: null, //部门id
        nature: null, //性质
        likeParam: undefined, //搜索关键字
      },
      total: null,
      //政策列表
      policyList: [],
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
      this.getzck();
    },
    choosearea(value) {
      console.log(value);
      if (value.type == "deptName2") {
        if (value.value === "511") {
          this.queryParam.addressCode = "510000000000";
          this.getNature_bumen("510000000000");
        } else {
          this.queryParam.addressCode = value.value;
          // this.getNature_bumen(value.value);
        }
      } else if (value.type == "departmentName") {
        if (value.value === "全部") {
          this.queryParam.departmentCode = null;
        } else {
          this.queryParam.departmentCode = value.value;
        }
      } else if (value.type == "nature") {
        if (value.value == "全部") {
          this.queryParam.nature = null;
        } else {
          this.queryParam.nature = value.value;
        }
      } else if (value.type == "deptName") {
        this.queryParam.addressCode = value.value;
        if (value.value == "1") {
          this.queryParam.addressCode = "5101";
          this.queryParam.departmentCode = null;
        }
        // else if (value.value == "5110000000000") {
        //   this.getNature_bumen("510000000000");
        //   this.queryParam.addressCode = "510000000000";
        //   this.queryParam.departmentCode = null;
        // }
        this.getNature_quyu();
      }
      this.queryParam.pageNo = 1;
      this.getzck();
    },
    search(key) {},
    // 数据获取
    async getList() {
      // 获取区域
      // this.getNature_quyu();
      // 获取资质类型
      let qlfc = await getNature();
      console.log(qlfc);
      qlfc.result.unshift({ id: "全部", natureName: "全部" });
      this.choosedata.qlfc = qlfc.result.map((item) => {
        return { id: item.id, name: item.natureName };
      });
      // 获取部门
      this.getNature_bumen("51");
      // 获取政策列表数据
      this.getzck();
    },
    // 获取区域
    async getNature_quyu() {
      let urban = await getNature_quyu({ parentId: 81 });
      console.log(urban);
      this.choosedata.urban = urban.result.map((item) => {
        let num = item.areaCode;
        let strNum = num.toString();
        let reverseStr = this.goStringOrder(strNum);
        let arrNum = reverseStr.split("00");
        let reversedArr = arrNum.reverse();
        let result = this.goStringOrder(reversedArr[0]);
        return { id: result, name: item.areaShortName };
      });
    },
    // 字符串倒序返回
    goStringOrder(str) {
      let arr = str.split("");
      arr.reverse();
      return arr.join("");
    },
    // 获取部门
    async getNature_bumen(val) {
      this.loadingBm = true;
      if (val == "51") {
        this.choosedata.dept = [];
        this.loadingBm = false;
        this.choosedata.dept = [
          { id: "511", nameAbb: "全部", departName: "/" },
        ];
      } else {
        let nature = await getNature_bumen({ areaCode: val });
        // console.log(nature);
        nature.result.unshift({
          departCode: "全部",
          departSimpleName: "全部",
          departName: "全部",
        });
        this.loadingBm = false;
        this.choosedata.dept = nature.result.map((item) => {
          return {
            id: item.departCode,
            departName: item.departSimpleName,
            nameAbb: item.departSimpleName,
          };
        });
      }
    },
    async getzck() {
      let res = await getzck(this.queryParam);
      console.log(res);
      this.policyList = res.result.records;
      // if (this.queryParam.pageNo == 1) {
      //   if (this.queryParam.addressCode == "51") {
      //     let obj = {};
      //     obj.title = "2023年省级惠企政策事项清单(第一批)";
      //     obj.izTopping = 1;
      //     obj.addressName = "四川省";
      //     obj.publishDate = "2023-12-12";
      //     this.policyList.unshift(obj);
      //     let obj1 = {};
      //     obj1.title = "2023年国家级惠企政策事项清单(第一批)";
      //     obj1.izTopping = 1;
      //     obj1.addressName = "国家级";
      //     obj1.publishDate = "2023-12-14";
      //     this.policyList.unshift(obj1);
      //   } else if (this.queryParam.addressCode == "510000000000") {
      //     let obj = {};
      //     obj.title = "2023年省级惠企政策事项清单(第一批)";
      //     obj.izTopping = 1;
      //     obj.addressName = "四川省";
      //     obj.publishDate = "2023-12-12";
      //     this.policyList.unshift(obj);
      //   } else if (this.queryParam.addressCode == "100000000000") {
      //     let obj1 = {};
      //     obj1.title = "2023年国家级惠企政策事项清单(第一批)";
      //     obj1.izTopping = 1;
      //     obj1.addressName = "国家级";
      //     obj1.publishDate = "2023-12-14";
      //     this.policyList.unshift(obj1);
      //   }
      // }
      // if (
      //   this.queryParam.addressCode == "510000000000" ||
      //   this.queryParam.addressCode == "51"
      // ) {
      //   if (this.queryParam.pageNo == 1) {
      //     let obj = {};
      //     obj.title = "2023年省级惠企政策事项清单(第一批)";
      //     obj.izTopping = 1;
      //     obj.addressName = "四川省";
      //     obj.publishDate = "2023-12-12";
      //     this.policyList.unshift(obj);
      //   }
      // }
      this.total = res.result.total;
    },
    //详情页
    goDetail(item, index) {
      // if (this.queryParam.addressCode == "510000000000") {
      //   if (this.queryParam.pageNo == 1 && index == 0) {
      //     const { href } = this.$router.resolve({
      //       path: "/pdfwj",
      //     });
      //     window.open(href, "_blank");
      //   } else {
      //     const { href } = this.$router.resolve({
      //       path: "/policyDetail",
      //       query: {
      //         id: item.id,
      //         type: item.bigClass == "通知" ? "2" : "3",
      //       },
      //     });
      //     window.open(href, "_blank");
      //   }
      // } else if (this.queryParam.addressCode == "51") {
      //   if (this.queryParam.pageNo == 1 && index == 0) {
      //     const { href } = this.$router.resolve({
      //       path: "/pdfwj1",
      //     });
      //     window.open(href, "_blank");
      //   } else if (this.queryParam.pageNo == 1 && index == 1) {
      //     const { href } = this.$router.resolve({
      //       path: "/pdfwj",
      //     });
      //     window.open(href, "_blank");
      //   } else {
      //     const { href } = this.$router.resolve({
      //       path: "/policyDetail",
      //       query: {
      //         id: item.id,
      //         type: item.bigClass == "通知" ? "2" : "3",
      //       },
      //     });
      //     window.open(href, "_blank");
      //   }
      // } else if (this.queryParam.addressCode == "100000000000") {
      //   if (this.queryParam.pageNo == 1 && index == 0) {
      //     const { href } = this.$router.resolve({
      //       path: "/pdfwj1",
      //     });
      //     window.open(href, "_blank");
      //   } else {
      //     const { href } = this.$router.resolve({
      //       path: "/policyDetail",
      //       query: {
      //         id: item.id,
      //         type: item.bigClass == "通知" ? "2" : "3",
      //       },
      //     });
      //     window.open(href, "_blank");
      //   }
      // } else {
      //   const { href } = this.$router.resolve({
      //     path: "/policyDetail",
      //     query: {
      //       id: item.id,
      //       type: item.bigClass == "通知" ? "2" : "3",
      //     },
      //   });
      //   window.open(href, "_blank");
      // }
      const { href } = this.$router.resolve({
        path: "/policyDetail",
        query: {
          id: item.id,
          type: "4",
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

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
          // font-size: 1.25rem;
          // font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          // color: #000;
          // line-height: 1.75rem;
          // cursor: pointer;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          // max-width: calc(100% - 12.5rem);
          // margin-bottom: 20px;
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
      }
    }

    .page {
      margin: 20px 0;
      text-align: end;
    }
  }
}

.search_btn {
  font-size: 16px;
}
</style>