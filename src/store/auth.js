import Vue from "vue";
import { loadStorage, saveStorage } from "@/services/utilsService";
import { wait } from '@/services/utilsService'


const Axios = require("axios");
const baseURL = `http://${process.env.NODE_ENV === "development" ? "localhost:3003" : ""}/api`;
const axios = Axios.create({ baseURL });

let state = () => {
    return {
        isAuth: false,
        account: null
    }
};
let getters = {

};
let mutations = {
    setIsAuth: (state, val) => {
        state.isAuth = val
    },
    setAccount: (state, val) => {
        state.account = val
    }
};
let actions = {
    login: async ({ commit }, credentials) => {
        try {
            await wait(2000)
            console.log('authed successfully')
            commit('setIsAuth', true)
            // commit('setAccount', account)
        }
        catch (error) {

        }

    },
    signup: async ({ commit }, credentials) => {
        try {
            await wait(2000)
            console.log('registered successfully')
        }
        catch (error) {

        }

    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
