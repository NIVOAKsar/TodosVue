<template>
  <form id="myForm" name="myForm" @submit.prevent="onSubmit">
    <div class="group">
      <!-- type="email" -->
      <input
        v-model="email"
        :class="email && 'used'"
        @focus="emailError = ''"
        autofocus
        name="email"
        type="text"
      />
      <span class="highlight"></span>
      <span class="bar" style="position: relative">
        <div
          v-show="emailError"
          ref="emailError"
          class="error-message animated"
          style="position: absolute; bottom: -25px;"
        >{{emailError}}</div>
      </span>
      <label for="email">Email</label>
    </div>
    <div class="group">
      <input
        v-model="password"
        :class="password && 'used'"
        @focus="passwordError = ''"
        type="password"
        name="password"
        autocomplete="off"
      />
      <span class="highlight"></span>
      <span class="bar" style="position: relative">
        <div
          v-show="passwordError"
          ref="passwordError"
          class="error-message animated"
          style="position: absolute; bottom: -25px;"
        >{{passwordError}}</div>
      </span>
      <label for="password">Password</label>
    </div>

    <button type="submit" class="button buttonBlue">
      <span v-show="!loading">Login</span>
      <span v-show="loading" class="spinner-border" style="width: 25px; height: 25px;"></span>
      <!-- <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"></transition> -->
    </button>
    <button type="button" class="button buttonBlue" @click="$emit('signup-click')">Signup</button>
  </form>
</template>

<script>

import 'animate.css'


export default {
  props: {
    loading: false
  },
  data: () => ({
    emailError: '',
    passwordError: '',

    email: '',
    password: '',
  }),
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    onSubmit(ev) {
      const isValid = this.checkValidation()
      if (!isValid) {
        //
      } else {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$emit('submit-login', formData)
      }
    },
    toggleErrorEmail(text) {
      this.emailError = text
      const emailError = this.$refs.emailError
      emailError.addEventListener('animationend', () => {
        emailError.classList.remove('headShake')
      })
      emailError.classList.add('headShake')
    },
    toggleErrorPassword(text) {
      this.passwordError = text
      const passwordError = this.$refs.passwordError
      passwordError.addEventListener('animationend', () => {
        passwordError.classList.remove('headShake')
      })
      passwordError.classList.add('headShake')
    },
    checkValidation(formData) {
      let res = true
      if (!this.email) {
        this.toggleErrorEmail('field is required *')
        res = false
      }
      else if (!this.email.includes('@')) {
        this.toggleErrorEmail('make sure email is correct')
        res = false
      }
      if (!this.password) {
        this.toggleErrorPassword('field is required *')
        res = false
      }
      else if (this.password.length < 4) {
        this.toggleErrorPassword('password must be at least 4 characters long')
        res = false
      }

      return res
    }
  }
}
</script>

<style scoped lang="scss">
// @import url("../../../../../node_modules/animate.css/animate.css");

.error-message {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #cc0000;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  font-size: 13px;
}

form {
  margin-top: 17vh;
  width: 100%;
  padding: 3em 2em 2em 2em;
  background: #fafafa;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  //   box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px, rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;
}

.group {
  position: relative;
  margin-bottom: 45px;
}

input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  -webkit-appearance: none;
  display: block;
  background: #fafafa;
  color: #636363;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #757575;
}

input:focus {
  outline: none;
}

/* Label */

label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: all 0.2s ease;
}

/* active */

input:focus ~ label,
input.used ~ label {
  top: -20px;
  transform: scale(0.75);
  left: -2px;
  /* font-size: 14px; */
  color: #4a89dc;
}

/* Underline */

.bar {
  position: relative;
  display: block;
  width: 100%;
}

.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #4a89dc;
  transition: all 0.2s ease;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}

/* active */

input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

/* Highlight */

.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active */

input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
}

/* Button */

.button {
  -webkit-font-smoothing: antialiased;
  // padding: 12px 24px;
  height: 40px;
  width: 100%;
  color: #fff;
  font-size: 16px;
  text-align: center;
  letter-spacing: 1px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #3160b6;
  cursor: pointer;
  transition: all 0.15s ease;
}

.button:not(:last-child) {
  margin-bottom: 10px;
}
.button:focus {
  outline: 0;
}

/* Button modifiers */

.buttonBlue {
  background: #4a89dc;
  //   text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
}

.buttonBlue:hover {
  background: #357bd8;
}

/* Animations */

@keyframes inputHighlighter {
  from {
    background: #4a89dc;
  }
  to {
    width: 0;
    background: transparent;
  }
}
</style>