<template>
  <div id="app">
    <Header class="header--wrapper" @menuButtonClick="showDrawer = true">
      <MainMenu class="header__menu row" slot="menu" />
    </Header>
    <Drawer
      v-if="$mq === 'mobile'"
      :visible="showDrawer"
      class="drawer--wrapper"
      @closeButtonClick="showDrawer = false"
    >
      <MainMenu class="drawer__menu col" slot="menu" />
    </Drawer>
    <!-- <BottomSheet v-if="$mq === 'mobile'" class="bottom-sheet--wrapper" /> -->
    <transition name="fade">
      <router-view class="page--wrapper" />
    </transition>
    <div v-show="showDrawer" class="dark-mask"></div>
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
  methods: {
    onTest() {
      console.log('test');

    }
  }
}
</script>

<style lang="scss">
@media all {
  #app {
    // font-family: Avenir, Helvetica, Arial, sans-serif;
    font-family: roboto-regular, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // color: #2c3e50;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
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

@media #{$mobile} {
  .header--wrapper {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .drawer--wrapper {
    height: 100%;
    padding: 1rem;
  }

  .page--wrapper {
    padding: 0 1rem;
  }
}
@media #{$tablet} {
}
@media #{$desktop} {
}
</style>
