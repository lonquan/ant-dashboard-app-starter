<template>
  <div class="app">
    <header class="flex justify-between items-center shadow">
      <logo></logo>
      <div class="flex justify-end items-center">
        <div class="text-base pr-2">{{ $store.state.user.profile.name }}</div>
        <el-button type="text" size="default" @click="handleLogout">退出登录</el-button>
      </div>
    </header>
    <div class="app-page">
      <aside class="page-aside">
        <nav-menu></nav-menu>
      </aside>
      <div class="page-body">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'console',
  data() {
    return {}
  },

  methods: {
    handleLogout() {
      this.$confirm('确定退出?', '提示', {
        type: 'warning'
      }).then(_ => {
        this.$store.commit('user/logout')
        this.$axios.setToken(null, 'Bearer')
        this.$router.replace({ name: 'auth-login' })
      }).catch(_ => {
      })

    }
  }
}
</script>

<style scoped lang="scss">
header {
  //width: 100vw;
  height: 56px;
  padding: 0 28px;
  //position: fixed;
  background: var(--header-bg-color)
  //box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);
}

.app-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;

  .page-aside {
    padding: 0 28px;
  }

  .page-body {
    width: calc(100vw - 274px);
    padding: 0 28px 20px 0;
  }
}
</style>
