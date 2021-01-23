<template>
  <div>
    <!-- register.html 12 - 55 -->
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input
            type="text"
            id="uname"
            placeholder="请输入邮箱名"
            v-model="email"
            @blur="checkEmail"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-show="status_email == 1 || status_email == 2 || status_email == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-show="status_email == 4"
          ></em>
          <i style="display: block;" v-show="status_email == 3"
            >此邮箱已被其他用户注册</i
          >
          <i style="display: block;" v-show="status_email == 1"
            >请输入您的注册邮箱
          </i>
          <i style="display: block;" v-show="status_email == 2"
            >请输入正确的邮箱格式</i
          >
        </li>
        <li>
          <span>密码：</span>
          <input
            type="password"
            id="upwd"
            placeholder="请输入密码"
            v-model="passwd"
            @blur="checkPasswd"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-show="status_passwd == 1 || status_passwd == 2"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-show="status_passwd == 3"
          ></em>
          <i style="display: block;" v-show="status_passwd == 1"
            >请输入您的密码
          </i>
          <i style="display: block;" v-show="status_passwd == 2"
            >密码长度应为6~12个字符之间</i
          >
        </li>
        <li>
          <span>重复密码：</span>
          <input
            type="password"
            id="upwd2"
            placeholder="请重复输入密码"
            v-model="repasswd"
            @blur="checkRepasswd"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-show="status_repasswd == 1"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-show="status_repasswd == 2"
          ></em>
          <i style="display: block;" v-show="status_repasswd == 1"
            >两次密码不一致!</i
          >
        </li>
        <li>
          <span>手机号：</span>
          <input
            type="text"
            id="phone"
            placeholder="请输入手机号"
            v-model="phone"
            @blur="checkPhone"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-show="status_phone == 1 || status_phone == 2 || status_phone == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-show="status_phone == 4"
          ></em>
          <i style="display: block;" v-show="status_phone == 3"
            >此手机号已被其他用户绑定</i
          >
          <i style="display: block;" v-show="status_phone == 1"
            >请输入您的手机号
          </i>
          <i style="display: block;" v-show="status_phone == 2"
            >请输入正确的手机号格式</i
          >
        </li>
        <li>
          <span>验证码：</span>
          <input
            type="text"
            class="inp_yzm"
            placeholder="请输入验证码"
            v-model="code"
          />
          <img src="../assets/images/yzm.png" alt="" />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" v-model="agree" />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button type="button" @click="doReg" v-show="agree">提交注册</button>
          <button type="button" class="disabled" disabled="" v-show="!agree">
            提交注册
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      passwd: "",
      repasswd: "",
      phone: "",
      code: "",
      agree: false, // 是否同意协议

      status_email: 0, //0普通 1空 2格式错误 3已注册 4正确
      status_passwd: 0, //0普通 1空 2长度错误 3正确
      status_repasswd: 0, //0普通 1不同 2相同
      status_phone: 0, //0普通 1空 2格式错误 3已注册 4正确
    };
  },
  methods: {
    checkPhone() {
      //0普通 1空 2格式错误 3已注册 4正确
      const phone = this.phone.trim();

      if (phone.length == 0) return (this.status_phone = 1);

      const reg = /^1[3-9]\d{9}$/;
      if (!reg.test(phone)) return (this.status_phone = 2);

      // 13555555555
      const url = "user_check_phone.php?phone=" + phone;
      this.axios.get(url).then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          this.status_phone = 3;
        } else {
          this.status_phone = 4;
        }
      });
    },
    checkRepasswd() {
      const repasswd = this.repasswd.trim();

      if (repasswd != this.passwd.trim()) return (this.status_repasswd = 1);

      this.status_repasswd = 2;
    },
    checkPasswd() {
      //0普通 1空 2长度错误 3正确
      const passwd = this.passwd.trim();

      if (passwd == "") return (this.status_passwd = 1);

      if (passwd.length < 6 || passwd.length > 12)
        return (this.status_passwd = 2);

      this.status_passwd = 3;
    },
    checkEmail() {
      // 0普通 1空 2格式错误 3已注册 4正确
      const email = this.email.trim();

      if (email == "") return (this.status_email = 1);

      const reg = /^[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}$/;
      if (!reg.test(email)) return (this.status_email = 2);

      const url = "user_check_uname.php?uname=" + email;
      this.axios.get(url).then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          this.status_email = 3;
        } else {
          this.status_email = 4;
        }
      });
    },
    doReg() {
      // 所有状态都对, 才能注册. 有不对的, 就不能注册
      if (
        !(
          this.status_email == 4 &&
          this.status_phone == 4 &&
          this.status_passwd == 3 &&
          this.status_repasswd == 2
        )
      ) {
        alert("请确保所有信息都正确!");
        return;
      }

      const url = "user_register.php";
      const params = `uname=${this.email}&upwd=${this.passwd}&phone=${this.phone}`;

      this.axios.post(url, params).then((res) => {
        console.log(res);
        // 待定: 需要用 Vuex 保存登录状态
        if (res.data.code == 1) {
          this.$store.commit('updateUser',{
            uid: res.data.uid,
            uname: res.data.uname,
            phone: res.data.phone,
          })
          alert("注册成功");
          this.$router.replace("/")
        } else {
          alert("注册失败");
        }
      });
    },
  },
};
</script>

<style></style>
