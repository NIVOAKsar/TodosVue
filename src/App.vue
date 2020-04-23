<template>
  <div id="app">
    <Header class="header--wrapper" @menuButtonClick="showDrawer = true">
      <MainMenu class="header__menu u-row" slot="menu" />
    </Header>
    <Drawer
      v-if="$mq === 'mobile'"
      :visible="showDrawer"
      class="drawer--wrapper"
      @closeButtonClick="showDrawer = false"
    >
      <MainMenu class="drawer__menu u-col" slot="menu" />
    </Drawer>
    <transition name="fade">
      <router-view class="page--wrapper" />
    </transition>
    <div v-show="showDrawer" class="dark-mask" @click="showDrawer = false" />
  </div>
</template>

<script>
import Header from '@/components/widgets/Header'
import Drawer from '@/components/widgets/Drawer'
import BottomSheet from '@/components/widgets/BottomSheet'
import MainMenu from '@/components/main/MainMenu'
export default {
  components: {
    Header,
    Drawer,
    BottomSheet,
    MainMenu
  },
  data: () => ({
    showDrawer: false,
  }),
  watch: {
    $mq(val) {
      if (val !== 'mobile') {
        this.showDrawer = false;
      }

    }
  },
  methods: {
    onTest() {
      console.log('test');
    },

  }
}
</script>

<style lang="scss" scoped>
@media all {
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
    position: sticky;
  }
}

@media (max-width: $sm) {
  .header--wrapper {
    padding: 10px;
    margin-bottom: 10px;
  }

  .drawer--wrapper {
    height: 100%;
    padding: 10px;
  }

  .page--wrapper {
    padding: 0 10px;
  }
}
@media (min-width: $sm) {
  .header--wrapper {
    padding: 10px;
    margin-bottom: 10px;
  }

  .drawer--wrapper {
    height: 100%;
    padding: 10px;
  }

  .page--wrapper {
    padding: 0 100px 0 10px;
  }
}
</style>
