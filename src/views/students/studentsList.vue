<template>
  <div class="router-card">
    <el-card>
      <el-button class="addStudent" type="success" @click="addStudent()">
        + 添加学生</el-button
      >
      <div class="student_search">
        <el-input
          @keyup.native.enter="search"
          v-model.trim="keyword"
          size="small"
          style="width: 150px"
          placeholder="搜索..."
        ></el-input>
        <i class="el-icon-search search_icon" @click="search"></i>
      </div>
      <el-table :data="studentLists.list" border>
        <el-table-column label="Id" prop="id" align="center" width="50">
        </el-table-column>
        <!-- <el-table-column prop="date" label="日期" width="150">
        </el-table-column> -->
        <el-table-column prop="userName" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center" width="50">
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row, $index }">
            <el-button size="mini" @click="handleEdit(row, $index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
      v-if="studentLists.total > 0"
        :total="studentLists.total"
        :pageSize="studentLists.pageSize"
        :page="studentLists.page"
        @pagination="studentList"
      ></Pagination>
    </el-card>
    <el-dialog
      class="dialog"
      :title="title + '学生'"
      :visible.sync="outerVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Pagination from "@/components/Pagination";
export default {
  name: "studentsList",
  components: {
    Pagination,
  },
  data() {
    return {
      keyword: "",
      studentLists: {},
      outerVisible: false,
      // 表单
      ruleForm: {
        userName: "",
        password: "",
        sex: "男",
        address: "",
      },
      title: "",
      addOrEmitForm: {
        add: "添加",
        emit: "修改",
      },
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择姓别", trigger: "change" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(['roles']),
    // ...mapState({
    //   info: state => state.user.user,
    // }),
    sex() {
      return this.ruleForm.sex == "男" ? 1 : 0;
    },
  },
  created() {
    this.studentList();
  },
  methods: {
    // 获取学生列表
    studentList(pagination = {}) {
      // console.log(pagination);
      // let {page, pageSize} = pagination
      // console.log(page, pageSize);
      this.request
        .post("/student/studentList", pagination)
        .then((result) => {
          // console.log(result);
          if (result.data.code == 200) {
            result.data.data.list.forEach((item) => {
              item.sex == 1 ? (item.sex = "男") : (item.sex = "女");
            });
            this.studentLists = result.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 搜索
    search() {
      if (this.keyword) {
        this.request
          .post("/student/search", { userName: this.keyword })
          .then((result) => {
            // console.log(result);
            if (result.data.code == 200) {
              this.studentLists.list = result.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.studentList();
      }
    },
    // 添加按钮
    addStudent() {
      this.title = this.addOrEmitForm.add;
      this.outerVisible = true;
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      this.title = this.addOrEmitForm.emit;
      this.ruleForm = row;
      this.outerVisible = true;
    },
    // 删除按钮事件
    handleDelete(row) {
      this.request.post("/student/del", { id: row.id }).then((result) => {
        if (result.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.studentList();
        } else {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 修改或添加学生
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let { sex } = this.ruleForm;
          this.ruleForm.sex = sex == "男" ? 1 : 0;
          let result = [];
          if (this.title == "添加") {
            result = await this.request.post(
              "/student/addStudent",
              this.ruleForm
            );
          } else {
            result = await this.request.post(
              "/student/emitStudent",
              this.ruleForm
            );
          }
          if (result.data.code == 200) {
            this.outerVisible = false;
            (this.ruleForm = {
              userName: "",
              password: "",
              sex: "男",
              address: "",
            }),
              (this.outerVisible = false);
            this.$message({
              type: "success",
              message: `${this.title}成功`,
            });
            this.studentList();
          } else {
            this.$message({
              type: "error",
              message: `${result.data.msg}`,
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消修改
    resetForm(formName) {
      this.outerVisible = false;
      (this.ruleForm = {
        userName: "",
        password: "",
        sex: "男",
        address: "",
      }),
        this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.router-card {
  width: 92%;
  min-width: 1200px;
  margin-top: 60px;
  margin-left: 4%;
  .addStudent {
    margin-bottom: 20px;
  }
  .el-card {
    padding: 20px;
    margin-bottom: 60px;
    .el-table{
      margin-bottom: 30px;
    }
  }
  .el-form {
    width: 90%;
    .el-input {
    }
  }
  .student_search {
    display: inline-block;
    width: 85%;
    text-align: right;
    .search_icon {
      position: relative;
      right: 25px;
      z-index: 99;
    }
  }
}
</style>