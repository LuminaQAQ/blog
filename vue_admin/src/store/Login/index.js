import router from "@/router";
import axios from "axios";
import { Message } from "element-ui";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        isLoggedIn: false,
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        login({ commit }, val) {
            axios.post('/api/admin/login', val)
                .then(res => {
                    const { token, username } = res.data;

                    commit('setToken', token);
                    commit('setUser', username);
                    commit('setLoggedIn', true);
                    window.localStorage.setItem("ADMIN_TOKEN", token);

                    Message.success("登录成功!");
                    router.push("/admin");
                })
                .catch(err => {
                    Message.error("用户名或密码错误!");
                });
        },
        logout({ commit }) {
            commit('setToken', null);
            commit('setUser', null);
            commit('setLoggedIn', false);
            window.localStorage.setItem("ADMIN_TOKEN", "");

            Message.success("退出成功!");
            router.push("/login");
        },
        fetchLoginInfo({ commit }, val) {
            axios
                .post('/api/admin/getLoginInfo', {}, { headers: { Authorization: val } })
                .then(res => {
                    const { username } = res.data.info;

                    commit('setToken', val);
                    commit('setUser', username);
                    commit('setLoggedIn', true);
                })
                .catch(err => {
                    Message.error("登录过期!");
                    router.push("/login");
                });
        }
    },
}