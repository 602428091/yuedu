<template>
<div>
     <div class="register" ref="register">
        <a href="javascript:void(0)" class="close1" @click="register">x</a>
        <div class="title">注册</div>
        <div class="box">
            <input type="text" placeholder="昵称" v-model="nikiname" maxlength="5">
            <input type="text" placeholder="邮箱" v-model="email" >
            <input type="password" placeholder="密码" v-model="password" maxlength="12">
            <input type="password" placeholder="确认密码" v-model="passwordok" maxlength="12">
        </div>
        <div class="account">
            
                <input type="checkbox" id="acc">
             <label for="acc" @click="checked">我已认真阅读并同意阅读FM的
                <a href="#">《使用协议》</a>
            </label>
        </div>
        <button @click="get">注册</button>
    </div>
    <div class="all1" ref="all1"></div>
</div>
</template>

<script>
export default {
    name:'register',
    data(){
        return{
            nikiname:'',
            email:'',
            password:'',
            username:'',
            passwordok:''
        }
    },
    methods:{
        register(){
             this.$refs.register.style.left= 70+"%";
             this.$refs.register.style.transition=.5+"s"
             this.$refs.all1.style.display="none"
              setTimeout(()=>{
                 this.$refs.register.style.display="none"
                 this.$refs.register.style.left=-60+'%'
             },500)
        },
        checked(){
             var acc =document.getElementById("acc")
             acc.setAttribute("checked","checked")
        },
         get(){
             var acc =document.getElementById("acc")
             console.log(acc.getAttribute('checked'))
             if(this.nikiname==''){
                 alert("用户名不能为空")
             }else if(!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.email)){
                 alert("邮箱格式不正确")
             }else  if(this.password==''){
                 alert("密码不能为空")
             }else if(this.password!=this.passwordok){
                 alert("两次密码输入不一致")
             }else if(acc.getAttribute("checked")==null){
                 alert("请阅读并同意悦读FM使用协议")
             }else{
                 this.axios.post("http://localhost:3000/api/user",{
                    nikiname:this.nikiname,
                    username:this.nikiname,
                    email:this.email,
                    password:this.password
                }).then(res=>{
                    if(res.data.res_code==200){
                        alert("注册成功请登录！")
                        this.password=''
                        this.nikiname=''
                        this.email=''
                        this.ispasswod=''
                        this.register()
                        acc.setAttribute("checked",'')
                    }
                }).catch(error=>{
                    console.log(error)
                })
             }
            
        }
    },
   
}
</script>

<style scoped>
    .all1 {
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
    .register {
    background: #FFF;
    padding: 30px 50px 50px;
    width: 280px;
    position: absolute;
    top: 120px;
    border:1px solid #ccc;
    /* margin-left: 350px; */
    left: -30%;
    z-index: 99;
}
.box {
    border: 1px solid #dcdcdc;
    height: 165px;
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
    line-height: 30px
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
.register .title {
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 24px;
    color: #707070;
}
.close1 {
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