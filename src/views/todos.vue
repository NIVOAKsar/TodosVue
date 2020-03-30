<template>
  <article class="todo-page">
    <section class="todo-list">
      <!-- :metatext="todo.createdAt | formatDate('he-IL')" -->
      <!-- name="pop-out"
        enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"-->
      <transition-group v-if="$store.state.todos">
        <TaskCard
          v-for="todo in todosForDisplay"
          :key="todo.id"
          :id="todo.id"
          :title="todo.title"
          :subtitle="todo.description"
          :is-done="todo.isDone"
          class="todo-item"
          @updateAction="onTaskCardUpdateAction"
          @removeAction="onTaskCardRemoveAction"
        />
      </transition-group>
    </section>

    <el-dialog
      :visible.sync="showDialog"
      fullscreen
      title="Create Todo"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <TaskForm @submit="onTaskFormSubmit" :suspense="formSuspense" />
    </el-dialog>
    <BottomSheet v-if="$mq === 'mobile'" class="bottom-sheet--wrapper" @actionClick="openDialog" />
  </article>
</template>

<script>

import todosStore from '@/store/todos'
import { createTodo } from '@/services/todoService'

import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TodosPage',
  props: {
    show: {
      default: false
    }
  },
  components: {
    TaskForm: () => ({
      component: import('@/components/task/TaskForm'),
      // loading: Loader
    }),
    TaskCard: () => ({
      component: import('@/components/task/TaskCard'),
      // loading: Loader
    }),
    BottomSheet: () => ({
      component: import('@/components/widgets/BottomSheet'),
      // loading: Loader
    }),

  },
  data: () => ({
    suspense: true,
    formSuspense: false,
    showDialog: false
  }),

  created() {

    setTimeout(() => {
      this.suspense = false;
    }, 2000);

  },
  mounted() {
    // this.$store.registerModule('todos', todosStore)

  },
  beforeDestroy() {
    // this.$store.unregisterModule('todos')
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos
    }),
    ...mapGetters({
      todosForDisplay: 'todos/todosForDisplay'
    })

  },
  methods: {
    ...mapMutations({
      assignTodos: 'todos/assignTodos',
      unassignTodos: 'todos/unassignTodos'

    }),

    onTaskCardUpdateAction(payload) {
      // update model

      const { id, val } = payload;
      payload = {
        id,
        val: { ...this.todos[id], isDone: val }
      }
      this.assignTodos(payload)

    },
    onTaskCardRemoveAction(payload) {
      // update model

      const { id } = payload;
      this.unassignTodos(id);
    },
    onTaskFormSubmit(payload) {

      // update ui
      this.formSuspense = true;

      // update model

      let todo = createTodo(payload.title, payload.description)

      payload = {
        id: todo.id,
        val: todo
      }
      this.assignTodos(payload)
      // next => saveTodo.then(() => this.formSuspense = false this.showDialog = false;)

      // update ui
      setTimeout(() => {
        this.showDialog = false;
        this.formSuspense = false;
      }, 2000);


    },
    onDialogOpened() {
      console.log('opened => focus the input');

    },
    onDialogClosed() {

    },
    openDialog() {
      const action = () => {
        this.showDialog = true;
      }
      setTimeout(action);
    },
    closeDialog() {
      this.showDialog = false;

    }

  }

}
</script>

<style lang="scss" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css");

@media all {
  .todo-page {
    display: flex;
    justify-content: center;
    position: relative;
  }
  .todo-form-trigger {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    // box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    // box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }

  .todo-list {
    width: 100%;
  }
}

@media #{$mobile} {
  .todo-page {
    margin-bottom: 4rem + 1rem;
  }

  .todo-form-trigger {
    position: absolute !important;
    z-index: 1;
    bottom: 0;
    // left: 50%;
    // right: 50%;
  }

  .todo-item:not(:last-child) {
    margin-bottom: 1rem;
  }
  .bottom-sheet--wrapper {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 4rem;
    padding: 0 1rem;
  }
}

@media #{$tablet} {
  .todo-item {
    max-width: 300px;
  }
}

@media #{$desktop} {
  .todo-item {
    max-width: 300px;
  }
}

@media #{$tablet}, #{$desktop} {
  .todo-form-trigger {
    border: none;
    transition: all 0.3s ease 0s;
  }

  .todo-form-trigger:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
}
</style>
