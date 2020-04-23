<template>
  <div class="mainright">
    <div class="mainpic">
      <img
        src="http://www.yuedufm.com/static/website/images/yueduwx_2.jpg"
        alt
        style="float: right;width: 360px;height: 245px; margin-bottom: 30px;"
      />
    </div>
    <div class="channel-item channel-top10">
      <h3>{{text}}频道 TOP10</h3>
      <ul class="channel-list">
        <li v-for="(list,index) in lists" :key="index">
          <router-link :to='"/article/"+list.id'>{{list.title}}</router-link>
          <div>
            <span>文：{{list.author}}</span>
            <span>主播：{{list.podcast}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="side-img">
      <img src="http://qingwenyi.com/smedia/upload/1507.jpg" alt width="360px" height="236px" />
    </div>
  </div>
</template>
<script>
export default {
    name: "listright",
    data() {
        return {
        lists: [],
        text:"悦读",
        };
    },
    created() {
        this.gettab(1);
    },
    methods: {
        gettab(val) {
          
        this.axios
            .get(
            "http://localhost:3000/api/articles/" +
                val +
                "/top10"
            )
            .then(res => {
              this.lists=[]
            this.lists = this.lists.concat(res.data.res.articles);
            })
            .catch(error => {
            console.log(error);
            });
        }
    },
    watch:{
        "$route"(to){
            this.gettab(to.params.tab)
            this.text=to.params.tab=="1"?"悦读":to.params.tab=="2"?"情感":to.params.tab=="3"?"连播":to.params.tab=="4"?"校园":to.params.tab=="5"?"音乐":"Labs"
        }
    },
}
</script>
<style scoped>
.mainright {
  float: right;
  width: 360px;
  padding: 40px 0
}
a {
  text-decoration: none;
  font-size: 12px;
  color: #707070;
}
span {
  color: #999;
  font-size: 12px;
  margin-right: 20px;
}
.related-item,
.channel-item {
  padding: 30px;
  background: #fff;
  margin-bottom: 30px;
  overflow: hidden;
}

.related-item h3,
.channel-item h3,
.my-list h3 {
  font-size: 14px;
  border-left: 3px solid #ee5044;
  padding-left: 8px;
  line-height: 16px;
}

.channel-list {
  padding-top: 30px;
}
.channel-list li {
  padding-bottom: 10px;
  border-bottom: 1px dashed #eee;
  margin-bottom: 10px;
  line-height: 20px;
}
.channel-top10 li {
  border-bottom: 1px solid #eee;
  list-style: decimal;
  margin-left: 20px;
  color: #707070;
  font-size: 12px;
}
.channel-top10 li:hover a {
  color: #ee5044;
}
</style>