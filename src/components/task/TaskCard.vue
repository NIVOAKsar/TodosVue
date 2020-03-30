<template>
  <section class="card">
    <!-- <img class="card__icon" :src="icon" /> -->
    <label class="card__checkbox">
      <input
        id="checkbox"
        type="checkbox"
        :checked="isDone"
        @change="onChange"
        class="card__checkbox__input"
      />
    </label>
    <div class="card__content">
      <label for="checkbox" class="card__content__title" :class="isDone && 'done'">{{title}}</label>
      <label for="checkbox" class="card__content__subtitle" :class="isDone && 'done'">{{subtitle}}</label>
    </div>

    <div class="card__actions">
      <button class="card__actions__delete--btn" @click="!suspense && onRemove(350)">
        <fa-icon v-if="!suspense" class="card__actions__delete--btn__i" icon="trash" />
        <b-spinner v-else small label="Spinning" class="card__actions__delete--btn__spinner" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TaskCard',

  props: {
    id: {
      default: ''
    },
    title: {
      default: ''
    },
    subtitle: {
      default: ''
    },
    isDone: {
      default: false
    },
    icon: {
      default: 'https://via.placeholder.com/50'
    }
  },

  data: () => ({
    suspense: false
  }),
  methods: {
    onChange(ev) {
      this.$emit('updateAction', { id: this.id, val: ev.target.checked })
    },
    onRemove(delay) {

      const emit = () => {
        this.$emit('removeAction', { id: this.id })
      }
      this.suspense = true;
      setTimeout(emit, delay || 0);
    }
  }

}
</script>

<style lang="scss" scoped>
@media all {
  .done {
    text-decoration: line-through;
  }

  .card {
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex-direction: row;
    &__checkbox {
      &__input {
        margin: 0 10px 0 0;
      }
    }
    &__content {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      &__title,
      &__subtitle {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &__title {
        font-family: roboto-medium;
      }
      &__subtitle {
      }
    }
    &__actions {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &__delete--btn {
        &__i {
          font-size: 1.25rem;
        }
        &__spinner {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }
}

@media #{$mobile} {
  .card {
    padding: 0.5rem;
    // &__icon {
    //   margin: 0 10px 0 0;
    //   width: 50px;
    //   height: 50px;
    // }
    &__checkbox {
      &__input {
        width: 15px;
        height: 15px;
      }
    }
    &__content {
      &__title {
        margin-bottom: 0.5rem;
      }
      &__subtitle {
        font-size: 0.875rem;
      }
    }
  }
}
</style>