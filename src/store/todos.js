import Vue from 'vue';
import { loadStorage, saveStorage, } from '@/services/utilsService';
import { makeTodos } from '@/services/todoService';

const Axios = require('axios')

const axios = Axios.create({
    baseURL: 'http://localhost:3003/api',
});


let state = () => {

    // const todos = loadStorage('todos') || {}
    const todos = {}

    saveStorage('todos', todos)
    return {
        todos
    }

}
let getters = {
    todosForDisplay(state) {
        // return Object.entries(state.todos).reduceRight((acc, [key, val]) => acc.concat({ id: key, ...val }), []);
        return Object.entries(state.todos)
            .reduce((acc, [key, val]) => acc.concat({ id: key, ...val }), [])
            .sort((a, b) => a.createdAt - b.createdAt)
            .reverse();
    }
}
let mutations = {
    assignTodos(state, { id, val }) {
        Vue.set(state.todos, id, val);
        saveStorage('todos', state.todos);

    },
    assignTodo(state, { id, key, val }) {
        if (state.todos[id]) {
            Vue.set(state.todos[id], key, val);
            saveStorage('todos', state.todos);
        }
    },
    unassignTodos(state, id) {
        Vue.delete(state.todos, id);
        saveStorage('todos', state.todos);
    }
}
let actions = {
    async loadMany({ commit }, ids) {
        if (!ids || !ids.length) throw new Error('no ids sent')
        ids = ids.join(',')
        try {
            const { data } = await axios.get('/todos/' + ids)
            Object.entries(data).forEach(([id, val]) => {
                val = { ...val, isSyncing: false }
                commit('assignTodos', { id, val })
            })
        }
        catch (error) {
            throw new Error(error)
        }
    },
    async removeMany(_, ids) {
        if (!ids || !ids.length) throw new Error('no ids sent')
        ids = ids.join(',')
        try {
            const { data } = await axios.delete('/todos/' + ids)
            const { message } = data
            return message
        }
        catch (error) {
            throw new Error(error)
        }
    },
    async saveMany(_, payload) {
        if (!payload || !Object.entries(payload).length) throw new Error('no data sent')
        try {
            const { data } = await axios.post('/todos', payload)
            const { message } = data
            return message
        }
        catch (error) {
            throw new Error(error)
        }
    },
    async updateMany(_, payload) {
        if (!payload || !Object.entries(payload).length) throw new Error('no data sent')
        try {
            const { data } = await axios.patch('/todos', payload)
            const { message } = data
            return message
        }
        catch (error) {
            throw new Error(error)
        }
    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}