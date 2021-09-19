<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="flex justify-start items-stretch bg-white dark:bg-gray-700 shadow-2xl rounded-lg overflow-hidden">
      <div class="flex flex-col justify-around p-4 px-12">
        <div class="text-primary-color select-none">
          <h1 class="text-2xl font-mono">System Console Login</h1>
          <h4 class="text-lg">{{ $config.projectName }}</h4>
        </div>
        <el-form size="medium" label-position="left" label-width="0" :model="form" :rules="formRules" ref="login"
          @keyup.enter.native="handleLogin"
        >
          <el-form-item label="" prop="phone">
            <el-input placeholder="账号" clearable v-model.trim="form.phone" maxlength="11">
              <i class="el-icon-user" slot="prepend"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="key">
            <el-input placeholder="密码" clearable v-model.trim="form.key" type="password" maxlength="30">
              <i class="el-icon-key" slot="prepend"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" label-width="0" style="margin-bottom: 0px;">
            <el-button class="w-full" type="primary" icon="el-icon-s-promotion"
              :loading="loading"
              @click="handleLogin"
            >登录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="font-mono text-primary-color text-sm">
          <a href="https://www.antcool.com" target="_blank">#develop by antcool</a>
        </div>
      </div>
      <div>
        <img src="/image/wing-light.jpg" alt="蚂蚁创想" class="w-full">
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "login",
  layout: 'auth',
  head() {
    return { title: '系统登录 - ' }
  },

  data() {
    return {
      formRules: {
        phone: [
          { required: true, message: '请输入登录账号' }
        ],
        key: [
          { required: true, message: '请输入登录密码' }
        ]
      },
      form: {
        phone: null,
        key: null
      },
      loading: false,
    }
  },

  computed: {
    sourcePage() {
      return {
        name: 'console-start'
      }
    }
  },

  methods: {
    ...mapMutations({
      'login': 'user/login'
    }),

    loginRequest() {
      this.loading = true

      this.$axios.post(this.$api.auth.login, { ...this.form })
        .then(data => {
          this.$message.success('登录成功, 正在跳转...')
          this.login({ profile: data, token: data.token, roles: data.roles })
          this.$axios.setToken(data.token, 'Bearer')
          this.$router.push(this.sourcePage)
        })
        .finally(_ => {
          this.loading = false
        })
    },

    handleLogin() {
      this.$refs.login.validate(valid => {
        valid && this.loginRequest()
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
