<template>
  <form @click.prevent>
    <button @click="$emit('login-click')">already have account?</button>
  </form>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
form {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
