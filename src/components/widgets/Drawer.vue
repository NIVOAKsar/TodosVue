<template>
  <!-- v-show="show" -->
  <aside :style="vars" class="drawer" ref="drawer" :class="{'hidden':!visible}">
    <div class="drawer__content">
      <button class="drawer__content__close--btn" @click="onCloseButtonClick">
        <b-icon icon="x" scale="1.5" class="drawer__content__close--btn__i" />
      </button>
      <slot name="menu" />
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    visible: {
      default: true
    }
  },
  data: () => ({
    width: '70vw',
  }),


  computed: {
    vars() {
      return {
        '--width': this.width,
        '--transform': this.visible ? `translateX(0)` : `translateX(-${this.width})`
      }
    }
  },
  methods: {
    onCloseButtonClick() {
      this.$emit('closeButtonClick')
    }
  },

}
</script>

<style scoped lang="scss">
.drawer {
  position: fixed;
  width: var(--width);
  height: 100%;
  z-index: 1;

  transform: var(--transform);
  transition: opacity 0.5s ease, transform 0.3s ease;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
}

.drawer__content {
  height: 100%;
}
.drawer__content__close--btn {
  margin-bottom: 16px;
}

.hidden {
  opacity: 0;
}
</style>