<template>
  <div class="home">
    <div class="box">
      <h1>电商后台管理系统</h1>
      <el-form :model="ruleForm">
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="User"
            style="border-radius:5px;"
            :style="{border:`1px solid ${userShow == true?'#f37577':'#eee'}`}"
          />
          <span v-if="userShow">您输入的用户名必须在5到10个字符之间</span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            show-password
            :prefix-icon="Lock"
            style="border-radius:5px;"
            :style="{border:`1px solid ${passShow == true?'#f37577':'#eee'}`}"
          />
          <span v-if="passShow">您输入的用户名必须在5到10个字符之间</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { loginApi } from "../utils/api";

const router = useRouter();

interface RuleForm {
  username: string;
  password: string;
}
const ruleForm = reactive<RuleForm>({
  username: "",
  password: ""
});
const userReg = /^\w{5,10}$/;
const passReg = /^\w{5,10}$/;

const userShow = computed(() => {
  if (!ruleForm.username) {
    return false;
  } else if (!userReg.test(ruleForm.username)) {
    return true;
  } else {
    return false;
  }
});
const passShow = computed(() => {
  if (!ruleForm.password) {
    return false;
  } else if (!passReg.test(ruleForm.password)) {
    return true;
  } else {
    return false;
  }
});
const login = () => {
  loginApi(ruleForm)
    .then(res => {
      console.log(res, "登录");
      if (res.data.meta.status == 200) {
        ElMessage.success(res.data.meta.msg);
        localStorage.setItem("token", res.data.data.token);
        router.push("/about/index");
      } else {
        ElMessage.error(res.data.meta.msg);
      }
    })
    .catch(res => {
      console.log(res, "登录失败");
    });
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #2d4c6a;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    width: 400px;
    height: 300px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;

    h1 {
      text-align: center;
    }

    span {
      color: #f37577;
    }
  }
}
</style>
