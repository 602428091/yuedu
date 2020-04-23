<template>
    <div class="con-l">
        <div class="comments">
            <input class="inp" type="text" placeholder="说点什么吧!" v-model.trim="msg">
            <button class="btn" @click="getcomment">评论</button>
        </div>
        <div class="comment-con">
            <div class="comment-num">最新评论({{lists.length}})</div>
            <ul class="comment-lists">
                <li v-show="lists.length==0">暂无评论</li>
                <li v-for="(list,index) in lists" :key="index">
                    <div class="avatar" v-for="(src,index) in srcs" :key="index">
                        <img :src="src" alt="">
                    </div>
                    <div class="comment-infos">
                        <div class="comment-meta">
                            <a href="javascript:void(0)" class="comment-user">{{list.nikiname}}</a>
                            <span >{{list.reply_time}}</span>
                        </div>
                        <p class="comment-msg">{{list.content}}  </p>
                    </div>  
                    <span class="del" @click="del(list.id,list.nikiname)">删除</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import bus from '../bus'
export default {
    name:"comments",
    data(){
        return {
            list:[],
            lists:[],
            msg:null,
            token:'',
            articleid:'',
            name1:'',
            srcs:['http://yuedufm.com/static/file/member/0b4529a0229caf6a16ccca5cfbaf10be']
        }
    },
    created(){
        this.cell()
        bus.$on('sendname',(data)=>{
            this.name1=data
        })
    },
    watch:{
        "$route"(){
            this.cell()
        }
    },
    methods:{
        getcomment(){
            this.token=localStorage.getItem('token')
            this.articleid=this.$route.params.id==undefined?'10':this.$route.params.id
            this.lists=[]
            if(this.msg==""){
                alert("评论内容不能为空")
            }else if(this.token!=null){
                    this.axios.post("http://localhost:3000/api/comment",{
                        article_id:this.articleid,
                        content:this.msg,
                    },{
                        headers:{
                            Authorization:'Bearer ' + this.token
                        }
                    }).then(res=>{
                        this.cell()
                        this.commentid=res.data.res.id
                        this.msg=''
                    })
                }else {
                    alert("请登录")
                    this.cell()
                }
        },
        del(ind,name){
            if(localStorage.getItem('token') ){
                if(localStorage.getItem('name')==name){
                    this.axios.delete("http://localhost:3000/api/comment/"+ind,
                    {
                        headers:{
                            Authorization:'Bearer ' + this.token
                        }}).then(res=>{
                            this.cell()
                    })
                    .catch(error=>{
                console.log(error)
            })}else {
                        
                        alert("无法删除他人评论内容")
                    }
            }else {
                alert('请登录后删除')
            }
            
        },
         cell(){
            this.axios.get("http://localhost:3000/api/comments/"+(this.$route.params.id==undefined?'10':this.$route.params.id)+"/page/1").then(res=>{
                this.lists=[]
                if(res.data.res){
                    this.lists=this.lists.concat(res.data.res)
                }
            }).catch(error=>{
                console.log(error)
            })
    }
    },
}
</script>
<style  scoped>
.del {
    float: right;
    color: #707070;
    font-size: 12px
}
.comment-lists li {
    text-align: center;
    color: #707070;
    overflow: hidden;
}
.foot-wrap, .content-wrap {
        width: 100%;
    }
    .head ,.content ,.foot{
        width: 1010px;
        margin: auto;
    }
 .content {
        overflow: hidden;
    }
    .content .con-l {
        float: left;
        width: 620px;
        padding:40px 0;
        margin-right: 30px;
    }
     .comments {
        overflow: hidden;
    }
    .comments .inp {
        float: left;
        width: 530px;
        padding: 10px;
        height: 30px;
        line-height: 16px;
        font-size: 12px;
        outline: none;
        border: none;
        background-color: #fff;
    }
    .comments .btn {
        float: right;
        width: 70px;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        color: white;
        border: none;
        outline: 0;
        cursor: pointer;
        text-align: center;
        background: #ee5044;
    }
    .inp::placeholder {
        font-family: "宋体";
    }
    .hint i {
        display: inline-block;
        width: 15px;
        height: 15px;
        vertical-align: middle;
        background: url(../assets/select.png) no-repeat 3px 4px;
    }
    .change {
        transform: rotate(180deg);
    }
    .item-pg span i {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        background: url(../assets/pre.png) no-repeat 12px 4px;
    }
    .comment-num {
        width: 80px;
        font-size: 12px;
        padding: 0 15px;
        color: #ee5044;
        cursor: pointer;
        line-height: 40px;
        background-color: #fff;
    }
    
    .comment-con {
        margin-top: 30px;
    }
    ul {
        list-style: none;
    }
    .comment-lists {
        padding: 30px 30px 0;
        background: #FFF;
    }
    .comment-lists li {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dashed #EEE;
        overflow: hidden;
    }
    .comment-lists .avatar, .comment-infos  {
        float: left;
    }
    .comment-lists .avatar {
        margin-right: 15px;
        display: inline-block;
    }
    .comment-lists .avatar img{
        width: 40px;
        height: 40px;
    }
    .comment-meta {
        line-height: 22px;
        margin-bottom: 5px;
    }
    .comment-meta .comment-user {
        color: #707070;
        font-size: 14px;
        font-weight: bold;
    }
    .comment-meta span {
        margin-left: 8px;
        font-size: 12px;
        color: #999;
    }
    .comment-infos p {
        margin-bottom: 15px;
        font-size: 12px;
        color: #707070;
        text-align: left
    }
    .con-r .user:before {
        position: absolute;
        top: 63px;
        left: -20px;
        display: inline-block;
        border-right: 10px solid #FFF;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
        border-top: 10px solid transparent;
        content: '';
    }
    .con-r .user {
        position: relative;
        margin-bottom: 30px;
        background-color: #fff;
    }
    .con-r .user-base {
        padding: 30px;
        border-bottom: 1px dashed #EEE;
        overflow: hidden;
    }
    .user  .user-avatar, .user  .user-con {
        float: left;
    }
    .user  .user-con {
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
    .user-focus:hover,.comments .btn:hover {
        background-color: #d7382c;
    }
</style>