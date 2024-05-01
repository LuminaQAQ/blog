<style scoped>
/* ------- default ------- */
/* #region default */
.main-wrap {
  position: relative;
  box-sizing: border-box;
  padding: 1rem 0.3rem;

  min-height: calc(60vh);
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* #endregion */
/* ------- end default ------- */

/* ------- 文章顶部 ------- */
/* #region  */
.introduce-wrap {
  position: relative;
  box-sizing: border-box;

  width: 100%;
  padding: 5rem 1rem;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 80%;
}
/* #endregion */
/* ------- end  ------- */

/* ------- 文章部分 ------- */
/* #region  */
.article-wrap {
  max-width: 50rem;
  padding: 1rem;
  margin: 0 auto;

  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15),
    inset 0 0 3px 3px rgba(255, 255, 255, 0.2);
}

.article-wrap >>> p::first-letter {
  margin-left: 2rem;
}

.article p {
  color: black;
}

.article-info >>> :where(ul, ol) {
  margin: auto;
  padding: revert;
}
.article-info >>> li {
  margin: 0.5rem 0;
}
.article-info >>> ul {
  list-style-type: disc;
}
.article-info >>> ol {
  list-style-type: decimal;
}

.article-public-info,
.article-author {
  display: flex;
  align-items: center;
}

.article-public-info {
  padding: 0.5rem;
}

.article-author {
  flex: 1;
}

.article-author-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;

  margin-right: 1rem;
}

.article-author-avatar img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}
/* #endregion */
/* ------- end  ------- */
</style>

<style lang="scss" scoped>
.main-nav {
  padding: 1rem;
  cursor: default;
  user-select: none;

  text-align: center;
  animation: blink 1s infinite alternate;
}
@keyframes blink {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.article-header-mask {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.article-common-info {
  position: relative;
  z-index: 999;
  color: rgb(255, 255, 255);

  h1 {
    font-family: "kaiti";
    text-align: center;
    margin: 0;
  }

  .article-detail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;

    color: rgb(234, 234, 234);

    .sg-detail-wrap {
      margin: 0.25rem 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;

      .sg-common-info-img {
        width: 1rem;
        height: 1rem;
        object-fit: cover;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>



<template>
  <div class="bg-wrap">
    <nav
      class="main-nav"
      @click="$router.replace('/admin/articleManage')"
    >
      <h3>退出预览</h3>
    </nav>

    <header
      class="introduce-wrap"
      ref="wrap"
    >
      <div class="article-common-info">

        <!------- 标题 ------->
        <!-- #region  -->
        <h1 class="article-title">{{ info.title }}</h1>
        <!-- #endregion  -->
        <!------- end ------->

        <div class="article-detail">
          <!------- 创建时间 ------->
          <!-- #region  -->
          <div class="creat-time sg-detail-wrap">
            <div class="sg-common-info-img">
              <img
                src="@/assets/images/Article/canlendar.svg"
                alt=""
              >
            </div>
            <div class="sg-common-info-text">发布时间: {{info.ctime}}</div>
          </div>|
          <!-- #endregion  -->
          <!------- end ------->

          <!------- 分类 ------->
          <!-- #region  -->
          <div class="creat-time sg-detail-wrap">
            <div class="sg-common-info-img">
              <img
                src="@/assets/images/Article/category.svg"
                alt=""
              >
            </div>
            <div class="sg-common-info-text">{{info.category}}</div>
          </div>|
          <!-- #endregion  -->
          <!------- end ------->

          <!------- 字数 ------->
          <!-- #region  -->
          <div class="creat-time sg-detail-wrap">
            <div class="sg-common-info-img">
              <img
                src="@/assets/images/Article/words.svg"
                alt=""
              >
            </div>
            <div class="sg-common-info-text">字数总计: {{ info.w_length }}</div>
          </div>|
          <!-- #endregion  -->
          <!------- end ------->

          <!------- 阅读速度 ------->
          <!-- #region  -->
          <div class="creat-time sg-detail-wrap">
            <div class="sg-common-info-img">
              <img
                src="@/assets/images/Article/clock.svg"
                alt=""
              >
            </div>
            <div
              class="sg-common-info-text"
              v-show="isLoad"
            >阅读时长: {{ Math.floor(this.info.w_length / 246) }} 分钟</div>
          </div>|
          <!-- #endregion  -->
          <!------- end ------->

          <!------- 阅读量 ------->
          <!-- #region  -->
          <div class="creat-time sg-detail-wrap">
            <div class="sg-common-info-img">
              <img
                src="@/assets/images/Article/read_num.svg"
                alt=""
              >
            </div>
            <div class="sg-common-info-text">字数总计: {{ info.w_length }}</div>
          </div>
          <!-- #endregion  -->
          <!------- end ------->
        </div>
      </div>

      <div class="article-header-mask"></div>
    </header>

    <main class="main-wrap">
      <div class="article-wrap">
        <!------- 作者信息 ------->
        <!-- #region  -->
        <div class="article-public-info">
          <div class="article-author">
            <div class="article-author-avatar">
              <img
                :src="info.avatar"
                alt=""
              />
            </div>
            <div class="article-author-name">
              {{ info.author }}
            </div>
          </div>
          <div class="article-ctime">{{ info.ctime }}</div>
        </div>
        <!-- #endregion  -->
        <!------- end ------->

        <!------- 文章 ------->
        <!-- #region  -->
        <div class="article-info">
          <vue-markdown :source="this.info.info"></vue-markdown>
        </div>
        <!-- #endregion  -->
        <!------- end ------->
        <hr>
      </div>
    </main>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: "Article",
  components: { VueMarkdown },

  data() {
    return {
      info: [],
      isLoad: false,
    };
  },
  watch: {
    '$route.params.id': function (newVal, oldVal) {
      this.getArticleInfo(this.$route.params.id);
    },
  },
  methods: {
    async getArticleInfo(id) {
      this.$axios
        .post("/api/article/getArticle", { id })
        .then((res) => {
          if (typeof res.data[0] === "undefined") return this.$router.push({ name: "NotFound" })

          this.info = res.data[0];

          this.$refs.wrap.style.backgroundImage = `url(${this.info.img})`;
          this.info.w_length = this.info.info.length;

          this.isLoad = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  async mounted() {
    this.getArticleInfo(this.$route.params.id);
  },
};
</script>
