<template>
  <div class="content">
    <h3>{{ users.userName }}</h3>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button type="text" @click="dialogVisible = true">重置密码</el-button>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="重置密码"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="password1">
          <el-input
            type="password"
            v-model="ruleForm.password1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password2">
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      users: {},
      dialogVisible: false,
      ruleForm: {
        userName: "admin1",
        password: "123456",
      },
    };
  },
  created() {
    this.getInfomsg();
  },
  methods: {
    getInfomsg() {
      this.request
        .post("/users/info")
        .then((response) => {
          if (response.data.code == 200) {
            this.users = response.data.user[0];
          } else {
            console.log(111);
          }
        })
        .catch((err) => {
          location.replace("/login");
          console.log(err);
        });
    },
    submitForm() {},
    resetForm() {},
  },
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  h3 {
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    // top: -20px;
    right: 50px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #000000;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown {
    position: absolute;
    right: 35px;
  }
}
</style>