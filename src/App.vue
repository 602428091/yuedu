<template>

  <div id="app">
    <NavTop></NavTop>
    <div class="main_content">
        <router-view name="left"></router-view>
        <router-view name="right"></router-view>
    </div>
    <Login></Login>
    <register></register>
    <Foot></Foot>
  </div>
</template>
<script>
import NavTop from './components/NavTop'
import Foot from "./components/Foot"
import Login from './components/Login'
import register from './components/register'
import { fchown } from 'fs'

export default {
  name:'top',
  components:{
    NavTop,
    Foot,
    Login,
    register
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  overflow: hidden;
}
body{
  width: 100%,
}

.main_content {
  width: 1010px;
  margin: auto;
  overflow: hidden;
}
a {
  text-decoration: none;
  color: #707070
}
</style>
