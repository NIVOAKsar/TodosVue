<template>
  <div :style="vars" :class="isDone && 'done'" class="card">
    <label :for="`checkbox-${this.id}`" class="card__label">
      <input
        :id="`checkbox-${this.id}`"
        type="checkbox"
        :checked="isDone"
        @change="onChange"
        class="card__label__checkbox"
      />
      <Content
        :style="vars"
        :is-done="isDone"
        :title="title"
        :subtitle="subtitle"
        @toggleDone="onToggleDone"
      />
      <Actions
        :style="vars"
        :suspense="suspense"
        @deleteClick="!suspense && onRemove()"
        @editClick="!suspense && onEdit()"
      />
    </label>
  </div>
</template>

<script>
import Content from './Content'
import Actions from './Actions'
export default {
  name: 'TaskCard',
  components: {
    Content,
    Actions
  },
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
    },
    colorFont: {
      default: ''
    },

    suspense: {
      default: false
    }

  },

  data: () => ({
    // suspense: false,
  }),
  computed: {
    vars() {
      return {
        '--size-checkbox': this.$mq === 'mobile' ? '15px' : '17px',
        '--size-title': this.$mq === 'mobile' ? '18px' : '20px',
        '--size-subtitle': this.$mq === 'mobile' ? '14px' : '16px',
        '--clr-font': this.colorFont,
      }
    }
  },
  methods: {
    onEdit() {
      this.$emit('edit', this.id);
    },
    onRemove() {
      this.$emit('removeAction', this.id);
    },
    onChange(ev) {
      this.$emit('updateAction', this.id);
    },
    onToggleDone() {
      this.$emit('updateAction', this.id);
    }

  }

}
</script>

<style lang="scss" scoped>
@media all {
  .done {
    opacity: 0.5;
  }
  .card {
    transition: 0.6s ease;
  }
  .card__label {
    flex-grow: 1;
    padding: var(--pa-main);
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: unset; // label has default margin-bottom
  }
  .card__label__checkbox {
    margin: 0 var(--ma-main) 0 0;
    min-width: var(--size-checkbox);
    min-height: var(--size-checkbox);
  }
}
</style>