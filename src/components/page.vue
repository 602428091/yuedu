<template>
        <div class="block">
            <ul>
                <span  class="previous" @click="sub" v-show="this.$route.params.page>1">上一页</span>
                <li v-for="(page,index) in number" :key="index" @click="getcur(page)" 
                v-show="index1>=1&&index1<=5&&page>=1&&page<=8 || index1>5&&index1<number-3&&index1>=page-4&&index1<=page+3||index1>=number-3&&page>=number-8&&page<=number"
                :class="{active:$route.params.page==page}">{{page}}</li>
                <span  class="next" @click="gettab" v-show="this.$route.params.page<number">下一页</span>
            </ul>
        </div>
</template>
<script>
import bus from '../bus'
export default {
    name:'page',
    data(){
        return {
            num:'',
            number:"",
            index1:''
        }
    },
    created(){
        this.get(),
        bus.$on("send",data=>{
                this.num = data
                this.number =Math.ceil((this.num)/10)
                this.index1=this.$route.params.page
        })
       
    },
    methods:{
        gettab(){
            this.$router.push({
                path:"/channel/"+this.$route.params.tab+"/"+eval(this.$route.params.page+'+'+ '1')
            })
      },
       sub(){
            this.$router.push({
                path:"/channel/"+this.$route.params.tab+"/"+eval(this.$route.params.page+'-'+ '1')
            })
      },
      get(){
            this.axios.get("http://localhost:3000/api/articles/"+this.$route.params.tab+"/page/"+this.$route.params.page).then(res=>{
                this.num=res.data.res.count
            }).catch(error=>{
                console.log(error)
            })
      },
      getcur(page){
            this.$router.push({
            path:"/channel/"+this.$route.params.tab+"/"+page
        })
      }
    },
}
</script>
<style scoped>

    .block {
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        width: 80%;
    }
    .active{
        color: #eb4235
    }
    .previous {
        float: left;
        margin-right:10px
    }
    ul {
        /* width: 40%; */
        height: 30px;
        overflow: hidden;
        color: #707070;
    }
    li {
        line-height: 30px;
        list-style: none;
        float: left;
        margin-right:10px;
        overflow: hidden;
        color: #707070
    }
</style>