import Vue from 'vue';
import { loadStorage, saveStorage } from '@/services/utilsService';



let state = () => {

    const todos = loadStorage('todos') || {
        1: { id: 1, createdAt: new Date(), title: 'Apple', description: 'Slice the apple', isDone: false },
        2: { id: 2, createdAt: new Date(), title: 'Melon', description: 'Wash the melon', isDone: false },
        3: { id: 3, createdAt: new Date(), title: 'Banana', description: 'Eat the banana', isDone: false },
        4: { id: 4, createdAt: new Date(), title: 'Pineapple', description: 'Take a pineapple photo', isDone: false },
        5: { id: 5, createdAt: new Date(), title: 'Lemon', description: 'Squeeze it hard!', isDone: false },
    }
    saveStorage('todos', todos)
    return {
        todos
    }

}
let getters = {
    todosForDisplay(state) {
        // return Object.entries(state.todos).map(([key, value]) => ({ id: key, ...value }))
        return Object.values(state.todos)
    }
}
let mutations = {
    assignTodos(state, { id, val }) {
        Vue.set(state.todos, id, val)
        saveStorage('todos', state.todos)

    },
    unassignTodos(state, id) {
        Vue.delete(state.todos, id)
        saveStorage('todos', state.todos)

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