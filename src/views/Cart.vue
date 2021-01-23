<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_header">
          <span>已选商品<em>{{checkedNum}}</em>件</span>
          <span>总金额：<strong>¥ {{ checkedTotalPrice }}</strong></span>
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span><input type="checkbox" v-model="checkAll" @change="doCheckAll"/> 全选</span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-show="products.length==0">购物车中没有任何商品！</h2>
            <li v-for="(item,index) of products" :key="index">
              <input 
              v-model="item.checked" 
              @change="checkOne"
              type="checkbox" 
              class="cart_checkbox"/>
              <a href="" class="cart_img"><img :src="'http://101.96.128.94:9999/mfresh/'+item.pic" alt=""/></a>
              <a href="" class="cart_title">{{item.title1}}</a>
              <i>￥{{item.price}}</i>
              <div>
                <span @click="updateCount(index,-1)">-</span><input type="text" v-model="item.count"/><span @click="updateCount(index,+1)">+</span>
              </div>
              <strong>￥{{item.price * item.count}}</strong>
              <em @click="doDel(index)"></em> 
            </li>
            <!--<li>-->
              <!--<input type="checkbox" class="cart_checkbox"/>-->
              <!--<a href="" class="cart_img"><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<a href="" class="cart_title">家用除甲醛静音M-8088A</a>-->
              <!--<i>￥1599</i>-->
              <!--<div>-->
                <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>￥1599.00</strong>-->
              <!--<em></em>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cart_header">
          <span>已选商品<em>{{ checkedNum }}</em>件</span>
          <span>总金额：<strong>¥ {{ checkedTotalPrice }}</strong></span>
          <button type="button">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      products:[],
      checkAll:false
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      const url = "cart_detail_select.php?uid=" + this.$store.state.uid;
      this.axios.get(url).then((res)=>{
        // console.log(res);
        res.data.products.forEach((item)=>{
          item.checked = false;
        })
        this.products = res.data.products;
      })
    },
    // 点击加减号修改数量
    updateCount(index,delta){
      const {pid,did,count} = this.products[index];
      if(count==1 && delta==-1){
        alert("数量最少是1");
        return
      }
      const new_count = count * 1 + delta;
      const url = `cart_detail_update.php?did=${did}&pid=${pid}&count=${new_count}`;
      this.axios.get(url).then(res=>{
        // console.log(res)
         if(res.data.code==1){
           this.products[index].count = new_count;
         }else{
           alert("更新失败")
         }
      })
    },
    // 删除商品
    doDel(index){
      const {did} = this.products[index];
      // console.log(did);
      const url = `cart_detail_delete.php?did=${did}`;
      this.axios.get(url).then(res=>{
        console.log(res);
        if(res.data.code==1){
          alert("删除成功")
          this.products.splice(index,1);
        }else{
          alert("删除失败")
        }
      })
    },
    // 全选
    doCheckAll(){
      this.products.forEach((item)=>{
        item.checked = this.checkAll;
      })
    },
    // 单选,影响全选
    checkOne(){
      this.checkAll = this.checkedNum == this.products.length
    }
  },
  // 计算属性
  computed:{
    checkedNum(){
      let total = 0;
      this.products.forEach((item)=>{
        if(item.checked) total++;
      })
      return total;
    },
    checkedTotalPrice(){
      let total = 0;
      this.products.forEach((item)=>{
        if(item.checked) total += item.price * item.count;
      })
      return total;
    }
  }
}
</script>

<style>
</style>
