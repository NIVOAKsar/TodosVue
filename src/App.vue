<template>
  <div id="app" class="u-clr-bg-dark">
    <Header class="header--wrapper u-clr-bg-normal" @menuButtonClick="showDrawer = true">
      <MainMenu class="header__menu u-row" slot="menu" />
    </Header>
    <Drawer
      v-if="$mq === 'mobile'"
      :visible="showDrawer"
      class="drawer--wrapper u-clr-bg-dark"
      @closeButtonClick="showDrawer = false"
    >
      <MainMenu class="drawer__menu u-col" slot="menu" />
    </Drawer>
    <transition name="fade">
      <router-view class="page--wrapper" />
    </transition>
    <div v-show="showDrawer" class="dark-mask" @click="showDrawer = false" />
    <!-- <el-slider v-model="colorVal" :min="0" :max="360" class="slider" /> -->
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
    },
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

  .slider {
    max-width: 200px;
    margin: 30px;
  }
}

@media (max-width: $sm) {
  .header--wrapper {
    padding: 10px;
    margin-bottom: 10px;
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
    padding: 10px;
    margin-bottom: 20px;
  }

  .drawer--wrapper {
    height: 100%;
    padding: 10px;
  }
}
</style>
