<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab_p">
         <a v-link="{path: '/goods'}">商品</a>
      </div>
      <div class="tab_p">
         <a v-link="{path: '/ratings'}">评论</a>
      </div>
      <div class="tab_p">
        <a v-link="{path: '/seller'}">商家</a> 
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>

  
</template>

<script>
import header from './components/header/header.vue'

const ERR_OK =0;

export default {
  data(){
    return {
      seller:{}
    };
  },
  created(){
    this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if(response.errno===ERR_OK) {
          this.seller=response.data;
        }
    });
  },
  components: {
    "v-header":header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.tab{
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(7,17,27,0.1)
}
.tab_p{
  flex: 1;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
a{
  display: block;
  text-decoration: none;
  font-size: 14px;
  color: rgb(77,85,93);
}
a.active{
  color: rgb(240,20,20);
}

</style>
