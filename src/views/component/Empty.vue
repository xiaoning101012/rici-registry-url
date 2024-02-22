<template>
  <div>
    <el-empty :description="description"
              :image="require('@/assets/empty/noData.png')"></el-empty>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="less" scoped>
</style>