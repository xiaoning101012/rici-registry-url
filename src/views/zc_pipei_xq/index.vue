<template>
  <!-- 政策匹配详情 -->
  <div class="container">
    <img src="~@/assets/hq_zc_pipei/topB.png" alt="">
    <div class="main">
      <!-- 表格 -->
      <div class="table">
        <el-descriptions :title="form.title" :column="4">
          <el-descriptions-item label="所属区划" :span="2">{{ form_xq.addressName }}</el-descriptions-item>
          <el-descriptions-item label="部门" :span="2">{{ form_xq.departmentName }}</el-descriptions-item>
          <el-descriptions-item label="政策分类" :span="2">{{ form_xq.nature }}</el-descriptions-item>
          <el-descriptions-item label="扶持金额" :span="2">
            <span class="num" v-if="form.totalSupportAmount">{{ form.totalSupportAmount }}万元</span>
            <span class="num" v-else>/</span>
          </el-descriptions-item>
          <el-descriptions-item label="申报对象" :span="2"><span >企业</span></el-descriptions-item>
          <el-descriptions-item label="有效期" :span="2">{{ form_xq.publishDate }}</el-descriptions-item>
        </el-descriptions>

      </div>
    </div>
    <!-- 线 -->
    <div class="line"></div>
    <div class="main2">
      <!-- 指标和详情切换 -->
      <div class="tabs">
        <div class="tab" @click="tabItemClick(item, index)" :class="tabIndex == index ? 'tabChecked' : ''"
          v-for="(item, index) in tabList" :key="index">
          <span>{{ item.label }}</span>
        </div>
      </div>
      <!-- 政策指标 -->
      <div class="zb" v-if="tabIndex == 0">
        <!-- 匹配度 -->
        <div class="pipeiDu">
          <span class="label">匹配度</span>
          <span class="value">{{ listDatalat }}</span>
          <!-- <span>低</span> -->
        </div>
        <!-- table -->
        <div class="table_header">
          <div class="header1">政策指标</div>
          <div class="header2">指标详情</div>
          <div class="header3">匹配情况</div>
        </div>
        <div class="list">
          <div class="item" v-for="(item, index) in listData" :key="index" :class="item.result == '1' ? 'ispip' : ''">
            <div class="item1">
              <el-tooltip :content="item.fieldDesc" placement="top" popper-class="zc_pipei_tooltip__popper"
                effect="light">
                <span v-show="item.fieldDesc">{{ item.fieldDesc }}</span>
              </el-tooltip>
            </div>
            <div class="item2">
              <el-tooltip :content="item.matchDesc" placement="top" popper-class="zc_pipei_tooltip__popper"
                effect="light">
                <span v-show="item.matchDesc">{{ item.matchDesc }}</span>
              </el-tooltip>
            </div>

            <div class="item3">
              <div class="icon">
                <img src="@/assets/hz_zc_pipei_xq/pipei.png" v-if="item.result == '1'" alt="">
                <el-tooltip v-else effect="dark" content="专区暂时缺少该企业的此项数据，相关数据正不断接入完善中" placement="left">
                  <img src="@/assets/hz_zc_pipei_xq/daiwanshan.png" alt="">
                </el-tooltip>

              </div>
              <span v-if="item.result && item.result == '1'">匹配</span>
              <span v-else>待完善</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 政策详情 -->
      <div class="xq" v-else>
        <div v-if="form_xq.pageView" class="xq_content">
          <div class="title">{{ form_xq.title }}</div>
          <div class="num_time">
            <span>浏览量：{{ form_xq.pageView }}</span>
            <span class="time">时间：{{ form_xq.releaseDate }}</span>
          </div>
          <div class="content" v-html="form_xq.content">
          </div>
        </div>
        <div v-else>
          <Empty :description="'无匹配政策'"></Empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getZc_xq, policyindex, indextagid } from '@/views/zc_pipei_xq/api'
