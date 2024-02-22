<template>
  <div class="container">
    <!-- <img class="top_img" src="~@/assets/zcgj/top.png" alt=""> -->
    <div class="top_img">
      <span>{{ policyName }}</span>
    </div>
    <div class="content">
      <div class="test-header-box">
        <div class="header_left">
          <div class="header_title">
            {{ policyName }}
          </div>
          <div class="header_basis">
            <span class="basis_left">政策依据</span>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{ policyBasis[0]?.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in policyBasis" :key="index" :command="index">{{ item.name }}</el-dropdown-item>
                
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
        <div class="header_right">
          <span @click="onSubmit2">立即自测</span>
        </div>
      </div>
      <div class="warning_box">
        <img src="~@/assets/zcgj/warning.png" alt="">
        <span>带*的信息尤为重要,严重影响自测结果,请您务必填写!</span>
      </div>

      <!-- <div class="answer">
        <div class="item_box" v-for="(item, index) in answerList" :key="index">
          <div class="topic">
            <span>*</span>{{ item.title }}
          </div>
          <div class="item">

            <div class="radio_box" v-if="item.type == 1">
              <el-radio-group v-model="item.answer">
                <el-radio-button :label="item2.value" v-for="(item2, index2) in item.content" :key="index2">{{ item2.label
                }}</el-radio-button>
              </el-radio-group>
            </div>

            <div class="input_box" v-if="item.type == 3">
              <el-input v-model="item.answer" placeholder="请输入数字"></el-input>(输入)
            </div>

            <div class="color_blue" v-if="item.type == 1">注: 符合</div>
            <div class="color_red" v-if="item.type != 1">注: 不符合，不具有独立法人资格的申报单位，不是企业所得税纳税人，不能享受优惠。</div>

          </div>
        </div>
      </div> -->


      <form-create class="form_box" name="form" v-model="fapi" :rule="rule" :option="option" />

      <el-dialog class="analyze-dialog" :title="analyzeTitle" :visible="dialogVisible" width="586px" :before-close="closeDia">
        <div class="zice_gif" v-if="!loading">
          <img src="~@/assets/zcgj/zice.gif" alt="">
        </div>
        <div v-else class="zice_pass">
          <div class="text_box">
            根据您的数据，您的匹配度为:
            <span >{{ Calculation.resultInfo  }}</span>
          </div>
          <div class="img-box">
            <img src="~@/assets/zcgj/img1.png" alt="">
          </div>
          <div class="tips_text">
            <span>{{ Calculation.resultType  }}</span>
          </div>
          <div class="result_tips" >{{ Calculation.resultWarning  }}</div>
          <div class="foot_tips">温馨提示：政策自测结果仅供参考，请申报单位根据当地申报通知要求进行申报，最终请以具体部门最新政策与解释为准。</div>

        </div>
        <span slot="footer" class="dialog-footer" v-if="loading">
          <el-button type="primary" size="small" round @click="dialogVisible = false">确 认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script  setup>
import { ref, toRefs, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import router from '../../router'
import { testInfo } from './api'
import { Message } from 'element-ui'
// 获取query
// const route = useRoute()  //不能用
// const router = useRouter()
// console.log(route)
//自测计算弹框标题
const analyzeTitle = ref('计算中');
const data = reactive({
  loading: false,
  dialogVisible: false,
  //政策依据列表
  policyBasis: [],
  //政策依据详情列表
  policyBasisDetail: [],
  Calculation: {
    resultInfo: '',
    resultType: '',
    resultWarning: '',
  },
  policyName: '',
  fapi: null,
  rule: [],
  option: {},
  objRig: {},
  infoList: [],
  optionShow: {}
  })
const { loading, dialogVisible, policyBasis, policyBasisDetail,  Calculation, policyName, fapi, rule, option, objRig, infoList, optionShow } = toRefs(data)

//处理数据
const parse = (jsonStr) => {
  try {
    return JSON.parse(jsonStr, (key, value) => {
      if (value && typeof value === 'string') {
        return value.indexOf('FUNCTION_FLAG') > -1 ? new Function(`return ${value.replace('FUNCTION_FLAG', '')}`)() : value;
      }
      return value;
    });
  } catch (error) {
    console.log(jsonStr);
    console.log(error);
    return '出错了';
  }
};
// 顶部自测按钮
const onSubmit2 = () => {
  // console.log(fapi);
  fapi.value.submit(() => {
    let str = eval('(' + objRig.value.option.form.jsExp + ')')
    str(fapi.value.form)
  },()=>{
    //todo 表单验证未通过
    Message({
      message: '请将带*的题目填写完成',
      type: 'error'
    });
  });
  // fapi.value.onSubmit(fapi.value.form)
  // objRig.value.option.form.jsExp
  // console.log(objRig.value.option.form.jsExp);
 
}
// 自测提交
const goAnalyze = (status, msg1, msg2) => {
  // console.log(status, msg1, msg2);
  analyzeTitle.value = '计算中'
  loading.value = false
  dialogVisible.value = true
  Calculation.value.resultInfo = status
  Calculation.value.resultType = msg1
  Calculation.value.resultWarning = msg2

  setTimeout(() => {
    loading.value = true
    analyzeTitle.value = '自测结果'
  }, 2000);
};

const handleCommand = (index) => {
  // console.log(policyBasisDetail);
  let newId = router.history.current.query.id
  if (newId.includes('?')) {
    newId = newId.slice(0, newId.indexOf('?'))
  }
  // let xq_url = window.location.origin + `/sc-zqsk-pc/#/basisDetail?id=${newId}&&num=${index}`
  // let xq_url =  `https://www.sczwfw.gov.cn/zqsk/enterprise-policy/#/basisDetail?id=${newId}&&num=${index}`
  // window.open(xq_url);
  const { href } = router.resolve({
      path: "/basisDetail",
      query: {
        id: newId,
        num: index,
      },
    });

  window.open(href, '_blank');
}
// 关闭自测结果弹框
const closeDia = () => {
  dialogVisible.value = false
}
//查自测详情
const getDetail = () => {
  let newId = router.history.current.query.id
  if (newId.includes('?')) {
    newId = newId.slice(0, newId.indexOf('?'))
  }
  testInfo({ id: newId }).then(res => {
        policyName.value = res.result.name
        policyBasis.value = JSON.parse(res.result.policyBasisJson).basis_name
        policyBasisDetail.value = JSON.parse(res.result.policyBasisJson).basis_url
        // console.log(res.result);
        // console.log(JSON.parse(res.result.policyBasisJson));
        objRig.value = parse(res.result.desformDesignJson);
        
        objRig.value.rule.forEach((item) => {
          if (item.info && item.field) {
            infoList.value.push(parse(item.info));
          } else {
            infoList.value.push({});
          }
        });
        rule.value = objRig.value.rule;
        // console.log(objRig);
        if (optionShow) {
           option.value =  objRig.value.option;
          // console.log(objRig);
          if (typeof objRig.value.option.form.jsExp == 'undefined') {
            option.value.onSubmit = function (formData) {
              console.log('-----------表单提交-----------');
              console.log(formData);
            };
          } else {
            option.value.onSubmit = eval('(' + objRig.value.option.form.jsExp + ')');
          }
        } else {
          option.value = { submitBtn: true, resetBtn: false };
        }

        setTimeout(() => {
          const a = document.getElementsByClassName('el-form-item__label');
          infoList.value.forEach((info, index) => {
            //标题样式赋值
            if (info.style) {
              if (typeof a[index] !== 'undefined') {
                a[index].querySelector('span:first-child').style.cssText = info.style;
              }else{
                console.log('223333');
              }
            }
            if (info.children) {
              info.children.forEach((child) => {
                if (child.title) {
                  let title = '';
                  let subTitle = '';
                  if (child.info && child.info.title) {
                    title += '<span style="' + child.info.title.style + '" class="tip_title">' + child.info.title.text + '</span>';
                  }
                  let width = 'auto;';
                  if (child.info && child.info.subTitle) {
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');
                    width = context.measureText(child.info.subTitle.text).width + 80 + 'px';
                    subTitle += '<span style="' + child.info.subTitle.style + '" class="tip_content">' + child.info.subTitle.text + '</span>';
                  }
                  if (typeof a[index] !== 'undefined') {
                    let reg = "/" + child.title + "/g";
                    a[index].innerHTML = a[index].innerHTML.replace(
                      eval(reg),
                      '<span style="' +
                      child.style +
                      '"  class="titleUpady">' +
                      child.title +
                      '<span style="width:' +
                      width +
                      '" class="mone">' +
                      title +
                      subTitle +
                      '</span></span>'
                    )
                  }
                }
              });
            }
          });
        }, 100);

      })
}

getDetail()
// export default {
//   data () {
//     return {
//       that: this,
//       id: this.$route.query.id,
//       policyName: '',
//       form: {},
//       answerList: [
 
//       ],
//       dialogVisible,
//       newTitle,
//       loading,
//       analyzeTitle: '计算中',
//       isPass: false,
//       fapi: null,
//       rule: [],
//       option: {},
//       objRig: {},
//       infoList: [],
//       optionShow: {},
//       goAnalyze,
//     }
//   },
//   created () {
//     this.getDetail()

//   },
//   mounted () {
//     // let div = document.getElementById('aside')
//     // div.remove()

//     // console.log(dialogVisible);
//   },
//   methods: {
//     getDetail () {
//       testInfo({ id: this.id }).then(res => {
//         this.policyName = res.result.name
//         this.objRig = parse(res.result.desformDesignJson);
//         console.log(res.result);
//         this.objRig.rule.forEach((item) => {
//           if (item.info && item.field) {
//             this.infoList.push(parse(item.info));
//           } else {
//             this.infoList.push({});
//           }
//         });
//         this.rule = this.objRig.rule;
//         if (this.optionShow) {
//           this.option = this.objRig.option;
//           console.log(this.option);
//           if (typeof this.objRig.option.form.jsExp == 'undefined') {
//             this.option.onSubmit = function (formData) {
//               console.log('-----------表单提交-----------');
//               console.log(formData);
//             };
//           } else {
//             this.option.onSubmit = eval('(' + this.objRig.option.form.jsExp + ')');
//           }
//         } else {
//           this.option = { submitBtn: true, resetBtn: false };
//         }

//         setTimeout(() => {
//           const a = document.getElementsByClassName('el-form-item__label');
//           this.infoList.forEach((info, index) => {
//             //标题样式赋值
//             if (info.style) {
//               if (typeof a[index] !== 'undefined') {
//                 a[index].querySelector('span:first-child').style.cssText = info.style;
//               }
//             }
//             if (info.children) {
//               info.children.forEach((child) => {
//                 if (child.title) {
//                   let title = '';
//                   let subTitle = '';
//                   if (child.info && child.info.title) {
//                     title += '<span style="' + child.info.title.style + '" class="tip_title">' + child.info.title.text + '</span>';
//                   }
//                   let width = 'auto;';
//                   if (child.info && child.info.subTitle) {
//                     let canvas = document.createElement('canvas');
//                     let context = canvas.getContext('2d');
//                     width = context.measureText(child.info.subTitle.text).width + 80 + 'px';
//                     subTitle += '<span style="' + child.info.subTitle.style + '" class="tip_content">' + child.info.subTitle.text + '</span>';
//                   }
//                   if (typeof a[index] !== 'undefined') {
//                     let reg = "/" + child.title + "/g";
//                     a[index].innerHTML = a[index].innerHTML.replace(
//                       eval(reg),
//                       '<span style="' +
//                       child.style +
//                       '"  class="titleUpady">' +
//                       child.title +
//                       '<span style="width:' +
//                       width +
//                       '" class="mone">' +
//                       title +
//                       subTitle +
//                       '</span></span>'
//                     )
//                   }
//                 }
//               });
//             }
//           });
//         }, 0);

//       })

//     },
//     // 提交
//     onSubmit () {
//       this.fapi.submit((formData, fapi) => {
//         //todo 提交表单
//         console.log(formData, fapi);
//         fapi.onSubmit
//       }, () => {
//         //todo 表单验证未通过
//       })
//       // console.log(dialogVisible);
//       // this.option.onSubmit()
//     },

//     // // 自测弹框
//     // goAnalyze () {
//     //   this.loading = false
//     //   this.dialogVisible = true

//     //   setTimeout(() => {
//     //     this.loading = true
//     //     this.analyzeTitle = '自测结果'
//     //   }, 2000);
//     // },
//     // 政策依据详情
//     handleCommand (command) {
//       console.log(command);
//       this.$router.push({
//         path: "/basisDetail",
//         // query: {
//         //   val: data,
//         // },
//       });
//     },
//   }
// }
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

    .form_box {
      background: #fff;
      padding: 20px;
      ::v-deep .el-form-item {
        margin-bottom: 10px;
      }
      ::v-deep .el-form-item__label {
        span:first-child {
          font-size: 1rem;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 700;
          color: rgb(51, 51, 51);
          line-height: 1.6875rem;
        }
      }
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
      ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background: #2055C9;
        border-color: #2055C9;
        color: #fff;
        box-shadow: none;
      }
 
      ::v-deep .el-row > span {
        // display: block;
        float: left;
        margin-top: -30px !important;
        padding-left:  20px;
        font-size: 15px;
      }
      ::v-deep .el-row {
        .el-col {
          padding-bottom: 30px;
        }
        .el-col:last-child {
          margin: 60px 0 30px;
          .el-form-item__content {
            text-align: center;

            .el-button {
              // display: block;
              width: 13.125rem;
              height: 3.125rem;
              background: #2055c9;
              border-radius: 1.5625rem;
              font-size: 1rem;
              font-family: SourceHanSansCN-Medium, SourceHanSansCN;
              font-weight: 500;
              color: #fff;
            }
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

    ::v-deep .form_box {
      .el-form-item {
        display: flex;
        flex-direction: column;

        .el-form-item__label {
          width: unset !important;
          text-align: left;
        }

        .el-form-item__content {
          margin-left: 30px !important;
        }
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



::v-deep .el-popover__reference-wrapper {
  display: none;
}

::v-deep .el-input-number .el-input__inner {
  text-align: left !important;
}

::v-deep .el-tooltip__trigger {
  display: none;
}

::v-deep(.tip_content) {
  font-size: 0.9375rem;
  font-weight: normal;
  line-height: normal;
}

::v-deep(.tip_title) {
  color: #409eff;
  font-weight: 700;
}

::v-deep(.el-radio-button .el-radio-button__inner) {
  border-left: var(--el-border);
  border-radius: var(--el-border-radius-base);
  box-shadow: none !important;
}

::v-deep(.el-radio-button) {
  margin: 5px 30px 5px 0px;
}

::v-deep .mone {
  position: absolute;
  left: 0;
  top: 30px;
  transform-origin: center bottom;
  background: #fff;
  color: #000;
  border: 1px solid #303133;
  padding: 6px;
  border-radius: 7px;
  display: none;
  z-index: 999;
  max-width: 800px;
  white-space: break-spaces;
}

::v-deep .mone:before {
  content: '';
  border: 10px solid transparent;
  border-bottom-color: black;
  position: absolute;
  left: 20px;
  top: 0;
  margin-top: -20px;
}

::v-deep .mone:after {
  content: '';
  border: 10px solid transparent;
  border-bottom-color: white;
  position: absolute;
  top: 0;
  left: 20px;
  margin-top: -19px;
}

::v-deep .titleUpady {
  position: relative;
  cursor: pointer;
}

::v-deep .titleUpady:hover .mone {
  display: block;
}
</style>
