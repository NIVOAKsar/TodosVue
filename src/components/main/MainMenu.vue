<template>
  <nav class="menu">
    <router-link class="menu__link row" to="/home">
      <fa-icon class="menu__link__i" icon="home" />
      <span class="menu__link__label">Home</span>
    </router-link>
    <router-link class="menu__link row" to="/todos">
      <fa-icon class="menu__link__i" icon="th-list"></fa-icon>
      <span class="menu__link__label">Todos</span>
    </router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@media all {
  .menu {
    &__link {
      align-items: center;
    }
  }
}

@media #{$mobile} {
  .menu {
    &__link {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      &__i {
        width: 1.25rem;
        height: 1.25rem;
        // font-size: 1rem;
        margin: 0 1rem 0 0;
      }
      &__label {
        font-size: 1rem;
      }
    }
  }
}
</style>