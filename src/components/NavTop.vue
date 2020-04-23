<template>
  <div class="head-wrap">
    <div class="head">
      <div class="head-l">
        <div class="logo" @click="read">
          <span class="mlogo">
            <span class="logo-a fl"></span>
            <span class="logo-b fl"></span>
            <span class="logo-c fl"></span>
          </span>
          悦读 FM
        </div>
        <div class="menu">
          <a v-for="(tab,index) in tabs" @click="nav(tab.id)" :key="index" v-bind:class="{active:id==index+1}">{{tab.type}} </a>
        </div>
      </div>
      <div class="head-r">
        <div class="search">
          <input type="text" />
          <i></i>
        </div>
        <div class="fr">
          <div class="login1" v-if="name==''">
            <a href="javascript:void(0)" id="login_in" @click="login">登录</a>
            <a href="javascript:void(0)" class="register_in" @click="res">注册</a>
          </div>
          <div class="login1" v-else>
            <a href="javascript:void(0)" class="username">{{name}}</a>
            <a href="javascript:void(0)" @click="clear">退出</a>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import bus from "../bus"
export default {
  name: "NavTop",
  data() {
    return {
      tabs: [],
      name:'',
      isactive:true,
      id:'',
    };
  },
  created() {
    // this.id=''
    this.gettab();
    bus.$on('sendname',(data)=>{
      this.name=data
    })
    bus.$on("typeid",(data)=>{
      if(this.$route.params.id!=undefined){
        this.id=data
      }else {
        this.id=''
      }
      

    })
    
  },
  mounted(){
    var num =document.getElementById("login_in").innerHTML
    if(num=="登录"){
      localStorage.removeItem('token')
      localStorage.removeItem("name")
    }
  },
  
  methods: {
    gettab() {
      this.axios.get("http://localhost:3000/api/types").then(res => {
        this.tabs = res.data.res;
      }).catch(error=>{
                console.log(error)
            });
    },
    nav(val){
      this.$router.push('/channel/'+val+'/1')
      this.id=val
    },
      read() {
        // this.id=''
          this.$router.push('/')
          
          
      },
      login(){
        var loginbox =document.getElementsByClassName("login")[0]
        var all =document.getElementsByClassName("all")[0]
             loginbox.style.marginLeft=36+"%"
            loginbox.style.transition=.5+"s"
            loginbox.style.display='block'
            all.style.display="block"
            setTimeout(()=>{
              loginbox.style.left=0
            },30)
      },
      res(){
        var register_box =document.getElementsByClassName("register")[0]
        var all1 =document.getElementsByClassName("all1")[0]
        register_box.style.marginLeft=36+"%"
        register_box.style.transition=.5+"s"
        all1.style.display="block"
        register_box.style.display="block"
        setTimeout(()=>{
            register_box.style.left=0
          },30)
      },
      clear(){
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        this.name=''
      },

  }
};
</script>

<style scoped>
.active {
  color: #ee5044!important
}
* {
  padding: 0;
  margin: 0;
}
body {
  background: rgb(245, 245, 245);
}
.head-wrap {
  width: 100%;
  background-color: #fff;
}
.foot-wrap,
.content-wrap {
  width: 100%;
}
.head,
.content,
.foot {
  width: 1010px;
  margin: auto;
}
.head {
  padding: 38px 0;
  height: 30px;
}
a {
  text-decoration: none;
}
.head a {
  color: #707070;
}
.head-l {
  float: left;
  line-height: 30px;
  font-size: 14px;
  color: #707070;
  overflow: hidden;
}
.menu {
  margin-left: 130px;
}
.menu a {
  padding: 0 20px;
}
.channel-list li a:hover,
a:hover,
.logo:hover,
.item-main .hint a:hover,
.user-name:hover,
.relate-item .relate-list li p:hover,
.channel-item h3 span:hover,
.item-pg span:hover {
  color: #ee5044;
}
.fr {
  height: 20px;
  line-height: 20px;
  margin: 5px 0 5px 20px;
  border-left: 1px dotted #ccc;
}
.login1 a {
  padding-left: 20px;
  font-size: 12px;
}
.head-r {
  float: right;
  overflow: hidden;
}
.logo,
.menu,
.search,
.fr {
  float: left;
}
.search {
  position: relative;
  height: 20px;
  line-height: 16px;
  overflow: hidden;
  width: 150px;
  margin: 5px 0;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
}
.search i {
  position: absolute;
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(../assets/search.png) no-repeat 3px 5px;
}
.search input {
  width: 120px;
  height: 16px;
  padding: 2px 5px;
  border: none;
  border-radius: 0;
  outline: none;
  background: transparent;
}
.logo .mlogo {
  margin-right: 15px;
}
.mlogo span {
  float: left;
  width: 4px;
  background: #ee5044;
  border-radius: 2px;
}
.logo-a {
  height: 18px;
  margin: 6px 4px 0 0;
}
.logo-b {
  height: 28px;
  margin: 0 4px 0 0;
}
.logo-c {
  height: 18px;
  margin: 6px 0 0 0;
}
.content {
  overflow: hidden;
}
.content .con-l {
  float: left;
  width: 620px;
  padding: 40px 0;
  margin-right: 30px;
}
.content .con-r {
  float: right;
  width: 360px;
  padding: 40px 0;
}
.item-base,
.item-main,
.item-footer {
  margin-bottom: 30px;
  background-color: #fff;
}
.item-base {
  padding: 30px;
}
.item-base .tit {
  line-height: 24px;
  margin-bottom: 8px;
  font-size: 24px;
  color: #707070;
}
</style>
