import Vue from 'vue';
import { loadStorage, saveStorage, } from '@/services/utilsService';
import { makeTodos } from '@/services/todoService';




let state = () => {

    const todos = loadStorage('todos') || makeTodos();

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
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}