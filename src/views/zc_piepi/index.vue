<template>
  <!-- hq_zc_pipei_result -->
  <div class="container">
    <img src="~@/assets/hq_zc_pipei/topB.png" alt="" />
    <div class="main">
      <!-- 公司信息 -->
      <div class="company_box">
        <div class="info">
          <div class="name">{{ info.name }}</div>
          <div class="code">
            <img
              src="~@/assets/hq_zc_pipei/tysh.png"
              alt=""
            />统一社会信用代码：<span class="code_num">{{
              info.property1
            }}</span>
          </div>
          <div class="address">
            <img src="~@/assets/hq_zc_pipei/zcdq.png" alt="" />注册地区：<span
              class="code_num"
              >{{ info.reg_location }}</span
            >
          </div>
        </div>
        <div class="fenxi">
          <div class="img_box">
            <img src="~@/assets/hq_zc_pipei/fxwc.png" alt="" />
            <span>分析完成</span>
          </div>
          <div class="conform">
            符合您企业申报的政策共 <span class="num"> {{ this.AllE }} </span> 个
          </div>
          <div class="predict">
            预计最多获得的额度 <span class="num">0.00</span> 万元
          </div>
          <div class="ljxgdwxx" v-if="this.$store.state.userInfo.type">
            资料越完整，匹配越精准，<a @click="xgbq">立即修改单位信息</a>
          </div>
        </div>
      </div>
      <!-- 政策 -->
      <div class="title-box">政策匹配</div>
      <div class="zc">
        <!-- tabs -->
        <div class="tabs">
          <el-tabs v-model="queryParams_zc.is" @tab-click="tabs1Click">
            <el-tab-pane :label="`申报期政策(0)`" name="1"></el-tab-pane>
            <el-tab-pane
              :label="`非申报期政策(${AllE})`"
              name="2"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <!-- myTabs tabs2-->
        <div
          class="myTabs"
          :class="
            sxIndex == 0
              ? 'isfirst'
              : sxIndex == 1
              ? 'issecord'
              : sxIndex == 2
              ? 'isthree'
              : 'isfour'
          "
        >
          <div
            class="myTabs_item"
            @click="sxItemClick(item, index)"
            :class="sxIndex == index ? 'sxChecked' : ''"
            v-for="(item, index) in myTabsList"
            :key="index"
          >
            <span>{{ item.label + "(" + item.value + ")" }}</span>
          </div>
        </div>
        <!-- 报告列表 -->
        <div class="report_list" v-if="zc_list.length > 0">
          <div
            class="report_list_item"
            v-for="(item, index) in zc_list"
            :key="index"
          >
            <!-- 左边一大坨 -->
            <div class="left">
              <div class="title">{{ item.title }}</div>
              <div class="detail1">
                <img src="@/assets/hq_zc_pipei/fbrq.png" alt="" /><span
                  class="left_text"
                  >发布日期：</span
                ><span class="right_text"> {{ item.publishDate }}</span>
              </div>
              <div class="detail1">
                <img src="@/assets/hq_zc_pipei/fwdw.png" alt="" /><span
                  class="left_text"
                  >发文单位：</span
                ><span class="right_text"> {{ item.departmentName }}</span>
              </div>
              <div class="detail1">
                <img src="@/assets/hq_zc_pipei/sbrq.png" alt="" /><span
                  class="left_text"
                  >申报日期：</span
                ><span class="right_text">
                  {{ item.releaseDate.split(" ")[0] }}</span
                >
              </div>
              <div class="detail1">
                <img src="@/assets/hq_zc_pipei/fczj.png" alt="" />
                <span class="left_text">扶持资金：</span
                ><span class="num right_text" v-if="item.totalSupportAmount"
                  >{{ item.totalSupportAmount }}万元</span
                >
                <span class="num right_text" v-else>0.00万元</span>
              </div>
              <!-- 类型 -->
              <div class="types">
                <img src="@/assets/hq_zc_pipei/zcbq.png" alt="" /><span class="left_text">政策标签：</span>
                <div v-for="(item1, index) in item.policyTagList"
                :key="index">
                  <div
                    class="type"
                    v-if="index < 4"
                  >
                    <span>{{ item1.tagName }}</span>
                  </div>
                  <div
                    class="type"
                    v-else-if="index == 4"
                  >
                    <span>...</span>
                  </div>
                </div>
                
              </div>
            </div>
            <!-- 匹配度 -->
            <div class="num">
              <div class="text">匹配度</div>
              <div class="value">{{ item.matchedDegree }}</div>
            </div>
            <div class="btn" @click="goBaogao(item)">
              <span>查看匹配报告</span>
            </div>
          </div>
          <div class="my_pagination">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="queryParams_zc.pageNo"
              :page-size="queryParams_zc.pageSize"
              layout="total, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
        <div v-else>
          <Empty :description="'无匹配政策'"></Empty>
        </div>
      </div>
    </div>
    <PolicyMatching @success="success" ref="Matching" />
  </div>
