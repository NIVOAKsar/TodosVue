<template>
  <div class="content">
    <label v-if="!editTitle" :class="isDone && 'done'" title="Edit" class="content__title">
      {{title}}
      <input v-model="editTitle" type="checkbox" hidden />
    </label>
    <input v-if="editTitle && !isDone" :value="title" type="text" class="content__title" />
    <label :class="isDone && 'done'" title="Edit" class="content__subtitle">{{subtitle}}</label>
  </div>
</template>

<script>
export default {
  props: ['id', 'isDone', 'title', 'subtitle'],
  data: () => ({
    editTitle: false,
    ediSubtitle: false
  }),
  methods: {
    onChange(ev) {
      console.log(ev);

    }
  }

}
</script>

<style scoped lang="scss">
@media all {
  .done {
    text-decoration: line-through;
  }
  .content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .content__title,
  .content__subtitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--clr-font);
  }
  .content__title {
    font-family: roboto-medium;
    font-size: var(--size-title);
    margin-bottom: var(--ma-main);
  }
  .content__subtitle {
    font-size: var(--size-subtitle);
  }
}
</style>