export default {
  data () {
    return {
      // 是否选中
      tabIndex: 0,
      tabList: [
        { label: '政策指标', value: 1 },
        { label: '政策详情', value: 2 },
      ],
      queryParams: {
        policyId: this.$route.query.id,
        companyId: this.$route.query.Qtid,
      },
      listData: [],
      // 信息
      form: {},
      listDatalat: '',
      name: this.$route.query.name,
      id: this.$route.query.id,
      // 详情
      form_xq: {},
      // 1.资质认定 2.资金补贴 3.人才激励 4.财税扶持 5.项目课题 6.政府采购 7.赛事活动 8.其他
      natureList: [
        {
          id: '1',
          name: '资质认定'
        },
        {
          id: '2',
          name: '资金补贴'
        },
        {
          id: '3',
          name: '人才激励'
        },
        {
          id: '4',
          name: '财税扶持'
        },
        {
          id: '5',
          name: '项目课题'
        },
        {
          id: '6',
          name: '政府采购'
        },
        {
          id: '7',
          name: '赛事活动'
        },
        {
          id: '8',
          name: '其他'
        },
      ]
    }
  },
  created () {
    this.getBaogao()
    this.getZc_xqData()
  },
  filters: {
    reaplaceyuan (i) {
      if (i == "0.00万元") {
        return "/"
      }
    }
  },
  methods: {
    // 事项列表条件
    tabItemClick (item, index) {
      this.tabIndex = index
      if (item.value == 1) {
        // 获取政策指标
        // this.getZc_xqData()
      } else {
        // 获取政策详情
        // this.getZc_xqData()
      }
    },
     // 获取不到政策指标的时候
     async MovegetBaogao(){
      let locationItem = localStorage.getItem('DLone')
      const queryParams = {
        companyTagIds: locationItem,
        policyId: this.$route.query.id
      }
      let res = await indextagid(queryParams)
      this.listDatalat = res.result.matchedDegree
        this.listData = res.result.policyIndexList.map(item => {
          return {
            fieldDesc: item.policyIndex,
            matchDesc: item.companyPolicyIndex,
            result: item.isMatched,
          }
        })
    },
    // 获取政策指标
    async getBaogao () {
      this.listData = []
      let res = await policyindex(this.queryParams)
      if (res.code === 200) {
        this.listDatalat = res.result.matchedDegree
        this.listData = res.result.policyIndexList.map(item => {
          return {
            fieldDesc: item.policyIndex,
            matchDesc: item.companyPolicyIndex,
            result: item.isMatched,
          }
        })
      } else {
        this.MovegetBaogao()
      }
    },
    //获取政策详情
    async getZc_xqData () {
      this.form_xq = {}
      // this.form_xq.nature
      let res = await getZc_xq({ id: this.id })
      res.result.content = res.result.content.replace(/(<p)/g, '$1 style="margin-bottom: 20px;font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #000000;line-height: 28px;"')
      this.natureList.filter(arr => {
        if(arr.id === res.result.nature){
          res.result.nature = arr.name
        }
      })
      this.form_xq = res.result
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f5f7fa;

  .main {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 1.625rem 1.625rem 1.25rem;

    // 表格
    .table {
      ::v-deep .el-descriptions__title {
        font-size: 32px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 700;
        color: #535256;
        line-height: 3rem;
        margin-bottom: 1.25rem;
      }

      ::v-deep .el-descriptions-item__container .el-descriptions-item__label {
        font-size: 16px;
        color: #a1a1a1;
      }

      ::v-deep .el-descriptions-item__container .el-descriptions-item__content {
        color: #4e4e4e;
        font-size: 16px;
      }
    }
  }

  // 线
  .line {
    width: 1200px;
    height: 0px;
    opacity: 0.4;
    border-bottom: 1px solid #dddddd;
    margin: auto;
    margin-bottom: 20px;
  }

  .main2 {
    width: 1200px;
    margin: 0 auto;
    // padding: 0 150px 0 150px;

    // 指标和详情切换
    .tabs {
      width: max-content;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid #e1e5f1;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 15px;

      .tab {
        padding: 11px 45px;
        background: #fff;
        // border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-right: 8px;
        cursor: pointer;


        span {
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333333;
        }

        &:first-child {
          border-radius: 4px 0px 0px 4px;
        }

        &:last-child {
          border-radius: 0px 4px 4px 0px;
        }
      }
    }

    .zb {
      background: #fff;
      padding: 30px;
    }

    // 匹配度
    .pipeiDu {
      margin: 0 0 0 20px;

      .label {
        color: #2055c9;
        font-weight: 700;
        font-size: 1.0625rem;
      }

      .value {
        font-size: 1.0625rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 700;
        color: #57595c;
        margin-left: 2.625rem;
      }
    }

    .table_header {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: #f6f6f6;
      display: flex;
      margin-top: 20px;

      .header1,
      .header2,
      .header3 {
        background-color: #e3e3e3;
        color: #414141;
        font-size: 1rem;
        font-family: 微软雅黑;
        // font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 650;
        // margin-top: 13px;
        text-align: center;
      }

      .header1 {
        width: 25%;
      }

      .header2 {
        width: 50%;

      }

      .header3 {
        width: 25%;

      }
    }

    .list {
      // padding-bottom: 179px;

      .item {
        width: 100%;
        background: #ffffff;
        min-height: 60px;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        border-bottom: 1px solid #f1f5fa;

        .item1,
        .item2,
        .item3 {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          span {
            // max-width: 400px;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            // color: rgba(28, 76, 191, 0.7);
            background: linear-gradient(188deg, #a8bff1, #2055c9);
            color: #fff;
            // background: linear-gradient(188deg, #a8bff1, #2055c9);
            padding: 5px 11px 5px 12px;
            border-radius: .3125rem;
          }
        }

        .icon {
          width: 18px;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .item1 {
          width: 25%;

          span {
            // margin-left: 70px;
          }
        }

        .item2 {
          width: 50%;


          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .item3 {
          width: 25%;

          span {
            color: #57595c;
            font-size: 1rem;
            font-weight: 700;
            font-family: PingFangSC-Regular, PingFang SC;
            // margin-left: 6px;
            background: none;
          }
        }
      }

      .ispip {

        background-color: #f8f8f8;
      }
    }

    // 政策详情
    .xq {
      min-height: 300px;
      background: #FFF;
      padding: 30px;

      .xq_content {
        width: 1000px;
        margin: 0 auto;
      }

      .title {
        font-size: 1.5rem;
        font-weight: 500;
        text-align: left;
        color: #333;
        line-height: 3.75rem;
        margin-top: 2.125rem;
        text-align: center;
      }

      .num_time {
        margin: 20px 0 30px 0;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        color: #999;
        padding-bottom: .75rem;
        border-bottom: .0625rem solid #999;
        padding-left: 30px;

        .time {
          margin-left: 30px;
        }
      }
    }
  }
}

.tabChecked {
  position: relative;

  &::before {
    content: '';
    height: 90%;
    width: 96%;
    position: absolute;
    // padding: 2px;
    background: rgba(32, 85, 201, 0.1);
  }

  span {
    color: #2055C9 !important;
    font-weight: 700 !important;
  }
}
</style>