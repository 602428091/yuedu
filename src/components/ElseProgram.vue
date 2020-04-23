<template>
  <div >
    <div class="channel-item">
      <h3>
          <span @click="seeall">
          查看全部
          <i></i>
        </span>
        {{name}}频道其他节目
      </h3>
      <ul class="channel-list">
        <li v-for="(list,index) in lists" :key="index">
           <router-link :to='"/article/"+list.id'>{{list.title}}</router-link>
          <p>
            <span>文：{{list.author}}</span>
            <span>主播：{{list.podcast}}</span>
          </p>
        </li>
      </ul>
    </div>
     <div class="side-img">
        <img src="http://qingwenyi.com/smedia/upload/1507.jpg" alt="" width="360px" height="236px">
    </div>
  </div>
</template>
<script>
import bus from '../bus'
export default {
  name: "esleprogram",
  created(){
        this.gettext(1)
        bus.$on("typeid",(data)=>{
          this.typeid=data
          this.name=this.typeid=="1"?"悦读":this.typeid=="2"?"情感":this.typeid=="3"?"连播":this.typeid=="4"?"校园":this.typeid=="5"?"音乐":"Labs"
        })
    },
    data(){
      return {
        lists:[],
        typeid:'',
        name:''
      }
    },
    methods:{
        gettext(val){
            this.axios.get("http://localhost:3000/api/articles/2/rand").then(res=>{
                this.lists=res.data.res
            }).catch(error=>{
                console.log(error)
            })
        },
        seeall(){
          this.$router.push("/channel/1/1")
        }
    },
    watch:{
      "$route"(to){
        this.gettext(to.params.id)
      }
    }
};
</script>
<style  scoped>
.channel-item h3 span:hover {
  color: #ee5044
}
.channel-list li:hover a {
  color: #ee5044
}
a {
  text-decoration: none
}
li {
  list-style: none;
}
.content .con-r {
  float: right;
  width: 360px;
  padding: 40px 0;
}
.relate-item,
.channel-item {
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fff;
}
.relate-item h3,
.channel-item h3 {
  padding-left: 8px;
  line-height: 16px;
  font-size: 14px;
  color: #707070;
  border-left: 3px solid #ee5044;
  overflow: hidden;
}
.relate-item h3 span,
.channel-item h3 span {
  float: right;
}
.channel-item h3 span {
  font-size: 12px;
  font-weight: normal;
}
.relate-item h3 span i,
.channel-item h3 span i {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.relate-item h3 span .pre {
  background: url(../assets/pre_icon.png) no-repeat 0px 0px;
}
.relate-item h3 span .next {
  background: url(../assets/next_icon.png) no-repeat 0px 0px;
}
.relate-item .relate-list {
  width: 330px;
  overflow: hidden;
}
.relate-item .relate-list li {
  float: left;
  width: 135px;
  padding-top: 30px;
  margin-right: 30px;
}
.relate-item .relate-list li p {
  width: 100%;
  padding-top: 3px;
  font-size: 12px;
  color: #707070;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.channel-list {
  padding-top: 30px;
}
.channel-list li {
  padding-bottom: 10px;
  margin-bottom: 10px;
  line-height: 20px;
  border-bottom: 1px dashed #eee;
}
.channel-list li a {
  font-size: 12px;
  color: #707070;
}
.channel-list li p {
  font-size: 12px;
  color: #999;
}
.channel-list li p span {
  margin-right: 20px;
}
.channel-item h3 i {
  background: url(../assets/next.png) no-repeat -1px 3px;
}
</style>