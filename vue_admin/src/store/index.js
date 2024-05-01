import Vue from 'vue'
import Vuex from 'vuex'

import Login from './Login'

import User from "./User"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Login,
    User,
  }
})
