<template>
  <article :style="vars" class="todos-page">
    <section class="todos-list">
      <transition-group v-if="todosForDisplay">
        <TodoCard
          v-for="todo in todosForDisplay"
          :key="todo.id"
          :id="todo.id"
          :title="todo.title"
          :subtitle="todo.description"
          :is-done="todo.isDone"
          color-font="var(--clr-bg-light)"
          class="todos-list-item u-clr-bg-darker"
          @updateAction="onTaskCardUpdateAction"
          @editAction="onTaskCardEditAction"
          @removeAction="onTaskCardRemoveAction"
        />
      </transition-group>
    </section>
    <TodoForm
      v-if="$mq !=='mobile'"
      :request="formRequest"
      :suspense="formSuspense"
      :action-text="'Add'"
      class="todo-form"
      @changeTitle="onTaskFormChangeTitle"
      @changeDescription="onTaskFormChangeDescription"
      @submit="onTaskFormCreateSubmit"
    />
    <el-dialog
      v-if="$mq === 'mobile'"
      :visible.sync="showDialog"
      fullscreen
      :title="currDialogTitle"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <TodoForm
        v-show="currDialogView === 'create'"
        :request="formRequest"
        :suspense="formSuspense"
        :action-text="'Add'"
        @changeTitle="onTaskFormChangeTitle"
        @changeDescription="onTaskFormChangeDescription"
        @submit="onTaskFormCreateSubmit"
      />
      <TodoForm
        v-show="currDialogView === 'details'"
        :id="formId"
        :request="formRequest"
        :suspense="formSuspense"
        :action-text="'Save'"
        @changeTitle="onTaskFormChangeTitle"
        @changeDescription="onTaskFormChangeDescription"
        @submit="onTaskFormEditSubmit"
      />
    </el-dialog>
    <BottomSheet
      v-if="$mq === 'mobile'"
      class="todos-bottom-bar"
      @actionClick="openDialog('create')"
    />
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

    TodoForm: () => ({
      component: import('@/components/todo/TodoForm/index'),
      // loading: Loader
    }),
    TodoCard: () => ({
      component: import('@/components/todo/TodoCard/index'),
      // loading: Loader
    }),
    TodoDetails: () => ({
      component: import('@/components/todo/TodoDetails/index'),
      // loading: Loader
    }),
    BottomSheet: () => ({
      component: import('@/components/widgets/BottomSheet'),
      // loading: Loader
    }),

  },
  data: () => ({
    suspense: true,
    formId: '',
    formRequest: null,
    formSuspense: false,
    showDialog: false,
    currDialogView: '',
    currDialogTitle: 'Create Todo',
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
      assignTodo: 'todos/assignTodo',
      unassignTodos: 'todos/unassignTodos'

    }),
    onTaskCardEditAction(id) {
      // update ui
      this.openDialog('details', id)
    },
    onTaskCardUpdateAction(id) {
      // update state
      let payload = { id, key: 'isDone', val: !this.todos[id].isDone }
      this.assignTodo(payload)

    },
    onTaskCardRemoveAction(id) {
      // update state
      this.unassignTodos(id);
    },
    onTaskFormChangeTitle($event) {
      // update state
      this.formRequest.title = $event.target.value;
    },
    onTaskFormChangeDescription($event) {
      // update state
      this.formRequest.description = $event.target.value;

    },
    onTaskFormCreateSubmit() {
      // update ui
      this.formSuspense = true;

      // update state
      let todo = createTodo(this.formRequest.title, this.formRequest.description)
      let payload = { id: todo.id, val: todo }
      this.assignTodos(payload)
      // next => saveTodo.then(() => this.formSuspense = false this.showDialog = false;)

      // update ui
      setTimeout(() => {
        this.showDialog = false;
        this.formSuspense = false;
        this.formRequest = null;

      }, 2000);

    },
    onTaskFormEditSubmit(id) {

      // update ui
      this.formSuspense = true;

      // update state
      this.assignTodo({ id, key: 'title', val: this.formRequest.title })
      this.assignTodo({ id, key: 'description', val: this.formRequest.description })
      // next => saveTodo.then(() => this.formSuspense = false this.showDialog = false;)

      // update ui
      setTimeout(() => {
        this.showDialog = false;
        this.formSuspense = false;
        this.formRequest = null;
      }, 2000);
    },
    onDialogOpened() {
      console.log('opened => focus the input');

    },
    onDialogClosed() {
    },
    openDialog(view, targetId) {
      const action = () => {
        this.currDialogView = view;
        switch (view) {
          case 'create': this.currDialogTitle = 'Create Todo';
            this.formRequest = {
              title: '',
              description: ''
            };

            break;

          case 'details': this.currDialogTitle = 'Edit Todo';
            this.formId = targetId;
            this.formRequest = {
              title: this.todos[targetId].title,
              description: this.todos[targetId].description,
            };

            break;
        }
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
    position: relative; // for bottom sheet to stick down when fixed
  }

  .todos-list-item {
    padding: var(--pa-main);
    border-radius: 5px;
    box-shadow: var(--shadow-main);
  }

  ::v-deep {
    .el-dialog {
      background-color: var(--clr-bg-dark);
    }
    .el-dialog__title {
      color: var(--clr-bg-light);
    }
  }
}

@media (max-width: $sm) {
  .todos-page {
    margin-bottom: calc(60px + var(--ma-main));
  }
  .todos-list {
    width: 100%;
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
    margin-bottom: var(--ma-main);

    // display: grid;
    // grid-gap: 20px;
    // grid-template-columns: repeat(2, 1fr);
    // grid-template-areas: "a b";

    display: flex;
    justify-content: space-between;
  }
  .todos-list {
    max-height: 70vh;
    overflow-y: auto;
    padding: 10px 20px;
    // width:100%; for grid only
  }
  .todos-list-item {
    max-width: 300px;
  }
  .todos-list-item:not(:last-child) {
    margin-bottom: 10px;
  }

  .todo-form {
    flex-grow: 1;
    padding: 10px 20px;
    // margin: 0 0 0 20px;
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
