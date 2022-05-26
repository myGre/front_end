<template>
  <div>
    <h4>Home</h4>
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    // 绘制图表
    return {};
  },
  mounted() {
    // this.getEcharts()
  },
  methods: {
    // getEcharts() {
    //   var myChart = this.$echarts.init(document.getElementById("main"));
    //   myChart.setOption({
    //     title: {
    //       text: "学生信息",
    //     },
    //     tooltip: {},
    //     xAxis: {
    //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: "销量",
    //         type: "bar",
    //         data: [5, 20, 36, 10, 10, 20],
    //       },
    //     ],
    //   });
    // },
  },
};
</script>
<style lang="less" scoped>
#main{
  width: 400px;
  height: 400px;
}
</style>