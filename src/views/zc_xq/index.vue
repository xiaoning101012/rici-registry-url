<template>
  <div class="container">
    <img class="top-img" src="~@/assets/hq_zc_pipei/topC.png" alt="" />

    <!-- 政策信息 -->
    <div class="main">
      <!-- 政策标题 -->
      <div class="title" v-html="form.title"></div>
      <!-- 政策信息 -->
      <div class="info" v-if="type != 4">
        <div class="num">
          区划：{{ form.addressName ? form.addressName : "/" }}
        </div>
        <div class="num">
          部门：{{ form.departmentName ? form.departmentName : "/" }}
        </div>
        <!-- <div class="num">浏览量：{{ form.pageView }}人次</div> -->
        <div class="time">
          发布日期：{{ form.releaseDate ? form.releaseDate : "/" }}
        </div>
      </div>
      <!-- 界线 -->
      <div class="line"></div>
      <!-- 正文内容 -->
      <div class="main_content" v-html="form.content"></div>
      <div class="hqPolicy" v-if="form.hqPolicyFileList.length > 0">
        <div style="margin-bottom: 10px; font-weight: 600; font-size: 16px">
          附件：
        </div>
        <div
          class="hqPolicy-for"
          v-for="item in form.hqPolicyFileList"
          :key="item.id"
          @click="fujian(item)"
        >
          {{ item.fileName }}
        </div>
      </div>
      <div
        class="originalAddress"
        @click="originalAddressFun"
        v-if="form.originalAddress"
      >
        点击查看原文>>
      </div>

      <div class="originalAddress" v-if="form.hqPolicyInterpretList.length > 0">
        点击查看相关政策解读>>
        <div
          v-for="item in form.hqPolicyInterpretList"
          :key="item.id"
          @click="originalAddressFun2(item)"
          style="margin-top: 10px"
        >
          {{ item.interpretName }}
        </div>
      </div>
      <div class="originalAddress" v-if="form.hqPolicyContentList.length > 0">
        点击查看相关政策>>
        <div
          v-for="item in form.hqPolicyContentList"
          :key="item.id"
          @click="originalAddressFun1(item)"
          style="margin-top: 10px"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getzc_xq, getzcjd_xq } from "@/views/zc_xq/api";
import { getmsjx_xq } from "../msjx/api";

