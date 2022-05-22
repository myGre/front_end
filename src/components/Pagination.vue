<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      align="right"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      // currentPage1: 5,
      // currentPage2: 5,
      // currentPage3: 5,
      // currentPage4: 4,
    };
  },
  // props: ["total", "pageSize", "page"],
  props: {
    total: {
      required: true,
      // type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 5
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      },
      pageSize: {
        get() {
          return this.pageSize
        },
        set(val) {
          this.$emit('update:pageSize', val)
        }
      }
    },
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.pageSize = val;
      this.$emit('pagination', {page: this.currentPage, pageSize: val})
      
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.page = val;
      this.$emit('pagination', {page: val, pageSize: this.pageSize})
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  margin: 40px 0;
}
</style>