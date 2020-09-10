<template>
  <div id="register">
    <h3>你是GG还是MM？</h3>
    <el-card class="registerCard">
      <i class="el-icon-s-platform logo"></i>
      <el-form
        class="registerForm"
        :model="registerForm"
        :rules="registerRules"
        label-width="100px"
        ref="registerForm"
      >
        <el-form-item label="账号：" prop="account">
          <el-input
            class="input"
            v-model="registerForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            class="input"
            placeholder="请输入密码"
            v-model="registerForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName">
          <el-input
            class="input"
            v-model="registerForm.nickName"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input
            class="input"
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            @keydown.enter.native="register('registerForm')"
          ></el-input>
        </el-form-item>
        <el-button
          class="registerBtn"
          type="primary"
          @click="register('registerForm')"
          :loading="registerLoading"
          >注册</el-button
        >
      </el-form>
      <p class="tip">
        如果您已经注册，<span @click="toLogin">请点击这里</span>
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      registerLoading: false,
      registerForm: {
        account: "",
        password: "",
        email: "",
        nickName: "",
      },
      registerRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, message: "长度不能小于6位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不能小于6位", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "Login" });
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.registerForm);
          this.registerLoading = true;
          this.$axios
            .post("/user/register", {
              account: this.registerForm.account,
              password: this.registerForm.password,
              nickName: this.registerForm.nickName,
              email: this.registerForm.email,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 1) {
                this.$message({
                  message: "注册成功 ， 跳转到登录页面",
                  type: "success",
                });
                this.$router.push({ name: "Login" });
                this.registerLoading = false;
              } else {
                this.$message({
                  message: res.err,
                  type: "warning",
                });
                this.registerLoading = false;
              }
            })
            .catch((error) => {
              console.log(error);
              this.registerLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
#register {
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
  .registerCard {
    width: 550px;
    height: 520px;

    .logo {
      width: 100%;
      font-size: 108px;
      text-align: center;
    }
    .registerForm {
      margin: 20px 0;

      .input {
        width: 360px;
      }
    }
    .registerBtn {
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
