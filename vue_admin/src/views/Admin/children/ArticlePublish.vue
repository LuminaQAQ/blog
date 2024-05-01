<style lang="scss" scoped>
</style>

<template>
  <main class="main-public">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card
      class="box-card"
      style="margin-top: 20px"
    >

      <el-form
        ref="form"
        :model="articlePublish"
        label-width="80px"
      >
        <el-form-item label="标题">
          <el-input v-model="articlePublish.title"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group v-model="articlePublish.type">
            <el-radio label="1">文章</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-model="articlePublish.content"
          label="内容"
        >
          <VueEditor
            :config="config"
            ref="vueEditor"
            v-if="articlePublish.type == '1'"
          />
        </el-form-item>

        <el-form-item
          label="封面"
          v-model="articlePublish.cover"
        >
          <el-upload
            class="upload-demo"
            ref="insert_upload"
            drag
            :file-list="articlePublish.cover"
            :auto-upload="false"
            action="http://127.0.0.1:8888/api/admin/articlePublic"
            :headers="{  Authorization: token  }"
            :data="articlePublish"
            :limit="1"
            :on-success="successInsertUpload"
            :on-error="errorInsertUpload"
            list-type="picture"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div
              class="el-upload__tip"
              slot="tip"
            >
              只能上传jpg/png文件，且不超过5MB
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img
              width="100%"
              :src="dialogImageUrl"
              alt=""
            />
          </el-dialog>
        </el-form-item>

        <el-form-item label="分类">
          <el-radio-group v-model="articlePublish.category">
            <el-radio
              v-for="(item) in categories"
              :key="item.id"
              :label="item.id"
            >
              {{item.category}}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            立即创建
          </el-button>
          <el-button>取消</el-button>
        </el-form-item>

      </el-form>

    </el-card>

  </main>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css"
import { mapActions, mapGetters } from 'vuex';
import TurndownService from "turndown"

export default {
  name: "ArticlePublic",
  components: {
    VueEditor,
  },
  data() {
    return {
      token: '',
      categories: [],

      flieList: [],

      videoType: ["video/mp4"],
      dialogImageUrl: "",
      dialogVisible: false,

      baseURL: "http://127.0.0.1:8888",

      articlePublish: {
        author: "Lumina",
        author_id: 1,
        title: "",
        content: "",
        category: "",
        cover: [],

        type: "1",
      },
      config: {
        // uploadImage: {
        //   url: `http://127.0.0.1:8888/upload`,
        //   name: "file",
        //   headers: { Authorization: this.token },
        //   uploadSuccess(res, insert) {
        //     insert("http://127.0.0.1:8888" + res.data.data.url);
        //   },
        // },

        // uploadVideo: {
        //   url: `http://127.0.0.1:8888/upload`,
        //   name: "file",
        //   headers: { Authorization: this.token },
        //   uploadSuccess(res, insert) {
        //     insert("http://127.0.0.1:8888" + res.data.data.url);
        //   },
        // },
      },
    };
  },
  computed: {
    ...mapGetters("Login", ["getUser"]),

    ...mapGetters("User", ["getUserInfoList"]),
  },
  methods: {
    ...mapActions("Login", ["logout", "fetchLoginInfo"]),

    ...mapActions("User", ["fetchUserInfoList"]),

    onSubmit() {
      var quill = this.$refs.vueEditor.editor;
      const turndownService = new TurndownService();
      const val = turndownService.turndown(quill.root.innerHTML) || '';
      this.articlePublish.content = val;
      this.articlePublish.author = this.getUser;
      this.$refs.insert_upload.submit();
      console.log(this.articlePublish);

    },


    // ------- 封面上传 -------
    // #region
    errorInsertUpload(err, file, fileList) {
      console.log(err);
    },
    async successInsertUpload() {
      this.$refs.insert_upload.clearFiles();
      this.$message.success("发布成功!");
      this.$router.replace({ name: "ArticleManage" });
    },
    // #endregion
    // ------- end -------

    fetchCateGories() {
      this.$axios
        .get(
          '/api/admin/getCategories',
          {
            headers: { Authorization: this.token },
          }
        )
        .then((result) => {
          this.categories = result.data;
        }).catch((err) => {

        });
    },


  },
  async mounted() {
    const TOKEN = window.localStorage.getItem("ADMIN_TOKEN");
    this.fetchLoginInfo(TOKEN);
    this.token = TOKEN;
    this.fetchCateGories();

  },

}
</script>