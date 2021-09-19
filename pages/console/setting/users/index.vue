<template>
  <div>
    <el-card header="贷款回执信息">
      <div class="flex justify-between items-center" slot="header">
        <div>贷款回执信息</div>
        <div>
          <el-button type="primary" @click="dialog.visible = true">新增账号</el-button>
        </div>
      </div>

      <div class="filter" hidden>
        <el-form inline label-position="left" ref="filter" :model="filter">
          <el-form-item label="编号" prop="id">
            <el-input clearable v-model="filter.id" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchRecords(1)">查询</el-button>
            <el-button @click="fetchRecords(records.currentPage)">刷新</el-button>
            <el-button @click="handleFilterReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-data w-full" v-loading="records.loading">
        <el-table border stripe :data="records.data" style="width: 100%" ref="table">
          <el-table-column label="编号" prop="id" width="60" align="center"></el-table-column>
          <el-table-column label="登录账号" prop="phone" width="200" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" width="100" align="center"></el-table-column>
          <el-table-column label="状态" prop="name" width="80" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.available">启用</el-tag>
              <el-tag type="info" v-else>停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="管理员" prop="name" width="80" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.is_admin">是</el-tag>
              <el-tag type="info" v-else>否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="最后登录" prop="last_at" width="160" align="center"></el-table-column>
          <el-table-column label="创建日期" prop="created_at" width="160" align="center"></el-table-column>
          <el-table-column label="修改日期" prop="updated_at" width="160" align="center"></el-table-column>
          <el-table-column label="操作" prop="updated_at" align="center" width="220">
            <template slot-scope="scope">
              <el-button @click="handleModify(scope.row)">修改</el-button>
              <el-button type="warning" v-if="scope.row.available" @click="handleToggleStatus(scope.row, false)">停用</el-button>
              <el-button type="primary" v-else @click="handleToggleStatus(scope.row, true)">启用</el-button>
              <el-button type="danger" @click="handleModifyPassword(scope.row)">改密</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="paginate">
        <el-pagination
          :current-page="records.currentPage"
          :total="records.total"
          :page-size="5"
          layout="prev, pager, next, total"
          @current-change="fetchRecords"
        >
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      top="20px"
      :visible.sync="dialog.visible"
      :title="dialog.form.id ? '修改账号' : '添加账号'"
      @close="handleCloseDialog"
    >
      <el-form label-position="right" label-width="100px" :model="dialog.form">
        <el-form-item label="手机号" required>
          <el-input v-model="dialog.form.phone" placeholder="手机号为登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" required v-if="!dialog.form.id">
          <el-input v-model="dialog.form.password" placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-input v-model="dialog.form.name" placeholder="账号使用人姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号可用" required>
          <el-switch
            v-model="dialog.form.available"
            :inactive-value="false"
            :active-value="true"
            active-text="可用"
            inactive-text="停用"
          />
        </el-form-item>
        <el-form-item label="管理员" required>
          <el-switch
            v-model="dialog.form.is_admin"
            :inactive-value="false"
            :active-value="true"
            active-text="管理"
            inactive-text="普通"
          />
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" @click="handleSaveDialog" :loading="dialog.saving">保存</el-button>
          <el-button @click="dialog.visible = false" :disabled="dialog.saving">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'console',
  head() {
    return {
      title: "系统用户管理 - "
    }
  },

  data() {
    return {
      filter: {},
      records: {
        loading: false,
        data: [],
        currentPage: 1,
        total: 0,
      },

      dialog: {
        visible: false,
        form: {
          phone: null,
          name: null,
          password: null,
          available: true,
          is_admin: false,
        },
        saving: false,
      },
    }
  },

  created() {
    this.fetchRecords()
  },

  methods: {
    handleSaveDialog() {
      this.dialog.saving = true

      this.$axios.post(this.$api.user.user, this.dialog.form)
        .then(response => {
          this.$message.success('修改成功')
          this.fetchRecords(this.records.currentPage)
          this.dialog.visible = false
        })
        .finally(_ => this.dialog.saving = false)
    },

    handleCloseDialog() {
      this.dialog = {
        visible: false,
        form: {
          phone: null,
          name: null,
          password: null,
          available: true,
          is_admin: false,
        },
        saving: false,
      }
    },

    handleModify(row) {
      this.dialog.form = {
        id: row.id,
        phone: row.phone,
        name: row.name,
        password: null,
        available: row.available,
        is_admin: row.is_admin
      }

      this.dialog.visible = true
    },

    handleModifyPassword(row) {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        inputErrorMessage: '密码格式不正确',
        inputPlaceholder: '请输入 8 位以上包含数字字母大小写的密码'
      })
        .then(({ value }) => {
          this.$axios.put(this.$api.user.user, {
            id: row.id,
            key: value,
            type: 'secret'
          })
            .then(_ => {
              this.$message.success('操作成功')
              this.fetchRecords(this.records.currentPage)
            })
        })
        .catch(_ => {
        })
    },

    handleToggleStatus(row, status) {
      let msg = status ? '确定启用这个账号' : '确定停用这个账号?'

      this.$confirm(msg, '提示', { type: 'warning' })
        .then(_ => {
          this.$axios.put(this.$api.user.user, {
            id: row.id,
            status: status,
            type: 'status'
          })
            .then(_ => {
              this.$message.success('操作成功')
              this.fetchRecords(this.records.currentPage)
            })
        })
        .catch(_ => {
        })
    },

    handleFilterReset() {
    },

    fetchRecords(page = 1) {
      this.records.loading = true
      let params = {
        page
      }

      this.$axios.get(this.$api.user.users, { params })
        .then(response => {
          this.records.data = response.data
          this.records.currentPage = response.current_page
          this.records.total = response.total
        })
        .finally(_ => this.records.loading = false)
    }
  }
}
</script>

<style scoped>

</style>
