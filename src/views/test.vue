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

    <h1>Test for "element"</h1>
    <el-row>
      <button class="button" @click="onClick(1000)" v-ripple.1000>Button</button>
      <button class="button" @click="onClick(500)" v-ripple.500>Button</button>
      <button class="button" @click="onClick(250)" v-ripple.250>Button</button>
    </el-row>
    <!-- <Test /> -->
  </article>
</template>

<script>
// import Test from '@/components/Test';
export default {
  name: 'Test',
  components: {
    // Test
  },

  created() {
    // console.log(this.$mq);
  },
  methods: {
    onClick(timeout) {
      setTimeout(() => {
        console.log('clicked after ' + timeout);

      }, timeout);

    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
}
</style>