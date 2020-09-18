  <template>
  <footer class="bottom-sheet">
    <button class="bottom-sheet__add--btn" @click="$emit('actionClick')">
      <b-icon icon="plus" font-scale="2" class="bottom-sheet__add--btn__i" />
    </button>
  </footer>
</template>

<script>
export default {

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
    width: 3rem;
    height: 3rem;

    &__i {
      // font-size: 1.25rem;
      // width: 1rem;
      // height: 1rem;
    }
  }
}
</style>