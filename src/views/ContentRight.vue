<template>
    <div class="con-r">
        <User></User>
        <Program></Program>
        <ElseProgram></ElseProgram>
    </div>
</template>
<script>
import User from "../components/User"
import Program from "../components/Program"
import ElseProgram from "../components/ElseProgram"
export default {
    name:'contentright',
    components:{
        User,
        Program,
        ElseProgram
    }
}
</script>
<style scoped>
 .con-r {
    float: right;
    width: 360px;
    /* margin: 80px 0 40px 0 */
    /* padding:40px 0; */
    box-sizing: border-box
}
</style>