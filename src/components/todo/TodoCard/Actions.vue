<template>
  <div class="actions">
    <button class="action__edit action" @click.prevent="$emit('editClick')">
      <fa-icon class="action__edit__i action__i" icon="pen" />
      <!-- <b-spinner v-else small label="Spinning" class="action__edit__spinner action__spinner" /> -->
    </button>
    <button class="action__delete action" @click.prevent="$emit('deleteClick')">
      <fa-icon v-if="!suspense" class="action__delete__i action__i" icon="trash" />
      <b-spinner v-else small label="Spinning" class="action__delete__spinner action__spinner" />
    </button>
  </div>
</template>

<script>
export default {
  props: ['suspense']
}
</script>

<style scoped lang="scss">
// common
.action:not(:last-child) {
  margin-right: 10px;
}
.action__i {
  font-size: var(--size-title);
  color: var(--clr-font);
}
.action__spinner {
  width: var(--size-title);
  height: var(--size-title);
  color: var(--clr-bg-light);
}

// custom
.actions {
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-start;
}
</style>