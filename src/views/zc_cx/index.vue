<template>
  <div class="container">
    <img src="~@/assets/zc_cx/top.png" alt="" />
    <div class="content">
      <div class="search_box">
        <div class="title">政策查询</div>
        <div class="input_box">
          <el-input
            placeholder="请输入标题或关键字"
            v-model="policyName2"
            class="input-with-select"
          >
            <span slot="append" class="search_btn" @click="goPolicyMatching"
              ><span class="search_name">查询</span>
              <el-button icon="el-icon-search"></el-button>
            </span>
          </el-input>
        </div>
      </div>
      <div class="policy_box">
        <div class="tabs_box">
          <div class="tabs">
            <span
              @click="checkType(item, index)"
              v-for="(item, index) in typeList"
              :key="index"
              :class="isact == index ? 'isactive' : ''"
              >{{ item.title }}({{ item.num }})</span
            >
          </div>
          <div class="search_time">
            为您找到相关结果约 <span class="color_blue">{{ total3 }}个</span
            ><span class="line">|</span>用时约<span class="color_blue"
              >{{ times }}秒</span
            >
          </div>
        </div>
        <div v-if="isact == 0">
          <div
            class="policy_item"
            @click="goPolicyDetail(item, index)"
            v-for="(item, index) in policyList"
            :key="index"
          >
            <div class="title-box">
              <div class="icon"></div>
              <div class="title" v-if="!htmlShow">{{ item.title }}</div>
              <div class="title" v-html="item.title" v-if="htmlShow"></div>
            </div>
            <div class="other-info">
              <div class="quh">
                <img src="~@/assets/hq_zc_pipei/qh.png" alt="" />
                <span
                  >区划：{{ item.addressName ? item.addressName : "/" }}</span
                >
              </div>
              <div class="dept">
                <img src="~@/assets/hq_zc_pipei/fwdw.png" alt="" />
                <span
                  >部门：{{
                    item.departmentName ? item.departmentName : "/"
                  }}</span
                >
              </div>
              <!-- <div class="view">
                <img src="~@/assets/hq_zc_pipei/zcbq.png" alt="">
                <span>浏览量：{{ item.pageView }}</span>
              </div> -->
              <div class="time">
                <img src="~@/assets/hq_zc_pipei/fbrq.png" alt="" />
                <span
                  >发布日期：{{
                    item.publishDate ? item.publishDate.slice(0, 10) : "/"
                  }}</span
                >
              </div>
            </div>
          </div>
          <Empty
            v-if="policyList.length === 0"
            :description="'无匹配政策'"
          ></Empty>
          <myPagination
            class="page"
            :page.sync="queryParam.pageNo"
            :limit.sync="queryParam.pageSize"
            :total="total"
            @pagination="getList"
          ></myPagination>
        </div>
        <div v-else>
          <div
            class="policy_item"
            v-for="(item, index) in policyList2"
            :key="index"
          >
            <div class="title-box">
              <div class="icon"></div>
              <div
                class="title"
                @click="goPolicyDetail2(item, index)"
                v-if="!htmlShow"
              >
                {{ item.title }}
              </div>
              <div
                class="title"
                @click="goPolicyDetail2(item, index)"
                v-html="item.title"
                v-if="htmlShow"
              ></div>
            </div>
            <div class="other-info">
              <div class="quh">
                <img src="~@/assets/hq_zc_pipei/qh.png" alt="" />
                <span
                  >区划：{{ item.addressName ? item.addressName : "/" }}</span
                >
              </div>
              <div class="dept">
                <img src="~@/assets/hq_zc_pipei/fwdw.png" alt="" />
                <span
                  >部门：{{
                    item.departmentName ? item.departmentName : "/"
                  }}</span
                >
              </div>
              <!-- <div class="view">
                <img src="~@/assets/hq_zc_pipei/zcbq.png" alt="">
                <span>浏览量：{{ item.pageView }}</span>
              </div> -->
              <div class="time">
                <img src="~@/assets/hq_zc_pipei/fbrq.png" alt="" />
                <span
                  >发布日期：{{
                    item.publishDate ? item.publishDate.slice(0, 10) : "/"
                  }}</span
                >
              </div>
            </div>
          </div>
          <Empty
            v-if="policyList2.length === 0"
            :description="'无匹配政策'"
          ></Empty>
          <myPagination
            class="page"
            :page.sync="queryParam2.pageNo"
            :limit.sync="queryParam2.pageSize"
            :total="total2"
            @pagination="getList2"
          ></myPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getzc_list } from "./api";

