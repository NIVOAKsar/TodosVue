<template>
  <Header class="header">
    <!-- <el-card :body-style="{padding: 0}" shadow="always" class="header"> -->
    <div style="display: flex; justify-content: space-between;">
      <!-- <el-row type="flex" justify="space-between"> -->
      <button v-if="$mq === 'mobile'" class="header__menu--btn" @click="onMenuButtonClick">
        <fa-icon icon="bars" class="header__menu--btn__i" />
      </button>
      <slot v-if="$mq !== 'mobile'" name="menu" />
      <img class="header__logo" src="https://via.placeholder.com/50" alt />
      <!-- </el-row> -->
    </div>
    <!-- </el-card> -->
  </Header>
</template>

<script>
export default {
  methods: {
    onMenuButtonClick(delay) {
      const emit = () => {
        this.$emit('menuButtonClick')
      }
      setTimeout(emit, delay || 0);
    }
  }
}
</script>

<style scoped lang="scss">
@media all {
  .header {
    // box-shadow: var(--shadow-primary);
    &__menu--btn {
      &__i {
        width: 1.25rem;
        height: 1.25rem;
        // font-size: 1.25rem;
      }
    }
  }
}
</style>