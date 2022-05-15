<template>
  <div class="login-layer">
    <div class="login-cover">
      <img src="@/assets/images/login-img.jpg" alt="登入點燈系統" />
    </div>
    <div class="login-container flex-auto flex items-center justify-center">
      <div class="login-content flex flex-col">
        <h2 class="lg:text-5xl md:text-4xl text-3xl text-secondary font-bold mb-10">
          歡迎祈福、感恩
        </h2>
        <Form ref="form" :model="form" label-position="top">
          <template v-if="isFirstStep">
            <div class="mb-6">
              <FormItem label="您的大名">
                <Input v-model="form.name" placeholder="請輸入您的姓名" />
              </FormItem>
            </div>
            <div class="flex items-end md:mb-20 mb-10">
              <FormItem label="行動電話" class="flex-auto">
                <Input
                ref="phoneInput"
                v-model="form.phone"
                maxlength="10"
                @input="form.phone = form.phone.replace(/[^\d]/g, '')"
                placeholder="請輸入行動電話"
                />
              </FormItem>
              <button
                class="btn-primary btn-sm ml-2"
                :disabled="!codeBtnUsable"
                @click.prevent="getSMSCode"
              >
              發送簡訊驗證碼
              </button>
            </div>
            <router-link
              to="/"
              class="underline-link text-white md:text-lg text-base flex items-center"
            >
              <i class="w-16 h-16 icon-arrow-w-left mr-2"></i>
              <span>返回首頁</span>
            </router-link>
          </template>
          <template v-else>
            <div class="flex items-end mb-2">
              <FormItem label="驗證碼" class="flex-auto">
                <Input ref="codeInput" v-model="form.code" placeholder="請輸入簡訊驗證碼" />
              </FormItem>
              <button class="btn-primary btn-sm ml-2" :disabled="!valid"  @click.prevent="onSubmit">送出</button>
            </div>
            <p class="md:mb-20 mb-10 text-white">
              沒有收到簡訊？
              <a @click.prevent="getSMSCode" class="underline-link">
                <span>重新發送</span>
              </a>
            </p>
            <a
              @click.prevent="isFirstStep = true"
              class="underline-link text-white md:text-lg text-base flex items-center"
            >
              <i class="w-16 h-16 icon-arrow-w-left mr-2"></i>
              <span>返回上一步</span>
            </a>
          </template>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input } from 'element-ui'
import Tools from '@/utils/tools.js'
import Auth from '@/api/auth'
export default {
  name: 'Login',
  components: {
    Form,
    FormItem,
    Input
  },
  data () {
    return {
      isFirstStep: true,
      form: {
        name: '',
        phone: '',
        code: ''
      }
    }
  },
  computed: {
    valid () {
      if (!this.form.name.length) return false
      if (!this.form.phone.length) return false
      if (!this.form.code.length) return false

      return true
    },
    codeBtnUsable () {
      if (!this.form.phone.length) return false
      return true
    }
  },
  methods: {
    validate (inputName) {
      let rule = ''

      switch (inputName) {
        case 'phone':
          rule = new RegExp(/^09\d{8}$/)
          if (rule.test(this.form.phone)) {
            return true
          } else {
            Tools.errorTips('請輸入正確的手機號碼')
            this.$refs.phoneInput.focus()
            return false
          }
        case 'code':
          rule = new RegExp(`^\\d{${6}}$`)
          if (rule.test(this.form.code)) {
            return true
          } else {
            Tools.errorTips('無效的驗證碼')
            this.form.code = ''
            this.$refs.codeInput.focus()
            return false
          }
        default:
          break
      }
    },
    getSMSCode () {
      if (this.validate('phone')) {
        const param = { templeId: process.env.VUE_APP_TEMPLE_ID, phoneNumber: this.form.phone }
        Auth.SmsCodeLogin(param).then((res) => {
          if (res) {
            this.isFirstStep = false
          }
        })
      }
    },
    onSubmit () {
      if (this.validate('code')) {
        const param = {
          templeId: process.env.VUE_APP_TEMPLE_ID,
          phoneNumber: this.form.phone,
          verificationCode: this.form.code
        }

        Auth.VerifySmsCode(param).then((res) => {
          if (res) {
            const userInfo = {
              username: this.form.name,
              phoneNumber: this.form.phone
            }
            localStorage.setItem('access_token', res.token)
            this.$store.dispatch('setToken', res.token)
            this.$store.dispatch('setUserInfo', userInfo)
            if (res.token) {
              Tools.successTips('登入成功')
              this.$router.push('/blessing')
            }
          }
        }).catch(() => {
          this.form.code = ''
          Tools.errorTips('無效的驗證碼，請重新獲取')
        })
      }
    }
  }
}
</script>

<style lang="scss">
.login-layer {
  display: flex;
}
.login-container {
  position: relative;
  background: linear-gradient(227deg, #613400 0%, #a05700 100%);
  &::before {
    content: '';
    display: block;
    width: 30%;
    max-width: 362px;
    height: 680px;
    background-repeat: no-repeat;
    background-image: url('~@/assets/images/circle-bg-1.png');
    background-size: contain;
    background-position: left top;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  &::after {
    content: '';
    display: block;
    width: 30%;
    max-width: 342px;
    height: 358px;
    background-repeat: no-repeat;
    background-image: url('~@/assets/images/circle-bg-3.png');
    background-position: right bottom;
    background-size: contain;
    position: absolute;
    bottom: 0;
    right: 0;
    pointer-events: none;
  }
  .login-content {
    width: 60%;
    max-width: 576px;
    z-index: 1;
    .el-form-item__label {
      color: #fff;
    }
  }
}

@media screen and (max-width: 1024px) {
  .login-layer {
    flex-direction: column;
  }

  .login-cover {
    height: 120px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .login-container {
    &::before {
      height: 480px;
    }
    &::after {
      height: 200px;
    }
    .login-content {
      width: calc(100% - 32px);
    }
  }
}

@media screen and (max-width: 520px) {
  .login-container {
    &::before {
      height: 320px;
    }
    &::after {
      height: 120px;
    }
  }
}
</style>
