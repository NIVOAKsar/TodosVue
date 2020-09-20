<template>
  <header>
    <button v-if="$mq === 'mobile'" class="header__btn--menu" @click="onActionClick">
      <b-icon icon="list" scale="1.5" />
    </button>
    <slot v-if="$mq !== 'mobile'" name="menu" />
    <button v-show="showAvatar" class="header__btn--avatar" @click="showCardUser = !showCardUser">
      <img src="https://via.placeholder.com/50" alt />
    </button>
    <div v-show="showCardUser" class="header__card--user">
      <div class="header__card--user__creds">
        <router-link to="/account" class="header__card--user__creds__fullname">Niv Saar</router-link>
        <span class="header__card--user__creds_email">niv@gmail.com</span>
      </div>
      <img src="https://via.placeholder.com/65" class="header__card--user__avatar" />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showAvatar: {
      default: false
    }
  },
  data: () => ({
    showCardUser: false
  }),
  methods: {
    onActionClick(delay) {
      this.$emit('actionClick')
    }
  }
}
</script>

<style scoped lang="scss">
@media all {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  img {
    width: 50px;
    height: 50px;
    background-color: var(--clr-bg-skeleton);
    border-radius: 50%;
  }

  .header__card--user {
    // outside
    position: fixed;
    top: 65px;
    right: 10px;
    width: 65vw;
    height: 90px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    // inside
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header__card--user__creds {
    display: flex;
    flex-direction: column;
  }
  .header__card--user__creds__fullname {
    font-weight: bold;
    font-size: 18px;
  }
  .header__card--user__creds__email {
    font-size: 15px;
  }
  .header__card--user__avatar {
    width: 65px;
    height: 65px;
  }
}
</style>