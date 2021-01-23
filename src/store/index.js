import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: sessionStorage.getItem("uid"),
    phone: sessionStorage.getItem("phone"),
    uname: sessionStorage.getItem("uname"),
  },
  mutations: {
    // 设置用户信息: value : {uid:number, phone:string, uname:string}
    updateUser(state, value) {
      state.uid = value.uid;
      state.phone = value.phone;
      state.uname = value.uname;
      // HTML5新增技术: WebStorage 用于在浏览器上保存数据
      // sessionStorage: 短期存储, 标签关闭会自动销毁
      // localStorage: 长期存储, 关机重启都会在
      sessionStorage.setItem("uid", value.uid);
      sessionStorage.setItem("phone", value.phone);
      sessionStorage.setItem("uname", value.uname);
    },
    clearUser(state) {
      state.uid = null;
      state.uname = null;
      state.phone = null;

      sessionStorage.clear();
    },
  },
  actions: {},
  modules: {},
});
