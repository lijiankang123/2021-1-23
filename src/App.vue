<template>
  <div>
    <!-- 官方规范：组件名要求大写，  避免冲突 -->
    <!-- 头部 -->
    <Header class="header_box"/>

    <!-- 路由变化时，随着变化 -->
    <router-view />
    
    <!-- 尾部 -->
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style>
/* css中引入其他css文件*/
@import './assets/css/common.css';
@import './assets/css/mycss.css';

</style>
