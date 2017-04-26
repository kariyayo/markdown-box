<template>
  <div>
    <el-row>
      <el-col :span="4">left</el-col>
      <el-col :span="20">
        <my-content @file-selected="readFileOrDirectory" :files="children"></my-content>
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
          label: x.isFolder ? x.name + '/' : x.name,
          path: x.path
        }
      })
      this.children = l
    })
  },
  methods: {
    readFileOrDirectory (selectedFile) {
      storage.readdir(selectedFile.path, entries => {
        console.log('MyBody: %O', entries)
      })
    }
  },
  components: {
    MyContent
  }
}
</script>

<style scoped>
</style>
