<template>
  <!-- @submit.prevent="onSubmit(500)" -->
  <form>
    <label for="title">Title</label>
    <input :disabled="suspense" v-model="request.title" type="text" name="title" />
    <label for="description">Description</label>
    <textarea
      :disabled="suspense"
      v-model="request.description"
      name="description"
      style="resize: none; height:200px;"
    />
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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 5px;
    border: 1px rgb(90, 90, 90) solid;
  }
  button {
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

@media #{$mobile} {
  label {
    margin-bottom: 5px;
  }

  input,
  textarea {
    padding: 5px;
    margin-bottom: 10px;
  }

  button {
    padding: 0.325rem;
  }
}
</style>