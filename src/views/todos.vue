<template>
  <article :style="vars" class="todos-page">
    <section class="todos-list">
      <transition-group v-if="$store.state.todos">
        <TodoCard
          v-for="todo in todosForDisplay"
          :key="todo.id"
          :id="todo.id"
          :title="todo.title"
          :subtitle="todo.description"
          :is-done="todo.isDone"
          class="todos-list-item"
          @updateAction="onTaskCardUpdateAction"
          @removeAction="onTaskCardRemoveAction"
        />
      </transition-group>
    </section>
    <TodoForm
      v-if="$mq !=='mobile'"
      :suspense="formSuspense"
      class="todos-form"
      @submit="onTaskFormSubmit"
    />

    <el-dialog
      v-if="$mq === 'mobile'"
      :visible.sync="showDialog"
      fullscreen
      title="Create Todo"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <TodoForm :suspense="formSuspense" @submit="onTaskFormSubmit" />
    </el-dialog>
    <BottomSheet v-if="$mq === 'mobile'" class="todos-bottom-bar" @actionClick="openDialog" />
  </article>
</template>

<script>

import todosStore from '@/store/todos'
import { createTodo } from '@/services/todoService'

import { mapState, mapGetters, mapMutations } from 'vuex';

// import MyComponent from '@/components/MyComponent'

export default {
  name: 'TodosPage',
  props: {
    show: {
      default: false
    }
  },
  components: {

    TodoForm: () => ({
      component: import('@/components/todo/TodoForm/index'),
      // loading: Loader
    }),
    TodoCard: () => ({
      component: import('@/components/todo/TodoCard/index'),
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
    }),
    vars() {
      return {
        '--pa-main': this.$mq === 'mobile' ? '8px' : '10px',
        '--ma-main': this.$mq === 'mobile' ? '8px' : '10px'
      }
    }

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
  .todos-page {
    display: flex;
    // justify-content: center;
    position: relative; // for bottom sheet to stick down when fixed
  }
  .todos-list {
    width: 100%;
  }
  .todos-list-item {
    padding: var(--pa-main);
    border-radius: 5px;
    box-shadow: var(--shadow-primary);
  }
  .todos-form {
  }

  // .todo-form-trigger {
  //   // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  //   // box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  //   // box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  // }
}

@media (max-width: $sm) {
  .todos-page {
    margin-bottom: 60px;
  }
  .todos-list-item:not(:last-child) {
    margin-bottom: 10px;
  }

  .todos-bottom-bar {
    position: fixed;
    // position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    padding: 0 10px;
  }
}

@media (min-width: $sm) {
  .todos-page {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "a b";
  }
  .todos-list-item {
    max-width: 300px;
  }
  .todos-list-item:not(:last-child) {
    margin-bottom: 10px;
  }

  // .todo-form-trigger {
  //   border: none;
  //   transition: all 0.3s ease 0s;
  //   &:hover {
  //     background-color: #2ee59d;
  //     box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  //     color: #fff;
  //     transform: translateY(-7px);
  //   }
  // }
}
</style>
