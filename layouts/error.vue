<template>
  <div class="app min-h-screen flex justify-center items-center">
    <div class="flex justify-start items-stretch bg-white dark:bg-gray-700 shadow-2xl  rounded-lg overflow-hidden">
      <div class="flex flex-col justify-around p-4 px-12">
        <div class="font-mono text-primary-color select-none">
          <h1 class="text-2xl">System Error!</h1>
          <h4 class="text-lg">{{ msg }}</h4>
        </div>

        <div class="font-mono text-primary-color text-sm">
          <nuxt-link to="/">> 返回首页</nuxt-link>
        </div>

        <div class="font-mono text-primary-color text-sm">
          <a href="https://www.antcool.com" target="_blank">#developed by antcool</a>
        </div>
      </div>
      <div>
        <img src="/image/wing-light.jpg" alt="蚂蚁创想" class="w-full">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: '发生错误 - ' }
  },
  props: ['error'],
  computed: {
    msg() {
      if (this.error.statusCode === 404) {
        return '未找到该页面'
      }

      return this.error.message
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
