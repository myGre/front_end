<template>
  <div class="content">
    <!-- <img src="../../assets/logo.png" alt=""> -->
    <h3>{{ users.userName }}</h3>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button type="text" @click="drawer = true">重置密码</el-button>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-button type="text" @click="logout">退出登录</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-drawer
      title="修改密码"
      :visible.sync="drawer"
      size="20%"
      :with-header="false"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="新密码" prop="password1">
          <el-input
            type="password"
            v-model="ruleForm.password1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
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
    </el-drawer>
  </div>
</template>

<script>
import { removeToken, getToken } from "../../usrts/toke";
export default {
  name: "Header",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password1 !== "") {
          this.$refs.ruleForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      users: {},
      drawer: false,
      ruleForm: {
        password1: "",
        password2: "",
      },
      rules: {
        password1: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
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
          }
        })
        .catch((err) => {
          // 获取token失败或token已失效，如果有token则移除token
          let token = getToken("TOKEN");
          if (token) {
            removeToken("TOKEN");
          }
          // 重定向到登录页面
          setTimeout(() => {
            location.replace("/login");
          }, 1000);
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { id } = this.users;
          let { password2 } = this.ruleForm;
          this.request
            .post("/users/emitPassword", { id, password: password2 })
            .then((response) => {
              // console.log(response);
              if (response.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "修改成功，3秒后返回登录页面",
                });
                setTimeout(() => {
                  location.replace('/login')
                }, 3000);
                this.drawer = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      this.$confirm("是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功，正在返回登录页面!",
          });
          removeToken("TOKEN");
          setTimeout(() => {
            location.replace("/login");
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
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
    top: 0px;
    right: 50px;
  }
  img{
    display: inline-block;
    margin-left: 30px;
    width: 62px;
    height: 62px;
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
  .el-form {
    // width: 80%;
    margin: 100px 0;
  }
}
</style>