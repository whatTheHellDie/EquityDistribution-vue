<!--
current:当前页数,
showItem:展示页数,
allPage总页数,
targetPage:目标跳转页数
-->
<template>
  <div class="m-page">
          <ul class="pagination">
            <li v-show="myCurrent != 1">
              <a @click="myCurrent-- && goto(myCurrent)">&lt;</a>
            </li>
            <li v-show="myCurrent == 1">
              <a>&lt;</a>
            </li>
            <li @click="goto(1)" v-show="myCurrent-showItem-1>0&&allPage>showItem"><a>1</a></li>
            <span class="span" v-show="myCurrent-showItem-1>0&&allPage>showItem">...</span>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':myCurrent == index}" :key="index">
              <a>{{index}}</a>
            </li>
            <span class="span" v-show="myCurrent<allPage-showItem-2&&allPage>showItem">...</span>
            <li @click="goto(allPage)" v-show="myCurrent<allPage-showItem-2&&allPage>showItem"><a>{{allPage}}</a></li>
            <li v-if="allPage != myCurrent && allPage != 0 " @click="myCurrent++ && goto(myCurrent++)">
              <a>&gt;</a>
            </li>
            <li v-else >
              <a>&gt;</a>
            </li>
          </ul>
          <div class="turn-to" v-show="allPage>showItem">
            跳至
            <input type="text" v-model="targetPage">页
            <a @click="goto(targetPage)" class="btn btn-turn">跳转</a>
          </div>
        </div>
</template>

<script>
  export default {
    data() {
    return {
      myCurrent:this.current
    }
  },
  watch:{
    current(val){
      this.myCurrent=val;
    }
  },
  props:{
    current:{
      default:1
    },
    showItem:{
      default:5
    },
    allPage:{
      default:1
    },
    targetPage:{
      default:1
    }
  },
  computed:{
    pages:function(){
                var pag = [];
                  if( this.myCurrent < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allPage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.myCurrent - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allPage - this.showItem)  ){
                           middle = (this.allPage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
  },
  methods:{
    goto(index){
      this.$emit('goto',index)
    }
  }
  }
</script>

<style>
</style>