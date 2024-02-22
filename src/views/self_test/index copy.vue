<template>
  <div class="container">
    <!-- <img class="top_img" src="~@/assets/zcgj/top.png" alt=""> -->
    <div class="top_img">
      <span>研发费用加计扣除</span>
    </div>
    <div class="content">
      <div class="test-header-box">
        <div class="header_left">
          <div class="header_title">
            研发费用加计扣除
          </div>
          <div class="header_basis">
            <span class="basis_left">政策依据</span>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                关于完善研究开发费用税前加计扣除政策的通知<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">关于完善研究开发费用税前加计扣除政策的通知</el-dropdown-item>
                <el-dropdown-item command="2">关于完善研究开发费用税前加计扣除政策的通知</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
        <div class="header_right">
          <span>立即自测</span>
        </div>
      </div>
      <div class="warning_box">
        <img src="~@/assets/zcgj/warning.png" alt="">
        <span>带*的信息尤为重要,严重影响自测结果,请您务必填写!</span>
      </div>

      <!-- 测试题库 -->
      <div class="answer">
        <div class="item_box" v-for="(item, index) in answerList" :key="index">
          <div class="topic">
            <span>*</span>{{ item.title }}
          </div>
          <div class="item">

            <!-- 单选 -->
            <div class="radio_box" v-if="item.type == 1">
              <el-radio-group v-model="item.answer">
                <el-radio-button :label="item2.value" v-for="(item2, index2) in item.content" :key="index2">{{ item2.label
                }}</el-radio-button>
              </el-radio-group>
            </div>

            <!-- 输入框 -->
            <div class="input_box" v-if="item.type == 3">
              <el-input v-model="item.answer" placeholder="请输入数字"></el-input>(输入)
            </div>

            <!-- 提示 -->
            <div class="color_blue" v-if="item.type == 1">注: 符合</div>
            <div class="color_red" v-if="item.type != 1">注: 不符合，不具有独立法人资格的申报单位，不是企业所得税纳税人，不能享受优惠。</div>

          </div>
        </div>
      </div>

      <div class="footer_btn">
        <span @click="goAnalyze">立即自测</span>
      </div>

      <!-- 弹框 -->
      <el-dialog class="analyze-dialog" :title="analyzeTitle" :visible.sync="dialogVisible" width="586px">
        <div class="zice_gif" v-if="!loading">
          <img src="~@/assets/zcgj/zice.gif" alt="">
        </div>
        <div v-else class="zice_pass">
          <div class="text_box">
            根据您的数据，您的匹配度为:
            <span v-if="isPass">基本符合</span>
            <span v-else>不符合</span>
          </div>
          <div class="img-box">
            <img src="~@/assets/zcgj/img1.png" alt="">
          </div>
          <div class="tips_text">
            <span v-if="isPass">太棒了，恭喜您!</span>
            <span v-else>再接再厉!</span>
          </div>
          <div class="result_tips" v-if="isPass">根据测评结果，建议申报！</div>
          <div class="foot_tips">温馨提示：政策自测结果仅供参考，请申报单位根据当地申报通知要求进行申报，最终请以具体部门最新政策与解释为准。</div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" round @click="dialogVisible = false">确 认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // id: this.$route.query.id,
      policyName: '',
      form: {},
      answerList: [
        {
          title: '1，企业法人资格（单选）',
          type: 1,
          answer: '',
          content: [
            {
              label: '具有独立法人资格',
              value: 1
            },
            {
              label: '不具有独立法人资格',
              value: 2
            },
          ]
        },
        {
          title: '2，申报单位是否以软件产品开发销售（营业）为主营业务 （ 单选 ）',
          type: 1,
          answer: '',
          content: [
            {
              label: '是',
              value: 1
            },
            {
              label: '否',
              value: 2
            },
          ]
        },
        {
          title: '3，汇算清缴年度具有劳动合同关系且具有大学专科以上学历的职工人数占企业月平均职工总人数的比例为（ ）%',
          type: 3,
          answer: '',
        },
        {
          title: '4，申报单位符合情形 （ 单选 ）',
          type: 1,
          answer: '',
          content: [
            {
              label: '汇算清缴年度软件产品开发销售（营业）收入大于等于2亿元，应纳税所得额大于等于1000万元，研究开发人员占企业月平均职工总数的比例大于等于25%',
              value: 1
            },
            {
              label: '在国家规定的重点软件领域内，汇算清缴年度软件产品开发销售（营业）收入大于等于5000万元，应纳税所得额大于等于250万元，研究开发人员占企业月平均职工总数的比例大于等于25%，企业在中国境内发生的研究开发费用金额占研究开发费用总额的比例大于等于70%',
              value: 2
            },
            {
              label: '以上情形无',
              value: 3
            },
          ]
        },
      ],
      dialogVisible: false,
      loading: false,
      analyzeTitle: '计算中',
      isPass: false,
    }
  },
  created () {
    // this.getDetail()

  },
  mounted () {
    // let div = document.getElementById('aside')
    // div.remove()
  },
  methods: {
    goPolicyMatching () {

    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    //切换tabs1
    tabs1Click (val) {

    },
    // 自测弹框
    goAnalyze () {
      this.loading = false
      this.dialogVisible = true

      setTimeout(() => {
        this.loading = true
        this.analyzeTitle = '自测结果'
      }, 2000);
    },
    // 政策依据详情
    handleCommand (command) {
      console.log(command);
      this.$router.push({
        path: "/basisDetail",
        // query: {
        //   val: data,
        // },
      });
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f5f7fa;

  .top_img {
    background: url('../../assets/zcgj/top.png') no-repeat 100% 100%;
    // width: 100%;
    height: 170px;

    span {
      display: block;
      width: 75rem;
      margin: 0 auto;
      padding-left: .6875rem;
      text-align: left;
      height: 4.875rem;
      font-size: 3.75rem;
      font-family: YouSheBiaoTiHei;
      color: #fff;
      line-height: 4.875rem;
      letter-spacing: .3125rem;
      text-shadow: 0 0.125rem 0.25rem rgba(22, 35, 162, .5);
      padding-top: 3.25rem;
      box-sizing: content-box;
    }
  }

  .content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .test-header-box {
      padding: 2rem 1.625rem 2rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header_left {
        width: 80%;

        .header_title {
          font-size: 1.625rem;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 700;
          color: #535256;
          line-height: 2.3125rem;
          margin-bottom: 1.125rem;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }

        .header_basis {
          .basis_left {
            background: #2055c9;
            border-radius: .3125rem;
            color: #fbfbfc;
            border: none;
            padding: 0 .75rem;
            height: 1.75rem;
            line-height: 1.75rem;
            font-size: .875rem;
            display: inline-block;
            margin-right: 10px;
          }
        }
      }

      .header_right {
        width: 9.625rem;
        height: 2.5rem;
        background: #2055c9;
        border-radius: 1.3125rem;
        font-size: .875rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #fff;
        line-height: 2.5rem;
        letter-spacing: .0625rem;
        padding: 0;
        text-align: center;
        cursor: pointer;
        // margin-top: -2.125rem;
      }
    }

    .warning_box {
      border: .0625rem solid #f8cf96;
      background: #fff9ec;
      border-radius: .3125rem;
      padding: 1.125rem;
      margin: 1.25rem 0;

      img {
        width: 20px;
        height: 20px;
        vertical-align: bottom;
        margin-right: 10px;
      }
    }

    .answer {
      padding: 0 1.625rem 3.125rem;
      background: #fff;

      .item_box {
        padding: 1.25rem 0;

        .topic {
          font-size: 1rem;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 700;
          color: #333;
          line-height: 1.6875rem;
          // margin-bottom: 15px;

          span {
            color: #e12a05;
          }
        }

        .item {
          margin-left: 1.875rem;

          .radio_box {
            .el-radio-button {
              margin: 15px 30px 0 0;

              ::v-deep .el-radio-button__inner {
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                line-height: 24Px;
                width: 100%;
                white-space: pre-wrap;
                text-align: inherit;
                padding: 7px 20px;

                &:hover {
                  color: #2055C9;
                }
              }
            }

            ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
              background: #2055C9;
              border-color: #2055C9;
              color: #fff;
              box-shadow: none;
            }

          }

          .input_box {
            margin-top: 15px;

            .el-input {
              width: 150px;
              margin-right: 10px;
            }
          }

          .color_blue {
            margin-top: .9375rem;
            color: rgb(64, 158, 255);
            font-size: .9375rem;
          }

          .color_red {
            margin-top: .9375rem;
            font-size: .9375rem;
            color: red;
          }
        }
      }
    }

    .footer_btn {
      padding: 2rem 1.625rem 2rem;
      background: #fff;
      text-align: -webkit-center;

      span {
        display: block;
        width: 13.125rem;
        height: 3.125rem;
        background: #2055c9;
        border-radius: 1.5625rem;
        font-size: 1rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #fff;
        line-height: 3.125rem;
        letter-spacing: .0625rem;
        padding: 0;
        text-align: center;
        cursor: pointer;
      }
    }

  }
}

