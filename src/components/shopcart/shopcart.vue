<template>
<div class="shopcart">
  <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span  class="icon-shoping-cart icon-shopping_cart" :class="{'highlight':totalCount>0}">
            </span>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">
          {{totalPrice}}元
        </div>
        <div class="des">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payclass"  @click.stop.prevent="pay">
          {{payDesc}}
        </div>
      </div>
  </div>
  <div class="shopcart-list" v-show="listShow" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" v-el:list-content>
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
  </div>
</div>
<div class="list-mask" @click="hideList" v-show="listShow" transition="fade"></div>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'

export default{
  components:{
    cartcontrol
  },
  props:{
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice:{
      type:Number,
      dafault:0
    },
    minPrice:{
      type:Number,
      dafault:0
    }
  },
  data(){
      return{
        fold:true
      }
    },
  computed:{
    totalPrice(){
      let total=0;
      this.selectFoods.forEach((food) =>{
        total+=food.price*food.count;
      });
      return total;
    },
    totalCount(){
      let count=0;
      this.selectFoods.forEach((food) =>{
        count+=food.count;
      });
      return count;      
    },
    payDesc(){
      if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;   
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
    },
    payclass(){
      if(this.totalPrice<this.minPrice){
        return "not-enough";
      }
      else{
        return "enough";
      }
    },
     listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$els.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
  },
  methods:{
    toggleList() {
      if(!this.totalCount){
        return;
      }
       this.fold = !this.fold;
    },
    hideList(){
      this.fold = true;
    },
    empty(){
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
}
.content{
  display: flex;
  background: #141d27;
  font-size: 0;
}
.content-left{
  flex:1;
}
.content-left .logo-wrapper{
  display: inline-block;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing:border-box;
  vertical-align: top;
  border-radius: 50%;
  background: #141d27;
}
.content-left .logo-wrapper .logo{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #2b343c;
  text-align: center;
}
.content-left .logo-wrapper .logo.highlight{
  background: rgb(0, 160, 220)
}
.content-left .logo-wrapper .logo .icon-shoping-cart{
  font-size: 24px;
  color: #80858a;
  line-height: 44px;
}
.content-left .logo-wrapper .num{
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 24px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.content-left .logo-wrapper .logo .icon-shoping-cart.highlight{
  color: #fff;
}
.content-left .price{
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  margin-top: 12px;
  padding-right: 12px;
  box-sizing:border-box;
  border-right: 1px solid rgba(255,255,255,0.1);
  font-weight: 700;
  font-size: 16px;
}
.content-left .price.highlight{
  color: #fff;
}
.content-left .des{
  display: inline-block;
  line-height: 24px;
  font-size: 10px;
  margin-top: 12px;
  margin-left: 10px;
}
.content-right{
  width: 85px;
}
.content-right .pay{
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  font-weight: 700;
  background: #26333b;
}
.content-right .pay.not-enough{
  background: #2b333b;
}
.content-right .pay.enough{
  background: #00b43c;
   color: #fff;
}
.shopcart-list{
  position: fixed;
  left: 0;
  bottom: 48px;
  z-index: -1;
  width: 100%;
}
.fold-transition{
  transition: all 0.3s ease;
  bottom:48px;
}
.fold-enter,.fold-leave{
  bottom: 0;
}
.list-header{
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);  
}
.list-header .title{
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27);
}   
.list-header .empty{
  float: right;
  font-size: 12px;
  color: rgb(0, 160, 220);
}
.list-content{
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;
}  
.list-content .food{
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
} 
.list-content .food .name{
  line-height: 24px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.list-content .food .price{
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}
.list-content .food  .cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 6px ; 
}
.list-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  background: rgba(7,17,27,0);
}
.list-mask.fade-transition{
  background: rgba(7,17,27,0.7);
  transition: all 0.3s ease;
}  
.list-mask.fade-enter,.list-mask.fade-leave{
 background: rgba(7,17,27,0);
}
</style>
