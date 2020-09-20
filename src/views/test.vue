<template>
  <article class="test">
    <h1>Test for "vue-mq"</h1>

    <!-- <div>Current Device: {{$mq}}</div>
    <mq-layout mq="desktop" class="layout">
      <span>Display on desktop</span>
    </mq-layout>
    <mq-layout mq="tablet" class="layout">
      <span>display on tablet</span>
    </mq-layout>
    <mq-layout mq="mobile" class="layout">
      <span>display on mobile</span>
    </mq-layout>
    <mq-layout :mq="['mobile', 'desktop']" class="layout">
      <span>display on phone & desktop</span>
    </mq-layout>-->

    <h1>Test for "vue-ripple"</h1>
    <!-- <el-row>
      <button class="button" @click="onClick(1000)" v-ripple.1000>Button</button>
      <button class="button" @click="onClick(500)" v-ripple.500>Button</button>
      <button class="button" @click="onClick(250)" v-ripple.250>Button</button>
    </el-row>-->
    <h1>Test for color scheme</h1>
    <strong>Base Hue: {{baseHue}}</strong>
    <input v-model="baseHue" type="range" min="0" max="360" />
    <!-- <div class="colors">
      <div class="color" :style="`background-color: var(--clr-main-lighter)`"></div>
      <div class="color" :style="`background-color: var(--clr-main-light)`"></div>
      <div class="color" :style="`background-color: var(--clr-main-normal)`"></div>
      <div class="color" :style="`background-color: var(--clr-main-dark)`"></div>
      <div class="color" :style="`background-color: var(--clr-main-darker)`"></div>
    </div>-->
    <div class="colors">
      <div
        class="color"
        :style="`background-color: ${currColor.lighter}; 
                 box-shadow: 0 3px 6px ${currColor.lighter}, 0 3px 6px ${currColor.lighter};`"
      />
      <div
        class="color"
        :style="`background-color: ${currColor.light}; 
                 box-shadow: 0 3px 6px ${currColor.light}, 0 3px 6px ${currColor.light};`"
      />
      <div
        class="color"
        :style="`background-color: ${currColor.normal}; 
                 box-shadow: 0 3px 6px ${currColor.normal}, 0 3px 6px ${currColor.normal};`"
      />
      <div
        class="color"
        :style="`background-color: ${currColor.dark}; 
                 box-shadow: 0 3px 6px ${currColor.dark}, 0 3px 6px ${currColor.dark};`"
      />
      <div
        class="color"
        :style="`background-color: ${currColor.darker}; 
                 box-shadow: 0 3px 6px ${currColor.darker}, 0 3px 6px ${currColor.darker};`"
      />
    </div>

    <!-- <Test /> -->
  </article>
</template>

<script>
import ColorPicker from '@/components/widgets/common/ColorPicker/index'
export default {
  name: 'PageTest',
  components: {
    ColorPicker
  },
  data: () => ({
    baseHue: 60,
  }),
  computed: {
    currColor() {
      return this.colorGenerator(this.baseHue);
    }

  },

  created() {
    // console.log(this.$mq);
  },
  methods: {
    onClick(timeout) {
      setTimeout(() => {
        console.log('clicked after ' + timeout);

      }, timeout);

    },
    colorGenerator(hue) {
      return {
        lighter: `hsl(${hue}, 100%, 85%)`,
        light: `hsl(${hue}, 75%, 75%)`,
        normal: `hsl(${hue}, 50%, 50%)`,
        dark: `hsl(${hue}, 75%, 25%)`,
        darker: `hsl(${hue}, 50%, 25%)`,
      }
    }

  }
}
</script>

<style lang="scss" scoped>
// .row {
//   width: 100%;
//   border: 1px black solid;
// }
.colors {
  display: flex;
  > * {
    flex-grow: 1;
    border-radius: 10px;
    height: 25px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
.color {
}
// .colors {
//   :nth-child(1) {
//     background-color: var(--color1-light);
//   }
//   :nth-child(2) {
//     background-color: var(--color1-normal);
//   }
//   :nth-child(3) {
//     background-color: var(--color1-darker);
//   }
// }

#s_color_picker_id {
  text-align: center;
}
#color_id {
  height: 100px;
  background-color: #000;
}
</style>