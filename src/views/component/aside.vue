<template>
  <!-- 侧边的返回首页和上一级按钮 -->
  <div class="aside" id="aside">
    <div v-if="isShow">
      <div class="sqzx" @click="toSCHome">
        <div class="img"></div>
        <div class="text">涉企咨询</div>
      </div>
      <div class="sqjy" @click="toSqjy">
        <div class="img"></div>
        <div class="text">涉企建议</div>
      </div>
      <div class="sqts" @click="toSqts">
        <div class="img"></div>
        <div class="text">涉企投诉</div>
      </div>
      <div class="toHome" @click="toHome">
        <div class="img"></div>
        <div class="text">专区首页</div>
      </div>
      <div class="sysm" @click="toSysm">
        <div class="img"></div>
        <div class="text">使用申明</div>
      </div>
      <div class="back" @click="back">
        <div class="img"></div>
        <div class="text">返回</div>
      </div>
      <div class="packUp" @click="packUp">
        <div class="img"></div>
        <div class="text">收起</div>
      </div>
    </div>
    <div v-else>
      <div class="toShow" @click="packUp">
        <div class="img"></div>
        <div class="text">展开</div>
      </div>
    </div>
    <!-- 使用申明弹框 -->
    <el-dialog
      class="sysm-dialog"
      title="使用申明"
      append-to-body
      :visible.sync="stateVisible"
      width="586px"
    >
      <p>
        政策信息来源于各省级部门公开政策整理，专区提供相关政策信息推送、政策兑现自查自测等服务仅供参考。政策信息存在动态变化，最终请以相关部门最新政策与解释为准。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          round
          @click="stateVisible = false"
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stateVisible: false,
      isShow: true,
    };
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "/",
        // query: {
        //   val: data,
        // },
      });
    },
    packUp() {
      this.isShow = !this.isShow;
    },
    back() {
      this.$router.go(-1);
    },
    toSCHome() {
      window.open(
        "http://www.sczwfw.gov.cn/cns-bmfw-websdt/pages/website/scwebsit/pages/peogovinteract/wantconsult.html?areaCode="
      );
    },
    toSqjy() {
      window.open(
        "http://www.sczwfw.gov.cn/cns-bmfw-websdt/pages/website/scwebsit/pages/peogovinteract/wantproposal.html"
      );
    },
    toSqts() {
      window.open(
        "http://www.sczwfw.gov.cn/cns-bmfw-websdt/pages/website/scwebsit/pages/peogovinteract/wantcomplaint.html?areaCode="
      );
    },
    toSysm() {
      this.stateVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  z-index: 10;
  width: 70px;
  padding: 2rem 0 1.875rem;
  // height: 120px;
  background: #333;
  border-radius: 10px 0px 0px 10px;
  // opacity: 0.65;
  position: fixed;
  top: 55%;
  right: 0;
  transform: translateY(-50%);
  color: #fff;
  font-size: 14px;
  .sqzx {
    text-align: center;
    cursor: pointer;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/sqzx.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }

  .sqjy {
    text-align: center;
    cursor: pointer;
    margin-top: 2.25rem;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/sqjy.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }

  .sqts {
    text-align: center;
    cursor: pointer;
    margin-top: 2.25rem;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/sqts.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }

  .toHome {
    text-align: center;
    cursor: pointer;
    margin-top: 2.25rem;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/sy.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }

  .sysm {
    text-align: center;
    cursor: pointer;
    margin-top: 2.25rem;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/sysm.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }

  .back {
    text-align: center;
    cursor: pointer;
    margin-top: 2.25rem;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/back.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }

  .packUp {
    text-align: center;
    cursor: pointer;
    margin-top: 2.25rem;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/show.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }

  .toShow {
    text-align: center;
    cursor: pointer;

    .img {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/aside/toShow.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }

    .text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #fff;
    }
  }
}
</style>