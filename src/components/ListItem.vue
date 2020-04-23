<template>
    <ul id="item">
      <li class="content1" v-for="(list,index) in lists" :key="index">
        <img :src="list.img_url" />
        <div class="container">
          <router-link :to='"/article/"+list.id' class="title">{{list.title | formatTitle}}</router-link>
          <p class="details">
            <span>
              <i class="writer"></i>{{list.author}}
            </span>
            <span>
              <i class="listen"></i>{{list.podcast}}
            </span>
            <span>
              <i class="clock"></i>{{list.duration}}
            </span>
            <span>
              <i class="play_time"></i>{{list.play_time}}次
            </span>
          </p>
          <div class="content">{{list.content | fromatContent}}</div>
        </div>
      </li>
    </ul>
</template>
<script>
import bus from "../bus"
export default {
  name: "ListItem",
    created(){
        this.gettab(1)
  },
  data(){
    return {
       lists:[],
       countNum:"",
    }
  },
   filters:{
        fromatContent(val){
          return val.length>45?val.slice(0,100)+"...":val
        },
        formatTitle(val){
          return val.length>15?val.slice(0,15)+"...":val
        }
      },
  methods:{
      gettab(val){
        
         this.axios.get("http://localhost:3000/api/articles/"+val+"/page/"+this.$route.params.page).then(res=>{
           this.lists=[]
            this.lists=this.lists.concat(res.data.res.articles)
            this.countNum=res.data.res.count
            bus.$emit("send",this.countNum)
         }).catch(error=>{
           console.log(error)
         })
        
      },
     
  },
  watch:{
    "$route"(to){
        this.gettab(to.params.tab)
    }
    }
};

</script>

<style  scoped>
 .container .title {
        margin-bottom: 10px;
        display: block
    }
.writer ,.listen,.clock,.play_time{
   display: inline-block;
   width: 14px;
   height: 14px;
}
.container:hover  .tit {
  color: #ff3300
}
 .writer {
        background: url(../assets/pencil.png) no-repeat 0px 4px;
    }
     .listen{
        background: url(../assets/speaking.png) no-repeat 0px 4px;
    }
     .clock {
        background: url(../assets/time.png) no-repeat 0px 4px;
    }  
    .play_time {
       background: url(../assets/time.png) no-repeat 0px 4px;
    }

    * {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }
 .container .tit {
   display: inline-block;
    font-size: 18px;
    margin-bottom: 10px
  }
    .content1 {
        width: 620px;
        height: 210px;
        background: #ffffff;
        list-style: none;
        overflow: hidden;
    }

    img {
        width: 235px;
        height: 210px;
        overflow: hidden;
        float: left;
    }

    .container {
        margin-left: 231px;
        padding: 30px;
    }

    .content {
        line-height: 22px;
        letter-spacing: 1px;
        font-size: 12px;
        color: #707070;
    }


    .details {
        margin-bottom: 25px;
        color: #999;
    }

    .details span {
        display: inline-block;
        margin-right: 15px;
        font-size: 12px;
    }
    #item li {
      margin-bottom: 30px
    }
</style>