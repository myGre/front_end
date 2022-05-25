<template>
  <el-container>
  <el-aside width="200px">
      <NavMonu></NavMonu>
  </el-aside>
  <el-container>
    <!-- 头部 -->
    <el-header>
        <el-card>
          <Header></Header>
        </el-card>
    </el-header>

    <!-- 主要内容 -->
    <el-main>
        <Main></Main>
    </el-main>
    
    <!-- 尾部 -->
    <el-footer>
        <Footer></Footer>
    </el-footer>
  </el-container>
</el-container>
</template>

<script>
import Footer from '@/layout/component/Footer'
import Header from '@/layout/component/Header'
import Main from '@/layout/component/Main'
import NavMonu from '@/layout/component/NavMonu'
export default {
  name: 'layout',
  data(){
      return {}
  },
  components:{
      Footer,
      Header,
      Main,
      NavMonu
  },
}
</script>

<style>
.el-container{
  min-height: 950px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    height: 80px;
    text-align: center;
  }
  .el-header {
    height: 100px;
    padding: 0;
    margin-bottom: 30px;
    text-align: left;
  }
  .el-container .el-header .el-card{
    width: 100%;
    height: 60px;
    /* text-align: center; */
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /* line-height: 200px; */
  }
  
  .el-main {
    min-width: 800px;
    min-height: 400px;
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
    overflow: hidden;
    /* line-height: 160px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    /* line-height: 260px; */
  }
  
  .el-container:nth-child(7) .el-aside {
    /* line-height: 320px; */
  }
  .el-card__body, .el-main {
    padding: 0px;
}
</style>