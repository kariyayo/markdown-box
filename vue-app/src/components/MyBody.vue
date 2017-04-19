<template>
  <div>
    <el-row>
      <el-col :span="4">left</el-col>
      <el-col :span="20">
        <my-content :files="children"></my-content>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import storage from '../storage.js'
import MyContent from './MyContent.vue'

export default {
  name: 'my-body',
  data () {
    return {
      children: []
    }
  },
  mounted () {
    storage.rootFiles(entries => {
      const l = entries.map(x => {
        return {
          name: x.name
        }
      })
      this.children = l
    })
  },
  components: {
    MyContent
  }
}
</script>

<style scoped>
</style>
