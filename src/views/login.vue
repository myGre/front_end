<template>
  <el-col :span="8">
    <el-card shadow="hover">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
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
    </el-card>
  </el-col>
</template>

<script>
import { setToken } from '../usrts/toke'
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "admin1",
        password: "123456",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request
            .post("/users/login", this.ruleForm)
            .then((res) => {
              // console.log(res);
              if (res.data.code == 200) {
                this.$router.push("/home");
                setToken(res.data.user.token)
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.el-col-8 {
  width: 400px;
  height: 400px;

  .el-card {
    position: relative;
    width: 400px;
    height: 200px;
    top: 50%;
    margin-top: -100px;
    left: 50%;
    margin-left: 200px;
  }
}
</style>