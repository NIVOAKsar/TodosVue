<template>
  <Header style="display: flex; justify-content: space-between; align-items: center;">
    <button v-if="$mq === 'mobile'" class="header__menu--btn" @click="onActionClick">
      <b-icon icon="list" class="header__menu--btn__i" scale="1.5" />
    </button>
    <slot v-if="$mq !== 'mobile'" name="menu" />
    <img
      class="header__logo"
      style="width: 50px; height: 50px; background-color: var(--clr-bg-skeleton) "
      src="https://via.placeholder.com/50"
      alt
    />
  </Header>
</template>

<script>
export default {
  methods: {
    onActionClick(delay) {
      this.$emit('actionClick')
    }
  }
}
</script>

<style scoped lang="scss">
@media all {
}
</style>