<template>
  <div>
    <el-menu :default-active="activeIndex2" mode="horizontal">
      <el-menu-item index="1">Markdown-box</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'my-header',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  }
}
</script>

<style scoped>
</style>
