/*
 * 系统登录
 */
<template>
  <div class="login-container">
    <el-form class="card-box login-form"
      auto-complete="on"
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-position="left">
      <h3 class="title">系统登录</h3>

      <el-form-item prop="userName">
        <el-input name="userName"
          type="email"
          @keyup.enter.native="login"
          v-model="loginForm.userName"
          :readonly="loading"
          auto-complete="on"
          placeholder="用户名" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input name="password"
          type="password"
          @keyup.enter.native="login"
          v-model="loginForm.password"
          :readonly="loading"
          auto-complete="on"
          placeholder="密码" />
      </el-form-item>

      <el-button type="primary"
        :loading="loading"
        @click.native.prevent="login"
        class="submit-button">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loading: false,
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^\w+$/,
            message: '请正确输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^\w{4,15}$/,
            message: '请正确输入密码',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.axios
            .post('v1/service/login', this.loginForm)
            .then(response => {
              this.loading = false;
              this.$store.dispatch('updateUser', response.data);
              this.$router.replace({
                path: this.$route.query.redirect ?
                  this.$route.query.redirect :
                  '/',
                query: { from: 'login' }
              });
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/mixin.scss';
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .submit-button {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>
