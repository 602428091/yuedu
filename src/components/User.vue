<template>
    <div >
      <div class="user">
        <div class="user-base">
          <div class="user-avatar">
            <img src="http://yuedufm.com/static/file/large/d9239f8f1141ccb2d5cd9c3cbe3640f2" alt />
          </div>
          <div class="user-con">
            <div class="user-name">
              薇薇
              <i></i>
            </div>
            <div class="user-info">
              <div class="user-status">
                作品：31
                <br />粉丝：119
              </div>
              <a href="javascript:void(0)" class="user-focus">关注</a>
            </div>
          </div>
        </div>
        <div class="item-status">
          <span class="good item">
            <span class="item-s-b item-s-b1" @click="love">
              <i class="icon1"></i>
              <span class="item-s-tip item-s-tip1" >赞</span>
            </span>
            <span id="click_num">{{likenum}}</span>
          </span>
          <span class="collect item">
            <span class="item-s-b item-s-b2">
              <i class="icon2"></i>
              <span class="item-s-tip item-s-tip2">收藏</span>
            </span>
            <span id="collect_num">{{collection}}</span>
          </span>
          <span class="reward item">
            <span class="item-s-b item-s-b3">
              <i class="icon3">
                <strong>赏</strong>
              </i>
              <span class="item-s-tip item-s-tip3">打赏</span>
            </span>
            <span class="item-s-img">
              <img src="http://yuedufm.com/static/file/dashang/2ed5f10c5ccd79f6f28c796c8069b54a" />
            </span>
          </span>
        </div>
      </div>
    </div>
</template>
<script>
import bus from '../bus'
export default {
  name:'like',
  data(){
    return {
      likenum:'',
      islike:'',
      collection:''
    }
  },
  created(){
    bus.$on('like',data=>{
      this.islike=data
    })
    bus.$on('likecount',data=>{
      this.likenum=data
    })
    bus.$on('collection',data=>{
      this.collection=data
      
    })
  },
  methods:{
    love(){
      if(this.islike==false){
        this.like()
      }else{
        this.offlike()
      }
    },
    like(){
      if(localStorage.getItem("token")){
          this.axios.post('http://localhost:3000/api/article/'+(this.$route.params.id==undefined?'10':this.$route.params.id)+'/like',{
            headers:{
                Authorization:'Bearer ' + localStorage.getItem("token")
            }
          }
          ).then(res=>{
            if(res.data.res_code==200){
              bus.$emit("up",this.likenum)
            }
          })
      }else {
        alert("请登录后点赞")
      }
    },
    offlike(){
      if(localStorage.getItem("token")){
        this.axios.delete("http://localhost:3000/api/article/"+(this.$route.params.id==undefined?'10':this.$route.params.id)+'/like',{
            headers:{
                Authorization:'Bearer ' + localStorage.getItem("token")
            }
        }).then(res=>{
          if(res.data.res_code==200){
            bus.$emit("off",this.likenum)
          }
        }).catch(error=>{
                console.log(error)
            })
      }
    }
  }
};
</script>
<style  scoped>
.content {
  overflow: hidden;
}
.content .con-r {
  float: right;
  width: 360px;
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
  margin-top:80px
}
.con-r .user-base {
  padding: 30px;
  border-bottom: 1px dashed #eee;
  overflow: hidden;
}
.user .user-avatar,
.user .user-con {
  float: left;
}
.user .user-con {
  color: #707070;
  margin-left: 30px;
}
.user .user-avatar img {
  width: 80px;
  height: 80px;
}
.user .user-con .user-name {
  padding-bottom: 15px;
  font-size: 16px;
}
.user .user-con .user-info {
  font-size: 12px;
  overflow: hidden;
}
.user-status {
  float: left;
}
.user-focus {
  float: right;
  height: 30px;
  line-height: 30px;
  margin-left: 78px;
  padding: 0 15px;
  font-size: 12px;
  color: white;
  font-size: 12px;
  background-color: #ee5044;
}
.user-focus:hover,
.comments .btn:hover {
  background-color: #d7382c;
}
.item-status {
  padding: 20px 0;
  text-align: center;
}
.item {
  display: inline-block;
  line-height: 52px;
  font-size: 18px;
  color: #707070;
  margin: 0 35px 0 0;
}
.item-status .item-s-b {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #acacac;
  line-height: 50px;
  text-align: center;
  color: #999;
  margin-right: 15px;
  border-radius: 50%;
  font-size: 18px;
}
.item-status .reward .item-s-b {
  margin-right: 0;
}
.item-status .reward {
  margin: 0;
}
.item-s-b i {
  display: inline-block;
  width: 25px;
  height: 25px;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  vertical-align: middle;
}
 .good i {
        background: url(../assets/good.png) no-repeat 6px 0px;
    }
    .collect i { 
        background: url(../assets/love.png) no-repeat 4px 2px;
    }
    .item-s-b1:hover .icon1, .item-s-b2:hover .icon2,.item-s-b3:hover .icon3 {
        display: none;
    }
    .item-s-b1:hover .item-s-tip1,.item-s-b2:hover .item-s-tip2,.item-s-b3:hover .item-s-tip3 {
        display: inline;
    }
    .item-s-b1:hover,.item-s-b2:hover {
        background-color: #999;
    }
    .item-s-b3:hover {
        border-color: #d7382c;
        background-color:#d7382c;
    }
    .item-s-tip {
        display: none;
        font-size: 12px;
        color: #fff;  
    }
    .item-s-img {
        display: none;
        position: absolute;
        margin-left: -50px;
        margin-top: -260px;
    }
</style>