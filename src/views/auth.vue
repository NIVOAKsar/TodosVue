<template>
  <article>
    <transition
      :duration="{ enter: 1000, leave: 600 }"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <form-login
        v-show="form === 'login'"
        :loading="loadingLogin"
        @signup-click="onSignupClick"
        @submit-login="onSubmitLogin"
      />
    </transition>
    <transition
      :duration="{ enter: 1000, leave: 600 }"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <form-signup
        v-show="form === 'signup'"
        @login-click="onLoginClick"
        @submit-signup="onSubmitSignup"
      />
    </transition>
    <!-- <button @click="show = true">show</button> -->
  </article>
</template>

<script>
import FormLogin from '@/components/widgets/auth/FormLogin'
import FormSignup from '@/components/widgets/auth/FormSignup'
import { wait } from '@/services/utilsService'

import { mapActions } from 'vuex'

export default {
  name: 'PageAuth',
  components: {
    FormLogin,
    FormSignup
  },
  data: () => ({
    form: 'login',
    loadingLogin: false
  }),

  methods: {
    ...mapActions({
      login: 'auth/login',
      signup: 'auth/signup'
    }),
    async onSignupClick() {
      this.form = ''
      await wait(600)
      this.form = 'signup'
      await wait(1000)
      // autofocus signup

    },
    async onLoginClick() {
      this.form = ''
      await wait(600)
      this.form = 'login'
      await wait(1000)
      // autofocus login

    },
    async onSubmitLogin() {
      try {
        this.loadingLogin = true
        await this.login()
        this.$router.push('/')
      }
      catch (error) {

      }
      finally {
        this.loadingLogin = false

      }
    },
    async onSubmitSignup() {
      this.signup()

    }

  }

}
</script>

<style scoped lang="scss">
article {
  display: flex;
  flex-direction: column;
}
</style>