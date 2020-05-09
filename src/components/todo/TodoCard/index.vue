<template>
  <section :style="vars" class="card">
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
        @deleteClick="!suspense && onRemove(350)"
        @editClick="!suspense && onEdit(null)"
      />
    </label>
  </section>
</template>

<script>
import Content from '@/components/todo/TodoCard/Content'
import Actions from '@/components/todo/TodoCard/Actions'
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

  },

  data: () => ({
    suspense: false,
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
    onEdit(delay) {
      const emit = () => {
        this.$emit('editAction', this.id);
      }
      setTimeout(emit, delay || 0);
    },
    onRemove(delay) {
      const emit = () => {
        this.$emit('removeAction', this.id);
      }
      this.suspense = true;
      setTimeout(emit, delay || 0);
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
  .card {
  }
  .card__label {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: unset; // label has default margin-bottom
  }
  .card__label__checkbox {
    margin: 0 var(--ma-main) 0 0;
    width: var(--size-checkbox);
    height: var(--size-checkbox);
  }
}
</style>