<template>
  <div>
    <el-card header="控制台首页">
      <el-card header="银企通侧统计">
        <div class="grid grid-cols-6 gap-4">
          <div class="view">
            <div>记录档案</div>
            <div>{{ bank.total_quantity || 0 }}</div>
          </div>
          <div class="view">
            <div>贷款回执</div>
            <div>{{ bank.receipt_total || 0 }}</div>
          </div>
        </div>
      </el-card>
      <el-card header="商管侧统计" class="mt-4">
        <div class="grid grid-cols-6 gap-4">
          <div class="view">
            <div>记录档案</div>
            <div>{{ market.total_quantity || 0 }}</div>
          </div>
          <div class="view">
            <div>未完善数据</div>
            <div>{{ market.not_perfection || 0 }}</div>
          </div>
          <div class="view">
            <div>待提报</div>
            <div>{{ market.wait_report || 0 }}</div>
          </div>
          <div class="view">
            <div>已提报</div>
            <div>{{ market.reported || 0 }}</div>
          </div>
        </div>
      </el-card>

      <el-card header="系统状态" class="mt-4">
        <div class="grid grid-cols-6 gap-4">
          <div class="view">
            <div>账号数量</div>
            <div>{{ system.user_total || 0 }}</div>
          </div>
          <div class="view">
            <div>使用中账号</div>
            <div>{{ system.available || 0 }}</div>
          </div>
          <div class="view">
            <div>管理账号</div>
            <div>{{ system.admin || 0 }}</div>
          </div>
          <div class="view">
            <div>日志数量</div>
            <div>{{ system.logs || 0 }}</div>
          </div>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'console',
  data() {
    return {
      bank: {},
      market: {},
      system: {}
    }
  },

  created() {
    this.fetchTotal()
  },

  methods: {
    fetchTotal() {
      this.$axios.get('start')
        .then(response => {
          this.bank = response.bank
          this.market = response.market
          this.system = response.system
        })
    }
  }
}
</script>

<style scoped lang="scss">
.view {
  &:first-child {
    font-size: 12px;
  }

  &:first-child {
    font-size: 18px;
  }
}
</style>
