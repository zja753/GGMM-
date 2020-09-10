<template>
  <div id="login">
    <h3>你是GG还是MM？</h3>
    <el-card class="loginCard">
      <i class="el-icon-s-platform logo"></i>
      <el-form
        class="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-width="100px"
        ref="loginForm"
      >
        <el-form-item class="elFormItem" label="账号：" prop="account">
          <el-input
            class="input"
            v-model="loginForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item class="elFormItem" label="密码：" prop="password">
          <el-input
            class="input"
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
            @keydown.enter.native="login('loginForm')"
          ></el-input>
        </el-form-item>
        <el-button
          class="loginBtn"
          type="primary"
          @click="login('loginForm')"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form>
      <p class="tip">
        如果您还未注册，<span @click="toRegister">请点击这里</span>
      </p>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      loginLoading: false,
      loginForm: {
        account: "",
        password: "",
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    ...mapMutations(["changeLogin"]),
    toRegister() {
      this.$router.push({ name: "Register" });
    },
    login(formName) {
      this.loginLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginForm);
          this.$axios
            .get("/user/login", {
              account: this.loginForm.account,
              password: this.loginForm.password,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 1) {
                this.changeLogin({
                  ...res.data,
                  Authorization: res.data.token,
                });
                this.getUserInfo();
                this.$message({
                  type: "success",
                  message: "登录成功，跳转到聊天室",
                });
                this.$socket.emit("login", this.loginForm.account);
                this.$router.push({ name: "ChatRoom" });
                this.loginLoading = false;
              } else {
                this.$message({
                  type: "error",
                  message: res.err,
                });
                this.loginLoading = false;
              }
            })
            .catch((err) => {
              console.log(err);
              this.loginLoading = false;
            });
        } else {
          this.loginLoading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scope>
#login {
  .el-form-item__label::before {
    content: "" !important;
  }
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    width: 100%;
    text-align: center;
    font-size: 55px;
    margin-bottom: 50px;
    margin-top: -70px;
    padding-left: 0.3em;
  }
  .loginCard {
    width: 550px;
    height: 430px;

    .logo {
      width: 100%;
      font-size: 108px;
      text-align: center;
    }
    .loginForm {
      margin: 20px 0;
      .elFormItem {
        margin: 30px 0;
        .input {
          width: 360px;
        }
      }
    }
    .loginBtn {
      margin-left: 50%;
      position: relative;
      transform: translateX(-50%);
    }
    .tip {
      font-size: 14px;
      color: #aeb2b9;
      text-align: center;
      padding: 20px;

      span {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
