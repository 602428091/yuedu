<template>
    <div class="con-l">
        <ListItem></ListItem>
        <page></page>
    </div>
</template>
<script>
import ListItem from "../components/ListItem"
import page from "../components/page"
export default {
    name:'contentright',
    components:{
        ListItem,
        page
    }
}
</script>
<style scoped>
.con-l {
        float: left;
        width: 620px;
        padding:40px 0;
        margin-right: 30px;
    }
   
</style>