  <template>
  <section class="bottom-sheet">
    <!-- SEPERATE SECTION -->
    <button class="bottom-sheet__add--btn" @click="onActionClick">
      <fa-icon class="bottom-sheet__add--btn__i" icon="plus" />
    </button>
    <!-- SEPERATE SECTION -->

    <!-- <button style="border-radius: 10px;border: 2px black solid;">ADD TODO +</button> -->
  </section>
</template>

<script>
export default {
  methods: {
    onActionClick() {
      this.$emit('actionClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-sheet {
  display: flex;
  background-color: #2d2d2d;
  align-items: center;
  &__add--btn {
    margin-left: auto;
    background-color: #fff;
    border-radius: 50%;
    padding: 1rem;

    &__i {
      // font-size: 1.25rem;
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>