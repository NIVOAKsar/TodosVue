<template>
  <div id="app">
    <section v-if="$route.path === '/auth'" class="auth--section">
      <router-view class="auth--wrapper" />
    </section>
    <section v-else-if="$route.path === '/account'" class="u-clr-bg-dark">
      <Header
        class="header--wrapper u-clr-bg-normal"
        :class="currOffset > 0 && 'shadow'"
        @actionClick="showDrawer = true"
      >
        <MainMenu class="header__menu u-row" slot="menu" />
      </Header>
      <Drawer
        v-if="$mq === 'mobile'"
        :visible="showDrawer"
        @closeClick="showDrawer = false"
        class="drawer--wrapper u-clr-bg-dark"
      >
        <MainMenu class="drawer__menu u-col" slot="menu" @linkClick="onMenuLinkClick" />
      </Drawer>
      <router-view class="page--wrapper" />
    </section>

    <section v-else class="u-clr-bg-dark">
      <Header
        :show-avatar="true"
        :class="currOffset > 0 && 'shadow'"
        @actionClick="showDrawer = true"
        class="header--wrapper u-clr-bg-normal"
      >
        <MainMenu class="header__menu u-row" slot="menu" />
      </Header>
      <Drawer
        v-if="$mq === 'mobile'"
        :visible="showDrawer"
        @closeClick="showDrawer = false"
        class="drawer--wrapper u-clr-bg-dark"
      >
        <MainMenu class="drawer__menu u-col" slot="menu" @linkClick="onMenuLinkClick" />
      </Drawer>
      <transition name="fade">
        <router-view class="page--wrapper" />
      </transition>
      <div v-show="showDrawer" class="dark-mask" @click="showDrawer = false" />
    </section>
  </div>
</template>

<script>
import Header from '@/components/widgets/common/Header'
import Drawer from '@/components/widgets/common/Drawer'
import MainMenu from '@/components/widgets/common/MainMenu'
export default {
  components: {
    Header,
    Drawer,
    MainMenu
  },
  data: () => ({
    showDrawer: false,
    currOffset: 0
  }),
  watch: {
    $mq(val) {
      if (val !== 'mobile') {
        this.showDrawer = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', ev => {
      this.currOffset = window.pageYOffset
    })
  },
  computed: {
    colorVal: {
      get() {
        let value = document.documentElement.style.getPropertyValue('--hue-main')
        return value ? parseInt(value) : 190;
      },
      set(val) {
        document.documentElement.style.setProperty('--hue-main', val);

      }
    },
  },
  methods: {
    onMenuLinkClick() {
      this.showDrawer = false;
    },

  }

}
</script>

<style lang="scss" scoped>
@media all {
  section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .shadow {
    box-shadow: 0 4px 2px -2px gray;
  }
  .drawer__menu {
    display: flex;
    flex-direction: column;
  }
  .dark-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(45, 45, 45, 0.5);
  }

  .header--wrapper {
    // background-color: #fff;
    top: 0;
    position: sticky;
    z-index: 1;
  }

  .drawer--wrapper {
    // background-color: #fff;
  }
}

@media (max-width: $sm) {
  .header--wrapper {
    padding: 0 10px;
    height: 60px;
    margin-bottom: 10px;
  }

  .header__menu {
    background-color: red !important;
  }

  .auth--wrapper {
    padding: 0 25px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .page--wrapper {
    padding: 0 10px;
  }

  .drawer--wrapper {
    height: 100%;
    padding: 10px;
  }
}
@media (min-width: $sm) {
  .header--wrapper {
    padding: 0 10px;
    height: 60px;
    margin-bottom: 10px;
  }

  .drawer--wrapper {
    height: 100%;
    padding: 10px;
  }
}
</style>
