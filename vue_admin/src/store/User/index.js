import router from "@/router";
import axios from "axios";
import { Message } from "element-ui";

export default {
    namespaced: true,
    state: {
        userInfoList: [],
    },
    getters: {
        getUserInfoList(state) {
            return state.userInfoList;
        }
    },
    mutations: {
        setUserInfoList(state, list) {
            state.userInfoList = list;
        },
    },
    actions: {
        fetchUserInfoList({ commit }, val) {
            axios
                .get(
                    '/api/admin/getUserInfoList',
                    {
                        headers: { Authorization: val.TOKEN },
                        params: {
                            index: val.index,
                            size: val.size,
                        }
                    })
                .then(res => {
                    commit('setUserInfoList', res.data);
                })
                .catch(err => {
                    Message.error("获取失败!");
                    console.log(err);
                });
        },
    },
}