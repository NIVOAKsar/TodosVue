<template>
  <form>
    <label for="title">Title</label>
    <input :disabled="suspense" v-model="request.title" type="text" name="title" />
    <label for="description">Description</label>
    <textarea :disabled="suspense" v-model="request.description" name="description" />
    <button :disabled="suspense" @click.prevent="!suspense && onSubmit($event)" type="submit">
      <div v-if="!suspense">Add</div>
      <b-spinner v-else small label="Spinning" />
    </button>
  </form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    suspense: {
      default: false
    }
  },
  data: () => ({
    request: {
      title: '',
      description: ''
    },
  }),
  methods: {
    onSubmit(delay) {
      // console.log(ev);
      // console.log(this.request.title);
      // console.log(this.request.description);

      //validation
      if (!this.request.title || !this.request.description) {
        alert('All fields are required')
        return;
      }
      let request = JSON.parse(JSON.stringify(this.request))
      this.$emit('submit', request)
      this.$watch('suspense', val => {
        !val && this.clearRequest();
      })

    },
    clearRequest() {
      this.request.title = ''
      this.request.description = '';
    }
  }
}
</script>

<style scoped lang="scss">
@media all {
  form {
    display: flex;
    flex-direction: column;
  }

  form > *:not(:last-child) {
  }
  label {
    text-decoration: underline;
  }

  input,
  textarea {
    padding: var(--pa-main);
    margin-bottom: var((--ma-main));
    border: 1px rgb(90, 90, 90) solid;
    border-radius: 5px;
  }
  textarea {
    height: 200px;
    resize: none;
  }
  button {
    padding: var(--pa-main);
    border: 1px rgb(90, 90, 90) solid;
    border-radius: 5px;
  }
}

@media (max-width: $sm) {
}

@media (min-width: $sm) {
  button {
    max-width: 100px;
  }
}
</style>