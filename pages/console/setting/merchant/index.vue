<template>
  <div class="w-full">
    <el-card header="客商档案参数配置">
      <div class="w-1/2 relative" v-loading="saving" element-loading-text="正在保存中...">
        <el-form>
          <el-form-item label="当前客商 ID 自增数">
            <el-input placeholder="请输入内容" v-model="config.trade_incr" readonly disabled>
              <!--              <el-button slot="append" type="primary" disabled @click="handleSave('trade_init')">保存</el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item label="当前订单 ID 自增数">
            <el-input placeholder="请输入内容" v-model="config.order_incr" readonly disabled>
              <!--              <el-button slot="append" type="primary" disabled @click="handleSave('trade_init')">保存</el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item label="核心企业银企通企业编号">
            <el-input placeholder="请输入内容" v-model="config.org_id">
              <el-button slot="append" type="primary" @click="handleSave('org_id')">保存</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'console',
  head() {
    return {
      title: '参数配置'
    }
  },
  data() {
    return {
      config: {
        trade_incr: null,
        order_incr: null,
        org_id: null,
      },
      saving: false
    }
  },

  created() {
    this.fetchConfig()
  },

  methods: {
    handleSave(field) {
      this.saving = true
      this.$axios.post(this.$api.config.merchant_params, {
        key: field,
        value: this.config[field]
      })
        .then(res => {
          this.$message.success('已成功保存')
        })
        .finally(_ => this.saving = false)
    },

    fetchConfig() {
      this.saving = true
      this.$axios.get(this.$api.config.merchant_params)
        .then(res => this.config = res)
        .finally(_ => this.saving = false)
    }
  }
}
</script>

<style scoped>

</style>
