<template>
  <div class="hearder_help">
    <div class="line_text">
      <div class="line_left"></div>
      {{ title }}
      <div class="line_right"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  }

}
</script>

<style lang="less" scoped>
/* 标题 */
.line_text {
  width: 237px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: #000000;
  line-height: 40px;
  position: relative;
  margin: 0 auto;
  margin-top: 58px;
  margin-bottom: 28px;
}

/* 标题线 */
.line_left {
  width: 150px;
  height: 3px;
  border-radius: 2px;
  position: absolute;
  top: 19px;
  left: -202px;
  background-image: linear-gradient(to right, rgba(76, 103, 204, 0), rgba(32, 85, 201, 1));
}

.line_right {
  width: 150px;
  height: 3px;
  border-radius: 2px;
  position: absolute;
  top: 19px;
  right: -202px;
  background-image: linear-gradient(to right, rgba(32, 85, 201, 1), rgba(76, 103, 204, 0));
}
</style>