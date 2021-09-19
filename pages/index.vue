<template>
  <div>console started</div>
</template>

<script>
export default {
  head() {
    return { title: '未定义首页 - ' }
  },

  middleware({ store, redirect }) {
    return redirect(302, { name: 'console-start' })
  },

  created() {
  },

  mounted() {
  },
}
</script>

<style lang="scss" scoped>
</style>
