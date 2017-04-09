<template>
  <div>
    <navbar placement="top" type="default">
      <a slot="brand" href="/" title="Markdown-box" class="navbar-brand">Markdown-box</a>
    </navbar>
  </div>
</template>

<script>
import { navbar } from 'vue-strap'

export default {
  name: 'my-header',
  components: {
    navbar
  }
}
</script>

<style scoped>
</style>
