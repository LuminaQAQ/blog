<style lang="scss" scoped>
.main-login {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-wrap {
    text-align: center;
    background-color: white;
    padding: 1rem 3rem;
    border-radius: 10px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);

    .submit-btn {
      width: 100%;
    }
  }
}
</style>

<template>
  <main class="main-login">
    <section class="login-wrap">
      <h3>管理</h3>
      <el-form
        :model="user"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            @focus="clearprams('username')"
            placeholder="请输入用户名"
          >
            <i
              slot="prefix"
              class="el-input__icon el-icon-user-solid"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            type="password"
            @focus="clearprams('password')"
            @keydown.13.native="submit"
            placeholder="请输入密码"
          >
            <i
              slot="prefix"
              class="el-input__icon el-icon-key"
            ></i>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="submit-btn"
            type="primary"
            @click="submit"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^[\w\.-]+@[\w\.-]+\.\w+$/,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions("Login", ["login"]),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearprams(prop) {
      this.$refs.ruleForm.clearValidate(prop);
    },
    submit() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.login(this.user);
        } else {
          this.$message.error("输入的用户名或密码不合法");
        }
      });
    },
  },
};
</script>
