<template>
  <div class="header">
    <!-- 头部的主要内容 -->
    <div class="content-wrapper">
      <div class="pic">
          <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
         <div class="title">
           <span class="brand"></span>
           <span class="name">{{seller.name}}</span>
         </div>
         <div class="description">
           {{seller.description}}/{{seller.deliveryTime}}分钟送达
         </div>
         <div v-if="seller.supports" class="support">
           <span class="icon" :class="classMap[seller.supports[0].type]"></span>
           <span class="text">{{seller.supports[0].description}}</span>
         </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">
           {{seller.supports.length}}个
        </span>
        <i class="ico_right icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- end-头部的主要内容 -->

    <!-- 公告栏 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="ico_right icon-keyboard_arrow_right"></i>
    </div>
    <!-- end-公告栏 -->

    <!-- 底部的模糊背景 -->
    <div class="background">
       <img width="100%" height="100%" :src="seller.avatar">
    </div>
    <!-- end-底部的模糊背景 -->

    <!-- 弹出框 -->
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrap">
              <star :size="48" :score="4.5"></star>
            </div>
            <div class="detail-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="detail-info">
              <ul v-if="seller.supports" class="supports">
                <li v-for="item in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                  <span class="text">{{seller.supports[$index].description}}</span>
                </li>   
              </ul>
            </div>
            <div class="detail-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="notice">
              <p>
                {{seller.bulletin}}
              </p>
            </div>
          </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        X
      </div>
    </div>
    <!-- end-弹出框 -->
  </div>
</template>



<script>
import star from '../star/star.vue'

export default {
  props: {
    seller:{
      type: Object
    }
  },
  data(){
   return{
    detailShow:false
   }
  },
  methods:{
    showDetail(){
      this.detailShow=true;
      console.log(this);
      console.log(this.detailShow);
    },
    closeDetail(){
      this.detailShow=false;
    }
  },
  created(){
      this.classMap=['decrease','disclount','guarantee','invoice','special']
  },
  components:{
    star
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  color: #fff;
  background:rgba(7,17,27,0.5);
  position: relative;
  /*-webkit-filter: blur(0.5px);*/
}
.content-wrapper{
  padding: 24px 12px 18px 24px;
  font-size: 0;
  position: relative;
}
.pic{
  display: inline-block;
  vertical-align: top;
}
.pic img{
  border-radius: 2px;
}
.content{
  display: inline-block;
  font-size: 14px;
  margin-left: 16px;
}
.content .title{
  margin: 2px 0 8px 0;
}
.content .title .brand{
  width: 30px;
  height: 18px;
  display: inline-block;
  vertical-align: top;
  background: url(brand@2x.png);
  background-size: 30px 18px;
}
.content .title .name{
   margin-left: 6px;
   font-size: 16px;
   line-height: 18px;
   font-weight: bold;
}
.description{
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 12px;
  font-weight: 200;
}
.support .icon{
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
}
/*写出ico的不同的类*/
.decrease{
  background: url(decrease_1@2x.png);
}
.disclount{
  background: url(discount_1@2x.png);
}
.guarantee{
  background: url(guarantee_1@2x.png);
}
.invoice{
  background: url(invoice_1@2x.png);
}
.special{
  background: url(special_1@2x.png);
}
/*写出ico的不同的类*/
.support .text{
  font-size: 10px;
  line-height: 12px;
}
.support-count{
  position: absolute;
  right: 12px;
  bottom: 18px;
  height: 24px;
  line-height: 24px;
  color: #fff;
  background: rgba(0,0,0,0.2);
  padding: 0 8px;
  border-radius: 14px;
}
.support-count *{
  vertical-align: middle;
}
.support-count .count{
  font-size: 10px;
}
.ico_right{
  font-size: 16px;
}
.bulletin-wrapper{
  font-size: 10px;
  font-weight: 200;
  color:#fff;
  height: 28px;
  line-height: 28px;
  padding: 0 24px 0 12px;
  background:rgba(7,17,27,0.2);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
  position: relative;
}
.bulletin-wrapper *{
  vertical-align: middle;
}
.bulletin-title{
  display: inline-block;
  width: 22px;
  height: 12px;
  background: url(bulletin@2x.png);
  background-size: 22px 12px;
}
.bulletin-text{
  margin: 0 4px;
}
.bulletin-wrapper .ico_right{
  position: absolute;
  right: 5px;
  top:8px;
}
.background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.detail{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(7,17,27,0.8);
}
.fade-transition{
  transition: opacity 1s ease;
}
.fade-enter{
  opacity: 0;
}
.fade-leave{
  opacity: 0;
}


.detail-wrapper{
  min-height: 100%;
}
.detail-main{
  margin-top: 64px;
  padding-bottom: 64px;
}
.detail-main h1{
  font-weight: bold;
}
.star-wrap{
  text-align: center;
  margin-top: 16px;
  margin-bottom: 28px;
}
.detail-close{
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
.detail-wrapper{
  width: 100%;
}
.detail-main .name{
  line-height: 16px;
  text-align: center;
  font-size: 16px;
}

.detail-title{
  display: flex;
  width: 80%;
  margin: 30px auto 24px auto;
}
.detail-title .line{
  flex: 1;
  position: relative;
  top: -6px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.detail-title .text{
  padding:0 12px;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}
.detail-info li{
  height: 16px;
  line-height: 16px;
  margin-bottom: 12px;
  margin-left: 10%;
  padding-left: 12px;
}
.detail-info li *{
  vertical-align: middle;
}
.detail-info .icon{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
}
.detail-info .text{
  font-size: 12px;
  font-weight: 100;
  color: #fff;
}
.notice{
  width: 80%;
  margin: 0 auto;
  color: #fff;
  line-height: 24px;
  font-weight: 100;
  font-size: 12px;
}
.notice p{
  padding-left: 12px;
  padding-right: 12px;
}
</style>
