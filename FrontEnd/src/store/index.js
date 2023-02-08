import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "../router/index";
import VueCookies from "vue-cookies";

Vue.use(Vuex)
Vue.use(VueCookies);


export default new Vuex.Store({
  state: {
    origin: 'https://scbapi.anish-rm.repl.co/',
    idToken: null,
    userId: null,
    userName: null,
    userRole: null,
    error: null,
    path: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    ifAuthenticated(state) {
      return state.idToken !== null;
    }
  },
  mutations: {
    authUser(state, userData) {
      console.log(userData);
      state.idToken = userData.token;
      state.userId = userData.userId;
      state.userName = userData.userName;
      state.userRole = userData.userRole;
    },
    clearAuth(state) {
      state.idToken = null;
      state.userId = null;
      state.userName = null;
      state.userRole = null;
    }
  },
  actions: {
    signup({ commit }, authData) {
      axios
        .post(
          "http://localhost:7000/api/v1/users/signup",
          {
            name: authData.name,
            email: authData.email,
            password: authData.password,
            passwordConfirm: authData.passwordConfirm,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.data.newUser._id);
          localStorage.setItem("userName", res.data.data.newUser.name);
          localStorage.setItem("userRole", res.data.data.newUser.role);
          commit("authUser", {
            token: res.data.token,
            userId: res.data.data.newUser._id,
            userName: res.data.data.newUser.name,
            userRole: res.data.data.newUser.role
          });
          router.push("/");
        })
        .catch(error => console.log("error is ssss", error));
    },
    login({ commit }, authData) {
      return axios
        .post("http://localhost:7000/api/v1/users/login", {
          email: authData.email,
          password: authData.password
          // returnSecureToken: true
        })
        .then(res => {
          // console.log(res.data.data.user);
          console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.data.user._id);
          localStorage.setItem("userName", res.data.data.user.name);
          localStorage.setItem("userRole", res.data.data.user.role);
          commit("authUser", {
            token: res.data.token,
            userId: res.data.data.user._id,
            userName: res.data.data.user.name,
            userRole: res.data.data.user.role
          });
          router.push("/");
        })
        .catch(error => {
          this.state.error = error.response.data.message;
        });
    },
    logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      router.push("/");
    },
    AutoLogin({ commit }, path) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      // console.log("path is", path);
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const userRole = localStorage.getItem("userRole");
      commit("authUser", {
        token: token,
        userId: userId,
        userName: userName,
        userRole: userRole
      });
      if (path) {
        router.push(path);
      }
    }
  },
  modules: {
  }
})
