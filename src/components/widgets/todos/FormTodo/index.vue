<template>
  <form ref="form">
    <label for="title">Title</label>
    <input
      :disabled="suspense"
      :value="request && request.title"
      type="text"
      name="title"
      @input="$emit('changeTitle',$event)"
    />
    <label for="description">Description</label>
    <textarea
      :disabled="suspense"
      :value="request && request.description"
      name="description"
      @input="$emit('changeDescription',$event)"
    />
    <button :disabled="suspense" @click.prevent="!suspense && onSubmit($event)" type="submit">
      <div v-if="!suspense">{{actionText}}</div>
      <span v-else class="spinner-border" style="width: 20px; height: 20px;"></span>
      <!-- <b-spinner v-else small label="Spinning" /> -->
    </button>
  </form>
</template>

<script>

import Vue from 'vue'

export default Vue.extend({
  name: 'TaskForm',
  props: {
    request: {
      default: null
    },
    suspense: {
      default: false
    },
    actionText: {
      default: ''
    },
    shown: {
      default: false
    }
  },
  // watch: {
  //   shown(val) {
  //     setTimeout(() => {
  //       console.log(val)

  //     }, 500)
  //     if (val) {
  //       // if ready (mounted)
  //       const form = this.$refs.form
  //       console.log(form)
  //     }
  //   }
  // },

  mounted() {
    // register event bus for dialog opened to focus input

  },

  methods: {
    onSubmit(delay) {

      //validation
      if (!this.request.title || !this.request.description) {
        alert('All fields are required')
        return;
      }


      let request = JSON.parse(JSON.stringify(this.request))
      this.$emit('submit', this.id)
      // this.$watch('suspense', val => {
      //   !val && this.clearRequest();
      // })

    },
  }
})
</script>

<style scoped lang="scss">
@media all {
  form {
    display: flex;
    flex-direction: column;
    color: var(--clr-bg-light);
  }

  form > *:not(:last-child) {
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
    background-color: var(--clr-bg-darker);
    font-weight: bold;
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