<template>
   <div class="star" :class="starType">
     <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
   </div>
</template>

<script>
const LENGTH=5;
const cls_on='on';
const cls_half="half";
const cls_off="off";

export default {
  props:{
    size:{
      type:Number
    },
    score:{
      type:Number
    }
  },
  computed:{
    starType(){
      return "star-"+this.size
    },
    itemClasses(){
      let result=[];
      let score=Math.floor(this.score*2)/2;
      let hasDecimal=score%1!==0;
      let integer=Math.floor(score);
      for(let i=0;i<integer;i++){
        result.push(cls_on);
      }
      if(hasDecimal){
        result.push(cls_half);
      }
      while(result.length<LENGTH){
        result.push(cls_off);
      }
      return result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star .star-item{
  display: inline-block;
}
/*尺寸为48的*/
.star-48 .star-item{
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}
/*全星*/
.star-48 .star-item.on{
  background: url(star48_on@2x.png);
  background-size: 100% 100%;
}
/*半星*/
.star-48 .star-item.half{
  background: url(star48_half@2x.png);
   background-size: 100% 100%;
}
/*空星*/
.star-48 .star-item.off{
  background: url(star48_off@2x.png);
   background-size: 100% 100%;
}

/*尺寸为36的*/
.star-36 .star-item{
  width: 15px;
  height: 15px;
  margin-right: 16px;
  background-size: 15px 15px;
}
/*全星*/
.star-36 .star-item.on{
  background: url(star36_on@2x.png);
   background-size: 100% 100%;
}
/*半星*/
.star-36 .star-item.half{
  background: url(star36_half@2x.png);
   background-size: 100% 100%;
}
/*空星*/
.star-36 .star-item.off{
  background: url(star36_off@2x.png);
   background-size: 100% 100%;
}

/*尺寸为24的*/
.star-24 .star-item{
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}
/*全星*/
.star-24 .star-item.on{
  background: url(star24_on@2x.png);
   background-size: 100% 100%;
}
/*半星*/
.star-24 .star-item.half{
  background: url(star24_half@2x.png);
   background-size: 100% 100%;
}
/*空星*/
.star-24 .star-item.off{
  background: url(star24_off@2x.png);
   background-size: 100% 100%;
}
</style>
