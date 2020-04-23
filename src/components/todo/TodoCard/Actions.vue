<template>
  <div class="actions">
    <button class="actions__delete" @click.prevent="$emit('click')">
      <fa-icon v-if="!suspense" class="actions__delete__i" icon="trash" />
      <b-spinner v-else small label="Spinning" class="actions__delete__spinner" />
    </button>
  </div>
</template>

<script>
export default {
  props: ['suspense']
}
</script>

<style scoped lang="scss">
.actions {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.actions__delete__i {
  font-size: var(--size-title);
}
.actions__delete__spinner {
  width: var(--size-title);
  height: var(--size-title);
}
</style>