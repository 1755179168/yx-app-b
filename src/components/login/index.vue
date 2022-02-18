<template>
  <div class="login-container">
    <div class="from">
      <!--  -->
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item has-feedback label="邮箱" prop="email">
          <a-input v-model="ruleForm.email" type="email" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="pwd">
          <a-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            登录
          </a-button>
          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import cookie from 'cookiejs';
import login from '@/api/login';

export default {
  data() {
    const checkEmail = /^[\w-]+@[\w.-]+.com$/;
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'));
      } else if (!checkEmail.test(value)) {
        callback(new Error('邮箱格式不正确'));
      }
      return true;
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    // const validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('Please input the password again'));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("Two inputs don't match!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        email: '',
        pwd: '',
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'change' }],
        pwd: [{ validator: validatePass, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login('/passport/login', {
            email: this.ruleForm.email,
            password: this.ruleForm.pwd,
          }).then((r) => {
            if (r.status === 'success') {
              const userInfo = r.data;
              cookie.set('userInfo', JSON.stringify(userInfo));
              cookie.set('yx_app', 'true');
              const data = JSON.parse(cookie.get('userInfo'));
              this.$store.commit('login/user', data);
              this.$store.commit('login/login', cookie.get('yx_app'));
              this.$store.commit('login/role', data.role);
              this.$router.push({ path: '/' });
            } else {
              this.$message.error(r.msg);
            }
          });
        } else if (!valid) {
          return false;
        }
        return true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
}

div.from {
  width: 600px;
  margin: 0px auto;
  padding: 50px 30px 50px 80px;
  background: #eee;
}
</style>
