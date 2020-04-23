<template>
    <div class="con-l">
        <Articles></Articles>
        <Comments></Comments>
    </div>
</template>
<script>
import Articles from "../components/Articles"
import Comments from "../components/Comments"
export default {
    name:"contentleft",
    components:{
        Articles,
        Comments
    }
}
</script>
<style scoped >
    .con-l {
        float: left;
        width: 620px;
        padding:40px 0;
        margin-right: 30px;
    }
    .article p {
        margin-bottom: 10px
    }
</style>