.analyze-dialog {
  .zice_gif {
    text-align: center;
  }

  ::v-deep .el-dialog__header {
    border-bottom: .0625rem solid #e8e8e8;
    padding: 1.25rem 1.25rem 1.25rem;

    .el-dialog__title {
      font-size: 1rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(0, 0, 0, .85);
    }

    .el-dialog__headerbtn {
      top: 25px;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #000;
    }
  }

  ::v-deep .el-dialog__body {
    padding: 30px 25px;
  }

  ::v-deep .el-dialog__footer {
    border-top: .0625rem solid rgba(0, 0, 0, .09);
    padding: 20px;
    text-align: center;
  }

  .zice_pass {
    .text_box {
      font-size: .875rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(0, 0, 0, .85);

      span {
        font-size: 1.5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #2055c9;
        margin-left: 30px;
      }
    }

    .img-box {
      text-align: center;
      margin-top: 40px;
    }

    .tips_text {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      text-align: center;
      margin-top: 15px;
    }

    .result_tips {
      font-size: 1.125rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 700;
      color: #2055c9;
      margin-top: 15px;
      text-align: center;

    }

    .foot_tips {
      font-size: .875rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: red;
      line-height: 1.375rem;
      text-align: center;
      margin-top: 15px;

    }
  }

  .dialog-footer {
    .el-button {
      width: 5.625rem;
      height: 2rem;
    }

    .el-button--primary {
      background-color: #2055c9;
      border-color: #2055c9;
    }
  }
}
</style>