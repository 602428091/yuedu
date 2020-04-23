<template>
<div >
      <div class="relate-item">
        <h3>
          其他相关节目
          <span >
            <i class="pre" @click="addleft"></i>
            <i class="next" @click="subright"></i>
          </span>
        </h3>
        <ul class="relate-list" ref="slide" >
               <li v-for="(list,index) in lists"  :key="index" >
                  <img :src="list.img_url" alt="" />
                  <p>
                  <router-link :to="'/article/'+list.id">{{list.title}}</router-link></p>
              </li>
        </ul>
      </div>
      </div>
</template>
<script>
export default {
  name: "program",
   data(){
        return {
            lists:[],
            count:0
        }
    },
    created(){
        this.gettab()
    },
    methods:{
      gettab(){
       
         this.axios.get("http://localhost:3000/api/articles/rand").then(res=>{
            
             this.lists=[]
             this.lists=this.lists.concat(res.data.res)
         }).catch(error=>{
           console.log(error)
         })
      },

      addleft(){
          if(this.count>0){
            this.count-- 
            this.$refs.slide.style.left= -330*this.count+"px";
          }else {
            this.count=0
          }
      },
      subright(){
        this.count++
        if(this.count<5){
          this.$refs.slide.style.left= -330*this.count+"px";
        }else{
          this.count=4
        }
      },
  },
  watch:{
    '$route'(to){
      this.gettab()
    }
  }
}
</script>
<style scoped>
.relate-item {
  overflow: hidden;
  height: 300px;
  /* width: 1650px; */
  position: relative;
}
.relate-list {
  width: 1650px;
  height: 278px;
  position: absolute;
  left: 0;
  padding: 0 0 0 30px;
  top: 40px;
  transition: 1s;
}

.relate-list li:hover p {
  color: #ee5044
}
 img {
   width: 100%;
 }
.content {
  overflow: hidden;
}
.content .con-r {
  float: right;
  width: 1650px;
  padding: 40px 0;
}
.con-r .user:before {
  position: absolute;
  top: 63px;
  left: -20px;
  display: inline-block;
  border-right: 10px solid #fff;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
  content: "";
}
.con-r .user {
  position: relative;
  margin-bottom: 30px;
  background-color: #fff;
}
.con-r .user-base {
  padding: 30px;
  border-bottom: 1px dashed #eee;
  overflow: hidden;
}
li {
    list-style: none;
}
.relate-item{
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fff;
}
.relate-item h3 {
  width: 295px;
  padding-left: 8px;
  line-height: 16px;
  font-size: 14px;
  color: #707070;
  border-left: 3px solid #ee5044;
  overflow: hidden;
}
.relate-item h3 span {
  float: right;
}
.relate-item h3 span i{
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
.relate-item .relate-list li {
  float: left;
  width: 135px;
  padding-top: 25px;
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
</style>