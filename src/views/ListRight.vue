<template>
    <div class="con-r">
        <ListRightItem></ListRightItem>
    </div>
</template>
<script>
import ListRightItem from "../components/ListRightItem"
export default {
    name:'contentright',
    components:{
        ListRightItem
    }
}
</script>
<style scoped>
 .con-r {
    float: right;
    width: 360px;
}
</style>