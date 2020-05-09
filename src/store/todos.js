import Vue from 'vue';
import { loadStorage, saveStorage } from '@/services/utilsService';



let state = () => {

    const todos = loadStorage('todos') || {
        1: { id: 1, createdAt: new Date(), title: 'Apple', description: 'Slice the apple', isDone: false },
        2: { id: 2, createdAt: new Date(), title: 'Melon', description: 'Wash the melon', isDone: false },
        3: { id: 3, createdAt: new Date(), title: 'Banana', description: 'Eat the banana', isDone: false },
        4: { id: 4, createdAt: new Date(), title: 'Pineapple', description: 'Take a pineapple photo', isDone: false },
        5: { id: 5, createdAt: new Date(), title: 'Lemon', description: 'Squeeze it hard!', isDone: false },
        6: { id: 6, createdAt: new Date(), title: 'Grape', description: 'Eat them fresh', isDone: false },
        7: { id: 7, createdAt: new Date(), title: 'Qiwi', description: 'Sweet but soury', isDone: false },
        8: { id: 8, createdAt: new Date(), title: 'Passionfruit', description: 'Crunchy!', isDone: false },
        9: { id: 9, createdAt: new Date(), title: 'Mango', description: 'Make me wet & sticky', isDone: false },
        10: { id: 10, createdAt: new Date(), title: 'Orange', description: 'Fuled with C Vitamin!', isDone: false },
    }
    saveStorage('todos', todos)
    return {
        todos
    }

}
let getters = {
    todosForDisplay(state) {
        // return Object.entries(state.todos).map(([key, value]) => ({ id: key, ...value }))
        return Object.values(state.todos).reduceRight((acc, val) => acc.concat(val), []);
    }
}
let mutations = {
    assignTodos(state, { id, val }) {
        // the overriden assigned properties are the one of the first object (target)
        // Object.assign(state.todos[id], val))
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