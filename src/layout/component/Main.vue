<template>
  <div class="main-content">
    <!-- 面包屑 -->
    <el-card class="bdb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <template v-if="$route.path != '/home/index'">
          <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
        </template>
      </el-breadcrumb>
    </el-card>
    <!-- 路由展示区 -->
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {};
  },
  created() {
    // console.log(this.$route);
  },
};
</script>

<style lang="less" scoped>
.main-content {
  width: 100%;
  height: 100%;
  position: relative;
  .bdb {
    width: 100%;
    height: 40px;
    .el-breadcrumb {
      height: 40px;
      line-height: 40px;
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
  overflow: hidden;
}
.v-enter, .v-leave-to/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position: absolute;
}
</style>