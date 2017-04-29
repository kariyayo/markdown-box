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
    readFileOrDirectory (selectedEntry) {
      if (selectedEntry.isFolder) {
        storage.readdir(selectedEntry.path, entries => {
          this.children = this._entriesToChildren(entries)
        })
      } else {
        storage.readfile(selectedEntry.path, fileContent => {
          console.log(fileContent)
        })
      }
    },
    _entriesToChildren (entries) {
      return entries.map(x => {
        return {
          label: x.isFolder ? x.name + '/' : x.name,
          path: x.path,
          isFolder: x.isFolder
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
