<template>
  <div>
    <!-- login.html 12-40 -->
    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span
                v-show="unameError != 0"
                class="tips"
                id="uname_prompt_text"
                style="display: block;"
                >{{
                  unameError == 1 ? "用户名不能为空" : "用户名或密码不正确"
                }}</span
              >
              用户名：
            </dt>
            <dd>
              <input
                type="text"
                id="uname"
                placeholder="邮箱/手机号"
                v-model="uname"
                @blur="checkUname"
              />
              <em class="icon_user"></em>

              <i
                v-show="unameError != 0"
                class="icon_error"
                style="display: block"
                id="uname_prompt_icon"
              ></i>
            </dd>
          </dl>
          <dl>
            <dt>
              <span
                v-show="upwdError == 1"
                class="tips"
                id="uname_prompt_text"
                style="display: block;"
                >密码不能为空</span
              >
              <span class="tips" id="pwd_prompt_text">请输入密码</span>密码：
            </dt>
            <dd>
              <input
                type="password"
                id="pwd"
                placeholder="密码"
                v-model="upwd"
                @blur="checkUpwd"
              />
              <em class="icon_pwd"></em>
              <i
                v-show="upwdError == 1"
                class="icon_error"
                style="display: block"
                id="uname_prompt_icon"
              ></i>
            </dd>
          </dl>
          <p>
            <!-- lable是错误写法 -> label 正确 -->
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button type="button" id="login" @click="doLogin">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      unameError: 0, //自定义: 0原始状态 1空 2登录失败
      upwdError: 0, //自定义: 0原始 1空
    };
  },
  methods: {
    checkUpwd() {
      this.upwdError = 0;

      if (this.upwd.trim() == "") this.upwdError = 1;
    },
    checkUname() {
      this.unameError = 0; //恢复到原始状态

      // trim: 去掉字符串两侧空白字符
      if (this.uname.trim() == "") this.unameError = 1;
    },

    doLogin() {
      // POST: 参数与路径 分离
      const url = "user_login.php";
      const params = `unameOrPhone=${this.uname}&upwd=${this.upwd}`;

      this.axios.post(url, params).then((res) => {
        console.log(res);

        if (res.data.code == 1) {
          // 登录成功

          // 待定: 跳转到首页 -> 用Vuex保持登录状态 -> Header 要根据登录状态 切换显示的内容
          // alert("登录成功");
          this.$store.commit("updateUser", res.data);
          this.$router.replace("/");
        } else {
          // alert("登录失败");
          this.unameError = 2;
        }
      });
    },
  },
};
</script>

<style></style>
