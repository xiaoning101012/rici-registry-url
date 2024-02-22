<template>
  <div class="top_tital">
    <!-- 字体 -->
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.top_tital {
  width: 100%;
  height: 160px;
  background: #63b8e9;
  margin-top: 2px;
  background-image: url("~@/assets/title/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .text {
    width: 1200px;
    // position: absolute;
    // top: 68px;
    // left: 359px;
    margin: 0 auto;
    padding-top: 68px;
    font-size: 42px;
    font-family: FZHTJW--GB1-0, FZHTJW--GB1;
    font-weight: normal;
    color: #fdfdfd;
    letter-spacing: 1px;
  }
}
</style>