</template>

<script>
// import { zc_pipei, getLevelList, getZc } from "@/views/hq_zc_pipei_result/api";
import { getNatureQuyu, getZc, pagelist, companytag } from "./api";
import PolicyMatching from "@/views/component/PolicyMatching";
import myPagination from "@/views/component/myPagination";
export default {
  components: {
    PolicyMatching,
    myPagination,
  },
  data() {
    return {
      infoName: this.$route.query.val,
      activeName: "1",
      // myTabs列表
      myTabsList: [
        { label: "全部", value: 0 },
        { label: "省级", value: 0, type: 2 },
        { label: "市级", value: 0, type: 3 },
        // { label: "全部", value: 1 },
        // { label: "全部", value: 0, type: 0 },
        // { label: "中央", value: 0, type: 1 },
        // { label: "省级", value: 0, type: 2 },
        // { label: "市级", value: 0, type: 3 },
      ],
      zc_list: [],
      // 是否选中
      sxIndex: 0,
      // tab1 tab2 数量
      newData: { all: 0 },
      oldData: { all: 0 },
      // 查询政策列表参数
      queryParams_zc: {
        is: "2",
        pageNo: 1,
        pageSize: 20,
        useLevel: "",
      },
      // 最大额度
      maxSupportAmount: 0.0,
      // 企业信息
      info: {},
      // 新增加逻辑
      AllE: 0,
      total: null,
    };
  },
  created() {
    this.getInfo();
  },
  filters: {
    reaplaceyuan(i) {
      if (i == "0.00万元") {
        return "/";
      }
    },
  },
  methods: {
    //切换tabs1
    tabs1Click(val) {
      // this.getTab2();
      this.queryParams_zc.pageNo = 1;
      this.sxIndex = 0;
      if (this.queryParams_zc.is === "2") {
        this.queryParams_zc.useLevel = ""
        this.getZcList();
      } else {
        this.zc_list = [];
        this.myTabsList[0].value = 0;
        this.myTabsList[1].value = 0;
        this.myTabsList[2].value = 0;
      }
    },
    tabs2Click() {},
    // 获取一二级tab数据
    // async getTab2 () {
    // },
    // 事项列表条件 tabs2
    sxItemClick(item, index) {
      this.sxIndex = index;
      if (this.queryParams_zc.is === "2") {
        this.queryParams_zc.pageNo = 1;
        this.queryParams_zc.useLevel = item.type;
        this.getZcList();
      }
    },
    // 获取区域
    async getNature_quyu() {
      let urban = await getNatureQuyu({ province: 81, parentId: 81 });
      urban.result.unshift({ areaCode: "510000000000", areaName: "全部" });
      this.choosedata = urban.result.map((item) => {
        if (item.areaCode === this.$route.query.addressCode) {
          return item.areaName;
        }
      });
      if (this.choosedata.length > 0) {
        this.choosedata = this.choosedata.filter((res) => {
          return res !== undefined;
        });
        this.info = {
          name: this.$route.query.entname,
          property1: this.$route.query.uniscid,
          reg_location: this.choosedata[0],
        };
      }
    },
    // 获取企业信息
    getInfo() {
      this.getNature_quyu();
      // this.getTab2();
      if (this.queryParams_zc.is === "2") {
        this.getZcList();
      }
    },
    // 获取政策列表
    async getZcList() {
      this.zc_list = [];
      const tDos = localStorage.getItem("DLone");
      if (this.$route.query.isActive === "true") {
        this.queryParams_zc.companyTagIds = tDos;
        this.queryParams_zc.addressCode = this.$route.query.addressCode;
        let res = await getZc(this.queryParams_zc);
        // 获取最大额度 获取标签数据
        res.result.records.map((item) => {
          this.maxSupportAmount = Math.max(
            this.maxSupportAmount,
            item.totalSupportAmount
          );
        });
        this.myTabsList.filter((arr) => {
          if (arr.type === 3) {
            arr.value = res.result.map.city;
          } else if (arr.type === 2) {
            arr.value = res.result.map.province;
          } else {
            arr.value = res.result.map.all;
          }
        });
        this.AllE = res.result.map.all;
        this.total = res.result.total;
        this.zc_list = res.result.records;
      } else {
        this.queryParams_zc.companyId = this.$route.query.id; //企业名称
        this.queryParams_zc.addressCode = this.$route.query.addressCode;
        let res = await pagelist(this.queryParams_zc);
        // 获取最大额度 获取标签数据
        res.result.records.map((item) => {
          this.maxSupportAmount = Math.max(
            this.maxSupportAmount,
            item.totalSupportAmount
          );
        });
        this.myTabsList.filter((arr) => {
          if (arr.type === 3) {
            arr.value = res.result.map.city;
          } else if (arr.type === 2) {
            arr.value = res.result.map.province;
          } else {
            arr.value = res.result.map.all;
          }
        });
        this.AllE = res.result.map.all;
        this.total = res.result.total;
        this.zc_list = res.result.records;
      }
    },
    // 修改标签搜索
    success() {
      this.queryParams_zc.pageNo = 1;
      this.getZcList();
    },
    // 编辑标签
    xgbq() {
      companytag({
        companyId: this.$route.query.id,
      }).then((res) => {
        if (res.code === 200) {
          res.result.id = this.$route.query.id;
          res.result.entname = this.$route.query.entname;
          this.$refs.Matching.dialogEite(res.result);
        }
      });
    },
    // 查看报告
    goBaogao(data) {
      // tongji({ type: "HQZCT_3_4" })
      const { href } = this.$router.resolve({
                path: "/matchingDetail",
                query: {
                  name: this.info.name,
                  id: data.id,
                  Qtid: this.$route.query.id
                },
              });
              window.open(href, '_blank');
    },

    //翻页
    handleCurrentChange(arr) {
      this.queryParams_zc.pageNo = arr;
      this.getZcList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

  .main {
    width: 1200px;
    margin: 0 auto;

    // 公司信息
    .company_box {
      display: flex;
      margin-top: 20px;

      .info {
        width: 642px;
        min-height: 189px;
        background: rgba(32, 85, 201, 0.04);
        border: 1px solid #2055c9;
        box-shadow: 0px 0px 4px 0px rgba(227, 227, 227, 0.5);
        // border-radius: 4px;
        padding: 30px 40px;

        .code_num {
          color: #333;
        }

        .name {
          font-size: 33px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 500;
          color: #000000;
        }

        .code {
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #999999;
          margin-top: 28px;

          img {
            margin-right: 10px;
          }
        }

        .address {
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #999999;
          margin-top: 8px;

          img {
            margin-right: 10px;
          }
        }
      }

      .fenxi {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 30px 0 30px 30px;

        .img_box {
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #2055c9;
          height: 30px;
          line-height: 30px;

          img {
            vertical-align: middle;
          }

          span {
            margin-left: 10px;
          }
        }

        .conform {
          font-size: 24px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #333333;

          .num {
            color: #2055c9;
            margin: 0 3px;
          }
        }

        .predict {
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;

          .num {
            color: #cf3d22;
            font-size: 30px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            margin: 0 3px;
          }
        }
      }
    }

    .title-box {
      height: 4.5rem;
      background: #f5f7fa;
      padding: 1.625rem 2rem;
      position: relative;
      margin: 1.875rem 0 1.25rem;
      font-size: 1.25rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 700;
      color: #000;
      line-height: 1.25rem;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0.375rem;
        background: #2055c9;
        border-radius: 0.1875rem;
      }
    }

    // 政策
    .zc {
      .tabs {
        margin-top: 40px;

        ::v-deep .el-tabs__active-bar {
          width: 175px !important;
          height: 4px;
          background: #2055c9;
        }

        ::v-deep .el-tabs__header {
          margin-bottom: 19px;
        }

        ::v-deep .el-tabs__item {
          width: 175px !important;
          font-size: 20px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #858585;
          // margin: 0 14px;
          margin-bottom: 14px;
          padding: 0;
          text-align: center;
        }

        ::v-deep .el-tabs__item.is-active {
          color: #2055c9;
          font-weight: 700;
        }

        ::v-deep .el-tabs__nav-wrap::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 1px;
          width: 100%;
          height: 1px;
          background-color: #dddddd;
          z-index: 1;
        }
      }
    }

    .myTabs {
      width: max-content;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 20px;
      margin-bottom: 10px;
      border: 1px solid #e1e5f1;
      border-radius: 5px;
      overflow: hidden;
      // padding: 2px;
      // border-left: transparent;

      .myTabs_item {
        // width: 76px;
        // height: 34px;
        padding: 11px 45px;
        background: #fff;
        // border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #e1e5f1;
        // margin-right: 8px;
        cursor: pointer;

        &:first-child {
          border-left: transparent;
        }

        span {
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
        }
      }
    }

    // 报告列表
    .report_list {
      padding-bottom: 99px;

      .report_list_item {
        width: 1160px;
        // height: 150px;
        background: rgba(255, 255, 255, 0.4);
        border-bottom: 1px solid #e1e1e1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding: 0 0 20px 18px;
        margin: 0 0 20px 18px;
        padding-bottom: 20px;

        // 左边一大坨
        .left {
          width: 600px;
          height: 100%;

          img {
            width: 14px;
            height: 14px;
            // transform: translateY(2px);
          }

          .title {
            margin-top: 16px;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            margin-bottom: 24px;
          }

          .detail1 {
            // margin-top: 9px;
            // margin-bottom: 8px;
            height: 32px;
            line-height: 32px;

            .left_text {
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #999999;
              margin-left: 10px;
            }

            .right_text {
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #2055c9;
            }
          }

          // 类型
          .types {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .left_text {
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #999999;
              margin-left: 10px;
              flex: 0 0 auto;
            }

            .type {
              padding: 3px 8px 3px 8px;
              background: #e9eefb;
              border-radius: 3px;
              border: 1px solid #e9eefb;
              margin-right: 6px;
              overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
              span {
                font-size: 14px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #2055c9;
              }
            }
          }
        }

        // 匹配度
        .num {
          width: 102px;
          height: 40px;
          transform: translateY(-10px);

          .text {
            font-size: 16px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #333333;
          }

          .value {
            margin-top: 15px;
            font-size: 30px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            color: #2055c9;
          }
        }

        // .查看报告按钮
        .btn {
          float: right;
          width: 148px;
          height: 42px;
          background: #2055c9;
          border-radius: 21px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          span {
            font-size: 16px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }

      .my_pagination {
        display: flex;
        justify-content: end;
        padding-right: 18px;

        ::v-deep .el-pagination.is-background .el-pager li {
          margin: 0;
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #d1dce5;
          border-left: none;
          border-radius: 0;
        }

        ::v-deep .el-pagination.is-background .btn-prev {
          margin: 0;
          height: 30px;
          line-height: 30px;
          // padding: 0 10px;
          border: 1px solid #d1dce5;
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
          border: 1px solid #d1dce5;
          border-radius: 0;
          border-left: none;

          .el-icon {
            font-size: 16px;
          }
        }

        ::v-deep
          .el-pagination.is-background
          .el-pager
          li:not(.disabled).active {
          background: #2055c9;
          border-color: #2055c9;
          color: #fff !important;
        }

        ::v-deep
          .el-pagination.is-background
          .el-pager
          li:not(.disabled):hover {
          color: #2055c9;
        }

        ::v-deep .el-pagination__total {
          height: 32px;
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #48576a;
          line-height: 32px;
        }
      }
    }
  }
}

.sxChecked {
  // background: #1f59d8 !important;
  // border: 1px solid #0656e0;
  // margin: 2px;
  // padding: 10px 44px !important;
  position: relative;

  &::before {
    content: "";
    height: 90%;
    width: 96%;
    position: absolute;
    // padding: 2px;
    background: rgba(32, 85, 201, 0.1);
  }

  span {
    color: #2055c9 !important;
    font-weight: 700 !important;
  }
}

.isfirst {
  .myTabs_item {
    &:nth-child(2) {
      border-left: none !important;
    }
  }
}

.issecord {
  .myTabs_item {
    &:nth-child(2) {
      border-left: none !important;
    }

    &:nth-child(3) {
      border-left: none !important;
    }
  }
}

.isthree {
  .myTabs_item {
    &:nth-child(4) {
      border-left: none !important;
    }

    &:nth-child(3) {
      border-left: none !important;
    }
  }
}

.isfour {
  .myTabs_item {
    &:nth-child(4) {
      border-left: none !important;
    }
  }
}
.ljxgdwxx {
  margin-top: 10px;
  a {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1f59d8;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
