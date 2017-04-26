<template>
<div class="cartcontrol">
   <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
   </div>
   <div class="cart-count" v-show="food.count>0">
     {{food.count}}
   </div>
   <div class="cart-add icon-add_circle" @click.stop.prevent="addCart">
   </div>
</div>

</template>

<script>
import Vue from "vue";

export default{
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    addCart(event){
      if(!event._constructed){
        return;
      }
      if(!this.food.count){
         Vue.set(this.food,'count',1);
      }
      else{
        this.food.count++;
      }
    },
    decreaseCart(event){
      if(!event._constructed){
        return;
      }
      this.food.count--;
    }
  }

}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cartcontrol *{
  vertical-align: middle;
}
.cart-count{
  display: inline-block;
  padding:6px;
  font-size: 16px;
  height: 24px;line-height: 24px;
  color: rgb(147, 153, 159);
}
.cart-add,.cart-decrease{
  display: inline-block;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0,160,220);
  transition: all 0.4s linear
}
.cart-decrease.move-transition{
  opacity: 1;
        transform: translate3d(0, 0, 0);
}
.cart-decrease.move-transition .inner{
  display: inline-block;
          line-height: 24px;
          font-size: 24px;
          color: rgb(0, 160, 220);
          transition: all 0.4s linear;
          transform: rotate(0);
}
.cart-decrease.move-enter,.cart-decrease.move-leave{
   opacity: 0;
        transform: translate3d(24px, 0, 0);
}
.cart-decrease.move-enter .inner,.cart-decrease.move-leave .inner{
   transform: rotate(180deg);
}

</style>