export default {
  data() {
    return {
      // id: this.$route.query.id,
      policyName2: "",
      form: {},
      htmlShow: false,
      //政策查询条件
      queryParam: {
        pageNo: 1,
        pageSize: 10,
        likeParam: null,
        addressCode: "510000",
        searchType: "policy",
      },
      //政策解读查询条件
      queryParam2: {
        pageNo: 1,
        pageSize: 10,
        likeParam: null,
        addressCode: "510000",
        searchType: "interpretation",
      },
      total: 0,
      total2: 0,
      activeName: "second",
      isact: 0,
      typeList: [
        {
          title: "政策库",
          num: 0,
        },
        {
          title: "政策解读",
          num: 0,
        },
      ],
      policyList: [],
      policyList2: [],
      //用时
      times: "",
    };
  },
  created() {
    // console.log(this.$route.query);
    if (this.$route.query.name.indexOf("?") != -1) {
      let index2 = this.$route.query.name.indexOf("?");
      this.policyName2 = this.$route.query.name.slice(0, index2);
      this.queryParam.likeParam = this.policyName2;
      this.queryParam2.likeParam = this.policyName2;
    } else {
      this.policyName2 = this.$route.query.name;
      this.queryParam.likeParam = this.policyName2;
      this.queryParam2.likeParam = this.policyName2;
    }

    this.getList();
    this.getList2();
    // this.getDetail()
  },
  computed: {
    total3() {
      return this.total + this.total2;
    },
  },
  mounted() {
    // let div = document.getElementById('aside')
    // div.remove()
  },
  methods: {
    async getList() {
      let res = await getzc_list(this.queryParam);
      this.total = res.result.policyPage.total;
      this.policyList = res.result.policyPage.records;
      if (this.queryParam.likeParam) {
        this.htmlShow = true;
      } else {
        this.htmlShow = false;
      }
      this.typeList[0].num = this.total;
      this.times = res.result.times;
    },
    async getList2() {
      console.log(this.queryParam2.likeParam);
      let res = await getzc_list(this.queryParam2);
      this.total2 = res.result.interpretationPage.total;
      this.policyList2 = res.result.interpretationPage.records;
      if (this.queryParam2.likeParam) {
        this.htmlShow = true;
      } else {
        this.htmlShow = false;
      }
      console.log(this.htmlShow);
      this.typeList[1].num = this.total2;
    },
    goPolicyMatching() {
      this.queryParam.likeParam = this.policyName2;
      this.queryParam2.likeParam = this.policyName2;
      this.getList();
      this.getList2();
    },
    //切换tabs1
    checkType(item, index) {
      this.isact = index;
    },
    // 跳转详情 -- 政策
    goPolicyDetail(item, index) {
      const { href } = this.$router.resolve({
        path: "/policyDetail",
        query: {
          id: item.id,
          type: "3",
        },
      });
      window.open(href, "_blank");
    },
    // 跳转详情  -- 政策解读
    goPolicyDetail2(item, index) {
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
          font-size: 16px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }

    .policy_box {
      clear: both;

      .tabs_box {
        border-bottom: 0.0625rem solid #e1e5f1;
        display: flex;
        justify-content: space-between;

        .tabs {
          display: flex;
          cursor: pointer;

          span {
            font-size: 1.25rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #a3a2ad;
            line-height: 1.8125rem;
            padding: 20px 1.5rem;
            display: block;
          }

          .isactive {
            font-weight: 700;
            color: #2055c9;
            position: relative;

            // border-bottom: 4px solid #2055c9;
            &::after {
              content: "";
              width: 100%;
              height: 0.25rem;
              background: #2055c9;
              border-radius: 0.125rem;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }

        .search_time {
          font-size: 1rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          color: #a3a2ad;
          padding: 25px 0 15px;

          .color_blue {
            color: #2055c9;
            margin: 0 0.375rem;
          }

          .line {
            margin: 0 20px;
          }
        }
      }

      .policy_item {
        .title-box {
          padding-top: 1.8125rem;
          padding-bottom: 1.5625rem;
          display: flex;

          .icon {
            width: 0.1875rem;
            height: 0.1875rem;
            background: #2055c9;
            margin-top: 0.625rem;
          }

          .title {
            font-size: 1.25rem;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 700;
            color: #535256;
            line-height: 1.625rem;
            margin-left: 1.1875rem;
            cursor: pointer;
          }
        }

        .other-info {
          font-size: 1rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          color: #a3a2ad;
          line-height: 1.1875rem;
          display: flex;
          align-items: center;
          // padding-left: 1.1875rem;
          margin-left: 1.1875rem;
          padding-bottom: 1.1875rem;
          border-bottom: 1px solid #e1e5f1;

          .quh {
            flex: 1;

            img {
              vertical-align: middle;
              margin-top: -4px;
              margin-right: 10px;
            }
          }

          .dept {
            flex: 1;

            img {
              vertical-align: middle;
              margin-top: -4px;
              margin-right: 10px;
            }
          }

          .view {
            flex: 1;
            text-align: center;

            img {
              vertical-align: middle;
              margin-top: -4px;
              margin-right: 10px;
            }
          }

          .time {
            flex: 1;
            text-align: left;

            img {
              vertical-align: middle;
              margin-top: -4px;
              margin-right: 10px;
            }
          }
        }
      }

      .page {
        margin: 20px 0;
        text-align: end;
      }
    }
  }
}

.search_btn {
  font-size: 16px;
}
</style>