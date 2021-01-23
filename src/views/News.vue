<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <router-link to="/">首页</router-link>&gt;<a href="">公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="
    result">
      <div class="news">
        <ul>
          <li v-for="(item,index) in result.data" :key="index"><span>{{item.pubTime | date}}</span><router-link :to="`/news_details/${item.nid}`">
            {{item.title}}
          </router-link></li>
          <!-- <li><span>{{moment(item.pubTime * 1).format("YYYY-MM-DD")}}</span><a href="">{{item.title}}</a></li> -->
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages" >
        <a 
        class="default" 
        v-show="result.pageNum == 1">上一页</a>
        <a 
        @click="getData(result.pageNum - 1)" 
        v-show="result.pageNum != 1">
          上一页
        </a>

        <a  
        v-for="(item,index) of result.pageCount" :key="index" 
        :class="{cur : result.pageNum == item}"
        @click="getData(item)">
          {{item}}
        </a>

        <a
        @click="getData(result.pageNum + 1)" 
        v-show="result.pageNum!= result.pageCount">下一页</a>
         <a
        class="defaultpag" 
        v-show="result.pageNum == result.pageCount">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  data(){
    return {
      result:null,
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(pno=1){
      const url = "news_select.php?pageNum=" + pno 
       this.axios.get(url)
        .then(res => {
          this.result=res.data
          // console.log(this.result)
        })
        .catch(err => {
          // console.error(err); 
        })
        }
  },
  filters:{
    date(value){
      const date = new Date(value*1);
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
  },
}
</script>

<style>
.pages{
  user-select: none;
}
</style>
