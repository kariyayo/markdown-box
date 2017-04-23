<template>
  <div id="my-content">
    <el-table @row-click="emitFileSelected" :data="files" :show-header="false" class="content-table" >
      <el-table-column prop="label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'my-content',
  props: ['files'],
  methods: {
    emitFileSelected (row) {
      this.$emit('file-selected', row)
    }
  }
}
</script>

<style scoped>
.content-table {
  text-align: left;
}
</style>
