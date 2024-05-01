<style lang="scss" scoped>
.box-card {
  margin-bottom: 1rem;
}

.demo-image {
  display: flex;
  align-items: center;

  span {
    margin-left: 1rem;
  }
}

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}

.sg-card-wrap {
  cursor: pointer;

  ::v-deep(.el-card__body) {
    display: flex;
  }

  .card-img-wrap {
    width: 5rem;
    height: 5rem;
    min-width: 5rem;
    min-height: 5rem;

    img {
      height: 100%;
      width: 100%;

      object-fit: cover;
    }
  }

  h4 {
    margin: 1rem;
    margin-right: 0;
  }
}
</style>

<template>
  <main class="main-welcome">
    <el-card class="box-card">
      <div class="demo-image">
        <el-image
          style="width: 50px; height: 50px"
          :src="require(`@/` + `/assets/images/Home/coffee.png`)"
        ></el-image>
        <span class="">{{welcome}}</span>
      </div>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-row :gutter="18">
          <el-col :span="8">
            <div>
              <el-statistic
                group-separator=","
                :value="countList.article_count"
                title="文章数"
              ></el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic
                group-separator=","
                :value="countList.comment_count"
                title="评论数"
              ></el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <el-statistic
              group-separator=","
              :value="countList.userinfo_count"
              title="用户数"
            ></el-statistic>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="box-card">

      <el-timeline>
        <el-timeline-item
          v-for="(item) in timeAxis"
          :key="item.id"
          :timestamp="item.ctime"
          placement="top"
          color="#0bbd87"
        >
          <div>
            <el-card class="sg-card-wrap">
              <section class="card-img-wrap">
                <img
                  :src="item.img"
                  alt=""
                >
              </section>
              <h4>{{ item.title }}</h4>
            </el-card>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </main>
</template>

<script>
import echarts from 'echarts'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Welcome",
  data() {
    return {
      countList: {},
      timeAxis: [],
      timeAxisLen: 0,
    }
  },
  computed: {

    ...mapGetters("Login", ["getUser"]),

    ...mapGetters("User", ["getUserInfoList"]),

    welcome() {
      const date = new Date();
      const h = date.getHours();
      const str = "尊敬的" + this.getUser;

      if (h >= 0 && h < 12) return str + ", 早上好";
      else if (h >= 12 && h < 18) return str + ", 下午好";
      else return str + ", 晚上好";
    }
  },
  methods: {
    ...mapActions("Login", ["logout", "fetchLoginInfo"]),

    ...mapActions("User", ["fetchUserInfoList"]),

    fetchBlogCount() {
      this.$axios
        .post("/api/admin/getBlogInfo", {},
          { headers: { Authorization: this.token } }
        )
        .then((result) => {
          this.countList = result.data;
        }).catch((err) => {
          console.log(err);
        });
    },
    fetchTimeAxis() {
      this.$axios
        .post("/api/article/initArticle")
        .then((result) => {
          this.timeAxis = result.data[0];
          this.timeAxisLen = result.data[1];
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    const TOKEN = window.localStorage.getItem("ADMIN_TOKEN");
    this.fetchLoginInfo(TOKEN);
    this.token = TOKEN;
    this.fetchBlogCount();
    this.fetchTimeAxis();
  }
};
</script>