export default {
  data() {
    return {
      id: this.$route.query.id,
      form: {
        title: "",
        pageView: null,
        releaseDate: "",
        content: "",
        originalAddress: undefined,
        hqPolicyFileList: [],
        hqPolicyInterpretList: [],
        hqPolicyContentList: [],
      },
      type: this.$route.query.type, //1免审即享  2政策  3政策解读
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {
    // let div = document.getElementById('aside')
    // div.remove()
  },
  methods: {
    fujian(data) {
      // getStatic(data.fileUrl).then((res) => {
      //   console.log(res);
      // });
      // console.log(data);
      let href =
        process.env.VUE_APP_BASE_API + "/sys/common/static/" + data.fileUrl;
      window.open(href);
    },
    hqPolicyFun(item) {
      let url = process.env.VUE_APP_BASE_API;
      console.log(url);
      window.open(url + "/" + item.fileUrl);
    },
    originalAddressFun() {
      window.open(this.form.originalAddress);
    },
    originalAddressFun1(item) {
      const { href } = this.$router.resolve({
        path: "/policyDetail",
        query: {
          id: item.id,
          type: "2",
        },
      });
      window.open(href, "_blank");
    },
    originalAddressFun2(item) {
      const { href } = this.$router.resolve({
        path: "/policyDetail",
        query: {
          id: item.id,
          type: "4",
        },
      });
      window.open(href, "_blank");
    },
    getDetail() {
      if (this.type.includes("?")) {
        this.type = this.type.slice(0, this.type.indexOf("?"));
      }
      // let res = await getzc_xq(this.id)
      // res.data.content = res.data.content.replace(/(<p)/g, '$1 style="margin-bottom: 20px;font-size: 16px;font-family: SimSun;font-weight: 400;color: #000000;line-height: 2;text-indent: 2em;margin-top: 2em;"')
      // this.form = res.data
      if (this.type == "1") {
        getmsjx_xq({ id: this.id }).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.form.title = res.result.title;
            this.form.pageView = res.result.pageView;
            this.form.releaseDate = res.result.publishDate;
            // this.form.content = res.result.content.replace(
            //   /(<p)/g,
            //   '$1 style="margin-bottom: 20px;font-size: 16px;font-family: SimSun;font-weight: 400;color: #000000;line-height: 2;text-indent: 2em;margin-top: 2em;"'
            // );
            if (res.result.content && res.result.content.length) {
              let list = res.result.content.split("\n");
              list.forEach((item, index) => {
                const publicStyle =
                  '$1 style="margin-bottom: 20px;font-size: 16px;font-family: SimSun;font-weight: 400;color: #000000;line-height: 2;margin-top: 2em;"';
                const style =
                  publicStyle.slice(0, publicStyle.length - 1) +
                  (item.includes("text-align: center")
                    ? 'text-align: center;"'
                    : item.includes("text-align: right")
                    ? 'text-align: right;"'
                    : 'text-indent: 2em;"');
                list[index] = item.replace(/(<p)/, style);
              });
              this.form.content = list.join("\n");
            } else {
              this.form.content = res.result.content;
            }
            let contentStr = this.form.content.replace(
              new RegExp("https://59.225.199.214:9200/enter-api/", "g"),
              "https://www.sczwfw.gov.cn/zqsk/enter-api/"
            );
            console.log(contentStr);
            this.form.content = contentStr;
            this.form.addressName = res.result.addressName;
            this.form.departmentName = res.result.departmentName;
            this.form.originalAddress = res.result.originalAddress;
            this.form.hqPolicyFileList = res.result.hqPolicyFileList || [];
            console.log(res.result);
          }
        });
      } else if (this.type == "2" || this.type == "3") {
        getzc_xq({ id: this.id }).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.form.title = res.result.title;
            this.form.pageView = res.result.pageView;
            this.form.releaseDate = res.result.publishDate;
            // this.form.content = res.result.content;
            // this.form.content = res.result.content.replace(
            //   /(<p)/g,
            //   '$1 style="margin-bottom: 20px;font-size: 16px;font-family: SimSun;font-weight: 400;color: #000000;line-height: 2;text-indent: 2em;margin-top: 2em;"'
            // );
            if (res.result.content && res.result.content.length) {
              let list = res.result.content.split("\n");
              list.forEach((item, index) => {
                const publicStyle =
                  '$1 style="margin-bottom: 20px;font-size: 16px;font-family: SimSun;font-weight: 400;color: #000000;line-height: 2;margin-top: 2em;"';
                const style =
                  publicStyle.slice(0, publicStyle.length - 1) +
                  (item.includes("text-align: center")
                    ? 'text-align: center;"'
                    : item.includes("text-align: right")
                    ? 'text-align: right;"'
                    : 'text-indent: 2em;"');
                list[index] = item.replace(/(<p)/, style);
              });
              this.form.content = list.join("\n");
            } else {
              this.form.content = res.result.content;
            }
            let contentStr = this.form.content.replace(
              new RegExp("https://59.225.199.214:9200/enter-api/", "g"),
              "https://www.sczwfw.gov.cn/zqsk/enter-api/"
            );
            console.log(contentStr);
            this.form.content = contentStr;
            //this.form.content = res.result.content.replace(
            //  /(<img)/g,
            // '$1 style="width: 860px;"'
            //);
            this.form.addressName = res.result.addressName;
            this.form.departmentName = res.result.departmentName;
            this.form.originalAddress = res.result.originalAddress;
            this.form.hqPolicyFileList = res.result.hqPolicyFileList || [];
            this.form.hqPolicyInterpretList =
              res.result.hqPolicyInterpretList || [];
            console.log(res.result);
          }
        });
      } else if (this.type == "4") {
        getzcjd_xq({ id: this.id }).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.form.title = res.result.interpretName;
            this.form.pageView = res.result.pageView;
            this.form.releaseDate = res.result.publishDate;
            this.form.originalAddress = res.result.originalAddress;
            // this.form.content = res.result.content.replace(
            //   /(<p)/g,
            //   '$1 style="margin-bottom: 20px;font-size: 16px;font-family: SimSun;font-weight: 400;color: #000000;line-height: 2;text-indent: 2em;margin-top: 2em;"'
            // );
            if (res.result.content && res.result.content.length) {
              let list = res.result.content.split("\n");
              list.forEach((item, index) => {
                const publicStyle =
                  '$1 style="margin-bottom: 20px;font-size: 16px;font-family: SimSun;font-weight: 400;color: #000000;line-height: 2;margin-top: 2em;"';
                const style =
                  publicStyle.slice(0, publicStyle.length - 1) +
                  (item.includes("text-align: center")
                    ? 'text-align: center;"'
                    : item.includes("text-align: right")
                    ? 'text-align: right;"'
                    : 'text-indent: 2em;"');
                list[index] = item.replace(/(<p)/, style);
              });
              this.form.content = list.join("\n");
            } else {
              this.form.content = res.result.content;
            }
            let contentStr = this.form.content.replace(
              new RegExp("https://59.225.199.214:9200/enter-api/", "g"),
              "https://www.sczwfw.gov.cn/zqsk/enter-api/"
            );
            console.log(contentStr);
            this.form.content = contentStr;
            // this.form.content = res.result.content.replace(
            //   /(<img)/g,
            //   '$1 style="width: 860px;"'
            // );
            this.form.addressName = res.result.addressName;
            this.form.departmentName = res.result.departmentName;
            this.form.hqPolicyContentList =
              res.result.hqPolicyContentList || [];
            console.log(res.result);
          }
        });
      }
      // }
      // else if (this.type == '3') {
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }

  .main {
    width: 1200px;
    // height: 1368px;
    margin: 0 auto;

    .title {
      font-size: 30px;
      width: 900px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000;
      margin: 0 auto;
      text-align: center;
      margin-top: 2.125rem;
      margin-bottom: 30px;
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #999;
      padding-bottom: 0.75rem;
      border-bottom: 0.0625rem solid #999;
      width: 860px;
      margin: 0 auto;

      .time,
      .dept,
      .num {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999;
        margin-left: 30px;
      }
    }

    .line {
      margin: auto;
      width: 860px;
      height: 1px;
      background: rgba(204, 204, 204, 0.4);
    }

    // .main_title {
    //   max-width: 600px;
    //   font-size: 18px;
    //   font-family: PingFangSC-Regular, PingFang SC;
    //   font-weight: 400;
    //   color: #000000;
    //   margin: 0 auto;
    //   margin-top: 39px;
    //   margin-bottom: 22px;
    // }
    .main_content {
      margin: 0 auto;
      min-height: 500px;
      margin-top: 39px;
      margin-bottom: 39px;
      width: 860px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      img {
        width: 860px;
      }
      // p {
      //   margin-bottom: 20px;
      //   font-size: 16px;
      //   font-family: SimSun;
      //   font-weight: 400;
      //   color: #000000;
      //   line-height: 2;
      //   text-indent: 2em;
      //   margin-top: 2em;
      // }
    }
  }
}
.originalAddress {
  width: 860px;
  margin: auto;
  margin-bottom: 20px;
  cursor: pointer;
  color: #2055c9;
}
.hqPolicy {
  width: 860px;
  margin: auto;
  margin-bottom: 20px;
  .hqPolicy-for {
    width: 860px;
    margin-bottom: 10px;
    cursor: pointer;
    color: #2055c9;
  }
}
::v-deep .aside {
  display: none !important;
}

.aside {
  display: none !important;
}
</style>