<style lang="scss" scoped>
/* ------- 滚动条 ------- */
/* #region  */
::v-deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 8px !important;
}
::v-deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 8px;
}

::v-deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
  background-color: #f5f5f5;
}

::v-deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  background-color: #dcdcdc;
}

::v-deep(.el-table__body-wrapper::-webkit-scrollbar-thumb:hover) {
  background-color: #aaaaaa;
}
/* #endregion */
/* ------- end  ------- */

.insert-btn {
  margin: 1rem 0;
}
</style>

<template>
  <main class="main-user">
    <!------- 面包屑 ------->
    <!-- #region  -->
    <el-card style="background-color: #f5f7fa; box-shadow: none;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 添加 ------->
    <!-- #region  -->
    <!-- <div class="insert-btn">
      <el-button
        icon="el-icon-plus"
        type="primary"
        @click="handleInsert"
      >添加</el-button>
    </div>

    <el-dialog
      title="添加"
      :visible.sync="dialogInsertFormVisible"
    >
      <el-form
        :model="insertForm"
        :rules="rules"
        status-icon
        ref="insertForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="昵称"
          prop="name"
        >
          <el-input
            type="text"
            v-model="insertForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input
            type="text"
            v-model="insertForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            type="text"
            v-model="insertForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          prop="pwd"
        >
          <el-input
            type="text"
            v-model="insertForm.pwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogInsertFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleInsertForm('insertForm')"
        >确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 表格 ------->
    <!-- #region  -->
    <el-table
      :data="infoList"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="50"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="title"
        label="所属文章"
      >
      </el-table-column>

      <el-table-column
        prop="text"
        label="内容"
      >
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.timeStamp?.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$1-$2-$3') }}
        </template>
      </el-table-column>

      <el-table-column
        width="175"
        label="操作"
      >
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handlerEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handlerDelete(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 分页 ------->
    <!-- #region  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
      style="text-align: right;"
    >
    </el-pagination>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 修改 ------->
    <!-- #region  -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >

        <el-form-item
          label="内容"
          prop="text"
        >
          <el-input
            type="text"
            v-model="ruleForm.text"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- #endregion  -->
    <!------- end ------->
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserManage",
  data() {

    return {
      token: '',

      infoList: [],
      pageIndex: 1,
      pageSize: 2,
      pageTotal: 0,


      dialogFormVisible: false,
      dialogInsertFormVisible: false,
      email: '',
      ruleForm: {
        text: '',
        id: '',
      },
      insertForm: {
        name: "",
        email: "",
        pwd: '',
        phone: '',
      },

      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          {
            pattern: /[A-Za-z0-9_-\u4e00-\u9fa5]{1,8}/, message: '最多为8个字符', trigger: 'blur'
          }
        ],
        text: [
          { required: true, message: '请输入文字', trigger: 'blur' },
          {
            pattern: /[A-Za-z0-9_-\u4e00-\u9fa5]{1,8}/, message: '最多为8个字符', trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, message: '长度为 15 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z]\w{5,17}$/,
            message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
            trigger: 'blur'
          },
        ],
        email: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '长度为 15 个字符', trigger: 'blur' }
        ],
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

    // ------- 添加 -------
    // #region
    handleInsert() {
      this.dialogInsertFormVisible = true;
    },
    handleInsertForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post(
              '/api/admin/insertUser',
              {
                info: this.insertForm,
              },
              { headers: { Authorization: this.token } }
            )
            .then((result) => {
              this.init();
              this.$refs[formName].resetFields();
              this.dialogInsertFormVisible = false;
              this.$message.success("添加成功!");
            }).catch((err) => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // #endregion
    // ------- end -------

    // ------- 操作 -------
    // #region
    // 编辑
    handlerEdit(index, row) {
      for (const k in this.ruleForm) {
        this.ruleForm[k] = row[k];
      }
      this.email = row.email;

      this.dialogFormVisible = true;
    },
    // 编辑提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post(
              '/api/admin/updComment',
              {
                info: this.ruleForm,
              },
              { headers: { Authorization: this.token } }
            )
            .then((result) => {
              this.init();
              this.$refs[formName].resetFields();
              this.dialogFormVisible = false;
              this.$message.success("修改成功!");
            }).catch((err) => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 删除
    handlerDelete(index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post(
            '/api/admin/delComment',
            {
              id: row.id,
            },
            { headers: { Authorization: this.token } }
          )
          .then((result) => {
            this.init();
            this.$message.success("删除成功!");
          }).catch((err) => {
            console.log(err);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // #endregion
    // ------- end -------

    // ------- 分页 -------
    // #region
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    // #endregion
    // ------- end -------

    async init(params) {
      this.$axios
        .get(
          '/api/admin/getCommentInfoList',
          {
            headers: { Authorization: this.token },
            params: {
              index: (this.pageIndex - 1) * this.pageSize,
              size: this.pageSize,
            }
          })
        .then(res => {
          this.infoList = res.data;
          this.pageTotal = res.data[0]?.comment_count;
        })
        .catch(err => {
          this.$message.error("获取失败!");
          console.log(err);
        });
    },
  },
  async created() {
    const TOKEN = window.localStorage.getItem("ADMIN_TOKEN");
    await this.fetchLoginInfo(TOKEN);
    this.token = TOKEN;
    this.init();
  },
};
</script>