<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        router
        :default-active="navRouter"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="(item, index) in monu">
          <template v-if="item.children">
            <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
              <template slot="title" v-if="item.children">
                <i :class="item.location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group
                v-for="(item, index) in item.children"
                :key="index"
              >
                <el-menu-item :index="item.path">
                  <i :class="item.location"></i>
                  {{ item.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "NavMonu",
  data() {
    return {
      monu: [],
      navRouter: "",
    };
  },
  created() {
    this.monu = [...this.$router.options.routes];
    console.log();
    this.navRouter = this.$router.currentRoute.path;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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