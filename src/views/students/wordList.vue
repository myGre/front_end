<template>
  <div class="router-card">
    <el-card>
      <el-button class="addStudent" type="success" @click="addStudent()">
        + 添加游戏作业</el-button
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
      <el-table :data="gameLists.list" border>
        <el-table-column label="序号" type="index" align="center" width="50" />
        <el-table-column prop="handyGame" label="游戏名" />
        <el-table-column prop="addTime" label="添加时间" />
        <el-table-column prop="time" label="游戏时长" align="center" />
        <el-table-column prop="remark" label="备注" align="center" />
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
        v-show="gameLists.total > 0"
        :total="gameLists.total"
        :pageSize="gameLists.pageSize"
        :page="gameLists.page"
        @pagination="gameListsList"
      ></Pagination>
    </el-card>
    <el-dialog
      class="dialog"
      :title="title + '游戏'"
      :visible.sync="outerVisible"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="游戏名" prop="handyGame">
          <el-input v-model="ruleForm.handyGame"></el-input>
        </el-form-item>
        <el-form-item label="游戏时长" prop="time">
          <el-input-number v-model="ruleForm.time" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" placeholder="">
          </el-input>
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
import Pagination from "@/components/Pagination";
export default {
  name: "studentsList",
  components: {
    Pagination,
  },
  data() {
    return {
      keyword: "",
      gameLists: {},
      outerVisible: false,
      // 表单
      ruleForm: {
        handyGame: "",
        remark: "",
        time: 1,
      },
      title: "",
      addOrEmitForm: {
        add: "添加",
        emit: "修改",
      },
    };
  },
  computed: {
  },
  created() {
    this.gameListsList();
  },
  methods: {
    // 获取学生列表
    gameListsList(pagination = {}) {
      // console.log(pagination);
      // let {page, pageSize} = pagination
      // console.log(page, pageSize);
      this.request
        .post("/workList/gameList", pagination)
        .then((result) => {
          // console.log(result);
          if (result.data.code == 200) {
            this.gameLists = result.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(val){
      this.ruleForm.time = val
    },
    // 搜索
    search() {
      if (this.keyword) {
        this.request
          .post("/workList/search", { userName: this.keyword })
          .then((result) => {
            // console.log(result);
            if (result.data.code == 200) {
              this.gameLists.list = result.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.gameListsList();
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
      this.request
        .post("/workList/del", { _id: row._id })
        .then((result) => {
          if (result.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.gameListsList();
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改或添加学生
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result = [];
          if (this.title == "添加") {
            result = await this.request.post(
              "/workList/addGame",
              this.ruleForm
            );
          } else {
            result = await this.request.post(
              "/workList/emitGame",
              this.ruleForm
            );
          }
          if (result.data.code == 200) {
            this.outerVisible = false;
            (this.ruleForm = {
              handyGame: "",
              remark: "",
              time: 1,
            }),
              (this.outerVisible = false);
            this.$message({
              type: "success",
              message: `${this.title}成功`,
            });
            this.gameListsList();
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
        handyGame: "",
        remark: "",
        time: 1,
      }),
        this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.router-card {
  width: 92%;
  min-width: 600px;
  max-width: 1200px;
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