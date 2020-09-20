import Vue from "vue";
import { loadStorage, saveStorage } from "@/services/utilsService";
import { makeTodos } from "@/services/todoService";

const Axios = require("axios");
const baseURL = `http://${process.env.NODE_ENV === "development" ? "localhost:3003" : ""}/api`;
const axios = Axios.create({ baseURL });

let state = () => {
  // const todos = loadStorage('todos') || {}
  const todos = {};

  saveStorage("todos", todos);
  return {
    todos,
  };
};
let getters = {
  todosForDisplay(state) {
    // return Object.entries(state.todos).reduceRight((acc, [key, val]) => acc.concat({ id: key, ...val }), []);
    return Object.entries(state.todos)
      .reduce((acc, [key, val]) => acc.concat({ id: key, ...val }), [])
      .sort((a, b) => a.createdAt - b.createdAt)
      .reverse();
  },
};
let mutations = {

  setTasks: (state, val) => {
    state.todos = val
  },
  assignTask: (state, { id, content }) => {
    Vue.set(state.todos, id, content)
    saveStorage("todos", state.todos)
  },
  deleteTask: (state, id) => {
    Vue.delete(state.todos, id);
    saveStorage("todos", state.todos);
  },
  updateTask: (state, { id, key, val }) => {
    if (state.todos[id]) {
      Vue.set(state.todos[id], key, val);
      saveStorage("todos", state.todos);
    }
  },
};
let actions = {
  async loadAll({ commit }) {
    try {
      const { data } = await axios.get("/todos", { timeout: 10000 });
      Object.entries(data).forEach(([id, content]) => {
        content = { ...content, isSyncing: false };
        commit("assignTask", { id, content });
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  async loadMany({ commit }, ids) {
    if (!ids || !ids.length) {
      throw new Error("[CLIENT] no ids sent");
    }

    ids = ids.join(",");
    try {
      const { data } = await axios.get("/todos/" + ids, { timeout: 10000 });
      Object.entries(data).forEach(([id, content]) => {
        content = { ...content, isSyncing: false };
        commit("assignTask", { id, content });
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  async removeMany(_, ids) {
    if (!ids || !ids.length) {
      throw new Error("[CLIENT] no ids sent");
    }
    ids = ids.join(",");
    try {
      const { data } = await axios.delete("/todos/" + ids, { timeout: 10000 });
      const { message } = data;
      return message;
    } catch (error) {
      throw new Error(error);
    }
  },
  async saveMany(_, payload) {
    if (!payload || !Object.entries(payload).length) {
      throw new Error("[CLIENT] no data sent");
    }
    try {
      const { data } = await axios.post("/todos", payload, { timeout: 10000 });
      const { message } = data;
      return message;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateMany({ commit }, payload) {

    if (!payload || !Object.entries(payload).length) {
      throw new Error("[CLIENT] no data sent");
    }

    const keys = Object.keys(payload)

    keys.forEach(id => {
      commit('updateTask', { id, key: 'isSyncing', val: true })
    })

    try {
      const { data } = await axios.patch("/todos", payload, { timeout: 10000 });
      const { message } = data;
      return message;
    } catch (error) {
      throw new Error(error);
    }
    finally {
      keys.forEach(id => {
        commit('updateTask', { id, key: 'isSyncing', val: false })
      })
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
