<template>
<div class="goods">
  <!-- 左侧 -->
  <div class="menu-wrapper" v-el:menu-wrapper>
  	<ul>
      <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}"
            @click="selectMenu($index,$event)">
        <span class="text">
          <span v-show="goods[$index].type>0" class="icon" :class="classMap[goods[$index].type]"></span>
          {{goods[$index].name}}
        </span>
      </li>
  	</ul>
  </div>
  <!-- 右侧 -->
  <div class="foods-wrapper" v-el:foods-wrapper>
  	 <ul>
      <li v-for="item in goods" class="food-list-hook">
         <h1 class="title">{{item.name}}</h1>
         <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="food-pic">
                <img width="57px" :src="food.icon">
              </div>
              <div class="food-cont">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span class="good-rate">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
           </li>
         </ul>
      </li> 
     </ul>
  </div>
  <!-- 购物车组件 -->
  <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
   
</div> 
	

</template>

<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart.vue'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'

const ERR_OK=0;
export default {
  components:{
    shopcart,
    cartcontrol
  },
  props: {
  	seller:{
  		type:Object
  	}
  },
  data(){
  	return { 
  		goods: [],
      listHeight: [],
      scrollY: 0
  	}
  },
  computed:{
    currentIndex(){
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods(){
      let foods=[];
      this.goods.forEach((good) =>{
        good.foods.forEach((food) =>{
          if(food.count){
              foods.push(food);
          }
        })
      });
      return foods;
    }
  },
  created(){
  	this.classMap=['decrease','discount','guarantee','invoice','special'];
  	this.$http.get('/api/goods').then((response) => {
      response =response.body;
  		if(response.errno===ERR_OK){
  	    this.goods=response.data;    
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
  		}
  	})
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _initScroll() {
        this.meunScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*大框*/
.goods{
	width: 100%;
	display: flex;
	position: absolute;
	top: 174px;
	bottom:46px;
	overflow: hidden;
}
/*左边*/
.goods .menu-wrapper{
	background:red;
	width: 80px;
	background-color: #f3f5f7;
}
.menu-item{
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  padding-left: 12px;
}
/*右边*/
.goods .foods-wrapper{
	flex:1;
}
.icon{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
}
/*写出ico的不同的类*/
.decrease{
  background: url(decrease_3@2x.png);
  background-size: 12px 12px;
}
.discount{
  background: url(discount_3@2x.png);
  background-size: 12px 12px;
}
.guarantee{
  background: url(guarantee_3@2x.png);
  background-size: 12px 12px;
}
.invoice{
  background: url(invoice_3@2x.png);
  background-size: 12px 12px;
}
.special{
  background: url(special_3@2x.png);
  background-size: 12px 12px;
}
.text{
  font-size: 12px;
  display: table-cell;
  width: 56px;
  vertical-align: middle;
}
/*写出ico的不同的类*/

.foods-wrapper .title{
  padding-left: 26px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d6e9cd;
  font-size: 12px;
  color: rgb(147,153,159);
  background: #f3f5f7;
}
.food-item{
  display: flex;
  padding:18px;
  border-top: 1px solid rgba(7,17,27,0.1);
}
.food-item:last-chlid{
  border-bottom: 0;
}
.food-pic{
  width: 57px;
  margin-right: 10px;
}
.food-cont{
  flex: 1;
}
.food-cont .name{
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.desc,.extra{
   line-height: 10px;
   font-size: 10px;
   color: rgb(147,153,159);
}
.desc{
  margin-bottom: 8px;
}
.extra{
  margin-bottom: 10px;
}
.extra .count{
  margin-right: 12px;
}
.price{
  font-weight: 700;
  line-height: 24px;
  position: relative;
}
.price .now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.price  .old{
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147,153,159);
}
.current{
  position: relative;
  margin-top: -1px;
  z-index: 10;
  background: #fff;
  font-weight: 700;
}
.current .text{
  border:none;
}
.cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 5px;
}
            
</style>
