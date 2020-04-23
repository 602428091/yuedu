<template>
    <div class="con-l">
        <div class="item">
            <div class="item-base">
                <div class="tit">{{list.title}}</div>
                <div class="info">
                    <span class="info-l">
                        <em><i class="writer"></i>{{list.author}}</em>
                        <em><i class="listener"></i> {{list.podcast}}</em>
                        <em><i class="clock"></i> {{list.duration}}</em>
                    </span>
                    <span class="info-r">播放 <span class="num">{{list.count}}</span> 次</span>
                </div>
                <div class="pic">
                    <img :src="list.img_url" alt="">
                </div>
                <div class="paly">
                     <audio controls style="width:555px" class="audi">
                        <source :src="list.mp3_url" type="audio/mpeg">
                    </audio>
                    <!-- <div class="play-l">
                        <i></i>
                    </div>
                    <div class="play-r">00:00</div>
                    <div class="progress"></div> -->
                </div>
            </div>
            <div class="item-main">
                <div class="article" v-html="list.content" style="height:265px">
                </div>
                <div class="hint" @click="alltext"><span ref="alltext">展开全文</span></div>
            </div>
            <div class="item-footer">
                <div class="left">
                    <strong>标签:</strong>
                    <a href="javascript:void(0)" v-for="(tab,index) in tabs" :key="index">{{tab}}</a>
                </div>
                <div class="right">
                    <a href="javascript:void(0)" class="sina"   title="分享到新浪微博"></a>
                    <a href="javascript:void(0)" class="douban" title="分享到豆瓣网"></a>
                    <a href="javascript:void(0)" class="qq"     title="分享到QQ空间"></a>
                    <a href="javascript:void(0)" class="weixin" title="分享到微信"></a>
                </div>
            </div>
        </div>
        <div class="item-pg">
            <span @click="previous" v-show="list.id>1" class="pre"><i class="pre_icon"></i> 上一篇</span>
            <span class="next" @click="nexttext" v-show="list.id<1025">下一篇 <i class="next_icon"></i></span>
        </div>
    </div>
</template>
<script>
import bus from "../bus"
export default {
    name:"Articles",
    data(){
        return {
            list:[],
            tabs:[]
        }
    },
    created(){
        this.gettext(this.$route.params.id)
        bus.$on("up",data=>{
            this.gettext(this.$route.params.id)
        })
        bus.$on('off',data=>{
            this.gettext(this.$route.params.id)
        })
    },
    methods:{
        gettext(id=10){
            this.axios.get("http://localhost:3000/api/article/"+id).then(res=>{
            this.list=[]

                this.list=res.data.res
                this.tabs=res.data.res.labels.split(",")
                bus.$emit("typeid",this.list.type_id)
                var audi = document.getElementsByClassName("audi")[0]
                audi.load()
                bus.$emit('like',this.list.isLiked)
                bus.$emit('likecount',this.list.like_count)
                bus.$emit('collection',this.list.collection_count)
            }).catch(error=>{
                console.log(error)
            })
        },
        alltext(){
            var article1 =document.getElementsByClassName("article")[0]
            
            if (article1.style.height == "") {
                this.$refs.alltext.innerHTML = "展开全文";
                article1.style.height = "265px";
            } else {
                this.$refs.alltext.innerHTML = "收起";
                article1.style.height = "";
            }
        },

        previous(){
            this.$router.push('/article/'+(this.list.id-1))
        },
        nexttext(){
            this.$router.push('/article/'+(this.list.id+1))
        }
    },
    watch:{
        "$route"(to){
            this.gettext(to.params.id)
        }
    }
}
</script>
<style  scoped>
.next {
    float: right;
}
.play audio {
    width: 500px;
    outline: none
}
.info-l i {
    margin-right: 10px
}
.pre_icon {
    display: inline-block;
     background: url(../assets/pre_icon.png) no-repeat 0px 1px;
     width: 14px;
     height: 14px;
}
.next_icon {
    display: inline-block;
    background: url(../assets/next_icon.png) no-repeat 0px 0px;
    width: 14px;
    height: 14px;
}
.pre:hover,.next:hover {
    color: #ee5044;
    cursor: pointer;
}
em {
    font-style: normal
}
a {
    text-decoration: none
}
.hint {
    color: #707070;
    font-size: 12px
}
.article {
    margin-bottom:20px !important;
    text-align: justify;
    overflow: hidden;
    text-indent: 25px
    /* height: 265px */
}
.article p {
    text-indent: 25px
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
    .content .con-r {
        float: right;
        width: 360px;
        padding:40px 0;
    }
 .item-base,.item-main,.item-footer {
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
    .info {
        margin-bottom: 25px;
        color: #999;
        font-size: 12px;
        overflow: hidden;
    }
    .info .info-l {
        float: left;
    }
    .info .info-r {
        float: right;
    }
    .info .info-l em {
        margin-right: 20px;
    }
    .info-l i,.user-name i {
        display: inline-block;
        width: 10px;
        height: 13px;
        vertical-align: middle;
    }
    .info-l .writer {
        background: url(../assets/pencil.png) no-repeat 0px 0px;
    }
    .info-l .listener,.user-name i{
        background: url(../assets/speaking.png) no-repeat 0px 0px;
    }
    .info-l .clock {
        background: url(../assets/time.png) no-repeat 0px 0px;
    }  
    .info .info-r .num {
        font-size: 16px;
    }
      .item-main  {
        padding: 20px 30px;
    }
    .item-main .article {
        line-height: 22px;
        color: #707070;
        letter-spacing: 1px;
        font-size: 12px;
    }
    .item-main .control {
        height: 280px;
        overflow: hidden;
    }
    .item-main .hint {
        text-align: right;
    }
    .item-main .hint a {
        color: #707070;
        font-size: 12px;
    }
    .item-footer {
        padding: 5px 30px;
        line-height: 28px;
        overflow: hidden;
    }
    .item-footer .left {
        float: left;
        color: #707070;
        font-size: 12px;
    }
    .item-footer .right {
        float: right;
    }
    .item-footer .left a {
        margin-right: 10px;
        color: #707070;
    }
    .item-footer .right a {
        font-size: 12px;
        padding-left: 17px;
        line-height: 16px;
        height: 16px;
        background: url(http://bdimg.share.baidu.com/static/api/img/share/icons_0_16.png?v=91362611.png)  no-repeat;
        cursor: pointer;
        margin: 6px 6px 6px 0;
    }
    .item-footer .right .sina {
        background-position: 0 -104px;
    }
    .item-footer .right .douban {
        background-position: 0 -468px;
    }
    .item-footer .right .qq {
        background-position: 0 -52px;
    }
    .item-footer .right .weixin{
        background-position: 0 -1612px;
    }
    .item-pg {
        font-size: 14px;
        padding: 0 30px;
        margin-bottom: 30px;
        overflow: hidden;
    }
    .item-pg span {
        font-size: 14px;
        color: #707070;
    }
    .play {
        padding: 30px 0 0 0;
    }
    .play-l i {
        position: absolute;
        top: -12px;
        left: 10px;
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: middle;
        background: url(../assets/play.png) no-repeat 0px 0px;
    }
    .play-l {
        position: relative;
        float: left;
    }
    .play-r {
        float: right;
        margin-top: -6px;
        width: 50px;
        font-size: 14px;
        color: #a8a8a8;
        text-align: center;
    }
    .progress {
        margin: 17px 60px 17px 45px; 
        height: 2px;
        overflow: hidden;
        background: #F2F2F2;
    }
</style>