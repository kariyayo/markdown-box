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
      this.children = this._entriesToChildren(entries)
    })
  },
  methods: {
    readFileOrDirectory (selectedFile) {
      storage.readdir(selectedFile.path, entries => {
        this.children = this._entriesToChildren(entries)
      })
    },
    _entriesToChildren (entries) {
      return entries.map(x => {
        return {
          label: x.isFolder ? x.name + '/' : x.name,
          path: x.path
        }
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
