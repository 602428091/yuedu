<template>
<div>
    <div class="login" ref="log">
        <a href="javascript:void(0)" class="close" @click="login">x</a>
        <div class="title">登录</div>
        <div class="box">
            <input type="text" placeholder="邮箱" v-model="email">
            <input type="password" placeholder="密码" v-model="password">
        </div>
        <div class="account">
            <label for="agree">
                <input type="checkbox" id="agree">
                下次自动登录
                <a href="#">忘记密码</a>
            </label>
        </div>
        <button @click="get">登录</button>
       
    </div>
     <div class="all" ref="all"></div>
    </div>
</template>
<script>
import bus from "../bus"
export default {
    name:'login',
    data(){
        return {
            email:'',
            password:'',

        }
    },
    
    methods:{
        login(){
             this.$refs.log.style.left= 70+"%";
             this.$refs.log.style.transition=.5 +"s"
             this.$refs.all.style.display="none"
             setTimeout(()=>{
                 this.$refs.log.style.display="none"
                 this.$refs.log.style.left=-60+'%'
             },500)
             
        },
         get(){
            this.axios.post("http://localhost:3000/api/user/login",{
                email:this.email,
                password:this.password
            }).then(res=>{
                if(res.data.res_code==200){
                    localStorage.setItem("token",res.data.res.token)
                    localStorage.setItem('name',res.data.res.user.nikiname)
                    alert("登录成功！")
                    bus.$emit('sendname',res.data.res.user.nikiname)
                    this.email=''
                    this.password=''
                   this.login()
                }else {
                    alert("用户名密码不正确")
                }
            }).catch(error=>{
                console.log(error)
            })
    }
    },

}

</script>
<style scoped>
.all {
    width: 100%;
    height: 100%;
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: .5;
    display: none
}
.login {
    background: #FFF;
    padding: 30px 50px 50px;
    width: 280px;
    position: absolute;
    top: 120px;
    border:1px solid #ccc;
    z-index: 99;
    left: -30%;
    /* margin-left: 30% */
}
.box {
    border: 1px solid #dcdcdc;
    height: 85px;
    padding: 0 15px;
    overflow: hidden;
}
.box  input{
    border-left: none;
    border-top: none;
    border-right: none;
    height: 30px;
    width: 100%;
    display: block;
    margin: 10px 0;
    outline: none;
}
label {
    font-size: 12px;
    color: #707070;
}
.account {
    padding: 15px 5px;
}
.account a {
    color: #EE5044;
}
.account input {
    vertical-align: bottom;
}
a {
    text-decoration: none;
}
button{
    width: 100%;
    color: #fff;
    background: #eb4235;
    height: 45px;
    outline: none;
}
.login .title {
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 24px;
    color: #707070;
}
.login a {
    float: right;
}
.close {
    position: absolute;
    right: -16px;
    top: -13px;
    width: 30px;
    background: #444;
    color: #ccc;
    font-size: 24px;
    border-radius: 50%;
    text-align: center;
}
</style>