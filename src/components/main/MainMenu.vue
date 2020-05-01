<template>
  <nav class="menu">
    <router-link class="menu__link" v-for="route in routes" :key="route.label" :to="route.url">
      <b-icon class="menu__link__i" :icon="route.icon" font-scale="2" />
      <span class="menu__link__label">{{route.label}}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  data: () => ({
    routes: [{
      url: '/home',
      label: 'Home',
      icon: 'house',
    },
    {
      url: '/todos',
      label: 'Todos',
      icon: 'list-task',
    },
    {
      url: '/test',
      label: 'Test',
      icon: '',

    }]
  })
}
</script>

<style lang="scss" scoped>
@media all {
  .menu {
    &__link {
      align-items: center;
      &__i {
        color: var(--clr-bg-light);
      }
      &__label {
        color: var(--clr-bg-light);
      }
    }
  }
}

@media (max-width: $sm) {
  .menu {
    &__link {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &__i {
        margin: 0 10px 0 0;
      }
      &__label {
      }
    }
  }
}
@media (min-width: $sm) {
  .menu {
    &__link {
      display: flex;
      flex-direction: column;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &__i {
      }
      &__label {
      }
    }
  }
}
</style>