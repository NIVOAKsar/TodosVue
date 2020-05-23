<template>
  <article :style="vars" class="todos-page">
    <div class="todo-content">
      <section class="todo-list">
        <transition-group v-if="todosForDisplay">
          <TodoCard
            v-for="todo in todosForDisplay"
            :key="todo.id"
            :id="todo.id"
            :title="todo.title"
            :subtitle="todo.description"
            :is-done="todo.isDone"
            :color-font="'var(--clr-bg-light)'"
            :suspense="todos[todo.id] && todos[todo.id].isSyncing"
            class="todo-list-item u-clr-bg-darker"
            @updateAction="onTaskCardUpdateAction"
            @editAction="onTaskCardEditAction"
            @removeAction="onTaskCardRemoveAction"
          />
        </transition-group>
      </section>
      <section v-if="$mq !=='mobile'" class="todo-editor">
        <p class="todo-editor-title">{{currDialogTitle}}</p>
        <TodoForm
          v-show="currDialogView === 'create'"
          :request="formRequest"
          :suspense="suspenseCreate"
          :action-text="'Add'"
          class="todo-editor-form"
          @changeTitle="onTaskFormChangeTitle"
          @changeDescription="onTaskFormChangeDescription"
          @submit="onTaskFormCreateSubmit"
        />
        <TodoForm
          v-show="currDialogView === 'details'"
          :id="formId"
          :request="formRequest"
          :suspense="todos[formId] && todos[formId].isSyncing"
          :action-text="'Save'"
          class="todo-editor-form"
          @changeTitle="onTaskFormChangeTitle"
          @changeDescription="onTaskFormChangeDescription"
          @submit="onTaskFormEditSubmit"
        />
        <!-- <button v-if="$mq !=='mobile'" class="todo-editor-form">New</button> -->
      </section>
    </div>
    <button v-if="checkAddButton" class="todo-add" @click="onTaskAddClick">New</button>

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
        :suspense="suspenseCreate"
        :action-text="'Add'"
        @changeTitle="onTaskFormChangeTitle"
        @changeDescription="onTaskFormChangeDescription"
        @submit="onTaskFormCreateSubmit"
      />
      <TodoForm
        v-show="currDialogView === 'details'"
        :id="formId"
        :request="formRequest"
        :suspense="todos[formId] && todos[formId].isSyncing"
        :action-text="'Save'"
        @changeTitle="onTaskFormChangeTitle"
        @changeDescription="onTaskFormChangeDescription"
        @submit="onTaskFormEditSubmit"
      />
    </el-dialog>
    <BottomSheet
      v-if="$mq === 'mobile'"
      class="todo-bottom-bar"
      @actionClick="openDialog('create')"
    />
  </article>
</template>

<script>

import todosStore from '@/store/todos'
import { makeTodo } from '@/services/todoService'
import { makeId } from '@/services/utilsService'

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
    suspenseCreate: false,
    formId: '',
    formRequest: {
      title: '',
      description: ''
    },
    showDialog: false,
    currDialogView: 'create',
    currDialogTitle: 'Create Todo',
  }),
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
    checkAddButton() {
      if (this.$mq !== 'mobile') {
        return this.suspenseCreate ? false : true
      }
    },
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
      this.assignTodo({ id, key: 'isDone', val: !this.todos[id].isDone })
    },
    onTaskCardRemoveAction(id) {
      // update state & ui
      this.assignTodo({ id, key: 'isSyncing', val: true })

      const onSave = () => {
        this.unassignTodos(id)
      }

      setTimeout(onSave, 350);
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
      this.suspenseCreate = true;

      // update state
      let todo = makeTodo(this.formRequest.title, this.formRequest.description)
      this.assignTodos({ id: makeId(4), val: todo })

      const onSave = () => {
        // update state & ui
        this.suspenseCreate = false

        if (this.currDialogView === 'create') {
          this.showDialog = false;
          this.formRequest = { title: '', description: '' };
        }
      }

      setTimeout(onSave, 2000);

    },
    onTaskFormEditSubmit(id) {
      // update state & ui
      this.assignTodo({ id, key: 'isSyncing', val: true })
      this.assignTodo({ id, key: 'title', val: this.formRequest.title })
      this.assignTodo({ id, key: 'description', val: this.formRequest.description })

      const onSave = () => {
        // update state & ui
        this.assignTodo({ id, key: 'isSyncing', val: false })

        // update ui
        if (this.currDialogView === 'details') {
          this.showDialog = false;

        }
      }

      setTimeout(onSave, 2000);
    },
    onTaskAddClick() {
      // update state 
      this.formId = '';
      this.currDialogView = 'create'

      // update ui
      this.currDialogTitle = 'Create Todo';
      this.formRequest = { title: '', description: '' };
    },
    onDialogOpened() {
      console.log('opened => focus the input');
    },
    onDialogClosed() {
    },
    openDialog(view, targetId) {
      // update state & ui
      switch (view) {
        case 'create': this.currDialogTitle = 'Create Todo';
          this.formRequest = { title: '', description: '' };
          break;

        case 'details': this.currDialogTitle = 'Edit Todo';
          this.formId = targetId;
          this.formRequest = {
            title: this.todos[targetId].title,
            description: this.todos[targetId].description,
          };

          break;
      }
      this.currDialogView = view;
      this.showDialog = true;
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
    flex-direction: column;
    position: relative; // for bottom sheet to stick down when fixed
  }

  .todo-list-item {
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
  .todo-list {
    width: 100%;
  }
  .todo-list-item:not(:last-child) {
    margin-bottom: 10px;
  }
  .todo-bottom-bar {
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
    display: flex;
    justify-content: space-between;
  }

  .todo-content {
    display: flex;
    position: relative;
  }
  .todo-content::after {
    border: 1px black solid;
    width: 500px;
    height: 500px;
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .todo-list {
    max-height: 70vh;
    overflow-y: auto;
    padding: 10px 20px;
    min-width: 30%;
    @include scrollbar;
  }
  .todo-list-item {
    max-width: 300px;
  }
  .todo-list-item:not(:last-child) {
    margin-bottom: 10px;
  }
  .todo-editor {
    flex-grow: 1;
  }
  .todo-editor-title {
    color: var(--clr-bg-light);
    padding: 10px 20px;
  }
  .todo-editor-form {
    padding: 10px 20px;
    // margin: 0 0 0 20px;
  }

  .todo-add {
    max-width: 100px;
    color: var(--clr-bg-light);
    font-weight: bold;
    border-radius: 5px;
    background-color: var(--clr-bg-darker);
    padding: var(--pa-main);
    margin: 20px;
  }
}
</style>
