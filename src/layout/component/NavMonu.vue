<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        router
        class="el-menu-vertical-demo"
        :default-active="navRouter"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="(item, index) in children">
          <template v-if="item.children.length > 1">
            <el-submenu :index="index + ''" :key="index">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{ item.meta.title }}</span>
              </template>
              <el-menu-item-group
                v-for="(item, index) in item.children"
                :key="index"
              >
                <el-menu-item :index="item.path">
                  <i :class="item.meta.icon"></i>
                  {{ item.meta.title }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="index" :index="item.path">
              <i :class="item.meta.icon"></i>
              {{ item.meta.title }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "NavMonu",
  data() {
    return {
      monu: [],
      navRouter: "",
    };
  },
  computed: {
    ...mapGetters(['NavRoutes']),
    // 过滤掉没有children的路由且求children小于2的路由
    children() {
      return this.NavRoutes.filter((item) => item.hidden != true);
    },
  },
  created() {
    // 
    this.navRouter = this.$router.currentRoute.path;
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  width: 100%;
  height: 100%;
  background-color: rgba(84, 92, 100);
  .el-col-12 {
    width: 100%;
    .el-menu {
      border: 0;
    }
  }
}
</style>