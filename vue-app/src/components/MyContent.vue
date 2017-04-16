<template>
  <div id="my-content">
    <el-table :data="files" :show-header="false" class="content-table" >
      <el-table-column prop="fileName"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'my-content',
  props: ['files']
}
</script>

<style scoped>
.content-table {
  text-align: left;
}
</style>
