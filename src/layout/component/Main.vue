<template>
  <div class="main-content">
    <!-- 面包屑 -->
    <el-card class="bdb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- 路由展示区 -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  data(){
    return {

    }
  },
  created(){
    // console.log(this.$route);
  }
};
</script>

<style lang="less" scoped>
.main-content{
  width: 100%;
  height: 100%;
  .bdb{
    width: 100%;
    height: 40px;
    .el-breadcrumb{
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>