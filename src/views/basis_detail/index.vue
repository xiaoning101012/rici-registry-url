<template>
  <div class="container">
    <!-- <img class="top_img" src="~@/assets/zcgj/top.png" alt=""> -->
    <div class="top_img">
      <span>{{ policyName }}</span>
    </div>
    <div class="content">
      <div class="main-title">{{ title }}</div>
      <!-- <div class="clearfix"><el-button type="primary" @click="goBack">返回</el-button></div> -->
      <div class="detail-content" v-html="detail"></div>
    </div>
  </div>
</template>

<script>
import { testInfo } from '../self_test/api'
export default {
  data () {
    return {
      id: this.$route.query.id,
      num: this.$route.query.num,
      policyName: '',
      title: '',
      detail: '',
    }
  },
  created () {
    this.goDetail()


  },
  mounted () {

  },
  methods: {
    goDetail () {
      let newNum = this.$route.query.num
      if (newNum.includes('?')) {
        newNum = newNum.slice(0, newNum.indexOf('?'))
      }
      testInfo({ id: this.id }).then(res => {
        this.policyName = res.result.name
        this.title = JSON.parse(res.result.policyBasisJson).basis_name[newNum].name
        this.detail = JSON.parse(res.result.policyBasisJson).basis_url[newNum].content
      })
    },
    goBack () {
      this.$router.go(-1)
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

    .main-title {
      font-weight: 600;
      font-size: 1.25rem;
      text-align: center;
      color: #cbb486;
      line-height: 3.4375rem;
      background: #fff;
      border-bottom: .0625rem solid #e5e5e5;
    }

    .clearfix {
      background: #fff;
      padding: .625rem;
      text-align: end;
    }

    .detail-content {
      border-top: .0625rem solid #eee;
      background: #f6f6f6 !important;
      padding: 1.875rem 1.25rem 3.125rem;
      line-height: 1.75rem;
      color: #333;
      font-size: 1rem;
      letter-spacing: .0625rem;

    }
  }

}
</style>