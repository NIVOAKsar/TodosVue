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
            @edit="onTaskCardEdit"
            @updateAction="onTaskCardUpdateAction"
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
      :title="currDialogTitle"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
      fullscreen
    >
      <!-- <template #title>
        <p>{{currDialogTitle}}</p>
      </template>-->
      <TodoForm
        ref="createForm"
        v-show="currDialogView === 'create'"
        :shown="showDialog"
        :request="formRequest"
        :suspense="suspenseCreate"
        action-text="Add"
        @changeTitle="onTaskFormChangeTitle"
        @changeDescription="onTaskFormChangeDescription"
        @submit="onTaskFormCreateSubmit"
      />
      <TodoForm
        ref="detailsForm"
        v-show="currDialogView === 'details'"
        :shown="showDialog"
        :request="formRequest"
        :suspense="todos[formId] && todos[formId].isSyncing"
        action-text="Save"
        @changeTitle="onTaskFormChangeTitle"
        @changeDescription="onTaskFormChangeDescription"
        @submit="onTaskFormEditSubmit(formId)"
      />
    </el-dialog>
    <Footer v-if="$mq === 'mobile'" class="todo-bottom-bar" @actionClick="openDialog('create')" />
  </article>
</template>

<script>

import todosStore from '@/store/todos'
import { makeTodo } from '@/services/todoService'
import { makeId, makeObjectId, wait, setLoader } from '@/services/utilsService'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';


export default {
  name: 'TodosPage',
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
    Footer: () => ({
      component: import('@/components/widgets/Footer'),
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
    currDialogView: '',
    currDialogTitle: '',
  }),
  created() {
    if (!Object.entries(this.todos).length) {
      // callbacks
      const onSuccess = () => {
        console.log('[SERVER] load succeeded!')
      }
      const onFailure = err => {
        console.log('[SERVER]', err)
      }

      // TODO: load from user document
      // const ids = [
      //   '5edaa12763bb8e0000860bb2',
      //   '5edaa12763bb8e0000860bb3',
      //   '5edaa12763bb8e0000860bb4',
      //   '5edaa12763bb8e0000860bb5',
      //   '5edaa12763bb8e0000860bb6',
      //   '5edaa12763bb8e0000860bb7',
      //   '5edaa12763bb8e0000860bb8',
      //   '5edaa12763bb8e0000860bb9',
      //   '5edaa12763bb8e0000860bba',
      //   '5edaa12763bb8e0000860bbb',
      // ]

      // this.loadMany(ids)
      //   .then(onSuccess)
      //   .catch(onFailure)

      this.loadAll()
        .then(onSuccess)
        .catch(onFailure)
    }

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
      assignTask: 'todos/assignTask',
      updateTask: 'todos/updateTask',
      deleteTask: 'todos/deleteTask'
    }),
    ...mapActions({
      loadAll: 'todos/loadAll',
      loadMany: 'todos/loadMany',
      removeMany: 'todos/removeMany',
      saveMany: 'todos/saveMany',
      updateMany: 'todos/updateMany'
    }),
    onTaskCardEdit(id) {
      // update ui
      this.openDialog('details', id)
    },
    onTaskCardUpdateAction(id) {

      // callbacks
      const onSuccess = res => {
        console.log(res);
      }
      const onFailure = err => {
        console.log(err);
      }

      // update api
      const payload = {
        [id]: {
          isDone: !this.todos[id].isDone
        }
      }
      const prm = this.updateMany(payload)
        .then(onSuccess)
        .catch(onFailure)

      // update state
      this.updateTask({ id, key: 'isDone', val: !this.todos[id].isDone })

    },
    onTaskCardRemoveAction(id) {

      // callbacks
      const onSuccess = res => {
        console.log(res)
      }
      const onFailure = err => {
        console.log(err)
      }

      // update api
      const ids = [id]
      this.removeMany(ids)
        .then(onSuccess)
        .catch(onFailure)

      // update state
      this.deleteTask(id)
    },
    onTaskFormChangeTitle($event) {
      this.formRequest.title = $event.target.value;
    },
    onTaskFormChangeDescription($event) {
      this.formRequest.description = $event.target.value;
    },
    onTaskFormCreateSubmit() {
      // callbacks
      const onSuccess = res => {
        if (this.currDialogView === 'create') {
          this.showDialog = false;
          this.formRequest = { title: '', description: '' };
        }
      }
      const onFailure = err => {
        console.log(err)
      }
      const onSettled = () => {
        this.suspenseCreate = false
      }

      // update ui
      this.suspenseCreate = true;

      // update api
      let todo = makeTodo(this.formRequest.title, this.formRequest.description)
      const id = makeObjectId()
      const payload = [{ id, ...todo }]
      this.saveMany(payload)
        .then(onSuccess)
        .catch(onFailure)
        .finally(onSettled)

      // update state
      this.assignTask({ id, val: todo })

    },
    onTaskFormEditSubmit(id) {

      // callbacks
      const onSuccess = res => {
        // update ui
        if (this.currDialogView === 'details') {
          this.showDialog = false;
        }
      }
      const onFailure = err => {
        console.log(err);
      }

      // update api
      const payload = {
        [id]: {
          title: this.formRequest.title,
          description: this.formRequest.description
        }
      }
      this.updateMany(payload)
        .then(onSuccess)
        .catch(onFailure)

      // update state
      this.updateTask({ id, key: 'title', val: this.formRequest.title })
      this.updateTask({ id, key: 'description', val: this.formRequest.description })
    },
    onTaskAddClick() {
      // update state 
      this.formId = '';
      this.currDialogView = 'create'

      // update ui
      this.currDialogTitle = 'Create Todo';
      this.formRequest = { title: '', description: '' };
    },
    onScroll(ev) {
      console.log('scroll')
    },
    onDialogOpened() {
      try {
        switch (this.currDialogView) {
          case 'create': {
            const createForm = this.$refs.createForm.$el
            const input = createForm[0]
            input.focus()
            break;
          }
          case 'details': {
            const detailsForm = this.$refs.detailsForm.$el
            const input = detailsForm[0]
            input.selectionStart = input.value.length
            input.selectionEnd = input.value.length
            input.focus()
            break;
          }
        }
      }
      catch (error) {
        //
      }

    },
    onDialogClosed() {
      // console.log('closed');

    },
    openDialog(view, targetId) {
      switch (view) {
        case 'create':
          this.currDialogView = 'create'
          this.currDialogTitle = 'Create Todo';
          this.formRequest = { title: '', description: '' };
          break;

        case 'details':
          this.currDialogView = 'details'
          this.currDialogTitle = 'Edit Todo';
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
    },


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
